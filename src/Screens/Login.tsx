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
import useGoogleLogin from "../store/store"; //custome hook

import ConfirmButton from "../Components/Buttons";

const LoginScreen: React.FC = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const updateEmail = useGoogleLogin((state) => state.updateEmail);
  const Login = async () => {
    try {
      await updateEmail(email, password);
      navigation.navigate("Tabs");
      console.log(email, password);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        console.error(error.code);
      } else {
        Alert.alert("Email And Password is Incorrect!");
      }
    }
  };

  const navigateToSignUp = () => {
    // Navigate to login screen or appropriate destination
    // Example using React Navigation
    navigation.navigate("SignUp"); // Replace 'LoginScreen' with your actual login screen name
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LinkLeaf</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter your password"
            secureTextEntry={true}
            autoCompleteType="password"
          />
        </View>
      </View>

      <ConfirmButton onPress={Login} title={"Login"}></ConfirmButton>

      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.signUpLink}>Create an account? Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
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
    width: "100%",
  },
  inputWrapper: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: "#666666", // Medium gray text color
  },
  signUpLink: {
    marginTop: 10,
    fontSize: 16,
    color: "#007bff", // Link color
    textDecorationLine: "underline",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    width: "100%",
    color: "#333333", // Dark text color
    backgroundColor: "#f0f0f0", // Light gray background color
  },
});
