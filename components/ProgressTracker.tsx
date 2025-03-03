import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Star, Droplet, Book, BrainCircuit, ChevronLeft, ChevronRight } from "lucide-react-native";

// Define types for TypeScript
type Habit = {
  id: number;
  name: string;
  icon: JSX.Element;
  progress: boolean[];
};

// Habit List
const habits: Habit[] = [
  { id: 1, name: "Drink Water", icon: <Droplet size={20} color="#4CAF50" />, progress: Array(7).fill(false) },
  { id: 2, name: "Meditate", icon: <BrainCircuit size={20} color="#FF6347" />, progress: Array(7).fill(false) },
  { id: 3, name: "Journal", icon: <Book size={20} color="#FFD700" />, progress: Array(7).fill(false) },
];

// Function to get week days dynamically
const getWeekDays = (date: Date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start from Sunday

  return Array.from({ length: 7 }, (_, i) => {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + i);
    return {
      day: ["S", "M", "T", "W", "T", "F", "S"][i],
      date: dayDate.getDate(),
      isToday: dayDate.toDateString() === new Date().toDateString(),
    };
  });
};

const ProgressTracker: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [habitData, setHabitData] = useState<Habit[]>(habits);
  const week = getWeekDays(currentDate);

  const toggleHabit = (habitId: number, dayIndex: number) => {
    setHabitData((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              progress: habit.progress.map((done, index) => (index === dayIndex ? !done : done)),
            }
          : habit
      )
    );
  };

  const changeWeek = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset * 7); // Move forward or backward by a week
    setCurrentDate(newDate);
  };

  return (
    <View className="flex-1 p-4 bg-[#F5EEDC]">
      {/* Week Navigation */}
      <View className="flex-row justify-between items-center mb-3">
        <TouchableOpacity onPress={() => changeWeek(-1)} className="p-2 bg-gray-300 rounded">
          <ChevronLeft size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Week of {week[0].date} - {week[6].date}</Text>
        <TouchableOpacity onPress={() => changeWeek(1)} className="p-2 bg-gray-300 rounded">
          <ChevronRight size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Days Header with Fixed Width */}
      <View className="flex-row items-center mb-4">
        <View className="w-32"></View> {/* Empty space for habit names */}
        {week.map((day, index) => (
          <View key={index} className="w-10 items-center">
            <Text className={`text-lg font-semibold ${day.isToday ? "text-red-500" : "text-black"}`}>{day.day}</Text>
            <Text className={`text-sm ${day.isToday ? "font-bold text-red-500" : "text-gray-700"}`}>{day.date}</Text>
          </View>
        ))}
      </View>

      <ScrollView>
        {/* Habit List with Fixed Alignment */}
        {habitData.map((habit) => (
          <View key={habit.id} className="flex-row items-center mb-4">
            <View className="w-32 flex-row items-center">
              {habit.icon}
              <Text className="ml-2 text-lg font-medium">{habit.name}</Text>
            </View>
            {/* Progress Checkboxes */}
            {habit.progress.map((done, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleHabit(habit.id, index)}
                className="w-10 h-10 border-2 border-gray-600 rounded flex items-center justify-center mx-1"
                style={{ backgroundColor: done ? "#FFD700" : "transparent" }}
              >
                {done ? <Star size={18} color="white" /> : null}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProgressTracker;
