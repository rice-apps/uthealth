import React from 'react'
import { Platform, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import '../global.css'
import * as AppleAuthentication from 'expo-apple-authentication'
import { supabase } from '../app/utils/supabase'

export const AppleAuthButton = () => {
	const handleAppleSignIn = async () => {
		// Only proceed if we're on iOS
		if (Platform.OS === 'ios') {
			try {
				// Request Apple authentication
				const credential = await AppleAuthentication.signInAsync({
					requestedScopes: [],
				})

				// Verify we have an identity token
				if (!credential.identityToken) {
					throw new Error('No identity token received from Apple')
				}

				// Sign in to Supabase with the Apple token
				const {
					error,
					data: { user },
				} = await supabase.auth.signInWithIdToken({
					provider: 'apple',
					token: credential.identityToken,
				})

				if (error) {
					console.error('Supabase sign in error:', error.message)
					Alert.alert('Error', 'Failed to sign in with Apple')
					return
				}

				if (user) {
					console.log('Successfully signed in with Apple:', user.id)
					// Here you can add navigation or other post-sign-in logic
				}
			} catch (error: any) {
				if (error.code === 'ERR_REQUEST_CANCELED') {
					console.log('User canceled Apple sign in')
					// Optional: show a message to the user
				} else {
					console.error('Apple sign in error:', error)
					Alert.alert('Error', 'An error occurred during Apple sign in. Please try again.')
				}
			}
		}
	}

	// Only show the button on iOS
	if (Platform.OS !== 'ios') return null

	return (
		<TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
			<Text style={styles.socialButtonText}> Continue with Apple</Text>
		</TouchableOpacity>
	)
}

const darkOrange = '#844016'
const styles = StyleSheet.create({
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
})
