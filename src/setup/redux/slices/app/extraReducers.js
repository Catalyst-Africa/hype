import { db } from "@/setup/firebase/firebase";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
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
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    // If there are no user, create user
    if (!docSnap.exists()) {
      await setDoc(doc(db, "hype", hypeName), {});
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
