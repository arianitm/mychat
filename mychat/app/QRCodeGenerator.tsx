import React, { useEffect, useState } from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QRCodeGenerator = ({ id }: { id: string }) => {
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    const loadChatId = async () => {
      const id = await AsyncStorage.getItem("currentChatId");
      setChatId(id);
    };
    loadChatId();
  }, []);

  return (
    <View style={styles.container}>
      {chatId ? <QRCode value={chatId} size={200} /> : ""}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default QRCodeGenerator;
