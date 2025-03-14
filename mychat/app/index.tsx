import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Link } from "expo-router";
import Dialog from "react-native-dialog";
import { useChatContext } from "@/hooks/context/chatContext";

const Page = () => {
  const groups = useQuery(api.groups.get) || [];
  const { userName, setUserName } = useChatContext();
  const [visible, setVisible] = useState(!userName);

  useEffect(() => {
    if (!userName) setVisible(true);
  }, [userName]);

  const setUser = async () => {
    let randomTag = (Math.random() + 1).toString(36).substring(7);
    const newUserName = `${userName}#${randomTag}`;
    setUserName(newUserName);
    setVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {groups.map((group) => (
          <Link
            href={{
              pathname: "/(chat)/[chatid]",
              params: { chatid: group._id },
            }}
            key={group._id}
            asChild
          >
            <TouchableOpacity style={styles.group}>
              <Image
                source={{ uri: group.icon_url }}
                style={{ width: 50, height: 50 }}
              />
              <View style={{ flex: 1 }}>
                <Text>{group.name}</Text>
                <Text style={{ color: "#888" }}>{group.description}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>

      <Dialog.Container visible={visible}>
        <Dialog.Title>Username required</Dialog.Title>
        <Dialog.Description>
          Please insert a name to start chatting.
        </Dialog.Description>
        <Dialog.Input onChangeText={setUserName} />
        <Dialog.Button label="Set name" onPress={setUser} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#eaf2f8" },
  group: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
  },
});

export default Page;
