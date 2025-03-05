import React, { useEffect } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing,
  cancelAnimation 
} from "react-native-reanimated";

const { width, height } = Dimensions.get('window');

// Array of acorn images
const acornImages = [
  require("../assets/images/acorn.png"),     // Original acorn
  require("../assets/images/acorn-pink.png"),     // Pink acorn
  require("../assets/images/logo.png")     // Munk
];

const FallingAcorns: React.FC = () => {
  const createFallingAcorn = () => {
    // Random horizontal start position
    const startX = Math.random() * width;
    
    // Randomly select an acorn image
    const acornImage = acornImages[Math.floor(Math.random() * acornImages.length)];
    
    // Shared value for vertical translation
    const translateY = useSharedValue(-100);
    
    // Random fall duration and speed variation
    const fallDuration = Math.random() * 3000 + 2000; // 2-5 seconds
    
    // Animated style for falling
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateY: translateY.value },
          { rotate: `${Math.sin(translateY.value / 50) * 15}deg` } // Subtle swaying
        ],
        left: startX,
      };
    });
    
    // Start the falling animation
    useEffect(() => {
      translateY.value = withRepeat(
        withTiming(height + 100, {
          duration: fallDuration,
          easing: Easing.linear,
        }),
        -1, // Infinite repeat
        false // Do not reverse, only go down
      );
      
      // Cleanup animation on unmount
      return () => {
        cancelAnimation(translateY);
      };
    }, []);
    
    return (
      <Animated.View
        style={[styles.acornWrapper, animatedStyle]}
      >
        <Image
          source={acornImage}
          style={styles.acornImage}
        />
      </Animated.View>
    );
  };

  // Create multiple falling acorns
  const fallingAcorns = Array.from({ length: 15 }).map((_, index) => (
    <React.Fragment key={index}>
      {createFallingAcorn()}
    </React.Fragment>
  ));

  return (
    <View style={styles.container}>
      {fallingAcorns}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    pointerEvents: "none",
    overflow: "hidden",
  },
  acornWrapper: {
    position: "absolute",
    top: -100, // Start above the screen
  },
  acornImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default FallingAcorns;