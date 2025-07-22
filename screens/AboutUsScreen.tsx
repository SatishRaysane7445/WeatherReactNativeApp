// screens/AboutUsScreen.tsx

import { StyleSheet, Text, View } from 'react-native';
import React, { JSX } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export default function AboutUsScreen(): JSX.Element {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>About Me</Text>
        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>
            🚀{' '}
            <Text style={styles.highlightText}>
              Full-Stack Developer | React Native Expert
            </Text>
          </Text>
          <Text style={styles.bioParagraph}>
            I'm a passionate technologist with 3+ years of experience building
            high-impact mobile and web applications using React Native,
            React.js, and Node.js. I lead and collaborate on custom software
            solutions that are user-centric, scalable, and performance-driven.
          </Text>
          <Text style={styles.bioParagraph}>
            💼 My work spans product development, UI/UX design, scalable backend
            architecture, and seamless integrations (Firebase, Google Sign-In).
          </Text>
          <Text style={styles.skillsTitle}>🎯 Key Skills:</Text>
          <Text style={styles.skillItem}>
            • Mobile App Development (React Native, Firebase)
          </Text>
          <Text style={styles.skillItem}>
            • Web Development (React.js, Node.js)
          </Text>
          <Text style={styles.skillItem}>• UI/UX and Component Libraries</Text>
          <Text style={styles.skillItem}>
            • Team Leadership, Client Communication, and Agile Development
          </Text>
          <Text style={styles.bioParagraph}>
            🌱 Currently expanding my expertise into{' '}
            <Text style={styles.highlightText}>iOS (Swift/Xcode)</Text> and{' '}
            <Text style={styles.highlightText}>backend engineering</Text>.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f7ff', // Light blue background
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 50,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bioContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 25,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    width: '100%',
    maxWidth: 500, // Limit width for better readability on larger screens
  },
  bioText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    color: '#555',
    lineHeight: 26,
  },
  bioParagraph: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
    color: '#666',
    lineHeight: 24,
  },
  skillsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#333',
  },
  skillItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
    marginLeft: 10, // Indent list items
  },
  highlightText: {
    fontWeight: 'bold',
    color: '#007bff', // A contrasting color for emphasis
  },
});
