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
  getCountFromServer,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { db, functions } from "@/setup/firebase/firebase";
import { httpsCallable } from "firebase/functions";

const adminApi = hypeApi.injectEndpoints({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["hype", "hypeCategory", "userHype", "user"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      queryFn: async () => {
        const allUsers = [];
        const users = collection(db, "users");
        const usersSnap = await getDocs(users);
        usersSnap.forEach((user) => {
          allUsers.push({
            userId: user.id,
            name: user.data().name,
            email: user.data().email,
            phone: user.data().phonenumber,
            timestamp: user.data().timeStamp,
          });
        });
        return { data: allUsers };
      },
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      queryFn: async (user) => {
        const deleteOneUser = httpsCallable(functions, "deleteUser");
        deleteOneUser({ uid: user });
        const userRef = doc(db, "users", user);
        await deleteDoc(userRef);
      },
      invalidatesTags: ["user"],
    }),
    getAllHype: builder.query({
      queryFn: async () => {
        // try {
        let allHype = [];
        const hypes = collection(db, "hype");
        const hypeSnap = await getDocs(hypes);
        hypeSnap.forEach((hype) => {
          allHype = [...allHype, ...hype.data().hypes];
        });
        return { data: allHype };
        // } catch (err) {
        //   toast.error(extractErrorMessage(err.message));
        // }
      },
      providesTags: ["hype"],
    }),
    addHype: builder.mutation({
      queryFn: async ({ category, hype, id }) => {
        // try {
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
        return true;
      },
      invalidatesTags: ["hype"],
    }),
    updateHype: builder.mutation({
      queryFn: async ({ alteredValue, staticValue }) => {
        console.log(alteredValue);
        console.log(staticValue);
        const hypeRef = doc(db, "hype", staticValue.category);
        const docSnap = await getDoc(hypeRef);

        // Atomically remove a hype to the "hypes" array field.
        await updateDoc(hypeRef, {
          hypes: arrayRemove({
            category: staticValue.category,
            id: staticValue.id,
            message: staticValue.message,
          }),
        });

        // Atomically add a new hype to the "hypes" array field.
        await updateDoc(hypeRef, {
          hypes: arrayUnion({
            category: alteredValue.category,
            id: alteredValue.id,
            message: alteredValue.message,
          }),
        });
        return true;
      },
      invalidatesTags: ["hype"],
    }),
    deleteHype: builder.mutation({
      queryFn: async (hype) => {
        const hypeRef = doc(db, "hype", hype.category);
        const docSnap = await getDoc(hypeRef);

        // Atomically remove a hype to the "hypes" array field.
        await updateDoc(hypeRef, {
          hypes: arrayRemove({
            category: hype.category,
            id: hype.id,
            message: hype.message,
          }),
        });
        return true;
      },
      invalidatesTags: ["hype"],
    }),
    getAllHypeCategories: builder.query({
      queryFn: async () => {
        const allHypeCategories = [];
        const hypeCategories = collection(db, "hype");
        const hypeCategoriesSnap = await getDocs(hypeCategories);
        hypeCategoriesSnap.forEach((hypeCategory) => {
          const id = hypeCategory.id;
          allHypeCategories.push(id);
        });
        return { data: allHypeCategories };
      },
      providesTags: ["hypeCategory"],
    }),
    addHypeCategory: builder.mutation({
      queryFn: async (hypeName) => {
        const docRef = doc(db, "hype", hypeName);
        const docSnap = await getDoc(docRef);

        // If there are no hype with same name, create hype
        if (!docSnap.exists()) {
          await setDoc(doc(db, "hype", hypeName), { hypes: [] });
        } else {
          throw new Error("Hype Category already exists!");
        }
        return true;
      },
      invalidatesTags: ["hypeCategory"],
    }),
    deleteHypeCategory: builder.mutation({
      queryFn: async (document) => {
        await deleteDoc(doc(db, "hype", document));
        return true;
      },
      invalidatesTags: ["hypeCategory"],
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
      invalidatesTags: ["hype", "hypeCategory"],
    }),
    providesTags: builder.mutation({
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
        // try {
        const allHypeSent = [];
        const hypes = collection(db, "sentHypes");
        const hypeSnap = await getDocs(hypes);
        hypeSnap.forEach((hype) => {
          allHypeSent.push(hype.data());
        });
        return { data: allHypeSent };
        // } catch (err) {
        //   toast.error(extractErrorMessage(err.message));
        // }
      },
      providesTags: ["userHype"],
    }),
    getAllHypeReceived: builder.query({
      queryFn: async () => {
        // try {
        const allHypeReceived = [];
        const hypes = collection(db, "receivedHypes");
        const hypeSnap = await getDocs(hypes);
        hypeSnap.forEach((hype) => {
          allHypeReceived.push(hype);
        });
        return { data: allHypeReceived };
        // } catch (err) {
        //   toast.error(extractErrorMessage(err.message));
        // }
      },
      providesTags: ["userHype"],
    }),
    getAdminStatistics: builder.query({
      queryFn: async () => {
        const userData = [];
        const totalUsers = collection(db, "users");
        const totalSentHype = collection(db, "sentHypes");
        const totalReceivedHype = collection(db, "receivedHypes");

        const data = await Promise.all([
          (await getCountFromServer(totalUsers)).data().count,
          (await getCountFromServer(totalSentHype)).data().count,
          (await getCountFromServer(totalReceivedHype)).data().count,
        ]);

        userData.push({
          users: data[0],
          sentHypes: data[1],
          receivedHypes: data[2],
        });
        return { data: userData };
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetAllHypeQuery,
  useAddHypeMutation,
  useUpdateHypeMutation,
  useDeleteHypeMutation,
  useGetAllHypeCategoriesQuery,
  useAddHypeCategoryMutation,
  useDeleteHypeCategoryMutation,
  useGetAllHypeSentQuery,
  useGetAllHypeReceivedQuery,
  useGetAllHypeAndCatQuery,
  useGetAdminStatisticsQuery,
} = adminApi;
