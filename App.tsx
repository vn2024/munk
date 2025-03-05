import React, { useEffect, useState } from "react";
import { Alert } from 'react-native';
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { enableScreens } from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types"; // Import the type

// Import Screens
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import Loader from "./components/Loader";
import Header from "./components/Header";
import JournalScreen from "screens/JournalScreen";

// Enable native screens for better performance
enableScreens();

// Create Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [initialState, setInitialState] = useState<any>(null);

  useEffect(() => {
    // Restore navigation state
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem('navigation_state');
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;
        setInitialState(state);
      } catch (e) {
        console.error("Failed to restore navigation state", e);
      }
    };

    restoreState();

    // Listen for changes to the user's sign-in state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user.uid);
        setIsAuthenticated(true);
      } else {
        console.log("User is not authenticated");
        setIsAuthenticated(false);
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async (navigation: any) => {
    try {
      await signOut(auth);  // Sign out the user from Firebase

      // Clear navigation state after logout
      await AsyncStorage.removeItem('navigation_state');
      
      // Reset the authentication state
      setIsAuthenticated(false);
      
      // Navigate to the Login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert("Logout Failed", "Unable to log out. Please try again.");
    }
  };

  if (isAuthenticated === null) {
    return <Loader visible={true} size={100} color="#a66d45" />;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) => {
        // Save navigation state whenever it changes
        AsyncStorage.setItem('navigation_state', JSON.stringify(state));
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{
                headerShown: true,
                header: ({ navigation }) => (
                  <Header onLogout={() => handleLogout(navigation)} />
                )
              }}
            />
            <Stack.Screen 
              name="Journal" 
              component={JournalScreen} 
              options={{
                headerShown: true,
                header: ({ navigation }) => (
                  <Header onLogout={() => handleLogout(navigation)} />
                )
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
