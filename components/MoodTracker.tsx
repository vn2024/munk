import React, { useState } from "react";
// import * as Font from 'expo-font';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Image, ImageBackground } from "react-native";
// import { Star, Droplet, Book, BrainCircuit, ChevronLeft, ChevronRight } from "lucide-react-native";
// import Loader from './Loader';
import '../global.css'; // Import global CSS for web if necessary

const starSize = Platform.OS === 'web' ? 70 : 40;
const height = Platform.OS === 'web' ? "25%" : "45%";
const width = Platform.OS === 'web' ? "110%" : "100%";
const size = Platform.OS === 'web' ? 100 : 70;

const moodColors: Record<number, string> = {
    1: "#B1D2A2", // Mood 1 - Happy 
    2: "#D5DCAA", // Mood 2 - Slightly Happy
    3: "#EEE68C", // Mood 3 - Neutral (Gray)
    4: "#e4c47f", // Mood 4 - Slightly Sad (Steel Blue)
    5: "#e4877f"  // Mood 5 - Sad (Dark Blue)
  };
  
  const moodImages: Record<number, any> = {
    1: require("../assets/images/mood1.png"),
    2: require("../assets/images/mood2.png"),
    3: require("../assets/images/mood3.png"),
    4: require("../assets/images/mood4.png"),
    5: require("../assets/images/mood5.png"),
  };

  const moodText: Record<number, string> = {
    1: "You are feeling great! Keep it up!",
    2: "You are feeling good! Keep it up!.",
    3: "You're feeling neutral. Let's see how the day unfolds.",
    4: "It seems like a slightly tough day. Take it easy.",
    5: "You're feeling down. Remember, tomorrow is a new day!",
  };
  
const App = () => {
  // const [habitProgress, setHabitProgress] = useState(Array(weekDays).fill(null));
  const [habitProgress, setHabitProgress] = useState<(number | null)[]>(Array(7).fill(null));
  const todayIndex = new Date().getDay(); // Get index for today (0 = Sunday, 6 = Saturday)
  const selectedMood = habitProgress[todayIndex]; // Get today's selected mood

  // Function to update mood selection
  const onMoodPress = (moodIndex: number) => {
      setHabitProgress((prevProgress) => {
          const updatedProgress = [...prevProgress];
          updatedProgress[todayIndex] = moodIndex;
          return updatedProgress;
      });
  };  
    return (
        <View
        style={[
          styles.widgetContainer,
          { backgroundColor: selectedMood ? moodColors[selectedMood] : "#f0f0f0" }, // Change background color dynamically
        ]}
      >
        <Text style={styles.title}>Mood Tracker</Text>
        <Text style = {styles.moodText}>Click on one of the chipmunks to indicate your mood!</Text>
        <View style={styles.moodSelectionContainer}>
          {Object.keys(moodImages).map((key) => {
            const moodIndex = parseInt(key);
            return (
              <TouchableOpacity key={moodIndex} onPress={() => onMoodPress(moodIndex)}>
                <ImageBackground
                  source={moodImages[moodIndex]}
                  style={styles.moodImage}
                />
              </TouchableOpacity>
            );
          })}
        </View>
  
        {/* Display text based on the selected mood */}
        {selectedMood && (
          <Text style={styles.moodText}>{moodText[selectedMood]}</Text>
        )}
      </View>
  

        //   <View style={{ paddingLeft: 20, alignSelf: "flex-start" }}>
        //   </View>
        //   <View style = {{flex: 1, justifyContent: 'space-around', flexDirection: 'row'}}>
        //   <TouchableOpacity style={styles.happy1} onPress={onPress}>
        //         <ImageBackground
        //             source={require('../assets/images/mood1.png')} // Ensure you have a star image in this path
        //             style={{
        //                 width: starSize,
        //                 height: starSize,
        //                 justifyContent: "center",
        //                 alignItems: "center",
        //                 marginTop: 10, // Move the star up to position it higher than the date
        //             }}
        //         />
        //   </TouchableOpacity>
        //   <TouchableOpacity style={styles.happy2} onPress={onPress}>
        //         <ImageBackground
        //             source={require('../assets/images/mood2.png')} // Ensure you have a star image in this path
        //             style={{
        //                 width: starSize,
        //                 height: starSize,
        //                 justifyContent: "center",
        //                 alignItems: "center",
        //                 marginTop: 10, // Move the star up to position it higher than the date
        //             }}
        //         />
        //   </TouchableOpacity>
        //   <TouchableOpacity style={styles.neutral} onPress={onPress}>
        //         <ImageBackground
        //             source={require('../assets/images/mood3.png')} // Ensure you have a star image in this path
        //             style={{
        //                 width: starSize,
        //                 height: starSize,
        //                 justifyContent: "center",
        //                 alignItems: "center",
        //                 marginTop: 10, // Move the star up to position it higher than the date
        //             }}
        //         />
        //   </TouchableOpacity>
        //   <TouchableOpacity style={styles.sad1} onPress={onPress}>
        //         <ImageBackground
        //             source={require('../assets/images/mood4.png')} // Ensure you have a star image in this path
        //             style={{
        //                 width: starSize,
        //                 height: starSize,
        //                 justifyContent: "center",
        //                 alignItems: "center",
        //                 marginTop: 10, // Move the star up to position it higher than the date
        //             }}
        //         />
        //   </TouchableOpacity>
        //   <TouchableOpacity style={styles.sad2} onPress={onPress}>
        //         <ImageBackground
        //             source={require('../assets/images/mood5.png')} // Ensure you have a star image in this path
        //             style={{
        //                 width: starSize,
        //                 height: starSize,
        //                 justifyContent: "center",
        //                 alignItems: "center",
        //                 marginTop: 10, // Move the star up to position it higher than the date
        //             }}
        //         />
        //   </TouchableOpacity>
        //     {/* <Text>Mood Tracker: Press a button to indicate your mood!</Text>
        //     <TouchableOpacity style={styles.button} onPress={onPress}>
        //     <Text>Press Here</Text>
        //     </TouchableOpacity> */}
        // </View>
        // </View>
    );
};

const styles = StyleSheet.create ({
    widgetContainer: {
        margin: 20,
        height: height,
        width: width,
        padding: 15,
        borderWidth: 3,
        borderRadius: 15,
        backgroundColor: "#fff",
        alignItems: "center",
        borderColor: "#FFF"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5
    },
    moodText: {
        marginTop: 10,
        fontSize: 14,
        textAlign: "center",
        fontStyle: "italic",
    },
    moodSelectionContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10
    },
    moodContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    moodButton: {
        marginHorizontal: 5
    },
    moodImage: {
        width: size,
        height: size,
        resizeMode: "contain"
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#f6b6a7',
      padding: 10,
    },
    happy1: {
        borderWidth: 2,
        borderColor: "#a66d45",
        borderRadius: 10,
    },
    happy2: {
        backgroundColor: '#D5DCAA',
        borderWidth: 2,
        borderColor: "#a66d45",
        borderRadius: 10,
    },
    neutral: {
        backgroundColor: '#EEE68C',
        borderWidth: 2,
        borderColor: "#a66d45",
        borderRadius: 10,
    },
    sad1: {
        backgroundColor: '#E4C47F',
        borderWidth: 2,
        borderColor: "#a66d45",
        borderRadius: 10,
    },
    sad2: {
        backgroundColor: '#E4877F',
        borderWidth: 2,
        borderColor: "#a66d45",
        borderRadius: 10,
    },
    countContainer: {
      alignItems: 'center',
      padding: 10,
    },
});

export default App;