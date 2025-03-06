import { View, Image, Text, ScrollView, Platform, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import MunkMeditate from '../components/MunkMeditate';
import Loader from '../components/Loader';
import ProgressTracker from "../components/ProgressTracker";
import '../global.css'; // Import global CSS for web if necessary

const quotes = [
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Growth takes time, be patient with yourself.",
  "Every acorn has the potential to become a mighty oak.",
  "Small daily habits lead to big results.",
  "Nature does not hurry, yet everything is accomplished.",
  "Your roots determine your growth.",
  "Keep growing, no matter the season.",
  "Grow at your own pace. Even the tallest trees start as tiny seeds.",
  "Some days you bloom, some days you rest -- both are part of growing.",
  "You are still growing, even if you can’t see it yet.",
  "Like a plant, you don’t have to bloom all the time to be beautiful.",
];

const HomeScreen = () => {
  // State to track if the font is loaded
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const adjWidth = Platform.OS === 'web' ? "60%" : "100%";
  const treeWidth = Platform.OS === 'web' ? 518 : 518*0.25;
  const treeHeight = Platform.OS === 'web' ? 218 : 218*0.25;

  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  // Load custom font
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'KleeOne-Regular': require('../assets/fonts/KleeOne-Regular.ttf'),
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
        {/* Progress Tracker */}
        <View style={{ width: adjWidth, paddingLeft: 10 }}>
          <ProgressTracker />
        </View>
        
        {Platform.OS === 'web' ? (
          // Web version - show full layout with tree
          <View style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", paddingTop: 0 }}>
            {/* Tree Image - Stays at the very top left */}
            <Image 
              source={require('../assets/images/tree-half.png')} 
              style={{
                width: 440, 
                height: 756,
                resizeMode: "contain",
                marginLeft: 0, // Keep tree at margin 0
              }} 
            />

            {/* Quote - Aligned to the top of the tree */}
            <View style={{ paddingLeft: 20, alignSelf: "flex-start", justifyContent: "space-between", }}>
              <ImageBackground 
                source={require('../assets/images/quote.png')} 
                style={{
                  width: treeWidth,
                  height: treeHeight,
                  paddingHorizontal: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                resizeMode="contain"
              >
                <Text className="text-center text-lg font-labradaBold text-gray-800">
                  {quote}
                </Text>
              </ImageBackground>
              <View className='mb-10'>
                <MunkMeditate />
              </View>
            </View>
          </View>
        ) : (
          // Mobile version - only show quote and MunkMeditate
          <View style={{ width: "100%", padding: 20 }}>
            <ImageBackground 
              source={require('../assets/images/quote.png')} 
              style={{
                width: "90%",
                paddingHorizontal: 10,
                paddingVertical: 10,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginBottom: 20
              }}
              resizeMode="cover"
            >
              <Text className="text-center text-lg font-labradaBold text-gray-800">
                {quote}
              </Text>
            </ImageBackground>
            <View className='mb-10'>
              <MunkMeditate />
            </View>
          </View>
        )}
      </View>
    </ScrollView>  
  );
}

export default HomeScreen;