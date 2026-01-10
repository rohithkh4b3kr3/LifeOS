import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SECTIONS = ['Very Important', 'High', 'Moderate', 'Low'] as const;

export default function TasksScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <Text style={styles.subtitle}>Everything you asked me to remember.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {SECTIONS.map((s) => (
          <View key={s} style={styles.section}>
            <Text style={styles.sectionTitle}>{s}</Text>
            <View style={styles.card}>
              <Text style={styles.emptyText}>No tasks yet.</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
  content: {
    paddingBottom: 24,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    color: '#BDBDBD',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 10,
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
