import React from 'react';
import { View, Text, Image, ImageBackground, Dimensions, Platform } from 'react-native';

// Get screen width dynamically
const { width, height } = Dimensions.get('window');

const headerHeight = Platform.OS === 'web' ? height * 0.15 : 60; // For mobile devices, set fixed height like 120px

const Header = () => {
  return (
    <View className="w-full bg-sailboatMarina flex justify-start mt-0">
      <View className='items-left ml-5 mt-5'>
        <Image source={require('../assets/images/logo-header.png')} style={{width: 301.5, height: 106.5, resizeMode: "contain"}}/>
        {/* <Image source={require('../asse')}/> */}
      </View>  
      <View className="w-full flex items-center mt-15">  
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
    </View>
  );
};

export default Header;
