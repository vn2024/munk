import { View, Image, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import * as Font from 'expo-font';
import CustomButton from './components/CustomButton'; // Adjusted import path if needed
import Header from './components/Header';
import Loader from './components/Loader';
import ProgressTracker from "./components/ProgressTracker";
import './global.css'; // Import global CSS for web if necessary
import Animated, {
  FadeInDown,
  FadeInUp,
  withSpring,
} from "react-native-reanimated";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.config.js";

export default function App() {
  // State to track if the font is loaded
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const adjWidth = Platform.OS === 'web' ? "45%" : "100%";

  // Load custom font
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'KleeOne-Regular': require('./assets/fonts/KleeOne-Regular.ttf'),
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
    <ScrollView contentContainerStyle={{ flexGrow: 1, minHeight: "100%" }} style={{ flex: 1, backgroundColor: '#f3ead6' }}>
    <View className="bg-sailboatMarina">
      <Header />
      
      {/* Progress Tracker */}
      <View style={{ width: adjWidth, paddingLeft: 10 }}>
        <ProgressTracker />
      </View>
  
      {/* Tree Image - Naturally Positioned Below Progress Tracker */}
      <View style={{ marginTop: 0, paddingLeft: 0 }}>
        <Image 
          source={require('./assets/images/tree-half.png')} 
          style={{
            width: 484, 
            height: 1162,
            resizeMode: "stretch",
          }} 
        />
      </View>
    </View>
  </ScrollView>  
  );
}
