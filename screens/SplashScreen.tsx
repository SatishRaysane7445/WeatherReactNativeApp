// screens/SplashScreen.tsx
import React, { JSX, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList

// Define the type for SplashScreen's navigation prop
type SplashScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;

export default function SplashScreen({
  navigation,
}: Readonly<SplashScreenNavigationProp>): JSX.Element {
  useEffect(() => {
    // Simulate some loading time
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigate to Login after a delay
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Clear the timer if component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <ActivityIndicator size="large" color="#fff" style={styles.indicator} />
      <Text style={styles.subtitle}>Loading your weather experience...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db', // A nice blue background
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  indicator: {
    marginTop: 30,
  },
});
