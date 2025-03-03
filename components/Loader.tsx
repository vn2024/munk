import React from 'react';
import { View } from 'react-native';

interface LoaderProps {
  visible: boolean;
  size?: number; // Optional size for the spinner
  color?: string; // Custom spinner color
}

const Loader: React.FC<LoaderProps> = ({ visible, size = 60, color = '#a66d45' }) => {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 justify-center items-center bg-transparent">
      <View
        className="border-4 border-solid rounded-full animate-spin"
        style={{
          width: size,
          height: size,
          borderColor: color, // Custom color for spinner (daddyIssues)
          borderTopColor: 'transparent', // Make the top part transparent to create the ring effect
        }}
      />
    </View>
  );
};

export default Loader;
