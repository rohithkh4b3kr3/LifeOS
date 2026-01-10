import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBrainDump } from '../services/api';

export default function TodayScreen() {
  const [text, setText] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newText: string) => createBrainDump(newText),
    onSuccess: () => {
      setText('');
      queryClient.invalidateQueries({ queryKey: ['brainDumps'] });
      alert('Mind emptied. LifeOS is organizing it.');
    },
    onError: () => {
      alert('Failed to save. Try again.');
    },
  });

  const handleSubmit = () => {
    if (!text.trim()) return;
    mutation.mutate(text);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.inner}>
          <View>
            <Text style={styles.mutedText}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
            <Text style={styles.title}>
              Daily Brain Dump
            </Text>
          </View>

          <View style={styles.inputCard}>
            <TextInput
              style={[styles.textInput, { textAlignVertical: 'top' }]}
              placeholder="Unload your thoughts, worries, tasks, and ideas here..."
              placeholderTextColor="#64748B"
              multiline
              textAlignVertical="top"
              value={text}
              onChangeText={setText}
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, text.trim() ? styles.primaryButtonEnabled : styles.primaryButtonDisabled]}
            onPress={handleSubmit}
            disabled={!text.trim() || mutation.isPending}
          >
            {mutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryButtonText}>
                Dump Your Mind
              </Text>
            )}
          </TouchableOpacity>

          <Text style={styles.footerText}>
            LifeOS will auto-extract tasks & insights.
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 24,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    rowGap: 24,
  },
  mutedText: {
    color: "#94A3B8",
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 4,
  },
  title: {
    color: "#F8FAFC",
    fontSize: 30,
    fontWeight: "700",
  },
  inputCard: {
    flex: 1,
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  textInput: {
    flex: 1,
    color: "#F8FAFC",
    fontSize: 18,
    lineHeight: 26,
  },
  primaryButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonEnabled: {
    backgroundColor: "#3B82F6",
  },
  primaryButtonDisabled: {
    backgroundColor: "#334155",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 18,
  },
  footerText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 12,
  },
});
