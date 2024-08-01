import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import useGoogleLogin from "../store/store";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [userId, setUserId] = useState("");
  const [emailPrivate, setEmailPrivate] = useState(false);
  const [mobilePrivate, setMobilePrivate] = useState(false);
  const [addressPrivate, setAddressPrivate] = useState(false);

  // Simulating current user's ID for demonstration
  const currentUserUid = useGoogleLogin((state) => state.uid); // Get the userId from the store

  useEffect(() => {
    fetchPrivacySettings();
  }, []);

  // Function to fetch privacy settings from Firestore
  const fetchPrivacySettings = async () => {
    try {
      const userDoc = await firestore().collection("users").doc(currentUserUid).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setEmailPrivate(userData.keepEmailPrivate || false);
        setMobilePrivate(userData.keepMobileNumberPrivate || false);
        setAddressPrivate(userData.keepAddressPrivate || false);
      } else {
        console.log("User document not found.");
      }
    } catch (error) {
      console.error("Error fetching user privacy settings:", error);
    }
  };

  const searchUserByMobile = async () => {
    try {
      const querySnapshot = await firestore()
        .collection("users")
        .where("phone", "==", searchQuery)
        .limit(1) // Limit to 1 result since mobile numbers should be unique
        .get();
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const userId = userDoc.id;

        // Check privacy settings
        if (userData.keepEmailPrivate || userData.keepMobileNumberPrivate || userData.keepAddressPrivate) {
          Alert.alert(
            "Privacy Settings",
            "User cannot be found due to privacy settings.",
            [{ text: "OK", onPress: () => setSearchResult(null) }],
            { cancelable: false }
          );
        } else {
          setSearchResult(userData);
          setUserId(userId);
        }
      } else {
        setSearchResult(null);
        alert("User with this mobile number not found.");
      }
    } catch (error) {
      console.error("Error searching user:", error);
      alert("Error searching user. Please try again later.");
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      searchUserByMobile();
    } else {
      alert("Please enter a mobile number to search.");
    }
  };

  const handleConnect = async () => {
    if (!searchResult) {
      alert("No user found to connect.");
      return;
    }

    try {
      const foundUserId = userId;

      // Update finder's (current user's) connections array with found user's UID
      await firestore()
        .collection("users")
        .doc(currentUserUid)
        .update({
          connections: firestore.FieldValue.arrayUnion(foundUserId),
        });

      // Update found user's connections array with finder's UID
      await firestore()
        .collection("users")
        .doc(foundUserId)
        .update({
          connections: firestore.FieldValue.arrayUnion(currentUserUid),
        });

      alert(`Connected`);
    } catch (error) {
      console.error("Error connecting users:", error);
      alert("Error connecting users. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by mobile number"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {searchResult && (
        <View style={styles.resultContainer}>
          <View style={styles.card}>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{searchResult.phone || "N/A"}</Text>
            </View>
            <TouchableOpacity
              style={styles.connectButton}
              onPress={handleConnect}
            >
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingLeft: 10,
    color: "#000",
    backgroundColor: "#fff",
    marginRight: 10,
  },
  searchButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  card: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
  connectButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    alignItems: "center",
  },
  connectButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SearchComponent;
