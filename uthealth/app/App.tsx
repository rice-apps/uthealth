import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './landing-page'; // Import your WeightPage component
import WorkoutPage from './WorkoutPage'; // Import your WorkoutPage component

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WorkoutPage" component={WorkoutPage} />
      <Stack.Screen name="Home" component={LandingPage} />
    </Stack.Navigator>
  );
}

export default App;