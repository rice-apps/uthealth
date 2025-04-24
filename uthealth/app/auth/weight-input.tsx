// Weight Page
import { StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useContext, useState } from 'react'
import { Pressable, View, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { RulerPicker } from 'react-native-ruler-picker'
import {
    OnboardingContext,
    OnboardingContextType,
} from '../onboarding/OnboardingContext'

export default function WeightScreen() {
    const router = useRouter()
    const { user } = useContext(OnboardingContext) as OnboardingContextType
    const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs')
    const [weight, setWeight] = useState<number>(150)

    const handleUnitChange = (newUnit: 'lbs' | 'kg') => {
        if (newUnit === 'kg' && unit === 'lbs') {
            const kg = Math.round(weight * 0.453592)
            setWeight(kg)
        } else if (newUnit === 'lbs' && unit === 'kg') {
            const lbs = Math.round(weight / 0.453592)
            setWeight(lbs)
        }
        setUnit(newUnit)
    }

    const getMinMax = () => {
        if (unit === 'lbs') {
            return {
                min: 80,
                max: 400,
            }
        } else {
            return {
                min: 36,
                max: 181,
            }
        }
    }

    const handleContinue = () => {
        const weightData =
            unit === 'lbs' ? weight : Math.round(weight * 0.453592)
        user.weight = weightData
        router.push('./height-input')
    }

    const { min, max } = getMinMax()

    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#4D8FAC" />
            </Pressable>

            <Text style={styles.question}>What is your current weight?</Text>

            <View style={styles.toggleContainer}>
                <Pressable
                    style={[
                        styles.toggleButton,
                        unit === 'lbs' && styles.activeToggle,
                    ]}
                    onPress={() => handleUnitChange('lbs')}
                >
                    <Text
                        style={[
                            styles.toggleText,
                            unit === 'lbs' && styles.activeToggleText,
                        ]}
                    >
                        lbs
                    </Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.toggleButton,
                        unit === 'kg' && styles.activeToggle,
                    ]}
                    onPress={() => handleUnitChange('kg')}
                >
                    <Text
                        style={[
                            styles.toggleText,
                            unit === 'kg' && styles.activeToggleText,
                        ]}
                    >
                        kg
                    </Text>
                </Pressable>
            </View>

            <View style={styles.weightContainer}>
                <Text style={styles.weightNumber}>
                    {weight} {unit}
                </Text>
                <RulerPicker
                    min={min}
                    max={max}
                    step={1}
                    initialValue={weight}
                    fractionDigits={0}
                    onValueChange={(value: string) =>
                        setWeight(parseInt(value))
                    }
                    unit=""
                    indicatorColor="#327689"
                    shortStepColor="#B3D8E2"
                    longStepColor="#B3D8E2"
                    valueTextStyle={styles.rulerText}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.continueButton}
                    onPress={handleContinue}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </Pressable>
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
    },
    question: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 29.52,
        textAlign: 'center',
        width: 254,
        paddingTop: 30,
        paddingBottom: 30,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    toggleButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    toggleText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.68,
        color: '#4D8FAC',
    },
    activeToggle: {
        backgroundColor: '#4D8FAC',
    },
    activeToggleText: {
        color: 'white',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 1,
    },
    weightContainer: {
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
    weightNumber: {
        fontSize: 86,
        textAlign: 'center',
        marginBottom: -10,
        color: '#4D8FAC',
        fontWeight: '700',
    },
    rulerText: {
        fontSize: 24,
        color: '#4D8FAC',
        fontWeight: '600',
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    continueButton: {
        backgroundColor: '#4D8FAC',
        padding: 20,
        borderRadius: 30,
        alignItems: 'center',
        width: '100%',
    },
    continueButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
})
