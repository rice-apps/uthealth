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

const WorkoutPlan: React.FC = () => {
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
    index=index+1

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

  const DayOfWeek = () => {

    // Array of day names to convert the number to the day of the week
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    // Get the name of the day
    const currentDayName = daysOfWeek[dayOfWeek];

    return (
      currentDayName
    );
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 700, marginLeft: 27, marginTop: 87, width: 190, height: 41, color: "#327689", fontFamily: "Instrument Sans" }}>Weekly Progress</Text>
      <Text style={{ fontSize: 16, fontWeight: 700, marginLeft: 27, marginTop: 1, width: 55, height: 41, color: "#898A8D", fontFamily: "Instrument Sans" }}>Week 1</Text>

      <View style={styles.container}>
        {/* Scrollable Box 1 */}
        <ScrollView style={styles.box}>
          <Text>Box 1</Text>
          <Text>More content...</Text>
          <Text>More content...</Text>
          <Text>More content...</Text>
          <Text>More content...</Text>
          <Text>More content...</Text>
          <Text>More content...</Text>
          <Text>More content...</Text>
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
    </View>


  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Places children (boxes) side by side
    justifyContent: 'center', // Spaces boxes evenly
    paddingHorizontal: 17,
    paddingVertical: 5,
  },
  box: {
    width: 144,
    height: 220,
    borderRadius: 9,
    backgroundColor: '#FCFCFE',
    marginHorizontal: 10, // Adds space between boxes
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