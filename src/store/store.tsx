import { create } from "zustand";
import auth from "@react-native-firebase/auth";

const useGoogleLogin = create((set) => ({
  email: "test@gmail.com",
  uid:{},
  updateEmail: async (email, password) => {
    const res = await auth().signInWithEmailAndPassword(email, password); // getting email and other detail
    set({ email: res.user.email });
    set({ uid: res.user.uid });
  },
}));

export default useGoogleLogin;
