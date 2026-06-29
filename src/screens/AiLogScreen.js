import React, { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Camera, Send, Sparkles } from "lucide-react-native";
import { useAppContext } from "../context/AppContext";
import { processUserLogWithCodex } from "../services/aiService";

const initialMessages = [
  {
    id: "welcome",
    role: "assistant",
    text: 'Tell me what you ate, like "two eggs and oatmeal" or "chicken rice for lunch".'
  }
];

export default function AiLogScreen() {
  const scrollRef = useRef(null);
  const { addMealLog } = useAppContext();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const scrollToBottom = () => {
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  };

  const submitLog = async () => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) {
      return;
    }

    const userMessage = { id: `${Date.now()}-user`, role: "user", text: trimmed };
    setMessages((value) => [...value, userMessage]);
    setInput("");
    setIsThinking(true);
    scrollToBottom();

    try {
      const result = await processUserLogWithCodex(trimmed);
      addMealLog(result);

      const itemNames = result.analyzed_meal.identified_items.map((item) => item.name).join(", ");
      const responseText = `${itemNames}: ${result.analyzed_meal.total_meal_calories} kcal logged. ${result.coach_feedback}`;

      setMessages((value) => [
        ...value,
        { id: `${Date.now()}-assistant`, role: "assistant", text: responseText }
      ]);
      Alert.alert("Coach feedback", result.coach_feedback);
    } catch (error) {
      setMessages((value) => [
        ...value,
        {
          id: `${Date.now()}-error`,
          role: "assistant",
          text: "I could not analyze that entry. Please try a simpler meal description."
        }
      ]);
    } finally {
      setIsThinking(false);
      scrollToBottom();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={10}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Codex nutrition brain</Text>
          <Text style={styles.title}>AI Log</Text>
        </View>
        <View style={styles.headerIcon}>
          <Sparkles size={22} color="#10A37F" />
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.chatList}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={scrollToBottom}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[styles.bubble, message.role === "user" ? styles.userBubble : styles.assistantBubble]}
          >
            <Text style={[styles.bubbleText, message.role === "user" && styles.userBubbleText]}>
              {message.text}
            </Text>
          </View>
        ))}

        {isThinking ? (
          <View style={[styles.bubble, styles.assistantBubble, styles.thinkingBubble]}>
            <Text style={styles.thinkingText}>AI is thinking...</Text>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.inputBar}>
        <TouchableOpacity activeOpacity={0.8} style={styles.cameraButton}>
          <Camera size={22} color="#123C35" />
        </TouchableOpacity>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Log a meal or snack"
          placeholderTextColor="#8AA198"
          style={styles.input}
          multiline
          maxLength={180}
        />
        <TouchableOpacity activeOpacity={0.85} style={styles.sendButton} onPress={submitLog}>
          <Send size={19} color="#FFFFFF" />
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F8F5"
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  eyebrow: {
    color: "#10A37F",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  title: {
    marginTop: 2,
    fontSize: 34,
    lineHeight: 40,
    color: "#113A33",
    fontWeight: "900"
  },
  headerIcon: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#E4F6EF"
  },
  chatList: {
    flex: 1
  },
  chatContent: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    gap: 10
  },
  bubble: {
    maxWidth: "82%",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#10A37F"
  },
  assistantBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    shadowColor: "#173A33",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3
  },
  bubbleText: {
    color: "#173D36",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "700"
  },
  userBubbleText: {
    color: "#FFFFFF"
  },
  thinkingBubble: {
    backgroundColor: "#EAF5F0"
  },
  thinkingText: {
    color: "#5A756C",
    fontSize: 14,
    fontWeight: "800"
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    marginHorizontal: 14,
    marginBottom: 86,
    padding: 10,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    shadowColor: "#143D36",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 22,
    elevation: 10
  },
  cameraButton: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "#EAF5F0"
  },
  input: {
    flex: 1,
    maxHeight: 94,
    minHeight: 46,
    paddingTop: 12,
    paddingHorizontal: 4,
    color: "#123C35",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700"
  },
  sendButton: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: "#10A37F"
  },
  sendText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900"
  }
});
