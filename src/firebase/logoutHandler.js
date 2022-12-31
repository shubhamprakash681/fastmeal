import { signOut } from "firebase/auth";
import { auth } from "./loginHandler";

export const logoutHandler = () => {
  signOut(auth);
};
