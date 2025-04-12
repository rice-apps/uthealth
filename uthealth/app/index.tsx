import { UserProvider } from '@/user/UserContext'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import '../global.css'
import HomeScreen from './(tabs)'
import { StyleSheet } from 'react-native'
import LandingPage from './landing-page'

export default function Index() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <UserProvider>
                <LandingPage />
            </UserProvider>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
    },
})
