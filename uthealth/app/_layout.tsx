import { Stack } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Ensure header is hidden for all screens
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          headerShown: false, 
        }}
      />
      <Stack.Screen 
        name="(tabs)/_layout"
        options={{
          headerShown: false, 
        }}
      />
    </Stack>
  );
}