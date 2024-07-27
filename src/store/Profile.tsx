import { create } from "zustand";
import firestore from "@react-native-firebase/firestore";

// Zustand store
const useProfileStore = create(() => ({
  updateProfile: async (profileData, uid) => {
    const userId = uid; // The ID to use as the document name
    console.log("Profile data:", profileData);
    console.log("User ID:", userId);
    try {
      // Set the document with userId as its ID
      await firestore()
        .collection("users")
        .doc(userId) // Specify the document ID as userId
        .set(profileData, { merge: true }); // Use merge to update or create fields
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  },
}));

export default useProfileStore;
