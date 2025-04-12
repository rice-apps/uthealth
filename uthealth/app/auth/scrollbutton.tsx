import {
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Text,
} from 'react-native'
import { useRouter } from 'expo-router'
import React, { useState, useRef } from 'react'
import WheelPicker from '@quidone/react-native-wheel-picker'

type PickerItem = {
    value: string | number
    label: string
}

type PickerEvent = {
    item: PickerItem
}

const ScrollButton: React.FC = () => {
    const data: PickerItem[] = [...Array(32).keys()].map((index) => ({
        value: index,
        label: index.toString(),
    }))
    data.unshift({ value: 'Month', label: 'Month' })

    const [{ width, height }, setSize] = useState<{
        width: number
        height: number
    }>({ width: 0, height: 0 })
    const [value, setValue] = useState<string>('Month')
    const [isYearVisible, setYearIsVisible] = useState<boolean>(false)
    const valueRef = useRef<string>(value)

    const handleValueChanged = ({ item: { value } }: PickerEvent) => {
        valueRef.current = value.toString()
        console.log(value)
    }

    const handleValueEnd = ({ item: { value } }: PickerEvent) => {
        setValue(value.toString())
    }

    const handleYearButtonPress = () => {
        setYearIsVisible(true)
    }

    const handleTapOutside = () => {
        setValue(valueRef.current)
        console.log('pressed')
        setYearIsVisible(false)
    }

    return (
        <View style={styles.year}>
            <TouchableWithoutFeedback
                onPress={handleTapOutside}
                accessible={false}
            >
                <View
                    style={[styles.wrapper, { width, height }]}
                    onLayout={() => setSize(Dimensions.get('window'))}
                />
            </TouchableWithoutFeedback>

            {isYearVisible && (
                <View style={styles.year}>
                    <View style={styles.date}>
                        <WheelPicker
                            data={data}
                            value={value}
                            onValueChanging={handleValueChanged}
                            onValueChanged={handleValueEnd}
                            renderOverlay={() => null}
                            itemTextStyle={styles.pickerItemText}
                        />
                    </View>
                    <View style={styles.buttonNotTouchable}></View>
                </View>
            )}

            {!isYearVisible && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleYearButtonPress}
                >
                    <Text style={styles.buttonText}>{`${value}`}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        position: 'relative',
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 29.52,
        textAlign: 'center',
        width: 254,
        paddingTop: 67,
        paddingBottom: 30,
    },
    date: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginTop: 20,
        width: 200,
    },
    wrapper: {
        backgroundColor: 'yellow', // Invisible background
        position: 'absolute', // Optional: keeps it in place
    },
    button: {
        backgroundColor: 'transparent',
        borderRadius: 50, // Rounded corners
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center',
        borderWidth: 2, // Border width
        borderColor: '#844016', // Border color (e.g., white)
        width: 100,
        height: 50,
    },
    buttonNotTouchable: {
        backgroundColor: 'transparent',
        borderRadius: 50, // Rounded corners
        alignItems: 'center', // Center text horizontally
        borderWidth: 2, // Border width
        borderColor: '#844016', // Border color (e.g., white)
        width: 100,
        height: 50,
        pointerEvents: 'none',
    },
    buttonText: {
        fontWeight: '400', // Set font weight
        fontSize: 20, // Set font size
        color: '#844016', // White text color
        fontFamily: 'Proxima Nova',
    },
    year: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerItemText: {
        color: '#844016',
        fontWeight: '400', // Set font weight
        fontSize: 20,
        fontFamily: 'Space Mono Regular',
    },
})

export default ScrollButton
