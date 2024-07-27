import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
};

export default App;
