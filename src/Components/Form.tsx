import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Form: React.FC = () => {
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted!");
  };

  return (
    <View >
      <View >
        <Text >Email</Text>
        <TextInput
          
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View >
        <Text >Password</Text>
        <TextInput
         
          placeholder="Enter your password"
          secureTextEntry={true}
          autoCompleteType="password"
          onSubmitEditing={handleSubmit}
        />
      </View>
    </View>
  );
};

export default Form;
