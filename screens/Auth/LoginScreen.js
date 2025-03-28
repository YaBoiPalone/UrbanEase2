import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import supabase from "../../services/supabase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert("Login Failed", error.message);
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
