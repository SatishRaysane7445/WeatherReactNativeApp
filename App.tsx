// App.tsx
import React, { JSX } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

// Import your screens and navigators
import SplashScreen from './screens/SplashScreen'; // New import
import LoginScreen from './screens/LoginScreen';
import AppNavigator from './navigation/AppNavigator';

/**
 * Define the parameter list for your root stack navigator.
 * This helps TypeScript understand the available routes and their expected parameters.
 */
export type RootStackParamList = {
  Splash: undefined; // New Splash screen route
  Login: undefined;
  MainApp: undefined;
};

// Define the type for the LoginScreen's navigation prop
export type LoginScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

// Create the Stack Navigator with its defined parameter list
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      {/* Set initialRouteName to 'Splash' */}
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainApp"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
