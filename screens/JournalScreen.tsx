import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Alert } from "react-native";
import Loader from "../components/Loader"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import Icon from 'react-native-vector-icons/FontAwesome'; // For Pencil Icon

const JournalScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  const [journalEntries, setJournalEntries] = useState<string[]>([]);
  const [entriesVisible, setEntriesVisible] = useState(false); // State to control visibility of entries
  const [acornThoughts, setAcornThoughts] = useState([
    { text: "", editing: false },
    { text: "", editing: false },
    { text: "", editing: false },
  ]);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "KleeOne-Regular": require("../assets/fonts/KleeOne-Regular.ttf"),
        "Labrada-Regular": require("../assets/fonts/Labrada-Regular.ttf"),
        "Labrada-Bold": require("../assets/fonts/Labrada-Bold.ttf"),
      });
      setFontsLoaded(true);
    };

    const loadEntries = async () => {
      try {
        const savedEntries = await AsyncStorage.getItem("journalEntries");
        if (savedEntries) {
          const parsedEntries = JSON.parse(savedEntries);
          console.log("Loaded entries: ", parsedEntries); // Debugging line
          setJournalEntries(parsedEntries);
        }
      } catch (error) {
        console.error("Error loading entries from AsyncStorage:", error);
      }
    };

    loadFonts();
    loadEntries();
  }, []);

  const saveJournalEntry = async () => {
    if (!journalEntry.trim()) return; // Prevent empty entries
    
    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    
    // Combine the date/time with the journal entry
    const newEntry = `${formattedDate}: ${journalEntry}`;
    
    const updatedEntries = [newEntry, ...journalEntries]; // Add new entry to the top
    setJournalEntries(updatedEntries);
    setJournalEntry(""); // Clear the text input
    
    try {
      await AsyncStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    } catch (error) {
      console.error("Error saving entries to AsyncStorage:", error);
    }
  };

  const toggleEntriesVisibility = () => {
    setEntriesVisible(!entriesVisible); // Toggle the visibility state
  }; 

  const deleteEntry = async (index: number) => {
    console.log("Deleting entry at index:", index);  // Debugging line

    // Update state first to immediately remove entry from UI
    const updatedEntries = journalEntries.filter((_, i) => i !== index); // Filter out the entry at the specified index
    setJournalEntries(updatedEntries); // Update state to reflect the deletion immediately

    try {
      await AsyncStorage.setItem("journalEntries", JSON.stringify(updatedEntries)); // Update AsyncStorage
    } catch (error) {
      console.error("Error deleting entry from AsyncStorage:", error);
    }
  };

  // Handle text change for acorn thoughts
  const handleAcornChange = (index: number, text: string) => {
    const newAcornThoughts = [...acornThoughts];
    newAcornThoughts[index].text = text;
    setAcornThoughts(newAcornThoughts);
  };

  // Handle edit mode toggle for acorn thoughts
  const toggleAcornEditing = (index: number) => {
    const newAcornThoughts = [...acornThoughts];
    newAcornThoughts[index].editing = !newAcornThoughts[index].editing;
    setAcornThoughts(newAcornThoughts);
  };

  if (!fontsLoaded) {
    return (
      <View className="flex-1 bg-sailboatMarina justify-center items-center">
        <Loader visible={true} size={100} color="#a66d45" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="flex-1 bg-sailboatMarina items-center justify-start">
        <Text className="font-klee color-daddyIssues text-2xl mb-4 p-10">Journaling Screen</Text>

        <View style={styles.container}>
          {/* Left Column for Text Input */}
          <View style={styles.leftColumn}>
            <TextInput
              className="font-labrada mb-4 p-4 text-lg"
              style={styles.textInput}
              onChangeText={setJournalEntry}
              value={journalEntry}
              placeholder="Write your thoughts here ₍ᐢ•ﻌ•ᐢ₎"
              multiline
            />
            {/* Save Button */}
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={saveJournalEntry}
            >
              <Text style={styles.saveButtonText}>Save Entry</Text>
            </TouchableOpacity>
          </View>

          {/* Right Column for Acorn Images and Text Input aligned horizontally */}
          <View style={styles.rightColumn}>
            {acornThoughts.map((acorn, index: number) => (
              <View key={index} style={styles.acornWrapper}>
                <Image 
                  source={require('../assets/images/acorn.png')}  // Replace with the actual path of your acorn image
                  style={styles.acornImage}
                />
                {acorn.editing ? ( 
                  <TextInput
                    style={styles.acornInput}
                    value={acorn.text}
                    onChangeText={(text) => handleAcornChange(index, text)}
                    placeholder="Enter goal here..."
                    multiline
                    onBlur={() => toggleAcornEditing(index)}  // Revert to text when user clicks outside
                  />
                ) : (
                  <TouchableOpacity onPress={() => toggleAcornEditing(index)} style={styles.acornTextWrapper}>
                    <Text style={styles.acornText}>{acorn.text || "Enter goal here..."}</Text>
                    <Icon name="pencil" size={20} color="#a66d45" style={styles.icon} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Button to Toggle Entries Visibility */}
        <TouchableOpacity
          className="bg-daddyIssues mt-5 p-3 rounded-lg"
          onPress={toggleEntriesVisibility}
        >
          <Text className="text-sailboatMarina font-labrada text-2xl">{entriesVisible ? "Hide Entries" : "Show Entries"}</Text>
        </TouchableOpacity>

        {/* Display Previous Entries only when visible */}
        {entriesVisible && (
          <ScrollView style={{ width: "90%", marginTop: 10 }} className="max-h-80">
            {journalEntries.length > 0 ? (
              journalEntries.map((entry, index: number) => (
                <View 
                  key={index} 
                  className="p-3 my-2 bg-sweetarts rounded-lg border border-daddyIssues"
                  style={styles.entryWrapper} // Add styling for the entry
                >
                  <Text style={[styles.savedEntryText]}>{entry}</Text> {/* Display Date/Time + Content */}
                  {/* Delete Button aligned to the right */}
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => deleteEntry(index)} // Trigger the delete confirmation
                  >
                    <Icon name="trash" size={20} color="#a66d45" />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.entryWrapper} className="p-3 my-2 bg-sweetarts rounded-lg border border-daddyIssues"><Text style={styles.savedEntryText}>No entries available.</Text></View>
            )}
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start', // Align to the left
    marginBottom: 20,
  },
  leftColumn: {
    width: '55%', // Adjusted to leave more space for acorns
    justifyContent: 'flex-start',
    marginLeft: 20,
    padding: 10,
  },
  rightColumn: {
    width: '45%',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 10,
    marginLeft: 100,
  },
  textInput: {
    height: 200,
    textAlignVertical: "top",
    borderWidth: 2,
    borderColor: "#a66d45",
    borderRadius: 10,
    backgroundColor: "#f6b6a7",
    padding: 15,
  },
  saveButton: {
    backgroundColor: "#a66d45",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: "#f3ead6",
    fontSize: 24,
    fontFamily: 'Labrada-Regular',
  },
  acornWrapper: {
    flexDirection: 'row', // Align the acorn image and text horizontally
    marginBottom: 20,
    alignItems: 'center',
  },
  acornImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 15, // Increased space between the acorn image and the text
  },
  acornInput: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#a66d45",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f3ead6",
  },
  acornTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  acornText: {
    fontSize: 20,
    fontFamily: 'Labrada-Regular',
    color: "#a66d45",
    marginRight: 25, // Increased space between the text and icon
  },
  icon: {
    marginLeft: 50, // Increased space between the icon and the text
  },
  savedEntryText: {
    color: "#a66d45",
    fontSize: 24,
    fontFamily: 'Labrada-Regular',
  },
  entryWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align text to the left, delete button to the right
    alignItems: 'center',
  },
  deleteButton: {
    paddingLeft: 15,
    paddingVertical: 10,
  },
});

export default JournalScreen;
