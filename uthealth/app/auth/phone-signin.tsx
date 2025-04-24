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
import React, { useState, useEffect, useContext } from 'react'
import { Link, useRouter } from 'expo-router'
import supabase from '../utils/supabase'
import * as Crypto from 'expo-crypto'
import {
    OnboardingContext,
    OnboardingContextType,
} from '../onboarding/OnboardingContext'
import { ScrollView } from 'react-native'

const EmailSignIn: React.FC = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [isIOS, setIsIOS] = useState<boolean>(false)
    const { user } = useContext(OnboardingContext) as OnboardingContextType

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
        setError(null)

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

            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('patientID, clinicianID, onboarded')
                .eq('user_uuid', data.user.id)
                .maybeSingle()

            if (userError) {
                throw userError
            }

            if (!userData?.onboarded) {
                user.patientID = userData?.patientID
                user.clinicianID = userData?.clinicianID
                router.push('./gender')
                return
            }

            Alert.alert(
                'Signed in successfully!',
                'You have successfully signed in',
                [
                    {
                        text: 'OK',
                        onPress: () => router.push('./exercises_list'),
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
        <SafeAreaView style={styles.page}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.inner}>
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../../assets/images/ut_health.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.title}>
                            Sign in with your email
                        </Text>
                        <View style={styles.formContainer}>
                            {error && (
                                <Text style={styles.errorText}>{error}</Text>
                            )}

                            <TextInput
                                style={styles.input}
                                placeholder="Email address"
                                placeholderTextColor="lightgray"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="lightgray"
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
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default EmailSignIn

const darkOrange = '#844016'
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#FFF',
        height: '100%',
    },
    inner: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 100,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 180,
        height: 180,
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
        borderColor: '#4D8FAC',
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#FFF',
        color: darkOrange,
    },
    primaryButton: {
        backgroundColor: '#4D8FAC',
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
