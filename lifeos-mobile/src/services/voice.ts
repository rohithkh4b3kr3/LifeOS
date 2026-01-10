import { Platform } from "react-native";

export async function startSpeechToText() {
  if (Platform.OS === "web") {
    return "";
  }

  try {
    // Try native module first (if available)
    const { NativeModules } = require("react-native");
    if (NativeModules.VoiceModule) {
      return await NativeModules.VoiceModule.startListening();
    }
  } catch (err) {
    // Fallback to package-based voice
  }

  // Fallback to @react-native-voice/voice package
  try {
    const Voice = require("@react-native-voice/voice").default;

    return new Promise((resolve, reject) => {
      let finalText = "";
      let resolved = false;

      const cleanup = () => {
        Voice.removeAllListeners();
      };

      Voice.onSpeechResults = (e: any) => {
        finalText = e.value?.[0] || "";
      };

      Voice.onSpeechEnd = async () => {
        if (!resolved) {
          resolved = true;
          await Voice.stop();
          cleanup();
          resolve(finalText);
        }
      };

      Voice.onSpeechError = (e: any) => {
        if (!resolved) {
          resolved = true;
          cleanup();
          reject(new Error(e.error?.message || "Speech recognition failed"));
        }
      };

      Voice.start("en-US").catch((err: any) => {
        if (!resolved) {
          resolved = true;
          cleanup();
          reject(err);
        }
      });
    });
  } catch (err) {
    throw new Error("Voice recognition not available");
  }
}
