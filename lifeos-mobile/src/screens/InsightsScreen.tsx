import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InsightsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Insights</Text>
            <Text style={styles.body}>
                After 7 days of dumps, LifeOS will reveal patterns in your thinking.
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    color: "#F8FAFC",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  body: {
    color: "#94A3B8",
    textAlign: "center",
  },
});
