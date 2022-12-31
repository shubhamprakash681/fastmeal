import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase";

const auth = getAuth(firebaseApp)

export const signUpHandler = (email, psk) => {
    createUserWithEmailAndPassword(auth, email, psk)
        // .then((userCredential) => {
        //     // Signed in 
        //     const user = userCredential.user;
        //     console.log('Account Created, User details: ');
        //     console.log(user);
        // })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log('errorCode: ', errorCode);
            console.log('errorMessage: ', errorMessage);
        })
}