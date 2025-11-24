import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, RefreshControl, TouchableOpacity, Alert, View } from "react-native";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";

export default function AllEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) alert("Error fetching entries");
    else setEntries(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const deleteEntry = async (id) => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("journal_entries")
              .delete()
              .eq("id", id);
            if (error) alert("Error deleting entry");
            else fetchEntries();
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <ThemedView style={styles.entryContainer}>
      <ThemedText style={styles.date}>
        {new Date(item.created_at).toDateString()}
      </ThemedText>
      <ThemedText style={styles.content}>{item.content}</ThemedText>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#4B7BEC" }]}
          onPress={() => navigation.navigate("EditEntry", { entry: item })}
        >
          <ThemedText style={styles.buttonText}>Edit</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#ff3b30" }]}
          onPress={() => deleteEntry(item.id)}
        >
          <ThemedText style={styles.buttonText}>Delete</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>My Journal Entries</ThemedText>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchEntries} />
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20 },
  entryContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
  },
  date: { fontSize: 14, opacity: 0.7, marginBottom: 8 },
  content: { fontSize: 16, lineHeight: 22, marginBottom: 10 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  actionButton: {
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "600" },
});
