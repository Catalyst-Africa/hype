import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";

import { db, auth } from "@/setup/firebase/firebase";
import { extractErrorMessage } from "@/helpers/helpers";

export const signInWithGoogle = async () => {
  try {
    // Initiate google signin
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    //Check for user
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    // If there are no user, create user
    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        timeStamp: serverTimestamp(),
      });

      toast.success("Successfully signed in");
    } else {
      toast.success("Successfully signed in");
    }
  } catch (err) {
    toast.error(extractErrorMessage(err.message));
  }
};
