import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LandingPage from './landing-page' // Import your WeightPage component
import WorkoutPage from './WorkoutPage' // Import your WorkoutPage component
import { RootStackParamList } from './types/navigation'

const Stack = createStackNavigator<RootStackParamList>()

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={LandingPage} />
                <Stack.Screen name="WorkoutPage" component={WorkoutPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
