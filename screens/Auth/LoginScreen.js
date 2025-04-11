import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const handleLogin = async () => {
    const loggedInUser = await signIn(email, password);
    if (!loggedInUser) {
      Alert.alert("Login Failed", "Invalid credentials or user not found.");
      return;
    }

    if (loggedInUser.email === "admin@gmail.com") {
      Alert.alert("Success", "Admin Logged In");
      navigation.reset({ index: 0, routes: [{ name: "AdminDashboard" }] });
    } else {
      Alert.alert("Success", "User Logged In");
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "black", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        Login to UrbanEase
      </Text>
      <TextInput
        placeholder="Your Email"
        placeholderTextColor="gray"
        style={{ backgroundColor: "white", padding: 10, marginTop: 20 }}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Your Password"
        placeholderTextColor="gray"
        style={{ backgroundColor: "white", padding: 10, marginTop: 10 }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: "white", padding: 15, marginTop: 20 }}>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginTop: 10 }}>
        <Text style={{ color: "white", textAlign: "center" }}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
