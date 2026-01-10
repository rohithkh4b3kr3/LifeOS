import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RemindersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reminders</Text>
        <Text style={styles.subtitle}>Scheduled nudges, recurring included.</Text>
      </View>

      <FlatList
        data={[]}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={() => null}
        ListEmptyComponent={<Text style={styles.emptyText}>No reminders yet.</Text>}
        contentContainerStyle={styles.list}
      />
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
  list: {
    paddingBottom: 24,
  },
  emptyText: {
    color: '#8A8A8A',
  },
});
