import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "../Screens/SignUp";
import LoginScreen from "../Screens/Login";
import PurposeSelectionScreen from "../Screens/PurposeSelectionScreen";
import TreeSelectionScreen from "../Screens/TreeSelectionScreen";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="LogIn">
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LogIn"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Purpose"
        component={PurposeSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tree"
        component={TreeSelectionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
