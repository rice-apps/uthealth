import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { CrimsonText_400Regular } from '@expo-google-fonts/crimson-text';
import { useFonts } from 'expo-font'; // Import useFonts hook
console.log('../assets/fonts/CrimsonText-Regular.ttf')

const WorkoutPlan: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'CrimsonText_400Regular': require('../assets/fonts/CrimsonText-Regular.ttf'), // Make sure the path is correct
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedExercise, setSelectedExercise] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<string>("");

  const categories = [
    { id: "1", name: "Strength Training", icon: "fitness-center" },
    { id: "2", name: "Aerobics", icon: "directions-run" },
  ];

  const strengthExercises = [
    "Bench Press",
    "Squats",
    "Deadlifts",
    "Shoulder Press",
    "Bicep Curls"
  ];

  const aerobicExercises = ["Walk", "Run"];
  const durations = ["5 m", "15 m", "30 m", "45 m", "60 m", "Other"];

  const TaskStatus = ({ status, index }) => {
    let imageSource1, imageSource2, style1, style2;
    index = index + 1

    if (index < status) {
      imageSource1 = require('../assets/images/vector.png');
      imageSource2 = require('../assets/images/check.png');
      style1 = styles.image;
      style2 = styles.check;
    }
    else if (index == status) {
      imageSource1 = require('../assets/images/circle.png');
      imageSource2 = require('../assets/images/line.png');
      style1 = styles.image;
      style2 = styles.line;
    }
    else {
      imageSource1 = require('../assets/images/circle.png');
      style1 = styles.image;
    }

    return (
      <View>
        <Image source={imageSource1} style={style1} />
        {imageSource2 && <Image source={imageSource2} style={style2} />}
      </View>
    );
  };


  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedExercise("");
  };

  const completed = "not completed";

  // Create a new Date object to get the current date and time
  const currentDate = new Date();

  // Get the day of the week as a number (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = currentDate.getDay();

  const exercisesToday = { "Push ups": 1, "Squats": 2, "Plank": 3 }; // For this, I'm using 1 for done, 2 for in progress, and 3 for not started...
  const countValues = (value) => {
    return Object.values(exercisesToday).filter(val => val === value).length;
  };


