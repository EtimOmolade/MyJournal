import React, { useState } from "react";
import { Alert, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import ThemedTextInput from "../components/ThemedTextInput";
import { useTheme } from "../contexts/ThemeContext";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";

export default function NewEntry() {
  const [entry, setEntry] = useState("");
  const [title, setTitle] = useState("");

  const { theme } = useTheme();
  const navigation = useNavigation();

  const saveEntry = async () => {
    if (!entry.trim()) {
      Alert.alert("Error", "Entry cannot be empty");
      return;
    }

    const { error } = await supabase
      .from("journal_entries")
      .insert([{ content: entry }]);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Journal entry saved!");
      setEntry("");
      navigation.navigate("AllEntries");
    }
  };

  return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ThemedView style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <ThemedText style={styles.title}>New Journal Entry</ThemedText>


 <ThemedTextInput
          placeholder="Title"
          value={entry}
          onChangeText={setTitle}
          multiline
          style={{ height: 250, marginBottom: 20 }}
        />


        <ThemedTextInput
          placeholder="Write your thoughts here..."
          value={entry}
          onChangeText={setEntry}
          multiline
          style={{ height: 250, marginBottom: 20 }}
        />

        <ThemedText
          onPress={saveEntry}
          style={[styles.button, { backgroundColor: "#4B7BEC" }]}
        >
          Save Entry
        </ThemedText>


        
      </ScrollView>
    </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20 },
  button: {
    padding: 15,
    borderRadius: 12,
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
