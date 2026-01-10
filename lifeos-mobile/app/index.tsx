import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(tabs)/chat" />;
}

// export default function ChatScreen() {
//   const [text, setText] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [listening, setListening] = useState(false);
//   const setParsedOutput = useBrainDumpStore((s) => s.setParsedOutput);
//   const clearParsedOutput = useBrainDumpStore((s) => s.clearParsedOutput);

//   const handleVoice = async () => {
//     try {
//       setListening(true);
//       const spoken = await startSpeechToText();
//       if (spoken && spoken.trim()) setText(spoken);
//     } catch (err: any) {
//       const msg = err?.message || 'Could not hear clearly. Try typing instead.';
//       Alert.alert('Voice error', msg);
//     } finally {
//       setListening(false);
//     }
//   };

//   const handleOrganize = async () => {
//     if (!text.trim()) {
//       Alert.alert('Say something', "What’s on your mind today?");
//       return;
//     }

//     setLoading(true);
//     try {
//       const parseData: any = await parseMemory(text);

//       const output = {
//         tasks: Array.isArray(parseData?.tasks) ? parseData.tasks : [],
//         habits: Array.isArray(parseData?.habits) ? parseData.habits : [],
//         goals: Array.isArray(parseData?.goals) ? parseData.goals : [],
//       };
//       setParsedOutput(output);

//       if (output.tasks.length === 0 && output.habits.length === 0 && output.goals.length === 0) {
//         Alert.alert('Nothing to organize', 'Try adding more details');
//         return;
//       }

//       if (output.tasks.length === 0) {
//         Alert.alert("I’ve organized this for you");
//         setText('');
//         clearParsedOutput();
//         return;
//       }

//       Alert.alert(
//         'Ready to save?',
//         `${output.tasks.length} task${output.tasks.length === 1 ? '' : 's'} found. Save them now?`,
//         [
//           { text: 'Not now', style: 'cancel' },
//           {
//             text: 'Save',
//             onPress: async () => {
//               setLoading(true);
//               try {
//                 await bulkCreateTasks(output.tasks);
//                 Alert.alert("I’ve organized this for you");
//                 setText('');
//               } catch (err: any) {
//                 const msg = err?.message || 'Could not save tasks right now';
//                 Alert.alert('Error', msg);
//               } finally {
//                 clearParsedOutput();
//                 setLoading(false);
//               }
//             },
//           },
//         ]
//       );
//     } catch (err: any) {
//       const msg = err?.message || 'Could not organize this right now';
//       Alert.alert('Error', msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <SafeAreaView style={styles.container}>
        
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.title}>
//             LifeOS
//           </Text>
//           <Text style={styles.prompt}>
//             What’s on your mind today?
//           </Text>
//         </View>

//         {/* Input Area */}
//         <View style={styles.inputCard}>
//             <TextInput 
//                 style={[styles.textInput, { textAlignVertical: 'top' }]}
//                 placeholder="What’s on your mind today?" 
//                 placeholderTextColor="#64748B"
//                 multiline
//                 textAlignVertical="top"
//                 value={text}
//                 onChangeText={setText}
//             />
//         </View>

//         {/* Footer Actions */}
//         <View>
//             <TouchableOpacity 
//                 style={[styles.secondaryButton, listening && styles.disabledButton]}
//                 onPress={handleVoice}
//                 disabled={listening || loading}
//                 activeOpacity={0.8}
//             >
//                 <Text style={styles.secondaryButtonText}>
//                     {listening ? 'Listening…' : 'Speak'}
//                 </Text>
//             </TouchableOpacity>

//             <TouchableOpacity 
//                 style={[styles.primaryButton, text.trim() ? styles.primaryButtonEnabled : styles.primaryButtonDisabled]}
//                 onPress={handleOrganize}
//                 disabled={!text.trim() || loading}
//                 activeOpacity={0.8}
//             >
//               {loading ? (
//                   <ActivityIndicator color="#fff" />
//               ) : (
//                   <Text style={styles.primaryButtonText}>
//                       Organize my life
//                   </Text>
//               )}
//             </TouchableOpacity>
//         </View>

//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0F172A",
//     padding: 24,
//     justifyContent: "space-between",
//   },
//   header: {
//     marginTop: 16,
//   },
//   title: {
//     color: "#F8FAFC",
//     fontSize: 30,
//     fontWeight: "700",
//     marginTop: 4,
//   },
//   prompt: {
//     color: "#94A3B8",
//     fontSize: 16,
//     marginTop: 8,
//   },
//   inputCard: {
//     flex: 1,
//     marginVertical: 24,
//     backgroundColor: "#1E293B",
//     borderRadius: 16,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: "#334155",
//   },
//   textInput: {
//     flex: 1,
//     color: "#F8FAFC",
//     fontSize: 18,
//     lineHeight: 26,
//   },
//   primaryButton: {
//     width: "100%",
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   primaryButtonEnabled: {
//     backgroundColor: "#3B82F6",
//   },
//   primaryButtonDisabled: {
//     backgroundColor: "#334155",
//   },
//   primaryButtonText: {
//     color: "#FFFFFF",
//     fontWeight: "700",
//     fontSize: 18,
//   },
//   secondaryButton: {
//     width: "100%",
//     paddingVertical: 14,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#334155",
//     marginBottom: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "transparent",
//   },
//   secondaryButtonText: {
//     color: "#CBD5E1",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
// });
