import {
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Text,
    GestureResponderEvent,
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import WheelPicker from '@quidone/react-native-wheel-picker'

type PickerItem = {
    value: string | number
    label: string
}

type PickerEvent = {
    item: PickerItem
}

type ScrollButtonProps = {
    data: PickerItem[]
    value: PickerItem
    setValue: (value: PickerItem) => void
    isVisible: boolean
    setIsVisible: (value: boolean) => void
    valueRef: React.MutableRefObject<PickerItem>
}

const ScrollButton: React.FC<ScrollButtonProps> = ({
    data,
    value,
    setValue,
    isVisible,
    setIsVisible,
    valueRef,
}) => {
    const [{ width, height }, setSize] = useState<{
        width: number
        height: number
    }>({ width: 0, height: 0 })

    const handleValueEnd = ({ item }: PickerEvent) => {
        setValue(item)
        valueRef.current = item
    }

    const handleYearButtonPress = () => {
        console.log(data)
        setIsVisible(true)
    }

    const handleTapOutside = () => {
        setIsVisible(false)
    }

    useEffect(() => {
        console.log(data)
    }, [])

    return (
        <View style={styles.year}>
            {isVisible && (
                <>
                    <TouchableWithoutFeedback onPress={handleTapOutside}>
                        <View style={styles.fullscreenOverlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.year}>
                        <View style={styles.date}>
                            <WheelPicker
                                data={data}
                                value={value.value}
                                onValueChanged={handleValueEnd}
                                renderOverlay={() => null}
                                itemTextStyle={styles.pickerItemText}
                            />
                        </View>
                        <View style={styles.buttonNotTouchable}></View>
                    </View>
                </>
            )}

            {!isVisible && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleYearButtonPress}
                >
                    <Text style={styles.buttonText}>{value.label}</Text>
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
    fullscreenOverlay: {
        ...StyleSheet.absoluteFillObject, // { position:'absolute', top:0,left:0,right:0,bottom:0 }
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
        backgroundColor: 'transparent', // Invisible background
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
