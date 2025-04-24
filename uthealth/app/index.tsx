import { UserProvider } from '@/user/UserContext'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import '../global.css'
import { StyleSheet } from 'react-native'
import { Slot, Redirect } from 'expo-router'
import LandingPage from './landing-page'
import ExerciseList from './exercises_list'
import AccountCreation from './auth/account-creation'
import SignIn from './auth/phone-signin'
export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <SignIn/>
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