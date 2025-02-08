import { UserProvider } from "@/user/UserContext";
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css'
import HomeScreen from './(tabs)'
import {StyleSheet} from 'react-native'

export default function Index() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <UserProvider>
        <HomeScreen />
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
