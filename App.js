import { Buffer } from "buffer";
global.Buffer = Buffer;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";

// Auth Context
import { AuthProvider, useAuth } from "./context/AuthContext";

// Screens
import LoginScreen from "./screens/Auth/LoginScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ReportIssueScreen from "./screens/ReportIssueScreen";
import ComplaintHistoryScreen from "./screens/ComplaintHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import CleaningDepartmentScreen from "./screens/CleaningDepartmentScreen";
import RoadsDepartmentScreen from "./screens/RoadsDepartmentScreen";
import WasteDepartmentScreen from "./screens/WasteDepartmentScreen";

const Stack = createNativeStackNavigator();

// 🌟 Role-based Navigation
const AppNavigator = () => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // 🟡 Public Auth Screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : role === "admin" ? (
          // 🔴 Admin Screens
          <>
            <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
            <Stack.Screen name="CleaningDepartment" component={CleaningDepartmentScreen} />
            <Stack.Screen name="RoadsDepartment" component={RoadsDepartmentScreen} />
            <Stack.Screen name="WasteDepartment" component={WasteDepartmentScreen} />
          </>
        ) : (
          // 🔵 User Screens
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ReportIssue" component={ReportIssueScreen} />
            <Stack.Screen name="ComplaintHistory" component={ComplaintHistoryScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// 🔁 Wrap AppNavigator with AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
