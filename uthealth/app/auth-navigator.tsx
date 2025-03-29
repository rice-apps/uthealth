import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SignIn from './phone-signin';
import AccountCreation from './account-creation';
// import Gender from './gender'; 
import DateOfBirth from './dobInput';
import Weight from './weight-input';
import Height from './height-input';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AuthStackParamList = {
    // not sure if signin is needed
	// SignIn: undefined;
	AccountCreation: undefined;
	// Gender: { firstName: string; lastName: string; phone: string; email: string; password: string}; 
	DateOfBirth: { firstName: string; lastName: string; phone: string; email: string; password: string, gender: string};
	Weight: { firstName: string; lastName: string; phone: string; email: string; password: string, gender: string, month: string; day: string; year: string}; 
    Height: { firstName: string; lastName: string; phone: string; email: string; password: string, gender: string, month: string; day: string; year: string, weight: string}; 
};

export default function AuthNavigator() {
	const Stack = createNativeStackNavigator<AuthStackParamList>();

	return (
		<Stack.Navigator
			initialRouteName="AccountCreation"
			screenOptions={{
				headerShown: false, // This hides the header for all screens
				contentStyle: {
					backgroundColor: 'white',
				},
			}}
		>
			{/* <Stack.Screen name="SignIn" component={SignIn} /> */}
			<Stack.Screen name="AccountCreation" component={AccountCreation} />
			{/* <Stack.Screen name="Gender" component={Gender} /> */}
			<Stack.Screen name="DateOfBirth" component={DateOfBirth} />
			<Stack.Screen name="Weight" component={Weight} />
            <Stack.Screen name="Height" component={Height} />
		</Stack.Navigator>
	);
}