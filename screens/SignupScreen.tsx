import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as Font from 'expo-font';
import Loader from "../components/Loader";
import FallingAcorns from "../components/FallingAcorns";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Signup">;

interface Props {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home"); // Navigate to main app after signup
    } catch (err) {
      setError("Signup failed. Try again.");
    }
  };

  // Load custom font
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
              'KleeOne-Regular': require('../assets/fonts/KleeOne-Regular.ttf'),
              'KleeOne-SemiBold': require('../assets/fonts/KleeOne-SemiBold.ttf'),
              'Labrada-Regular': require('../assets/fonts/Labrada-Regular.ttf'),
              'Labrada-Bold': require('../assets/fonts/Labrada-Bold.ttf'),
      });
      setFontsLoaded(true); // Set state when fonts are loaded
    };

    loadFonts(); // Load the fonts when the component mounts
  }, []);

  // Return a loading view until the fonts are loaded
  // If fonts are not loaded, show the loader
  if (!fontsLoaded) {
    return (
      <View className="flex-1 bg-sailboatMarina justify-center items-center">
        <Loader visible={true} size={100} color="#a66d45" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-sweetarts">
      <FallingAcorns />
      <Text className="text-daddyIssues text-5xl font-bold mb-6 font-kleeSemiBold">New to Munk? Welcome!</Text>

      <TextInput
        className="text-daddyIssues p-4 rounded-lg mb-2 font-labrada font-2xl w-[45%] bg-sailboatMarina"
        placeholder="Email"
        placeholderTextColor="#a7a155"
        onChangeText={setEmail}
      />

      <TextInput
        className="w-[45%] text-daddyIssues p-4 font-labrada font-2xl rounded-lg mb-2 bg-sailboatMarina"
        placeholder="Password"
        placeholderTextColor="#a7a155"
        secureTextEntry
        onChangeText={setPassword}
      />

      {error ? <Text className="text-red-500 mb-2">{error}</Text> : null}

      <TouchableOpacity
        onPress={handleSignup}
        className="w-[45%] bg-donutShop text-2xl p-4 rounded-lg mt-4"
      >
        <Text className="text-sailboatMarina text-center text-2xl font-kleeSemiBold">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text className="text-daddyIssues mt-4 text-2xl font-labrada">Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
