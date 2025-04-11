import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext"; // Make sure this path is correct

const ProfileScreen = () => {
  const { user, role, signOut } = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>User not logged in.</Text>
      </View>
    );
  }

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <Text style={styles.text}>User ID: {user?.id}</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
      <Text style={styles.text}>Role: {role}</Text>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  logoutText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileScreen;
