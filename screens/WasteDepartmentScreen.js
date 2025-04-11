import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // For the back arrow

const complaints = [
  { id: "1", title: "Complaint 1", date: "06 March 2025", time: "10:00AM", severity: "Mild" },
  { id: "2", title: "Complaint 2", date: "06 March 2025", time: "11:00AM", severity: "Moderate" },
  { id: "3", title: "Complaint 3", date: "06 March 2025", time: "12:00PM", severity: "Severe" },
];

const WasteDepartmentScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.complaintCard}>
      <View style={styles.complaintInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>{`${item.date} • ${item.time} • ${item.severity}`}</Text>
      </View>
      <TouchableOpacity style={styles.statusButton}>
        <Text style={styles.statusText}>OPEN</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.header}>Waste Department</Text>

      {/* Complaint List */}
      <FlatList
        data={complaints}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff", // White text
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    marginTop: 40, // Pushes list down for better spacing
  },
  complaintCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#222", // Dark gray card
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  complaintInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // White text
  },
  details: {
    fontSize: 14,
    color: "#bbb", // Light gray text
  },
  statusButton: {
    backgroundColor: "#444", // Darker gray button
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff", // White text
  },
});

export default WasteDepartmentScreen;
