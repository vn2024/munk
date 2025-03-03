import React from 'react';
import { View, Text, ImageBackground, Dimensions, Platform } from 'react-native';

// Get screen width dynamically
const { width, height } = Dimensions.get('window');

const headerHeight = Platform.OS === 'web' ? height * 0.15 : 60; // For mobile devices, set fixed height like 120px

const Header = () => {
  return (
    <View className="w-full bg-sailboatMarina flex items-center justify-start pt-16">
      <ImageBackground
        source={require('../assets/images/bg.png')}
        style={{
          width: '100%',  // Full width of the screen
          height: headerHeight,    // Adjusted height for the header
          backgroundColor: '#f3ead6',
          justifyContent: 'center',  // Vertically center content
        }}
        resizeMode="repeat"  // Ensure the image covers the container
      >
        <Text className="text-5xl text-black font-klee ml-5 mt-5">
          Welcome back!
        </Text>
      </ImageBackground>
    </View>
  );
};

export default Header;
