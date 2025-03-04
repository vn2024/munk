import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Loader from "../components/Loader"; // Assuming you have a Loader component
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.config.js"; // Ensure you have Tailwind set up
import * as Font from 'expo-font';

const JournalScreen = () => {
  // State to store the journal entry

  const [journalEntry, setJournalEntry] = useState("");
  const [isSaving, setIsSaving] = useState(false); // State to track saving process

  // Function to save journal entry (for now, just logs it)
  const saveJournalEntry = () => {
    setIsSaving(true);
    // Save logic (e.g., send to backend or local storage)
    console.log("Saved Journal Entry:", journalEntry);
    setIsSaving(false); // Simulate saving process complete
  };

  const [text, setText] = useState('');
    
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Journaling Screen</Text>
    <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Enter your thoughts ₍ᐢ•ﻌ•ᐢ₎"
    />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f3ead6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: '#ad5775',
      fontSize: 20,
      fontWeight: 'bold',
    },
    input: {
      height: 300,
      width: 400,
      borderColor: '#ad5775',
      borderWidth: 3,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
});

export default JournalScreen;