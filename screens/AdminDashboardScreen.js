import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const AdminDashboardScreen = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth(); // Get signOut from context

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CleaningDepartment")}
      >
        <Text style={styles.buttonText}>Cleaning Department</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RoadsDepartment")}
      >
        <Text style={styles.buttonText}>Roads Department</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("WasteDepartment")}
      >
        <Text style={styles.buttonText}>Waste Department</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={signOut}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  button: {
    width: "80%",
    paddingVertical: 15,
    backgroundColor: "#444",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: "#d9534f", // Red-ish color for logout
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AdminDashboardScreen;
