import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { startSpeechToText } from "../services/voice";
import { apiFetch } from "../services/api";

export default function ChatScreen() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) {
      Alert.alert("Say something", "What's on your mind today?");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Parse the memory
      const parseData = await apiFetch("/api/ai/memory", {
        method: "POST",
        body: JSON.stringify({ text: input }),
      });

      if (!parseData.tasks || parseData.tasks.length === 0) {
        Alert.alert("Nothing to organize", "Try adding more details");
        setLoading(false);
        return;
      }

      // Step 2: Bulk create tasks (user confirmed by pressing button)
      await apiFetch("/api/tasks/bulk-create", {
        method: "POST",
        body: JSON.stringify({ tasks: parseData.tasks }),
      });

      Alert.alert(
        "I've organized this for you",
        `${parseData.tasks.length} things sorted`
      );

      setInput("");
    } catch (err: any) {
      console.error("ChatScreen error:", err);
      const errorMessage = err?.message || "Could not organize this right now";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVoice = async () => {
    try {
      setListening(true);
      const text = await startSpeechToText();

      if (text && text.trim()) {
        setInput(text);
      }
    } catch (err: any) {
      console.error("Voice error:", err);
      const errorMessage = err?.message || "Could not hear clearly. Try typing instead.";
      Alert.alert("Voice error", errorMessage);
    } finally {
      setListening(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>LifeOS</Text>

        <TextInput
          style={styles.input}
          placeholder="What’s on your mind today?"
          placeholderTextColor="#999"
          multiline
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity
          style={styles.voiceButton}
          onPress={handleVoice}
          disabled={listening}
        >
          <Text style={styles.voiceText}>
            {listening ? "Listening…" : "Speak"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sendButton, loading && styles.disabled]}
          onPress={handleSend}
          disabled={loading}
        >
          <Text style={styles.sendText}>
            {loading ? "Organizing…" : "Organize my life"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  heading: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 24,
    color: "#111",
  },
  input: {
    fontSize: 18,
    lineHeight: 26,
    minHeight: 160,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    color: "#111",
  },
  voiceButton: {
    paddingVertical: 14,
    marginBottom: 12,
  },
  voiceText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  sendButton: {
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 12,
  },
  disabled: {
    opacity: 0.6,
  },
  sendText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
