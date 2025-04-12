// Height Page
import { StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, View, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { RulerPicker } from 'react-native-ruler-picker'

export default function HeightScreen() {
    const router = useRouter()
    const [unit, setUnit] = useState<'ft' | 'cm'>('ft')
    const [totalInches, setTotalInches] = useState<number>(64)

    const handleUnitChange = (newUnit: 'ft' | 'cm') => {
        if (newUnit === 'cm' && unit === 'ft') {
            const cm = Math.round(totalInches * 2.54)
            setTotalInches(cm)
        } else if (newUnit === 'ft' && unit === 'cm') {
            const inches = Math.round(totalInches / 2.54)
            setTotalInches(inches)
        }
        setUnit(newUnit)
    }

    const formatHeight = (inches: number): string => {
        const feet = Math.floor(inches / 12)
        const remainingInches = inches % 12
        return `${feet}'${remainingInches}"`
    }

    const getMinMax = () => {
        if (unit === 'ft') {
            return {
                min: 48,
                max: 96,
            }
        } else {
            return {
                min: 120,
                max: 220,
            }
        }
    }

    const handleContinue = () => {
        const height =
            unit === 'ft'
                ? {
                      feet: Math.floor(totalInches / 12),
                      inches: totalInches % 12,
                      totalInches: totalInches,
                  }
                : {
                      cm: totalInches,
                  }

        router.back()
    }

    const { min, max } = getMinMax()

    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#C3592F" />
            </Pressable>

            <Text style={styles.question}>What is your current height?</Text>

            <View style={styles.toggleContainer}>
                <Pressable
                    style={[
                        styles.toggleButton,
                        unit === 'ft' && styles.activeToggle,
                    ]}
                    onPress={() => handleUnitChange('ft')}
                >
                    <Text
                        style={[
                            styles.toggleText,
                            unit === 'ft' && styles.activeToggleText,
                        ]}
                    >
                        ft
                    </Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.toggleButton,
                        unit === 'cm' && styles.activeToggle,
                    ]}
                    onPress={() => handleUnitChange('cm')}
                >
                    <Text
                        style={[
                            styles.toggleText,
                            unit === 'cm' && styles.activeToggleText,
                        ]}
                    >
                        cm
                    </Text>
                </Pressable>
            </View>

            {unit === 'ft' ? (
                <View style={styles.heightContainer}>
                    <Text style={styles.heightNumber}>
                        {formatHeight(totalInches)}
                    </Text>
                    <RulerPicker
                        min={min}
                        max={max}
                        step={1}
                        initialValue={totalInches}
                        fractionDigits={0}
                        onValueChange={(value: string) => {
                            const inches = parseInt(value)
                            setTotalInches(inches)
                        }}
                        unit=""
                        indicatorColor="#327689"
                        shortStepColor="#B3D8E2"
                        longStepColor="#B3D8E2"
                        valueTextStyle={styles.rulerText}
                    />
                </View>
            ) : (
                <View style={styles.heightContainer}>
                    <Text style={styles.heightNumber}>{totalInches} cm</Text>
                    <RulerPicker
                        min={min}
                        max={max}
                        step={1}
                        initialValue={totalInches}
                        fractionDigits={0}
                        onValueChange={(value: string) =>
                            setTotalInches(parseInt(value))
                        }
                        unit=""
                        indicatorColor="#327689"
                        shortStepColor="#B3D8E2"
                        longStepColor="#B3D8E2"
                        valueTextStyle={styles.rulerText}
                    />
                </View>
            )}

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
        color: '#C3592F',
    },
    activeToggle: {
        backgroundColor: '#C3592F',
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
    heightContainer: {
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
    heightNumber: {
        fontSize: 86,
        textAlign: 'center',
        marginBottom: -10,
        color: '#C3592F',
        fontWeight: '700',
    },
    rulerText: {
        fontSize: 24,
        color: '#C3592F',
        fontWeight: '600',
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    continueButton: {
        backgroundColor: '#C3592F',
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
