import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import  supabase  from "../services/supabase";

// Screens
import HomeScreen from "../screens/HomeScreen";
import ReportIssueScreen from "../screens/ReportIssueScreen";
import ComplaintHistoryScreen from "../screens/ComplaintHistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import CleaningDepartmentScreen from "../screens/CleaningDepartmentScreen";
import RoadsDepartmentScreen from "../screens/RoadsDepartmentScreen";
import WasteDepartmentScreen from "../screens/WasteDepartmentScreen";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tabs for User
function UserTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ReportIssue" component={ReportIssueScreen} />
      <Tab.Screen name="ComplaintHistory" component={ComplaintHistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      const user = session?.session?.user;

      if (user) {
        setUserRole(user.email === "admin@gmail.com" ? "admin" : "user");
      } else {
        setUserRole(null);
      }

      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserRole(session?.user?.email === "admin@gmail.com" ? "admin" : session?.user ? "user" : null);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userRole === "admin" && (
          <>
            <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
            <Stack.Screen name="CleaningDepartment" component={CleaningDepartmentScreen} />
            <Stack.Screen name="RoadsDepartment" component={RoadsDepartmentScreen} />
            <Stack.Screen name="WasteDepartment" component={WasteDepartmentScreen} />
          </>
        )}

        {userRole === "user" && (
          <>
            <Stack.Screen name="UserTabs" component={UserTabs} />
          </>
        )}

        {/* Auth screens remain at bottom of stack */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
