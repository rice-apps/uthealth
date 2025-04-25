import { useContext, useRef, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, StyleSheet, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import {
    OnboardingContext,
    OnboardingContextType,
} from '../onboarding/OnboardingContext'
import ScrollButton from './scrollbutton'

type PickerItem = {
    label: string
    value: string | number
}

const DobInput = () => {
    const { user } = useContext(OnboardingContext) as OnboardingContextType
    const router = useRouter()

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

    dayData.unshift({ label: 'Day', value: -1 })
    monthData.unshift({ label: 'Month', value: -1 })
    yearData.unshift({ label: 'Year', value: -1 })

    const [day, setDay] = useState<PickerItem>(dayData[0])
    const [month, setMonth] = useState<PickerItem>(monthData[0])
    const [year, setYear] = useState<PickerItem>(yearData[0])

    const monthValueRef = useRef<PickerItem>(month)
    const yearValueRef = useRef<PickerItem>(year)
    const dayValueRef = useRef<PickerItem>(day)

    const [isYearVisible, setIsYearVisible] = useState<boolean>(false)
    const [isMonthVisible, setIsMonthVisible] = useState<boolean>(false)
    const [isDayVisible, setIsDayVisible] = useState<boolean>(false)

    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#327689" />
            </Pressable>
            <Text style={styles.title}>Date of Birth</Text>
            <View style={styles.row}>
                <ScrollButton
                    key={0}
                    data={monthData}
                    isVisible={isMonthVisible}
                    valueRef={monthValueRef}
                    setIsVisible={setIsMonthVisible}
                    value={month}
                    setValue={(value: PickerItem) => setMonth(value)}
                />
                <ScrollButton
                    key={1}
                    data={dayData}
                    isVisible={isDayVisible}
                    valueRef={dayValueRef}
                    setIsVisible={setIsDayVisible}
                    value={day}
                    setValue={(value: PickerItem) => setDay(value)}
                />
                <ScrollButton
                    key={2}
                    data={yearData}
                    isVisible={isYearVisible}
                    valueRef={yearValueRef}
                    setIsVisible={setIsYearVisible}
                    value={year}
                    setValue={(value: PickerItem) => setYear(value)}
                />
            </View>
            <View style={styles.container1}>
                <TouchableOpacity
                    style={styles.button1}
                    onPress={() => {
                        if (
                            year.value !== 'Year' &&
                            month.value !== 'Month' &&
                            day.value !== 'Day'
                        ) {
                            user.dob = new Date(
                                Number(year.value),
                                Number(month.value),
                                Number(day.value)
                            )
                            router.push('./weight-input')
                        }
                    }}
                >
                    <Text style={styles.buttonText1}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 1,
    },
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

export default DobInput
