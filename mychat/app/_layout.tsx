import { Link, Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserProvider } from "@/hooks/context/UserContext";
import { useCameraPermissions } from "expo-camera";
import QRCodeGenerator from "./QRCodeGenerator";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    // <UserProvider>
    <ConvexProvider client={convex}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0d8ad7",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "My Chats",
            headerRight: () => (
              <Link href={"/(modal)/createGroup"} asChild>
                <TouchableOpacity>
                  <Ionicons name="add" size={32} color="white"></Ionicons>
                </TouchableOpacity>
              </Link>
            ),
            headerLeft: () => (
              <Link href={"/QRCodeScanner"} asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="qr-code-outline"
                    size={32}
                    color="white"
                  ></Ionicons>
                </TouchableOpacity>
              </Link>
            ),
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="(modal)/createGroup"
          options={{
            headerTitle: "Create a group Chat",
            presentation: "modal",
            headerLeft: () => (
              <Link href={"../"} asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="close-outline"
                    size={32}
                    color="white"
                  ></Ionicons>
                </TouchableOpacity>
              </Link>
            ),
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="(chat)/[chatid]"
          options={{
            headerTitle: "Create a group Chat",
            presentation: "card",
            headerRight: () => (
              <Link href={"/QRCodeGenerator"} asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="qr-code-outline"
                    size={25}
                    color="white"
                  ></Ionicons>
                </TouchableOpacity>
              </Link>
            ),
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="QRCodeGenerator"
          options={{ headerTitle: "Scan QR Code of the group" }}
        />
      </Stack>
    </ConvexProvider>
    // </UserProvider>
  );
}
