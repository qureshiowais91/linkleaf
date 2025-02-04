import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import crashlytics from '@react-native-firebase/crashlytics';

const useGoogleLogin = create((set) => ({
  email: "store@gmail.com",
  uid: "",
  loadPersistedState: async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("email");
      const storedUid = await AsyncStorage.getItem("uid");
      if (storedEmail) set({ email: storedEmail });
      if (storedUid) {
        set({ uid: storedUid });
        crashlytics().setUserId(storedUid); // Set user ID in Crashlytics
      }
    } catch (error) {
      console.error("Error loading persisted state:", error);
      crashlytics().recordError(error); // Log error to Crashlytics
    }
  },
  updateEmail: async (email, password) => {
    try {
      const res = await auth().signInWithEmailAndPassword(email, password);
      set({ email: res.user.email, uid: res.user.uid });
      await AsyncStorage.setItem("email", res.user.email);
      await AsyncStorage.setItem("uid", res.user.uid);
      crashlytics().setUserId(res.user.uid); // Set user ID in Crashlytics on login
      crashlytics().log('User logged in: ' + res.user.email); // Log successful login
    } catch (error) {
      console.error("Error logging in:", error);
      crashlytics().recordError(error); // Log error to Crashlytics
      throw error;
    }
  },
}));

// Load persisted state on startup
useGoogleLogin.getState().loadPersistedState(); // Correct way to call loadPersistedState

export default useGoogleLogin;
