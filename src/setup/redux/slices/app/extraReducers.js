import { db } from "@/setup/firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
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

    // Atomically add a new region to the "regions" array field.
    await updateDoc(hypeRef, {
      hypes: arrayUnion({
        id,
        category,
        message: hype,
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
