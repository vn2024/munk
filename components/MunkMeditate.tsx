import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";

const audioFiles = [
  require("../assets/audio/meditation1.mp3"),
  require("../assets/audio/meditation2.mp3"),
  require("../assets/audio/meditation3.mp3"),
];

const MunkMeditate = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = async () => {
    // If a sound is playing, stop and unload it
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      return;
    }

    // Play a new random sound
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const { sound: newSound } = await Audio.Sound.createAsync(audioFiles[randomIndex]);

    setSound(newSound);
    setIsPlaying(true);
    await newSound.playAsync();

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded || status.didJustFinish) {
        setSound(null);
        setIsPlaying(false);
      }
    });
  };

  return (
    <View className="bg-dutchTulips p-6 mt-50 rounded-3xl shadow-lg items-center justify-center w-100 mx-auto">
      <Image source={require("../assets/images/logo.png")} className="w-32 h-32 mb-6" />
      
      <TouchableOpacity
        onPress={toggleSound}
        className="bg-melonRind px-6 py-3 rounded-full shadow-md"
      >
        <Text className="text-white font-bold text-lg">
          {isPlaying ? "Stop" : "Play"} Meditation Audio
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MunkMeditate;
