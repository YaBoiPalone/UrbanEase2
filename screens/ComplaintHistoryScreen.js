import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const complaints = [
  {
    id: "1",
    type: "Pothole",
    status: "Pending",
    date: "2025-01-10",
    locality: "Downtown",
    department: "Public Works",
    progress: 10, // In percentage
  },
  {
    id: "2",
    type: "Garbage",
    status: "In Progress",
    date: "2025-01-12",
    locality: "Uptown",
    department: "Sanitation",
    progress: 50,
  },
  {
    id: "3",
    type: "Vandalism",
    status: "Resolved",
    date: "2025-01-15",
    locality: "West End",
    department: "Public Safety",
    progress: 100,
  },
];

const ComplaintHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complaint History</Text>

      <FlatList
        data={complaints}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.type}</Text>
            <Text style={styles.text}>Status: {item.status}</Text>
            <Text style={styles.text}>Submission Date: {item.date}</Text>
            <Text style={styles.text}>Locality: {item.locality}</Text>
            <Text style={styles.text}>Assigned Department: {item.department}</Text>

            <View style={styles.progressBarContainer}>
              <View
                style={[styles.progressBar, { width: `${item.progress}%`, backgroundColor: "#888" }]}
              />
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Details (Generate PDF)</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 14,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#555",
    borderRadius: 3,
    marginVertical: 8,
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ComplaintHistoryScreen;
