import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import '../global.css'
import { useState } from 'react'
import { Link } from 'expo-router'
import { AppleAuthButton } from '../components/AppleAuthButton'

export default function PhoneSignIn() {
	const [mobileNumber, setMobileNumber] = useState('')
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={styles.page}>
				<Image
					// source={{ uri: '' }} // Replace with the actual path to your logo image
					style={styles.logo}
				/>

				<Text style={styles.title}>Sign in with your mobile number</Text>

				<View style={styles.formContainer}>
					<TextInput style={styles.input} placeholder="Enter your mobile number" value={mobileNumber} onChangeText={setMobileNumber} keyboardType="phone-pad" />

					<TouchableOpacity style={styles.primaryButton}>
						<Text style={styles.primaryButtonText}>Continue</Text>
					</TouchableOpacity>

					<Text style={styles.helpText}>Need Help?</Text>

					<View style={styles.lineContainer}>
						<View style={styles.line} />
						<Text style={styles.orText}>or</Text>
						<View style={styles.line} />
					</View>

					<View style={styles.socialButtonsContainer}>
						<AppleAuthButton />

						<TouchableOpacity style={styles.socialButton}>
							<Text style={styles.socialButtonText}>G Continue with Google</Text>
						</TouchableOpacity>
					</View>

					<Text style={styles.enrollText}>
						No Account?{' '}
						<Link href="/account-creation" style={styles.enrollLink}>
							Enroll Now
						</Link>
					</Text>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	)
}

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
		backgroundColor: '#e0e0e0', // Placeholder color for the logo
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
	},
	primaryButtonText: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: '600',
	},
	helpText: {
		fontSize: 15,
		color: 'black',
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
		color: '#000080', // Dark blue for emphasis
	},
})
