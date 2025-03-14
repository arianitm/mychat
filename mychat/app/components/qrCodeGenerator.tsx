import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useChatContext } from "@/hooks/context/chatContext";

const QRCodeGenerator = () => {
  const { chatId } = useChatContext();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Scan QR Code" });
  }, [navigation]);

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
