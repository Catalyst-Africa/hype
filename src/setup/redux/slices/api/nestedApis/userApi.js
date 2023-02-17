import { fakeBaseQuery } from "@reduxjs/toolkit/dist/query";
import { hypeApi } from "../hypeApi";
import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/setup/firebase/firebase";
import { toast } from "react-hot-toast";
import { extractErrorMessage } from "@/helpers/helpers";
import { auth } from "@/setup/firebase/firebase";

const userApi = hypeApi.injectEndpoints({
  baseQuery: fakeBaseQuery,
  tagTypes: ["userData", "userHype"],
  refetchOnReconnect: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getUserData: builder.query({
      queryFn: async () => {
        try {
          const docRef = doc(db, "users", auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          return { data };
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
      providesTags: ["userData"],
    }),
    updateUserData: builder.mutation({
      queryFn: async ({ user, bio, username, phonenumber }) => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          bio: bio || user?.bio,
          username:
            username?.[0] === "@" ? username : `@${username}` || user.username,
          phonenumber: phonenumber || user?.phonenumber || "",
        });
        return true;
      },
      invalidatesTags: ["userData"],
    }),
    updateUserDP: builder.mutation({
      queryFn: async (imgUrl) => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          photoUrl: imgUrl,
        });
        return true;
      },
      invalidatesTags: ["userData"],
    }),
    getSentHypeByUser: builder.query({
      queryFn: async (user) => {
        try {
          const sentHype = [];
          console.log(user);
          const q = query(
            collection(db, "sentHypes"),
            where("userId", "==", user),
          );

          // Create a query against the collection.
          const hypeCountDoc = await getDocs(q);
          hypeCountDoc.forEach((doc) => {
            sentHype.push(doc.data());
          });
          return { data: sentHype };
        } catch (err) {
          toast.error(err);
          // toast.error(extractErrorMessage(err.message));
        }
      },
      providesTags: ["userHype"],
    }),
    getReceivedHypeByUser: builder.query({
      queryFn: async (phoneNumber) => {
        try {
          const receivedHype = [];
          // Create a reference to query sentHype collection for whatsapp
          const qWhatsapp = query(
            collection(db, "sentHypes"),
            where("whatsappnumber", "==", phoneNumber),
          );
          const sentHypeCountDoc = await getDocs(qWhatsapp);
          sentHypeCountDoc.forEach(async (doc) => {
            receivedHype.push(doc.data());
          });
          return { data: receivedHype };
        } catch (err) {
          toast.error(err);
          // toast.error(extractErrorMessage(err));
        }
      },
      providesTags: ["userHype"],
    }),
    sendHype: builder.mutation({
      queryFn: async ({ user, initialData, displayName }) => {
        try {
          const docRef = await addDoc(collection(db, "sentHypes"), {
            userId: user.uid,
            ...initialData,
            timeStamp: serverTimestamp(),
            sender: displayName ? firstname : "",
          });

          const updateId = doc(db, "sentHypes", docRef.id);
          await updateDoc(updateId, {
            docId: docRef.id,
          });
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
      invalidatesTags: ["userHype"],
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useUpdateUserDataMutation,
  useGetSentHypeByUserQuery,
  useGetReceivedHypeByUserQuery,
  useSendHypeMutation,
  useUpdateUserDPMutation,
} = userApi;
