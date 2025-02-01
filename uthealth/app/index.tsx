import { Text, View } from 'react-native'
import ScrollButton from './scrollbutton'
import { StyleSheet } from 'react-native'
import { DobInput } from './dobInput'

export default function Index() {
    return <DobInput />
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
