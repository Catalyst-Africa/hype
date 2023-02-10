import { db } from "@/setup/firebase/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "@/setup/firebase/firebase";

export const getAllUsers = createAsyncThunk("app/getAllUsers", async () => {
  console.log("wat?");
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
  console.log(allUsers);
  return allUsers;
});
