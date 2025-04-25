import { Stack } from 'expo-router'
import { Text } from 'react-native'
import { OnboardingProvider } from './onboarding/OnboardingContext'

export default function RootLayout() {
    return (
        <OnboardingProvider>
            <Stack>
                <Stack.Screen name="index" />
            </Stack>
        </OnboardingProvider>
    )
}
