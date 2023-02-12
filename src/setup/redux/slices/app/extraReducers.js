import { db } from "@/setup/firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "@/setup/firebase/firebase";

export const getAllUsers = createAsyncThunk("app/getAllUsers", async () => {
  const allUsers = [];
  const users = collection(db, "users");
  const usersSnap = await getDocs(users);
  usersSnap.forEach((user) => {
    if (user.id !== auth.currentUser.uid) {
      allUsers.push({
        userId: user.id,
        name: user.data().name,
        email: user.data().email,
        phone: user.data().phonenumber,
      });
    }
  });
  return allUsers;
});

export const addHypeCategories = createAsyncThunk(
  "app/addHypeCategories",
  async (hypeName) => {
    const docRef = doc(db, "hype", hypeName);
    const docSnap = await getDoc(docRef);

    // If there are no hype with same name, create hype
    if (!docSnap.exists()) {
      await setDoc(doc(db, "hype", hypeName), { hypes: [] });
    } else {
      throw new Error("Hype Category already exists!");
    }
  },
);

export const getAllHypeCategories = createAsyncThunk(
  "app/getAllHypeCategories",
  async () => {
    const allHypeCategories = [];
    const hypeCategories = collection(db, "hype");
    const hypeCategoriesSnap = await getDocs(hypeCategories);
    hypeCategoriesSnap.forEach((hypeCategory) => {
      allHypeCategories.push(hypeCategory.id);
    });
    return allHypeCategories;
  },
);

export const addHype = createAsyncThunk(
  "app/addHype",
  async ({ category, hype, id }) => {
    const hypeRef = doc(db, "hype", category);
    const docSnap = await getDoc(hypeRef);

    // Atomically add a new hype to the "hypes" array field.
    await updateDoc(hypeRef, {
      hypes: arrayUnion({
        id,
        category,
        message: hype,
      }),
    });
  },
);

export const updateHype = createAsyncThunk(
  "app/updateHype",
  async ({ formData, initialData }) => {
    const hypeRef = doc(db, "hype", formData.hypeCategory);
    const docSnap = await getDoc(hypeRef);

    // Atomically remove a hype to the "hypes" array field.
    await updateDoc(hypeRef, {
      hypes: arrayRemove({
        category: initialData.hypeCategory,
        id: initialData.hypeId,
        message: initialData.hype,
      }),
    });

    // Atomically add a new hype to the "hypes" array field.
    await updateDoc(hypeRef, {
      hypes: arrayUnion({
        id: formData.hypeId,
        category: formData.hypeCategory,
        message: formData.hype,
      }),
    });
  },
);

export const deleteHype = createAsyncThunk(
  "app/deleteHype",
  async (initialData) => {
    const hypeRef = doc(db, "hype", initialData.category);
    const docSnap = await getDoc(hypeRef);

    // Atomically remove a hype to the "hypes" array field.
    await updateDoc(hypeRef, {
      hypes: arrayRemove({
        category: initialData.category,
        id: initialData.id,
        message: initialData.message,
      }),
    });
  },
);

export const getAllHype = createAsyncThunk("app/getAllHype", async () => {
  let allHype = [];
  const hypes = collection(db, "hype");
  const hypeSnap = await getDocs(hypes);
  hypeSnap.forEach((hype) => {
    allHype = [...allHype, ...hype.data().hypes];
  });
  return allHype;
});

export const getSentHypeByUser = createAsyncThunk(
  "app/getSentHypeByUser",
  async (user) => {
    const sentHype = [];
    const q = query(collection(db, "sentHypes"), where("userId", "==", user));

    // Create a query against the collection.
    const hypeCountDoc = await getDocs(q);
    hypeCountDoc.forEach((doc) => {
      sentHype.push(doc.data());
    });

    return sentHype;
  },
);

export const receiveSentHypeByUser = createAsyncThunk(
  "app/receiveSentHypeByUser",
  async (user) => {
    const receivedHype = [];
    // Create a reference to query sentHype collection for whatsapp
    const qWhatsapp = query(
      collection(db, "sentHypes"),
      where("whatsappnumber", "==", user?.phoneNumber),
    );
    const sentHypeCountDoc = await getDocs(qWhatsapp);
    sentHypeCountDoc.forEach(async (doc) => {
      console.log(doc);
      if (!doc.exists()) {
        await addDoc(collection(db, "receivedHypes"), {
          doc,
        });
      }
    });

    const q = query(
      collection(db, "receivedHypes"),
      where("userId", "==", user?.uid),
    );

    // Create a query against the collection.
    const hypeReceivedCountDoc = await getDocs(q);
    hypeReceivedCountDoc.forEach((doc) => {
      if (doc.exists()) {
        receivedHype.push(doc.data());
      }
    });

    return receivedHype;
  },
);

export const getAdminStatistics = createAsyncThunk(
  "app/getAdminStatistics",
  async () => {
    const totalUsers = collection(db, "users");
    const totalSentHype = collection(db, "sentHypes");

    const data = await Promise.all([
      (await getCountFromServer(totalUsers)).data().count,
      (await getCountFromServer(totalSentHype)).data().count,
    ]);
    setUsersData({
      users: data[0],
      sentHypes: data[1],
      receivedHypes: data[1],
    });
  },
);
