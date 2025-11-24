import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import AllEntries from "../screens/AllEntries";
import NewEntry from "../screens/NewEntry";
import EditEntry from "../screens/EditEntry";
import Profile from "../screens/Profile";
import { useAuth } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main App Tabs
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Profile" component={Profile} />
      <Stack.Screen name="NewEntry" component={NewEntry} />
      <Tab.Screen name="AllEntries" component={AllEntries} />
    </Tab.Navigator>
  );
}

// App Navigator
export default function AppNavigator() {
  const { user } = useAuth();

  // If user is not logged in, show Landing and Auth flow
  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  }

  // If user is logged in, show main app
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="NewEntry" component={NewEntry} />
      <Stack.Screen name="EditEntry" component={EditEntry} />
    </Stack.Navigator>
  );
}
