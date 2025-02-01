import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "../global.css";
import LandingPage from "./landing-page";
import WeightPage from "./WeightPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{ 
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' }
        }}
      >
        <Stack.Screen name="Home" component={LandingPage} />
        <Stack.Screen name="Weight" component={WeightPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}