import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../src/services/api';
import { useRouter } from 'expo-router';

export default function TimelineScreen() {
  const router = useRouter();
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks().catch(() => []),
  });

  const taskList = Array.isArray(tasks) ? tasks : [];
  const sorted = [...taskList].sort((a: any, b: any) => {
    const da = new Date(a?.dueDate || a?.dueAt || a?.createdAt || 0).getTime();
    const db = new Date(b?.dueDate || b?.dueAt || b?.createdAt || 0).getTime();
    return da - db;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Timeline</Text>
          <View style={styles.headerSpacer} /> 
      </View>

      <Text style={styles.subtitle}>
        Things coming up. You don’t need to remember.
      </Text>
      
      {isLoading ? (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : (
        <FlatList
            data={sorted}
            keyExtractor={(item: any) => String(item.id || item._id || item.title || Math.random())}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
            <View style={styles.card}>
                <Text style={styles.cardText}>
                  {item.title || item.text || item.name || 'Untitled task'}
                </Text>
            </View>
            )}
            ListEmptyComponent={
                <Text style={styles.emptyText}>Nothing upcoming.</Text>
            }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  backText: {
    color: "#3B82F6",
    fontSize: 18,
  },
  headerTitle: {
    color: "#F8FAFC",
    fontSize: 20,
    fontWeight: "700",
  },
  headerSpacer: {
    width: 40,
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardMeta: {
    color: "#94A3B8",
    fontSize: 12,
    marginBottom: 8,
  },
  cardText: {
    color: "#F8FAFC",
    fontSize: 14,
    lineHeight: 20,
  },
  emptyText: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 80,
  },
});
