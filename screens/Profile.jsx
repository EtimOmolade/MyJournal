import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ThemedText from "../components/ThemedText";
import ThemedView from "../components/ThemedView";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";

export default function ProfileDashboard() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();

  const [entries, setEntries] = useState([]);
  const [streak, setStreak] = useState(0);
  const [lastEntryDate, setLastEntryDate] = useState("");
  const [quote, setQuote] = useState("");
  const [today, setToday] = useState("");

  const quotes = [
    "Write what your heart whispers.",
    "Your story matters — keep writing.",
    "One entry a day keeps your mind clear.",
    "Small words create big healing.",
    "Let your thoughts flow freely today.",
  ];

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setToday(new Date().toDateString());
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setEntries(data);
      if (data.length > 0) {
        setLastEntryDate(new Date(data[0].created_at).toDateString());
        setStreak(Math.min(data.length, 30)); // placeholder streak calculation
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={[theme.background, theme.inputBackground]}
        style={{ flex: 1 }}
      >
        <ThemedView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Profile Info */}
            <View style={[styles.profileCard, { backgroundColor: theme.uiBackground }]}>
              <View style={styles.avatarPlaceholder}>
                <ThemedText style={{ fontSize: 28, color: theme.text }}>
                  {user?.email[0].toUpperCase()}
                </ThemedText>
              </View>
              <ThemedText style={[styles.profileName, { color: theme.text }]}>
                {user?.email}
              </ThemedText>
              <TouchableOpacity
                style={[styles.editButton, { backgroundColor: theme.primary }]}
              >
                <ThemedText style={styles.editButtonText}>Edit Profile</ThemedText>
              </TouchableOpacity>
            </View>

            {/* Stats */}
            <View style={[styles.statsCard, { backgroundColor: theme.uiBackground }]}>
              <ThemedText style={styles.statsTitle}>Your Stats</ThemedText>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statNumber}>{entries.length}</ThemedText>
                  <ThemedText style={styles.statLabel}>Entries</ThemedText>
                </View>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statNumber}>{streak}</ThemedText>
                  <ThemedText style={styles.statLabel}>Day Streak</ThemedText>
                </View>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statNumber}>{lastEntryDate || "-"}</ThemedText>
                  <ThemedText style={styles.statLabel}>Last Entry</ThemedText>
                </View>
              </View>
            </View>

            {/* Daily Quote */}
            <View style={[styles.card, { backgroundColor: theme.uiBackground }]}>
              <ThemedText style={styles.quoteLarge}>"{quote}"</ThemedText>
              <ThemedText style={styles.date}>{today}</ThemedText>
            </View>

            {/* Recent Entries */}
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Recent Entries</ThemedText>
              <TouchableOpacity onPress={() => navigation.navigate("AllEntries")}>
                <ThemedText style={{ color: theme.primary }}>See All</ThemedText>
              </TouchableOpacity>
            </View>

            {entries.length ? (
              <FlatList
                data={entries.slice(0, 5)}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("EditEntry", { entry: item })}
                    style={[styles.entryCard, { backgroundColor: theme.uiBackground }]}
                  >
                    <ThemedText style={styles.entryDate}>
                      {new Date(item.created_at).toDateString()}
                    </ThemedText>
                    <ThemedText style={styles.entryContent}>
                      {item.content.substring(0, 100)}...
                    </ThemedText>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <ThemedText style={{ textAlign: "center", marginTop: 10 }}>
                No entries yet
              </ThemedText>
            )}

            {/* New Entry Button */}
            <TouchableOpacity
              style={[styles.newEntryButton, { backgroundColor: theme.primary }]}
              onPress={() => navigation.navigate("NewEntry")}
            >
              <ThemedText style={styles.buttonText}>Write New Entry</ThemedText>
            </TouchableOpacity>

            {/* Theme Toggle */}
            <View style={[styles.themeCard, { backgroundColor: theme.uiBackground }]}>
              <ThemedText style={styles.statsTitle}>Theme</ThemedText>
              <View style={styles.themeRow}>
                <ThemedText style={{ color: theme.text }}>Dark Mode</ThemedText>
                <Switch
                  value={theme.background === "#000000"}
                  onValueChange={toggleTheme}
                  trackColor={{ false: "#ccc", true: theme.primary }}
                  thumbColor="#fff"
                />
              </View>
            </View>
          </ScrollView>
        </ThemedView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  profileCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#999",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  profileName: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  editButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, marginTop: 10 },
  editButtonText: { color: "#fff", fontWeight: "600" },

  statsCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  statsTitle: { fontSize: 18, fontWeight: "600", marginBottom: 15 },
  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  statItem: { alignItems: "center" },
  statNumber: { fontSize: 20, fontWeight: "bold" },
  statLabel: { fontSize: 14, opacity: 0.7 },

  card: { borderRadius: 12, padding: 20, marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 3 }, shadowRadius: 6, elevation: 3 },
  quoteLarge: { fontSize: 18, fontStyle: "italic", textAlign: "center", marginBottom: 10 },
  date: { fontSize: 14, opacity: 0.7, textAlign: "center" },

  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "600" },

  entryCard: {
    width: 220,
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  entryDate: { fontSize: 12, opacity: 0.7, marginBottom: 5 },
  entryContent: { fontSize: 14, lineHeight: 20 },

  newEntryButton: { padding: 15, borderRadius: 12, alignItems: "center", marginBottom: 20 },
  buttonText: { color: "white", fontWeight: "600", fontSize: 16 },

  themeCard: { borderRadius: 12, padding: 20, marginBottom: 40, shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 3 }, shadowRadius: 6, elevation: 3 },
  themeRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
});
