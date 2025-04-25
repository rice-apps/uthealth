import React, { useContext, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native'
import { useRouter } from 'expo-router'
import {
    OnboardingContext,
    OnboardingContextType,
} from '../onboarding/OnboardingContext'

// Gender Selection Screen Component
const GenderScreen: React.FC = () => {
    const router = useRouter()
    const { user } = useContext(OnboardingContext) as OnboardingContextType

    const [gender, setGender] = useState('')
    const [showingNext, setShowingNext] = useState(false)
    const handleOptionSelect = (option: string) => {
        setShowingNext(true)
        setGender(option)
        console.log('Selected:', option)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
            >
                <Text style={styles.backButtonText}>{'< Assessment'}</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Gender</Text>

            <View style={styles.optionsContainer}>
                {['Male', 'Female', 'Prefer Not Say'].map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={
                            option === gender
                                ? styles.selected
                                : styles.optionButton
                        }
                        onPress={() => handleOptionSelect(option)}
                    >
                        <Text
                            style={
                                option === gender
                                    ? styles.selectedText
                                    : styles.optionText
                            }
                        >
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {showingNext && (
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                        user.gender = gender
                        router.push('./dobInput')
                    }}
                >
                    <Text style={styles.nextButtonText}>Continue</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    backButtonText: {
        fontSize: 16,
        color: '#888',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionsContainer: {
        width: '100%',
        alignItems: 'center',
    },
    optionButton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 8,
        width: '90%',
        alignItems: 'center',
        color: '#333',
    },
    selected: {
        backgroundColor: '#4D8FAC',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 8,
        width: '90%',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 18,
        color: 'black',
    },
    selectedText: {
        fontSize: 18,
        color: 'white',
    },
    nextButton: {
        backgroundColor: '#4D8FAC',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 30,
        width: '90%',
        alignItems: 'center',
    },
    nextButtonText: {
        fontSize: 18,
        color: '#fff', // White text color for the button
    },
})

// Export GenderScreen if it needs to be used in other parts of the app
export default GenderScreen
