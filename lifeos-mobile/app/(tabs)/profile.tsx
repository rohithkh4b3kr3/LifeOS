import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Preferences and notification behavior.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Priority behavior</Text>
        <Text style={styles.value}>Very Important: frequent and persistent</Text>
        <Text style={styles.value}>High: regular reminders</Text>
        <Text style={styles.value}>Moderate: gentle</Text>
        <Text style={styles.value}>Low: minimal</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#BDBDBD',
    fontSize: 14,
    marginTop: 6,
  },
  card: {
    backgroundColor: '#0A0A0A',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#141414',
    padding: 14,
  },
  label: {
    color: '#BDBDBD',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 6,
  },
});
