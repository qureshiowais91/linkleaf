import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, StyleProp, ViewStyle } from "react-native";

interface ConfirmButtonProps {
  title: string;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ title,onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ConfirmButton;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6A0DAD",
    borderRadius: 30,
    marginBottom:50
  },
   
  title:{
  fontSize:20,
    color:"white"
  }
});
