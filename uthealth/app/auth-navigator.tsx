import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './phone-signin';
import CreateAccount from './account-creation';
// import Gender from './gender'; 
import DateOfBirth from './dobInput';
import Weight from './weight-input';
import Height from './height-input';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AuthStackParamList = {
	SignIn: undefined;
	CreateAccount: { firstName: string; lastName: string; phone: string; email: string; password: string};
	// Gender: { gender: string}; 
	DateOfBirth: { month: string; day: string; year: string};
	Weight: { weight: string}; 
    Height: { height: string}; 
};

export default function AuthNavigator() {
	const Stack = createNativeStackNavigator<AuthStackParamList>();

	return (
		<Stack.Navigator
			initialRouteName="SignIn"
			screenOptions={{
				headerShown: false, // This hides the header for all screens
				contentStyle: {
					backgroundColor: 'white',
				},
			}}
		>
			<Stack.Screen name="SignIn" component={SignIn} />
			<Stack.Screen name="CreateAccount" component={CreateAccount} />
			{/* <Stack.Screen name="Gender" component={Gender} /> */}
			<Stack.Screen name="DateOfBirth" component={DateOfBirth} />
			<Stack.Screen name="Weight" component={Weight} />
            <Stack.Screen name="Height" component={Height} />
		</Stack.Navigator>
	);
}