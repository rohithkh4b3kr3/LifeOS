import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
        <Text style={styles.subtitle}>A calm view of what’s coming up.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.emptyText}>Monthly + daily view coming next.</Text>
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
  emptyText: {
    color: '#8A8A8A',
  },
});
