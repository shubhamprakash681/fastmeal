import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { toast } from "react-toastify";
import { firebaseApp } from "./firebase";

export const auth = getAuth(firebaseApp);

export const googleLoginHandler = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider);
};

export const facebookLoginHandler = () => {
  const provider = new FacebookAuthProvider();

  signInWithPopup(auth, provider);
};

export const emailLoginHandler = (email, psk) => {
  signInWithEmailAndPassword(auth, email, psk)
    // .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log('Account Created, User details: ');
    //     console.log(user);
    // })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
      toast.error(errorMessage, {
        toastId: errorCode,
      });
    });
};

export const resetPasswordHandler = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.success("Password reset mail sent", {
        toastId: "psk-reset-success",
      });
      console.log("Password reset mail sent");
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;

      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
      toast.error(errorMessage, {
        toastId: errorCode,
      });
    });
};