const Circle = ({ hexColor }) => {
  return (
    <View style={[styles.circle, { backgroundColor: hexColor }]} />
  );
};

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Text style={{ fontSize: 24, fontWeight: 700, marginLeft: 27, marginTop: 87, width: 190, height: 41, color: "#327689", fontFamily: "Instrument Sans" }}>Weekly Progress</Text>
      <Text style={{ fontSize: 16, fontWeight: 700, marginLeft: 27, marginTop: 1, width: 55, height: 41, color: "#898A8D", fontFamily: "Instrument Sans" }}>Week 1</Text>

      <View style={styles.container}>
        {/* Scrollable Box 1 */}

        <ScrollView style={styles.box} scrollEnabled={true}>
          <Text style={styles.boxtitle}>Today:</Text>
          <View>
            {Object.entries(exercisesToday).map(([exercise, index]) => (
              <View key={index}>
                <TaskStatus status={3} index={index} />
                <Text style={styles.content}>{exercise}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Scrollable Box 2 */}
        <ScrollView style={styles.box} scrollEnabled={false}>
          <Text style={styles.boxtitle}>Summary:</Text>
          <View>
            {daysOfWeek.map((day, index) => (
              <View key={index}>
                <TaskStatus status={dayOfWeek} index={index} />
                <Text style={styles.content}>{day}'s tasks</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style= {{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
      }}>
        <ScrollView style={styles.bottombox} scrollEnabled={true}>
          <Text style={styles.boxtitle}>Progress:</Text>
          <View style={{ alignItems: "center", justifyContent: "center", position: "relative", }}>
            <View style = {{ position: "absolute"}}>
            <AnimatedCircularProgress
              size={140}
              width={20}
              fill={countValues(1)/Object.keys(exercisesToday).length*100}
              arcSweepAngle={170}
              lineCap="round"
              tintColor="#451200"
              tintTransparency={true}
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#B3D8E2" 
              style={{transform: [{ rotate: '185deg' }]}}/>
            </View>
            <AnimatedCircularProgress
              size={140}
              width={20}
              fill={(countValues(1)+countValues(2))/Object.keys(exercisesToday).length*100}
              arcSweepAngle={170}
              lineCap="round"
              tintColor="#01546b"
              tintTransparency={true}
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#B3D8E2" 
              style={{opacity: 0.5,  transform: [{ rotate: '185deg' }],}}
              />
            
          <Text style={styles.percent}>{(Math.round((countValues(1)+countValues(2))/Object.keys(exercisesToday).length*100))}%</Text>
          </View>
          <View style={styles.horizontalContainer}>
            <Circle hexColor="#233335" />
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Finished</Text>
            </View>
            <Circle hexColor="#5996a6" />
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>In Progress</Text>
            </View>
            <Circle hexColor="#b3d8e2" />
            <View style={styles.lastContainer}>
              <Text style={styles.labelText}>Not Finished</Text>
            </View>
          </View>

        </ScrollView>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  percent: {
    position: "absolute",
    top: 39,
    fontWeight: 700,
    fontSize: 32,
    color: "#327689",
    fontFamily: "CrimsonText_400Regular",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: 'row', // Places children (boxes) side by side
    justifyContent: 'center', // Spaces boxes evenly
    paddingHorizontal: 17,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // Shadow for Android
    elevation: 5,
  },
  labelContainer: {
    marginLeft: 10, // Space between circle and label
    marginRight: 20,
  },
  lastContainer: {
    marginLeft: 10, // Space between circle and label
  },
  labelText: {
    fontSize: 10,
    fontWeight: 400,
    color: "#898A8D",
  },
  horizontalContainer: {
    top: -30,
    flexDirection: 'row', // Align circles side by side
    justifyContent: 'center', // Center the circles
    alignItems: 'center', // Center vertically
  },
  box: {
    width: 144,
    height: 220,
    borderRadius: 9,
    backgroundColor: '#FCFCFE',
    marginHorizontal: 10, // Adds space between boxes

  },
  bottombox: {
    width: 378,
    height: 181,
    borderRadius: 9,
    marginVertical: 25,
    backgroundColor: '#FCFCFE',
  },
  boxtitle: {
    marginTop: 13,
    fontWeight: 700,
    fontSize: 16,
    marginLeft: 10,
    height: 28,
    //backgroundColor: "#FF0000",
    textAlignVertical: 'center',
  },
  circle: {
    width: 7, // Width of the circle
    height: 7, // Height of the circle (same as width to make it a circle)
    borderRadius: 3.5, // Half of the width/height to make it round
  },
  content: {
    fontWeight: 400,
    fontSize: 16,
    height: 24,
    marginLeft: 28,
    //backgroundColor: "#FF0000",
    color: "#327689",
    fontFamily: "Instrument Sans",
  },
  row: {
    flexDirection: 'row', // Align items in a row (side by side)
  },
  image: {
    marginLeft: 10,
    marginTop: 3,
    width: 13,           // Set the width of the image
    height: 13,          // Set the height of the image
    position: 'absolute',
    //backgroundColor: "#FF0000",
  },
  check: {
    marginLeft: 13,
    marginTop: 5,
    width: 7.76,           // Set the width of the image
    height: 6.48,          // Set the height of the image
    position: 'absolute',
    //backgroundColor: "#FF0000",
  },
  line: {
    marginLeft: 13.5,
    marginTop: 9,
    width: 6,           // Set the width of the image
    height: 1,          // Set the height of the image
    position: 'absolute',
    //backgroundColor: "#FF0000",
  },
  dayContainer: {
    marginBottom: 20, // Space between days
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, // Space between day title and tasks
  },

});


export default WorkoutPlan;