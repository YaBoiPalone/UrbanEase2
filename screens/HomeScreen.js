import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.appName}>UrbanEase</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ReportIssue")}>
        <Text style={styles.buttonText}>Report an Issue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ComplaintHistory")}>
        <Text style={styles.buttonText}>Complaint History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.buttonText}>Personal Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  welcomeText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "white",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
