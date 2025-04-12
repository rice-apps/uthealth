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
    Platform,
    Alert,
} from 'react-native'
import '../../global.css'
import React, { useState, useEffect } from 'react'
import { Link, useRouter } from 'expo-router'
import { AppleAuthButton } from '../../components/AppleAuthButton'
import supabase from '../utils/supabase'
import * as Crypto from 'expo-crypto'

const EmailSignIn: React.FC = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [isIOS, setIsIOS] = useState<boolean>(false)

    useEffect(() => {
        setIsIOS(Platform.OS === 'ios')
    }, [])

    const hashEmail = async (email: string): Promise<string | null> => {
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
            console.log('Email hashed successfully')
            return digest + domain
        } catch (error) {
            console.error('Error hashing email:', error)
            return null
        }
    }

    const signInWithEmail = async (): Promise<void> => {
        if (!email || !password) {
            setError('Email and password are required')
            return
        }
        setIsLoading(true)
        setError('')
        try {
            const hashedEmail = await hashEmail(email)
            if (!hashedEmail) {
                throw new Error('Failed to hash email')
            }

            const { data, error: authError } =
                await supabase.auth.signInWithPassword({
                    email: hashedEmail,
                    password: password,
                })

            if (authError) {
                console.error('Authentication error:', authError)
                throw authError
            }

            Alert.alert(
                'Signed in successfully!',
                'You have successfully signed in',
                [
                    {
                        text: 'OK',
                        onPress: () => router.replace('/exercises_list'),
                    },
                ]
            )
        } catch (error: any) {
            console.error('Error signing in:', error)
            setError(error.message || 'Failed to sign in')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.page}>
                <Image
                    // source={{ uri: '' }} // Replace with the actual path to your logo image
                    style={styles.logo}
                />
                <Text style={styles.title}>Sign in with your email</Text>
                <View style={styles.formContainer}>
                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Email address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={[
                            styles.primaryButton,
                            isLoading && styles.disabledButton,
                        ]}
                        onPress={signInWithEmail}
                        disabled={isLoading}
                    >
                        <Text style={styles.primaryButtonText}>
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.lineContainer}>
                        <View style={styles.line} />
                        <Text style={styles.orText}>or</Text>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.socialButtonsContainer}>
                        {isIOS && <AppleAuthButton />}
                    </View>

                    <Text style={styles.enrollText}>
                        No Account?{' '}
                        <Link
                            href="./account-creation"
                            style={styles.enrollLink}
                        >
                            Enroll Now
                        </Link>
                    </Text>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default EmailSignIn

const darkOrange = '#844016'
const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFF',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
    },
    title: {
        fontSize: 20,
        color: 'black',
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
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
        marginTop: 10,
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
    errorText: {
        color: 'red',
        marginBottom: 16,
        textAlign: 'center',
        width: '100%',
    },
    helpText: {
        fontSize: 15,
        color: darkOrange,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
    },
    line: {
        height: 1,
        backgroundColor: 'gray',
        flex: 1,
        marginHorizontal: 10,
    },
    orText: {
        fontSize: 16,
        color: 'black',
    },
    socialButtonsContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: darkOrange,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 10,
        width: '100%',
        justifyContent: 'center',
    },
    socialButtonText: {
        color: darkOrange,
        fontSize: 16,
        fontWeight: '500',
    },
    enrollText: {
        marginTop: 20,
        fontSize: 15,
        textAlign: 'center',
    },
    enrollLink: {
        fontWeight: 'bold',
        color: '#000080',
    },
})
