import { UserProvider } from '@/user/UserContext'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import '../global.css'
import { StyleSheet } from 'react-native'
import { Slot, Redirect } from 'expo-router'
import LandingPage from './landing-page'

export default function Index() {
  // Wrap the LandingPage with necessary context providers
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <LandingPage />
      </UserProvider>
    </GestureHandlerRootView>
  );
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