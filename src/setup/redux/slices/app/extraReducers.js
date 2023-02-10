import { db } from "@/setup/firebase/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk("app/getAllUsers", async () => {
  const allUsers = [];
  const users = collection(db, "users");
  const usersSnap = await getDocs(users);
  usersSnap.forEach((user) => {
    allUsers.push({ docId: user.id, user: user.data() });
  });

  return allUsers;
});
