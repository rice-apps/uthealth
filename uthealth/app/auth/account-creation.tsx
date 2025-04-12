import {
    View,
    Text,
    TextInput,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Alert,
} from 'react-native'
import { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import supabase from '../utils/supabase'
import * as Crypto from 'expo-crypto'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../auth-navigator'

type Props = NativeStackScreenProps<AuthStackParamList, 'AccountCreation'>

// export default function AccountCreation({ navigation }: Props) {
// 	const [firstName, setFirstName] = useState<string>('');
// 	const [lastName, setLastName] = useState<string>('');
// 	const [phoneNumber, setPhoneNumber] = useState<string>('');
// 	const [email, setEmail] = useState<string>('');
// 	const [password, setPassword] = useState<string>('');
// 	const [reenterPassword, setReenterPassword] = useState<string>('');

// 	async function validAccountNavigate() {

// 		if (password == reenterPassword) {
// 			navigation.navigate( 'Gender', {
// 				firstName: firstName,
// 				lastName: lastName,
// 				phoneNumber: phoneNumber,
// 				email: email,
// 				password: password})
// 		} else {
// 			Alert.alert('Error', 'Passwords fo not match', [
// 				{ text: 'OK'},
// 			]);
// 		}

// 	}

// 	return
// }

export default function AccountCreation() {
    type UserData = {
        firstName: string
        lastName: string
        email: string
        password: string
        reenterPassword: string
    }

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState<UserData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        reenterPassword: '',
    })

    const handleChange = (name: keyof UserData, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const hashEmailUsername = async (email: string): Promise<string> => {
        try {
            const atIndex = email.indexOf('@')
            if (atIndex === -1) {
                throw new Error('Invalid email format: missing @ symbol')
            }
            const username = email.substring(0, atIndex).toLowerCase().trim()
            const domain = email.substring(atIndex).toLowerCase().trim()
            const digest = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                username
            )
            return digest + domain
        } catch (error) {
            throw error
        }
    }

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName) {
            setError('First and last name are required')
            return false
        }

        if (!formData.email) {
            setError('Email is required')
            return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address')
            return false
        }

        if (!formData.password) {
            setError('Password is required')
            return false
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            return false
        }

        if (formData.password !== formData.reenterPassword) {
            setError('Passwords do not match')
            return false
        }

        return true
    }

    const signUpNewUser = async () => {
        setError(null)

        if (!validateForm()) {
            return
        }
        setIsLoading(true)

        try {
            const hashedUsername = await hashEmailUsername(formData.email)
            const { data, error: authError } = await supabase.auth.signUp({
                email: hashedUsername,
                password: formData.password,
            })
            if (authError) {
                throw authError
            }
            if (!data.user) {
                throw new Error('User data not returned from signup')
            }
            Alert.alert(
                'Account Created',
                'Your account has been created successfully',
                [{ text: 'OK', onPress: () => router.replace('/dobInput') }]
            )
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to create account'
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContainer}
                keyboardShouldPersistTaps="handled"
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.page}>
                        <Image
                            // source={{ uri: '' }} // Replace with the actual path to your logo image
                            style={styles.logo}
                        />

                        {error && <Text style={styles.errorText}>{error}</Text>}

                        <View style={styles.formContainer}>
                            <Text style={styles.inputLabel}>First Name</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.firstName}
                                onChangeText={(value) =>
                                    handleChange('firstName', value)
                                }
                            />

                            <Text style={styles.inputLabel}>Last Name</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.lastName}
                                onChangeText={(value) =>
                                    handleChange('lastName', value)
                                }
                            />
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.email}
                                onChangeText={(value) =>
                                    handleChange('email', value)
                                }
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.password}
                                onChangeText={(value) =>
                                    handleChange('password', value)
                                }
                                secureTextEntry
                            />

                            <Text style={styles.inputLabel}>
                                Confirm Password
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={formData.reenterPassword}
                                onChangeText={(value) =>
                                    handleChange('reenterPassword', value)
                                }
                                secureTextEntry
                            />

                            <TouchableOpacity
                                style={[
                                    styles.primaryButton,
                                    isLoading && styles.disabledButton,
                                ]}
                                onPress={signUpNewUser}
                                disabled={isLoading}
                            >
                                <Text style={styles.primaryButtonText}>
                                    {isLoading
                                        ? 'Creating Account...'
                                        : 'Create Account'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.secondaryButton}
                                onPress={() => router.back()}
                            >
                                <Text style={styles.secondaryButtonText}>
                                    Back to Sign In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    )
}

const darkOrange = '#844016'
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    page: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 30,
        marginTop: 30,
        borderRadius: 10,
        backgroundColor: '#e0e0e0', // Placeholder color for the logo
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
        textAlign: 'center',
        width: '100%',
    },
    inputLabel: {
        fontSize: 15,
        color: 'black',
        marginBottom: 4,
        alignSelf: 'flex-start',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: darkOrange,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#FFF',
        color: darkOrange,
    },
    primaryButton: {
        backgroundColor: darkOrange,
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
        width: '100%',
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    primaryButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
        marginBottom: 30,
    },
    secondaryButtonText: {
        color: darkOrange,
        fontSize: 16,
        fontWeight: '600',
    },
    enrollLink: {
        fontWeight: 'bold',
        color: '#000080',
        alignSelf: 'flex-start',
    },
})
