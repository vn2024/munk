import React, { useState, useEffect } from "react";
import * as Font from 'expo-font';
import { View, Text, TouchableOpacity, ScrollView, Image, ImageBackground, Dimensions } from "react-native";
import { Star, Droplet, Book, BrainCircuit, ChevronLeft, ChevronRight } from "lucide-react-native";
import Loader from './Loader';

type Habit = {
  id: number;
  name: string;
  icon: JSX.Element;
  progress: Record<string, boolean[]>;
};

// Function to format date as key
const getWeekKey = (date: Date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  return startOfWeek.toISOString().split("T")[0];
};

const habits: Habit[] = [
  { id: 1, name: "Drink Water", icon: <Droplet size={20} color="#4CAF50" />, progress: {} },
  { id: 2, name: "Meditate", icon: <BrainCircuit size={20} color="#FF6347" />, progress: {} },
  { id: 3, name: "Journal", icon: <Book size={20} color="#FFD700" />, progress: {} },
];

const getWeekDays = (date: Date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  return Array.from({ length: 7 }, (_, i) => {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + i);
    return {
      day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i],
      date: dayDate.getDate(),
      isToday: dayDate.toDateString() === new Date().toDateString(),
    };
  });
};

const ProgressTracker: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [habitData, setHabitData] = useState<Habit[]>(habits);
  const weekKey = getWeekKey(currentDate);
  const week = getWeekDays(currentDate);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load custom font
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Labrada-Regular': require('../assets/fonts/Labrada-Regular.ttf'),
        'Labrada-Bold': require('../assets/fonts/Labrada-Bold.ttf'),
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

  // Calculate cell width (approximately 14.28% - margins)
  const cellWidth = '13%';

  const isCurrentWeek = getWeekKey(new Date()) === weekKey;

  const toggleHabit = (habitId: number, dayIndex: number) => {
    if (!isCurrentWeek) return; // Prevent editing for past/future weeks

    setHabitData((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              progress: {
                ...habit.progress,
                [weekKey]: habit.progress[weekKey]?.map((done, index) =>
                  index === dayIndex ? !done : done
                ) || Array(7).fill(false).map((_, i) => (i === dayIndex ? true : false)),
              },
            }
          : habit
      )
    );
  };


  const changeWeek = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset * 7);
    setCurrentDate(newDate);
  };

  return (
    <View className="pt-20 px-2 pb-0 bg-sailboatMarina">
      <View className="flex-row mb-5 items-center justify-center">
        {/* Left navigation button - moved even closer to align with content */}
        <View className="w-6 justify-center">
          <TouchableOpacity onPress={() => changeWeek(-1)}>
            <ChevronLeft size={26} color="black" />
          </TouchableOpacity>
        </View>
        
        {/* Increased space for the habit icons/names */}
        <View className="w-28" />
        
        {/* Day headers - aligned with grid cells */}
        <View className="flex-1 flex-row justify-between">
          {week.map((day, index) => (
            <View key={index} className="items-center" style={{ width: cellWidth }}>
              <Text className={`text-xl font-labradaBold ${day.isToday ? "text-[#FF5733]" : "text-black"}`}>
                {day.day}
              </Text>
              
              {/* Star background applied to the date */}
              <ImageBackground
                source={require('../assets/images/star-clear.png')} // Ensure you have a star image in this path
                style={{
                  width: 70,
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10, // Move the star up to position it higher than the date
                }}
              >
                <Text
                  style={{
                    fontSize: 20, // Adjust font size as needed
                    fontFamily: 'Labrada-Bold', // Ensure the font family is correct
                    color: day.isToday ? "#FF5733" : "#000000", // Adjust the color for today
                    position: 'absolute', // Ensure the text is over the image
                    top: 11, // Adjust the value to center the text
                    zIndex: 1, // Ensure the text stays above the image
                  }}
                >
                  {day.date}
                </Text>
              </ImageBackground>
            </View>
          ))}
        </View>
        
        {/* Right navigation button */}
        <View className="w-8 justify-center items-end">
          <TouchableOpacity onPress={() => changeWeek(1)}>
            <ChevronRight size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Habit Rows with Grid */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {habitData.map((habit) => (
          <View key={habit.id} className="flex-row items-center mb-5">
            {/* Left spacing to match navigation button - reduced to match the closer nav button */}
            <View className="w-6" />
            
            {/* Habit icon and name - increased width for more space */}
            <View className="w-28 flex-row items-center">
              {habit.icon}
              <Text className="ml-2 text-xl font-labradaBold">{habit.name}</Text>
            </View>
            
            {/* Checkbox grid - aligned with day headers */}
            <View className="flex-1 flex-row justify-between">
              {week.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => isCurrentWeek && toggleHabit(habit.id, index)} // Only allow edits for the current week
                  disabled={!isCurrentWeek} // Disable interaction for past/future weeks
                  className="h-12 border-2 border-black items-center justify-center mx-1"
                  style={{ 
                    width: cellWidth, 
                    backgroundColor: isCurrentWeek ? "transparent" : "[#d2c98a]", // Grayed out for non-editable weeks
                    opacity: isCurrentWeek ? 1 : 0.5, // Reduce opacity for disabled weeks
                  }}
                >
                  {habit.progress[weekKey]?.[index] ? (
                    <Image 
                      source={require('../assets/images/acorn.png')} 
                      style={{
                        width: 60, 
                        height: 60,
                        resizeMode: "stretch",
                      }} 
                    />
                  ) : null}
                </TouchableOpacity>              
              ))}
            </View>
            
            {/* Right spacing to match navigation button */}
            <View className="w-8" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProgressTracker;
