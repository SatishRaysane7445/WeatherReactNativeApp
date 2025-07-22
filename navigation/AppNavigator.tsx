// navigation/AppNavigator.tsx
import React, { JSX } from 'react';
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure this package is installed if you want icons

import HomeScreen from '../screens/HomeScreen';
import AboutUsScreen from '../screens/AboutUsScreen';

// Import RootStackParamList from App.tsx to link types
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * 1. Define the parameter list for the Bottom Tab Navigator
 */
export type HomeTabParamList = {
  Home: undefined;
  'About Us': undefined;
};

/**
 * 2. Define the parameter list for the Drawer Navigator
 */
export type RootDrawerParamList = {
  HomeTabs: undefined; // This screen will render the Tab Navigator
  'About App': undefined; // A separate screen in the drawer
};

// Create the navigators with their defined parameter lists
const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();

/**
 * Define the combined props for screens within the HomeTabs navigator.
 * This is useful if Home or About Us screens needed access to both
 * tab and drawer navigation props.
 */
export type HomeTabScreenProps<Screen extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, Screen>,
    DrawerScreenProps<RootDrawerParamList> // Also include drawer props if needed
  >;

/**
 * Define the combined props for screens within the RootDrawer navigator.
 * This is useful if 'About App' needed access to both
 * drawer and stack navigation props.
 */
export type RootDrawerScreenProps<Screen extends keyof RootDrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<RootDrawerParamList, Screen>,
    NativeStackScreenProps<RootStackParamList> // Also include root stack props if needed
  >;

// This component will contain the Bottom Tab Navigator
function HomeTabs(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'help'; // Default iconName

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'About Us') {
            iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
          }
          // Ensure iconName is always assigned before returning
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About Us" component={AboutUsScreen} />
    </Tab.Navigator>
  );
}

// This is the main navigator for the 'MainApp' screen in the root stack
export default function AppNavigator(): JSX.Element {
  return (
    <Drawer.Navigator initialRouteName="HomeTabs">
      {/* HomeTabs is a Drawer screen that renders the Tab Navigator */}
      <Drawer.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ headerShown: false, title: 'Home' }}
      />
      {/* Another screen directly in the Drawer */}
      <Drawer.Screen name="About App" component={AboutUsScreen} />
    </Drawer.Navigator>
  );
}
