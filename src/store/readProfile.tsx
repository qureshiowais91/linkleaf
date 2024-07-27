// hooks/useUserProfile.ts
import { useCallback, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

interface UserProfile {
  name: string;
  phone: string;
  company: string;
  email: string;
}

const useUserProfile = (uid: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const userDoc = await firestore().collection("users").doc(uid).get();
      if (userDoc.exists) {
        setProfile(userDoc.data() as UserProfile);
      } else {
        setProfile(null);
      }
    } catch (err) {
      setError("Failed to fetch user profile");
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
};

export default useUserProfile;
