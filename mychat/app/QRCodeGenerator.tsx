import React from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { StyleSheet } from "react-native";

const QRCodeGenerator = ({ id }: { id: string }) => {
  return (
    <View style={styles.container}>
      <QRCode value={id} size={200} />
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
