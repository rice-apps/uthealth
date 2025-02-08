import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { Dimensions, TouchableOpacity, TouchableWithoutFeedback, View, Text, Button } from "react-native";
import WheelPicker from '@quidone/react-native-wheel-picker';

export default function scrollButton() {
    const data = [...Array(32).keys()].map((index) => ({
        value: index,
        label: index.toString(),
    }))
    data.unshift({ value: 'Month', label: 'Month' })
    const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
    const [value, setValue] = useState('Month');
    const [isYearVisible, setYearIsVisible] = useState(false);
    const valueRef = useRef(value);
    const handleValueChanged = ({ item: { value } }) => {
        valueRef.current = value;
        console.log(value)
    };
    const handleYearButtonPress = () => {
        setYearIsVisible(true)
    };
    const handleValueEnd = ({ item: { value } }) => {
        setValue(value)
    }
    const handleTapOutside = () => {
        setValue(valueRef.current)
        console.log("pressed")
        setYearIsVisible(false)
    }
    return (
        <View style={styles.year}>
            <TouchableWithoutFeedback onPress={handleTapOutside} accessible={false}>
                <View style={[styles.wrapper, { width, height }]} onLayout={() => setSize(Dimensions.get('window'))} />
            </TouchableWithoutFeedback>
            {isYearVisible && (
                <View style={styles.year}>
                    <View style={styles.date}>
                        <WheelPicker
                            data={data} // Data to be used by the picker
                            value={value} // Current value
                            onValueChanging={handleValueChanged} // Handle value change
                            onValueChanged={handleValueEnd}
                            renderOverlay={() => null}
                            itemTextStyle={styles.pickerItemText}
                        />
                    </View>
                    <View style={styles.buttonNotTouchable}></View>
                </View>
            )}
            {!isYearVisible && (
                <TouchableOpacity style={styles.button} onPress={handleYearButtonPress}>
                    <Text style={styles.buttonText}>{`${value}`}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
        alignItems: "center",
        position: 'relative',
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 29.52,
        textAlign: "center",
        width: 254,
        paddingTop: 67,
        paddingBottom: 30
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
        pointerEvents: 'none'
    },
    buttonText: {
        fontWeight: '400', // Set font weight
        fontSize: 20, // Set font size
        color: '#844016', // White text color
        fontFamily: 'Proxima Nova',
    },
    year: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickerItemText: {
        color: '#844016',
        fontWeight: '400', // Set font weight
        fontSize: 20,
        fontFamily: 'Space Mono Regular',
    }
});