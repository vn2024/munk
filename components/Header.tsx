import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const headerHeight = Platform.OS === 'web' ? height * 0.15 : 60; // For mobile devices, set fixed height like 120px

const Header = () => {
  const navigation = useNavigation(); // Correctly use navigation here

  const handleMenuPress = () => {
    // Open the drawer when the hamburger menu is pressed
    navigation.dispatch(DrawerActions.toggleDrawer()); 
  };

  return (
    <View className="w-full bg-sailboatMarina flex justify-start mt-0">
      <View className='w-full flex-row justify-between'>
        <Image 
          source={require('../assets/images/logo-header.png')} 
          style={{width: 301.5, height: 106.5, resizeMode: "contain", marginLeft: 5, marginTop: 5}} 
        />
        
        {/* Hamburger Menu */}
        <TouchableOpacity onPress={handleMenuPress} style={{ marginTop: 15 }}>
          <Image
            source={require('../assets/images/menu.png')}
            style={{ width: 80, height: 80, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>

      {/* Optional Background Image */}
      <View className="w-full flex items-center mt-15">  
        <ImageBackground
            source={require('../assets/images/bg.png')}
            style={{
              width: '100%',
              height: headerHeight, 
              backgroundColor: '#f3ead6',
              justifyContent: 'center',
            }}
            resizeMode="repeat"
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
