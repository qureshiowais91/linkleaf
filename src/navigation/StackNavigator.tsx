import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../Screens/SignUp';
import LoginScreen from '../Screens/Login';
import PurposeSelectionScreen from '../Screens/PurposeSelectionScreen';
import TreeSelectionScreen from '../Screens/TreeSelectionScreen';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="LogIn" component={LoginScreen} screenOptions={{headerShown:false}} />
      <Stack.Screen name="Purpose" component={PurposeSelectionScreen} screenOptions={{headerShown:false}} />
      <Stack.Screen name="Tree" component={TreeSelectionScreen} screenOptions={{headerShown:false}} />
    </Stack.Navigator>
  );
}


export default StackNavigator