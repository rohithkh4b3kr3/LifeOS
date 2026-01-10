import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../src/services/api';

export default function TodayScreen() {
  const router = useRouter();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks().catch(() => []),
  });

  const all = Array.isArray(tasks) ? tasks : [];
  const actionable = all.filter((t: any) => (t?.type ? t.type === 'task' : true));

  const priorityKey = (t: any) => {
    const p = (t?.priority || '').toString().toLowerCase();
    if (p.includes('high') || p === '1') return 'High';
    if (p.includes('low') || p === '3') return 'Low';
    return 'Normal';
  };

  const grouped: Record<string, any[]> = actionable.reduce((acc: any, t: any) => {
    const key = priorityKey(t);
    acc[key] = acc[key] || [];
    acc[key].push(t);
    return acc;
  }, {});

  const sections = ['High', 'Normal', 'Low']
    .filter((k) => (grouped[k] || []).length > 0)
    .map((k) => ({ title: k, data: grouped[k] }));

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Today</Text>

      {isLoading ? (
        <Text style={styles.body}>Loading…</Text>
      ) : (
        <FlatList
          data={sections}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{item.title}</Text>
              {item.data.map((t: any) => (
                <View key={String(t.id || t._id || t.title || Math.random())} style={styles.taskRow}>
                  <Text style={styles.taskText}>{t.title || t.text || t.name || 'Untitled task'}</Text>
                </View>
              ))}
            </View>
          )}
          ListEmptyComponent={<Text style={styles.body}>Nothing actionable today.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  backText: {
    color: "#3B82F6",
    fontSize: 18,
  },
  title: {
    color: "#F8FAFC",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  body: {
    color: "#94A3B8",
    lineHeight: 24,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 0.6,
  },
  taskRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  taskText: {
    color: "#F8FAFC",
    fontSize: 16,
  },
});
