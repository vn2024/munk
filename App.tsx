import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen'; // Path to your Home screen component
import JournalScreen from './screens/JournalScreen'; // Path to your Journal screen component
import Header from './components/Header'; // Path to your custom Header component

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: () => <Header />,  // Custom header for each screen
        }}
      >
        {/* Define your screens here */}
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Journal" component={JournalScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}