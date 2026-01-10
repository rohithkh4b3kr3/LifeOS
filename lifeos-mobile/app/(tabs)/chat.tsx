import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { startSpeechToText } from '../../src/services/voice';
import { bulkCreateTasks, parseMemory } from '../../src/services/api';
import { useBrainDumpStore } from '../../store/brainDumpStore';

export default function ChatScreen() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const setParsedOutput = useBrainDumpStore((s) => s.setParsedOutput);
  const clearParsedOutput = useBrainDumpStore((s) => s.clearParsedOutput);

  const handleVoice = async () => {
    try {
      setListening(true);
      const spoken = await startSpeechToText();
      if (spoken && spoken.trim()) setText(spoken);
    } catch (err: any) {
      const msg = err?.message || 'Could not hear clearly. Try typing instead.';
      Alert.alert('Voice error', msg);
    } finally {
      setListening(false);
    }
  };

  const handleOrganize = async () => {
    if (!text.trim()) {
      Alert.alert('Say something', 'What’s on your mind today?');
      return;
    }

    setLoading(true);
    try {
      const parseData: any = await parseMemory(text);

      const output = {
        tasks: Array.isArray(parseData?.tasks) ? parseData.tasks : [],
        habits: Array.isArray(parseData?.habits) ? parseData.habits : [],
        goals: Array.isArray(parseData?.goals) ? parseData.goals : [],
      };

      setParsedOutput(output);

      if (output.tasks.length === 0 && output.habits.length === 0 && output.goals.length === 0) {
        Alert.alert('Nothing to organize', 'Try adding more details');
        return;
      }

      if (output.tasks.length === 0) {
        Alert.alert('Saved', 'No tasks found.');
        setText('');
        clearParsedOutput();
        return;
      }

      Alert.alert(
        'Ready to save?',
        `${output.tasks.length} task${output.tasks.length === 1 ? '' : 's'} found. Save them now?`,
        [
          { text: 'Not now', style: 'cancel' },
          {
            text: 'Save',
            onPress: async () => {
              setLoading(true);
              try {
                await bulkCreateTasks(output.tasks);
                Alert.alert('Saved');
                setText('');
              } catch (err: any) {
                const msg = err?.message || 'Could not save tasks right now';
                Alert.alert('Error', msg);
              } finally {
                clearParsedOutput();
                setLoading(false);
              }
            },
          },
        ]
      );
    } catch (err: any) {
      const msg = err?.message || 'Could not organize this right now';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>LifeOS</Text>
          <Text style={styles.prompt}>What’s on your mind today?</Text>
        </View>

        <View style={styles.inputCard}>
          <TextInput
            style={[styles.textInput, { textAlignVertical: 'top' }]}
            placeholder="What’s on your mind today?"
            placeholderTextColor="#777777"
            multiline
            textAlignVertical="top"
            value={text}
            onChangeText={setText}
          />
        </View>

        <View>
          <TouchableOpacity
            style={[styles.secondaryButton, (listening || loading) && styles.disabledButton]}
            onPress={handleVoice}
            disabled={listening || loading}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>{listening ? 'Listening…' : 'Speak'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.primaryButton, text.trim() ? styles.primaryButtonEnabled : styles.primaryButtonDisabled]}
            onPress={handleOrganize}
            disabled={!text.trim() || loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text style={styles.primaryButtonText}>Organize my life</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  prompt: {
    color: '#BDBDBD',
    fontSize: 16,
    marginTop: 6,
    lineHeight: 22,
  },
  inputCard: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#141414',
    marginBottom: 18,
  },
  textInput: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  primaryButtonEnabled: {
    backgroundColor: '#FFFFFF',
  },
  primaryButtonDisabled: {
    backgroundColor: '#202020',
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
