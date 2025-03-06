import React, { useEffect, useState } from "react";
import { View, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import * as Font from 'expo-font';

import HomeScreen from "../screens/HomeScreen";
import JournalScreen from "../screens/JournalScreen";
import Header from "../components/Header";
import Loader from "../components/Loader";

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

// Define props type for DrawerNavigator
type DrawerNavigatorProps = {
  handleLogout: () => void;  // Specify that handleLogout is passed as a function prop
};

const DrawerNavigator = ({ handleLogout }: DrawerNavigatorProps) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'KleeOne-Regular': require('../assets/fonts/KleeOne-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loader visible={true} size={100} color="#a66d45" />
      </View>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            onPress={() => {
                Alert.alert(
                "Confirm Logout",
                "Are you sure you want to log out?",
                [
                    {
                    text: "Cancel",
                    style: "cancel",
                    },
                    {
                    text: "Logout",
                    style: "destructive",
                    onPress: () => handleLogout(props.navigation),  // Pass navigation prop to handleLogout
                    },
                ]
                );
            }}
            labelStyle={{ color: 'red', fontFamily: 'KleeOne-Regular' }}
            />
        </DrawerContentScrollView>
      )}
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Journal" component={JournalScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;