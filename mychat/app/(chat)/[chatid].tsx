import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Keyboard,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useConvex, useMutation, useQuery } from "convex/react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useChatContext } from "@/hooks/context/chatContext";

const ChatPage = () => {
  const { chatid } = useLocalSearchParams();
  const { userName, setChatId } = useChatContext();
  const [newMessage, setNewMessage] = useState("");
  const listRef = useRef<FlatList>(null);
  const convex = useConvex();
  const navigation = useNavigation();

  const addMessage = useMutation(api.messages.sendMessage);
  const messages =
    useQuery(api.messages.get, { chatid: chatid as Id<"groups"> }) || [];

  useEffect(() => {
    const loadGroup = async () => {
      const groupInfo = await convex.query(api.groups.getGroup, {
        id: chatid as Id<"groups">,
      });
      setChatId(chatid as string);
      navigation.setOptions({ headerTitle: groupInfo?.name });
    };
    loadGroup();
  }, [chatid, convex, navigation, setChatId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    addMessage({
      group_id: chatid as Id<"groups">,
      content: newMessage.trim(),
      user: userName || "AM",
    });
    setNewMessage("");
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
      }
    );
    return () => keyboardDidShowListener.remove();
  }, []);

  const renderMessage = useCallback(
    ({ item }: { item: Doc<"messages"> }) => {
      const isUserMessage = item.user === userName;
      return (
        <View
          style={[
            styles.messageContainer,
            isUserMessage
              ? styles.userMessageContainer
              : styles.otherMessageContainer,
          ]}
        >
          {item.content && (
            <Text
              style={[
                styles.messageText,
                isUserMessage && styles.userMessageText,
              ]}
            >
              {item.content}
            </Text>
          )}
          <Text style={styles.timestamp}>
            {new Date(item._creationTime).toLocaleTimeString()} - {item.user}
          </Text>
        </View>
      );
    },
    [userName]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 70}
      >
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id.toString()}
          ListFooterComponent={<View style={styles.footer} />}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
          keyboardShouldPersistTaps="handled"
        />
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              placeholder="Type a message..."
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Ionicons name="send-outline" style={styles.sendButtonText} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#eaf2f8" },
  footer: { padding: 5 },
  inputContainer: {
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputWrapper: { flexDirection: "row", alignItems: "center" },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d4d4d4",
    borderRadius: 5,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  sendButton: {
    backgroundColor: "#0d8ad7",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  sendButtonText: { color: "white", fontSize: 16 },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    maxWidth: "80%",
  },
  userMessageContainer: { backgroundColor: "#046aa9", alignSelf: "flex-end" },
  otherMessageContainer: { alignSelf: "flex-start", backgroundColor: "#fff" },
  messageText: { fontSize: 16, flexWrap: "wrap" },
  userMessageText: { color: "#fff" },
  timestamp: { fontSize: 12, color: "#c7c7c7" },
});

export default ChatPage;
