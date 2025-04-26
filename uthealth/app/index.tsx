import 'react-native-gesture-handler'
import '../global.css'
import { StyleSheet } from 'react-native'
import { Redirect } from 'expo-router'
export default function Index() {
    return <Redirect href="./landing-page" />
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
