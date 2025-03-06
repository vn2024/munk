import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, Platform, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Import the type

const { height } = Dimensions.get('window');
const headerHeight = Platform.OS === 'web' ? height * 0.15 : 60;

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  // Type the navigation hook using StackNavigationProp
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleMenuPress = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleDropdownItemPress = (action: string) => {
    setIsDropdownVisible(false);
  
    console.log('Dropdown item pressed:', action); // Add this log
  
    switch(action) {
      case 'profile':
        console.log('Attempting to navigate to Home');
        navigation.navigate("Home");
        break;
      case 'journal':
        console.log('Attempting to navigate to Journal');
        navigation.navigate("Journal");
        break;
      case 'logout':
        if (onLogout) {
          onLogout(); 
        } else {
          navigation.navigate('Login');
        }
        break;
    }
  };

  return (
    <View className="w-full bg-sailboatMarina flex justify-start mt-0 relative" style={{ overflow: 'visible', zIndex: 100 }}>
      <View className='w-full flex-row justify-between relative'>
        <Image 
          source={require('../assets/images/logo-header.png')} 
          style={{width: 301.5, height: 106.5, resizeMode: "contain", marginLeft: 5, marginTop: 5}} 
        />
        
        {/* Hamburger Menu */}
        <TouchableOpacity onPress={handleMenuPress} style={{ marginTop: 15 }}>
          <Image
            source={require('../assets/images/menu.png')}
            style={{ marginRight: 10, width: 80, height: 80, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {isDropdownVisible && (
        <View className="absolute top-0 left-0 w-full h-full z-50" style={{ overflow: 'visible' }}>
          <TouchableWithoutFeedback onPress={() => setIsDropdownVisible(false)}>
            <View className="absolute inset-0 z-40" style={{ backgroundColor: 'rgba(0,0,0,0)' }} />
          </TouchableWithoutFeedback>

          <View 
            className="absolute right-0 bg-white shadow-lg rounded-lg w-48"
            style={{
              top: 100,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              zIndex: 2000,
              overflow: 'visible',
            }}
          >
            <TouchableOpacity 
              className="p-4 border-b border-gray-200"
              onPress={() => handleDropdownItemPress('profile')}
            >
              <Text className="text-black">Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="p-4 border-b border-gray-200"
              onPress={() => handleDropdownItemPress('journal')}
            >
              <Text className="text-black">Journal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="p-4"
              onPress={() => handleDropdownItemPress('logout')}
            >
              <Text className="text-red-500">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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