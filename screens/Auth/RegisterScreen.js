import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import supabase from "../../services/supabase";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert("Registration Failed", error.message);
    } else {
      Alert.alert("Success", "Check your email to confirm your account.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "black", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        UrbanEase Signup
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
      <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: "white", padding: 15, marginTop: 20 }}>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginTop: 10 }}>
        <Text style={{ color: "white", textAlign: "center" }}>Already registered? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
