import { Stack } from 'expo-router'
import { NavigationContainer } from '@react-navigation/native'

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="WorkoutPage" />
        </Stack>
    )
}
