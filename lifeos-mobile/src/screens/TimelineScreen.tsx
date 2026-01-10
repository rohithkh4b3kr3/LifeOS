import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getBrainDumps } from '../services/api';

export default function TimelineScreen() {
  const { data: dumps, isLoading, isError } = useQuery({
    queryKey: ['brainDumps'],
    queryFn: () => getBrainDumps(),
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Past Dumps</Text>

      <FlatList
        data={dumps}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.meta}>
              {new Date(item.createdAt).toLocaleDateString()} • {new Date(item.createdAt).toLocaleTimeString()}
            </Text>
            <Text style={styles.bodyText} numberOfLines={3}>
              {item.rawText}
            </Text>
            {item.processed && (
              <View style={styles.aiSection}>
                <Text style={styles.aiText}>
                  AI Summary: {item.aiSummary || "Processed"}
                </Text>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No brain dumps yet. Start today!</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  meta: {
    color: "#94A3B8",
    fontSize: 12,
    marginBottom: 8,
  },
  bodyText: {
    color: "#F8FAFC",
    fontSize: 14,
  },
  aiSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  aiText: {
    color: "#3B82F6",
    fontSize: 12,
    fontWeight: "500",
  },
  emptyText: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 40,
  },
});
