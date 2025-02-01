import WheelPicker, {
    ValueChangingEvent,
} from '@quidone/react-native-wheel-picker'
import React, { useRef, useState } from 'react'
import {
    View,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { Text, StyleSheet } from 'react-native'

type PickerItem = {
    label: string
    value: number
}

export const DobInput = () => {
    const dayData: PickerItem[] = [...Array(32).keys()].map((index) => {
        return {
            label: index.toString(),
            value: index,
        }
    })
    const monthData: PickerItem[] = [...Array(13).keys()].map((index) => {
        return {
            label: index.toString(),
            value: index,
        }
    })
    const currentYear = new Date().getFullYear()
    const yearData: PickerItem[] = [
        ...Array(currentYear - 1900 + 1).keys(),
    ].map((index) => {
        return {
            label: (currentYear - index).toString(),
            value: currentYear - index,
        }
    })
    const [{ width, height }, setSize] = useState({ width: 0, height: 0 })

    dayData.unshift({ label: 'Day', value: -1 })
    monthData.unshift({ label: 'Month', value: -1 })
    yearData.unshift({ label: 'Year', value: -1 })

    const [day, setDay] = useState<PickerItem>(dayData[0])
    const [month, setMonth] = useState<PickerItem>(monthData[0])
    const [year, setYear] = useState<PickerItem>(yearData[0])

    const monthValueRef = useRef(month)
    const yearValueRef = useRef(year)
    const dayValueRef = useRef(day)

    const [isYearVisible, setIsYearVisible] = useState<boolean>(false)
    const [isMonthVisible, setIsMonthVisible] = useState<boolean>(false)
    const [isDayVisible, setIsDayVisible] = useState<boolean>(false)

    const handleYearButtonPress = () => {
        updateVals()
        setIsYearVisible(true)
        setIsDayVisible(false)
        setIsMonthVisible(false)
    }
    const handleMonthButtonPress = () => {
        updateVals()
        setIsMonthVisible(true)
        setIsYearVisible(false)
        setIsDayVisible(false)
    }
    const handleDayButtonPress = () => {
        updateVals()
        setIsDayVisible(true)
        setIsMonthVisible(false)
        setIsYearVisible(false)
    }

    const handleTapOutside = () => {
        updateVals()
        setIsDayVisible(false)
        setIsMonthVisible(false)
        setIsYearVisible(false)
    }

    const updateVals = () => {
        setMonth(monthValueRef.current)
        setYear(yearValueRef.current)
        setDay(dayValueRef.current)
    }

    const handleYearValueChanging = (item: PickerItem) => {
        yearValueRef.current = item
    }

    const handleMonthValueChanging = (item: PickerItem) => {
        monthValueRef.current = item
    }

    const handleDayValueChanging = (item: PickerItem) => {
        dayValueRef.current = item
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={handleTapOutside}
                accessible={false}
            >
                <View
                    style={[styles.wrapper, { width, height }]}
                    onLayout={() => setSize(Dimensions.get('window'))}
                />
            </TouchableWithoutFeedback>
            <Text style={styles.title}>Date of Birth</Text>
            <View style={styles.row}>
                <View></View>
                <View></View>

                <View style={styles.year}>
                    {isMonthVisible && (
                        <View style={styles.year}>
                            <View style={styles.date}>
                                <WheelPicker
                                    data={monthData} // Data to be used by the picker
                                    value={month.value} // Current value
                                    onValueChanging={(
                                        event: ValueChangingEvent<PickerItem>
                                    ) => handleMonthValueChanging(event.item)} // Handle value change
                                    renderOverlay={() => null}
                                    itemTextStyle={styles.pickerItemText}
                                />
                            </View>
                            <View style={styles.buttonNotTouchable}></View>
                        </View>
                    )}
                    {!isMonthVisible && (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleMonthButtonPress}
                        >
                            <Text
                                style={styles.buttonText}
                            >{`${month.label}`}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={styles.buttonText}>/</Text>

                <View style={styles.year}>
                    {isDayVisible && (
                        <View style={styles.year}>
                            <View style={styles.date}>
                                <WheelPicker
                                    data={dayData} // Data to be used by the picker
                                    value={day.value} // Current value
                                    onValueChanging={(
                                        event: ValueChangingEvent<PickerItem>
                                    ) => handleDayValueChanging(event.item)} // Handle value change
                                    renderOverlay={() => null}
                                    itemTextStyle={styles.pickerItemText}
                                />
                            </View>
                            <View style={styles.buttonNotTouchable}></View>
                        </View>
                    )}
                    {!isDayVisible && (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleDayButtonPress}
                        >
                            <Text
                                style={styles.buttonText}
                            >{`${day.label}`}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={styles.buttonText}>/</Text>

                <View style={styles.year}>
                    {isYearVisible && (
                        <View style={styles.year}>
                            <View style={styles.date}>
                                <WheelPicker
                                    data={yearData} // Data to be used by the picker
                                    value={year.value} // Current value
                                    onValueChanging={(
                                        event: ValueChangingEvent<PickerItem>
                                    ) => handleYearValueChanging(event.item)} // Handle value change
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
                            <Text
                                style={styles.buttonText}
                            >{`${year.label}`}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={styles.container1}>
                <TouchableOpacity style={styles.button1}>
                    <Text style={styles.buttonText1}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
    },
    container1: {
        paddingTop: 287,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 29.52,
        textAlign: 'center',
        width: 254,
        paddingTop: 67,
    },
    date: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginTop: 20,
        width: 200,
    },
    column: {
        alignItems: 'center',
    },
    row: {
        paddingTop: 161,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 50,
        width: '90%',
    },
    wrapper: {
        backgroundColor: 'transparent',
        position: 'absolute',
    },
    button: {
        backgroundColor: 'transparent',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#327689',
        width: 100,
        height: 50,
    },
    button1: {
        backgroundColor: '#327689',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#1E4F5D',
        width: 295,
        height: 65,
    },
    buttonNotTouchable: {
        backgroundColor: 'transparent',
        borderRadius: 50,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#327689',
        width: 100,
        height: 50,
        pointerEvents: 'none',
    },
    buttonText: {
        fontWeight: '400',
        fontSize: 20,
        color: '#327689',
        fontFamily: 'Proxima Nova', // Ensure this font is available
    },
    buttonText1: {
        fontWeight: '400', // Set font weight
        fontSize: 20, // Set font size
        width: 86,
        height: 25,
        color: '#FFFFFF', // White text color
        fontFamily: 'Proxima Nova',
    },
    year: {
        alignItems: 'center',
    },
    pickerItemText: {
        color: '#327689',
        fontWeight: '400',
        fontSize: 20,
        fontFamily: 'Space Mono Regular', // Ensure this font is available
    },
})
