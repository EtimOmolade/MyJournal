import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, ScrollView } from "react-native";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import ThemedTextInput from "../components/ThemedTextInput";
import { supabase } from "../lib/supabase";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function EditEntry() {
  const navigation = useNavigation();
  const route = useRoute();
  const { entry } = route.params; // entry = { id, content }

  const [content, setContent] = useState(entry.content);

  const updateEntry = async () => {
    if (!content.trim()) {
      Alert.alert("Error", "Entry cannot be empty");
      return;
    }

    const { error } = await supabase
      .from("journal_entries")
      .update({ content })
      .eq("id", entry.id);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Journal entry updated!");
      navigation.goBack();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <ThemedText style={styles.title}>Edit Journal Entry</ThemedText>

        <ThemedTextInput
          placeholder="Edit your thoughts here..."
          value={content}
          onChangeText={setContent}
          multiline
          style={{ height: 250, marginBottom: 20 }}
        />

        <ThemedText
          onPress={updateEntry}
          style={[styles.button, { backgroundColor: "#4B7BEC" }]}
        >
          Save Changes
        </ThemedText>
      </ScrollView>
    </ThemedView>
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
