import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  Alert,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";

import ConfirmButton from "../Components/Buttons";

const SignupScreen: React.FC = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track password match

  const Signup = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert("Password Mismatch", "The passwords entered do not match.");
        return;
      }

      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      const user = userCredential.user;

      await user.sendEmailVerification();

      Alert.alert(
        "Verification Email Sent",
        "A verification link has been sent to your email."
      );
    } catch (error) {
      console.error("Error sending verification email:", error);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Email Already in Use", "That email address is already in use!");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Invalid Email", "That email address is invalid!");
      } else {
        Alert.alert("Error", "Failed to send verification email. Please try again.");
      }
    }
  };

  // Function to handle onChangeText for confirmPassword
  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setPasswordsMatch(text === password); // Update passwordsMatch state based on input
  };

  const navigateToLogin = () => {
    // Navigate to login screen or appropriate destination
    // Example using React Navigation
    navigation.navigate('LogIn'); // Replace 'LoginScreen' with your actual login screen name
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up To LinkLeaf</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter your password"
            secureTextEntry={true}
            autoCompleteType="password"
          />
        </View>
        <View style={[styles.inputContainer, { borderBottomColor: passwordsMatch ? "#333333" : "red" }]}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={[styles.textInput, { borderColor: passwordsMatch ? "#333333" : "red" }]}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            placeholder="Confirm your password"
            secureTextEntry={true}
            autoCompleteType="password"
          />
        </View>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.loginLink}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
      <ConfirmButton onPress={Signup} title={"Sign Up"}></ConfirmButton>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff", // Inverted background color (white)
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333", // Dark text color
  },
  inputContainer: {
    marginBottom: 10,
    width: "100%",
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
    color: "#333333", // Dark text color
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#333333", // Dark border color
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    width: "100%",
    color: "#333333", // Dark text color
    backgroundColor: "#ffffff", // Inverted background color (white)
  },
  button: {
    backgroundColor: "#007bff", // Example button color
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 10,
    fontSize: 16,
    color: "#007bff", // Link color
    textDecorationLine: "underline",
  },
});
