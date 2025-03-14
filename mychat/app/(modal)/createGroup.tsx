import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const CreateGroup = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [errors, setErrors] = useState<{ name: string }>({
    name: "",
  });

  const router = useRouter();
  const startGroup = useMutation(api.groups.createGroup);

  const validateForm = () => {
    const newErrors = { name: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onCreateGroup = async () => {
    if (!validateForm()) return;

    await startGroup({ name, description: desc, icon_url: icon });
    router.back();
  };

  const handleNameChange = (text: string) => {
    setName(text);
    if (text.trim()) setErrors((prev) => ({ ...prev, name: "" }));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        accessibilityLabel="Name"
        style={[styles.textInput, errors.name && styles.errorInput]}
        value={name}
        onChangeText={handleNameChange}
      />

      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>Description(Optional)</Text>
      <TextInput
        accessibilityLabel="Description(Optional)"
        style={styles.textInput}
        value={desc}
        onChangeText={setDesc}
      />

      <Text style={styles.label}>Icon (Optional)</Text>
      <TextInput
        accessibilityLabel="Icon (Optional)"
        style={styles.textInput}
        value={icon}
        onChangeText={setIcon}
      />

      <TouchableOpacity style={styles.button} onPress={onCreateGroup}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf2f8",
    padding: 10,
  },
  label: {
    marginVertical: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#d4d4d4",
    borderRadius: 5,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: "#fff",
  },
  errorInput: {
    borderColor: "#ff4d4d",
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#0d8ad7",
    borderRadius: 5,
    padding: 12,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateGroup;
