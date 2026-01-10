import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.version}>v1.0.0</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 20,
  },
  version: {
    color: "#94A3B8",
    marginTop: 8,
  },
});
