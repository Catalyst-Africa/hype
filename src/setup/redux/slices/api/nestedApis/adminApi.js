import { extractErrorMessage } from "@/helpers/helpers";
import { fakeBaseQuery } from "@reduxjs/toolkit/dist/query";
import { toast } from "react-hot-toast";
import { hypeApi } from "../hypeApi";
import {
  getDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  setDoc,
  doc,
  collection,
} from "firebase/firestore";
import { db } from "@/setup/firebase/firebase";

const adminApi = hypeApi.injectEndpoints({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["hype", "hypeCategory", "userHype"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      queryFn: async () => {
        try {
          const allUsers = [];
          const users = collection(db, "users");
          const usersSnap = await getDocs(users);
          usersSnap.forEach((user) => {
            // if (user.id !== auth.currentUser.uid) {
            allUsers.push({
              userId: user.id,
              name: user.data().name,
              email: user.data().email,
              phone: user.data().phonenumber,
              timestamp: user.data().timeStamp,
            });
            // }
          });
          return allUsers;
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
    }),
    getAllHype: builder.query({
      queryFn: async () => {
        try {
          let allHype = [];
          const hypes = collection(db, "hype");
          const hypeSnap = await getDocs(hypes);
          hypeSnap.forEach((hype) => {
            allHype = [...allHype, ...hype.data().hypes];
          });
          return { data: allHype };
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
      providesTags: ["hype"],
    }),
    addHype: builder.mutation({
      queryFn: async ({ category, hype, id }) => {
        try {
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
          toast.success("Hype has been added successfully!");
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
      invalidatesTags: ["hype"],
    }),
    updateHype: builder.mutation({
      queryFn: async ({ formData, initialData }) => {
        try {
          const hypeRef = doc(db, "hype", formData.hypeCategory);

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
          toast.success("Hype has been updated successfully!");
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
      invalidatesTags: ["hype"],
    }),
    deleteHype: builder.mutation({
      queryFn: async (initialData) => {
        try {
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
          toast.success("Hype deleted successfully!");
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
      invalidatesTags: ["hype"],
    }),
    getAllHypeCategories: builder.query({
      queryFn: async () => {
        try {
          const allHypeCategories = [];
          const hypeCategories = collection(db, "hype");
          const hypeCategoriesSnap = await getDocs(hypeCategories);
          hypeCategoriesSnap.forEach((hypeCategory) => {
            id = hypeCategory.id;
            allHypeCategories.push(id);
          });
          return { data: allHypeCategories };
        } catch (err) {
          toast.error(extractErrorMessage(err));
        }
      },
      providesTags: ["hypeCategory"],
    }),
    getAllHypeAndCat: builder.query({
      queryFn: async () => {
        const allHypeAndCat = [];
        const hypeCategories = collection(db, "hype");
        const hypeCategoriesSnap = await getDocs(hypeCategories);
        hypeCategoriesSnap.forEach((hypeCategory) => {
          const id = hypeCategory.id;
          allHypeAndCat.push({ id, ...hypeCategory.data() });
        });
        return { data: allHypeAndCat };
      },
    }),
    addHypeCategories: builder.mutation({
      queryFn: async (hypeName) => {
        try {
          const docRef = doc(db, "hype", hypeName);
          const docSnap = await getDoc(docRef);

          // If there are no hype with same name, create hype
          if (!docSnap.exists()) {
            await setDoc(doc(db, "hype", hypeName), { hypes: [] });
          } else {
            throw new Error("Hype Category already exists!");
          }
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
      invalidatesTags: ["hypeCategory"],
    }),
    getAllHypeSent: builder.query({
      queryFn: async () => {
        try {
          const allHypeSent = [];
          const hypes = collection(db, "sentHypes");
          const hypeSnap = await getDocs(hypes);
          hypeSnap.forEach((hype) => {
            allHypeSent.push(hype.data());
          });
          return allHypeSent;
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
      providesTags: ["userHype"],
    }),
    getAllHypeReceived: builder.query({
      queryFn: async () => {
        try {
          const allHypeReceived = [];
          const hypes = collection(db, "receivedHypes");
          const hypeSnap = await getDocs(hypes);
          hypeSnap.forEach((hype) => {
            allHypeReceived.push(hype);
          });
          return allHypeReceived;
        } catch (err) {
          toast.error(extractErrorMessage(err.message));
        }
      },
      providesTags: ["userHype"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllHypeQuery,
  useAddHypeMutation,
  useUpdateHypeMutation,
  useDeleteHypeMutation,
  useGetAllHypeCategoriesQuery,
  useAddHypeCategoriesMutation,
  useGetAllHypeSentQuery,
  useGetAllHypeReceivedQuery,
  useGetAllHypeAndCatQuery,
} = adminApi;
