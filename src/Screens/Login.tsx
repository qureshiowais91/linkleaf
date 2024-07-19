import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  SafeAreaView,
  ImageSourcePropType,
  TextStyle,
  Alert,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import auth from "@react-native-firebase/auth";

import ConfirmButton from "../Components/Buttons";

const LoginScreen: React.FC = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        navigation.navigate("Purpose");
      })
      .catch((error) => {
        if(error.code=='auth/invalid-credential')
        console.error(error.code);
         Alert.alert("Email And Password is Incorrect!")
      });
  };

 
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login To LinkLeaf</Text>
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
