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
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import "../global.css";
import { createClient } from '@supabase/supabase-js';

const RANGE = 20;
const ITEM_WIDTH = 64;
const ITEM_MARGIN_HORIZONTAL = 8;

const supabaseUrl = 'https://gsohwqqwqdpitvrkhllr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdzb2h3cXF3cWRwaXR2cmtobGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5MTk2MTksImV4cCI6MjA0MzQ5NTYxOX0.C_b3_mhustra9gzCMGsTISTf-J8wEklQMDArpwESRVM';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);




interface DateItem {
  id: string;
  dayName: string;
  dayNumber: number;
  fullDate: Date;
}

interface Activity {
  id: string;
  name: string;
  category: string;
  date: Date;
}

interface ActivityModalProps {
  visible: boolean;
  onClose: () => void;
  onAddActivity: (activity: {
    name: string;
    category: string;
    // date: Date;
    reps?: number;
    weight?: number;
    time?: number;
  }) => void;
  // selectedDate: Date;
}

// ActivityModal Component
const ActivityModal: React.FC<ActivityModalProps> = ({ visible, onClose, onAddActivity, selectedDate }) => {
  
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedExercise, setSelectedExercise] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const[reps, setReps] = useState<number>(0);
  const[weight, setWeight] = useState<number>(0);

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
  
  const handleAdd = () => {

    if (selectedCategory) {
      const category = categories.find(c => c.id === selectedCategory)?.name || '';
      
      if (selectedExercise && selectedDuration) {
        
        const isStrength = category === "Strength Training";

        if (isStrength && reps && weight) {

          onAddActivity({
            name: selectedExercise,
            category,
            //date: selectedDate,
            reps: parseInt(reps.toString(), 10),
            weight: parseFloat(weight.toString())
          });

          setReps(0);
          setWeight(0);
          setSelectedCategory("");
          setSelectedExercise("");
          setSelectedDuration("");
          onClose();

        } else if (!isStrength && selectedDuration) {
          onAddActivity({
            name: selectedExercise,
            category,
            //date: selectedDate,
            time: parseFloat(selectedDuration.toString()),
          });
          
          setSelectedCategory("");
          setSelectedExercise("");
          setSelectedDuration("");
          onClose();
          
        }

        const handleCategorySelect = (categoryId: string) => {
          setSelectedCategory(categoryId);
          setSelectedExercise("");
          setReps(0);
          setWeight(0);
          setSelectedDuration("");
        };
        
      /* onAddActivity({
          name: `${selectedExercise}`,
          category,
          date: selectedDate,
          ...(isStrength
            ? {
                reps: 10,         // you can customize this or add inputs later
                weight: 50,       // same here
              }
            : {
                time: selectedDuration,
              }),
        });
        setSelectedCategory("");
        setSelectedExercise("");
        setSelectedDuration("");
        onClose(); */
      }
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedExercise("");
  };

  


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-3xl p-6 w-11/12 max-w-lg">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-semibold text-[#512B81]">Add activity</Text>
            <TouchableOpacity onPress={onClose} className="p-2">
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Category Selection */}
          <View className="mb-6">
            <Text className="text-gray-600 mb-3">Choose Category</Text>
            <View className="flex-row gap-3">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => handleCategorySelect(category.id)}
                  className={`flex-1 flex-row items-center justify-center px-4 py-3 rounded-full border ${
                    selectedCategory === category.id
                      ? "bg-[#512B81] border-[#512B81]"
                      : "border-gray-200"
                  }`}
                >
                  <Icon
                    name={category.icon}
                    size={20}
                    color={selectedCategory === category.id ? "#fff" : "#666"}
                  />
                  <Text
                    className={`ml-2 font-medium ${
                      selectedCategory === category.id ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Exercise Selection */}
          {selectedCategory && (
            <View className="mb-6">
              <Text className="text-gray-600 mb-3">Choose Exercise</Text>
              {selectedCategory === "1" ? (
                <ScrollView className="max-h-48">
                  <View className="space-y-2">
                    {strengthExercises.map((exercise) => (
                      <TouchableOpacity
                        key={exercise}
                        onPress={() => setSelectedExercise(exercise)}
                        className={`p-3 rounded-xl border ${
                          selectedExercise === exercise
                            ? "bg-[#512B81] border-[#512B81]"
                            : "border-gray-200"
                        }`}
                      >
                        <Text 
                          className={`text-center font-medium ${
                            selectedExercise === exercise ? "text-white" : "text-gray-700"
                          }`}
                        >
                          {exercise}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              ) : (
                <View className="space-y-2">
                  {aerobicExercises.map((exercise) => (
                    <TouchableOpacity
                      key={exercise}
                      onPress={() => setSelectedExercise(exercise)}
                      className={`p-3 rounded-xl border ${
                        selectedExercise === exercise
                          ? "bg-[#512B81] border-[#512B81]"
                          : "border-gray-200"
                      }`}
                    >
                      <Text 
                        className={`text-center font-medium ${
                          selectedExercise === exercise ? "text-white" : "text-gray-700"
                        }`}
                      >
                        {exercise}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Duration Selection */}
          {selectedExercise && (
            <View className="mb-6">
              <Text className="text-gray-600 mb-3">Select Duration</Text>
              <View className="flex-row flex-wrap gap-2">
                {durations.map((duration) => (
                  <TouchableOpacity
                    key={duration}
                    onPress={() => setSelectedDuration(duration)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedDuration === duration
                        ? "bg-[#512B81] border-[#512B81]"
                        : "border-gray-200"
                    }`}
                  >
                    <Text
                      className={`font-medium ${
                        selectedDuration === duration ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {duration}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Timer Section */}
          {selectedDuration && (
            <View className="flex-row items-center mb-6">
              <Icon name="timer" size={24} color="#512B81" />
              <Text className="ml-2 text-gray-600">Timer</Text>
            </View>
          )}

          {/* Add Button */}
          <TouchableOpacity
            onPress={handleAdd}
            disabled={!selectedCategory || !selectedExercise || !selectedDuration}
            className={`rounded-xl py-3 px-6 flex-row justify-between items-center ${
              selectedCategory && selectedExercise && selectedDuration
                ? "bg-[#512B81]"
                : "bg-gray-200"
            }`}
          >
            <Text 
              className={`font-semibold ${
                selectedCategory && selectedExercise && selectedDuration
                  ? "text-white"
                  : "text-gray-400"
              }`}
            >
              Add Activity
            </Text>
            {selectedCategory && selectedExercise && selectedDuration && (
              <Icon name="arrow-forward" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Helper function
const generateSurroundingDates = (centerDate: Date, range = RANGE): DateItem[] => {
  const dates = [];
  for (let i = -range; i <= range; i++) {
    const newDate = new Date(centerDate);
    newDate.setDate(centerDate.getDate() + i);
    dates.push({
      id: `${newDate.toISOString()}`,
      dayName: newDate.toLocaleDateString("en-US", { weekday: "short" }),
      dayNumber: newDate.getDate(),
      fullDate: newDate,
    });
  }
  return dates;
};

const LandingPage: React.FC = () => {
  const navigation = useNavigation();
  const [activityToDelete, setActivityToDelete] = useState<Activity | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [isActivityModalVisible, setActivityModalVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2024, 5, 21));
  const [dates, setDates] = useState<DateItem[]>(generateSurroundingDates(new Date(2024, 5, 21)));
  const [activities, setActivities] = useState<Activity[]>([]);

  const flatListRef = useRef<FlatList<DateItem>>(null);
  const middleIndex = RANGE;

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: middleIndex,
        animated: false,
        viewPosition: 0.5,
      });
    }
  }, []);

  const handleDeleteActivity = () => {
    if (activityToDelete) {
      setActivities(prev => prev.filter(activity => activity.id !== activityToDelete.id));
      setActivityToDelete(null);
    }
  };

  const checkConnection = async () => {
    console.log("Testing Supabase connection...");
    try {
      // Try the simplest possible query
      const { data, error } = await supabase
        .from('activities')
        .select('id')
        .limit(1);
      
      console.log("Connection test result:", { data, error });
      return { data, error };
    } catch (e) {
      console.error("Connection test exception:", e);
      return { error: e };
    }
  };
  
  // Call this function before trying to insert
  (async () => {
    await checkConnection();
  })();
  
  const listTables = async () => {
    console.log("Listing all tables in the database...");
    try {
      const { data, error } = await supabase
        .from('pg_catalog.pg_tables')
        .select('schemaname, tablename')
        .eq('schemaname', 'public');
      
      console.log("Available tables:", data);
      return { data, error };
    } catch (e) {
      console.error("Error listing tables:", e);
      return { error: e };
    }
  };
  
  const handleAddActivity = async (newActivity: {
    name: string;
    category: string;
    //date: Date;
    reps?: number;
    weight?: number;
    time?: number;
  }) => {
    const { data, error } = await supabase
      .from('activities')
      .insert([{
        name: newActivity.name,
        category: newActivity.category,
        //date: newActivity.date.toISOString(),
        reps: newActivity.reps ?? null,
        weight: newActivity.weight ?? null,
        time: newActivity.time ?? null,
      }]);

      console.log(newActivity);
  
    if (error) {
      console.error("Full Supabase error:", error);
      /*console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Error details:", error.details);*/
      return;
    }
  
    const savedActivity: Activity = {
      id: data && data[0] ? data[0].id : '',
      name: data[0].name,
      category: data[0].category,
      date: new Date(data[0].date),
    };
  
    setActivities(prev => [...prev, savedActivity]);
  };
  

  /* const handleAddActivity = async (newActivity: {
  name: string;
  category: string;
  reps?: number;
  weight?: number;
  time?: number;
}) => {
  try {
    // Prepare the activity object
    const activityData = {
      name: newActivity.name,
      category: newActivity.category,
      reps: newActivity.reps ?? null, // Use null if not provided
      weight: newActivity.weight ?? null, // Use null if not provided
      time: newActivity.time ?? null, // Use null if not provided
    };

    // Log activity data to check before sending to Supabase
    console.log("Activity data being inserted: ", activityData);

    // Insert the activity into the Supabase table
    const { data, error } = await supabase
      .from('activities')
      .insert([activityData]);

    // Check for error
    if (error) {
      console.error("Error adding activity to Supabase:", error.message);
      return;
    }

    // Log the result from Supabase for debugging
    console.log("Activity added successfully:", data);

    // Prepare the saved activity object
    const savedActivity: Activity = {
      id: data[0].id,
      name: data[0].name,
      category: data[0].category,
      date: new Date(data[0].date),
    };

    // Update the activities state
    setActivities(prev => [...prev, savedActivity]);

  } catch (error) {
    console.error("Unexpected error during insert:", error.message);
  }
};

*/


  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    const newDates = generateSurroundingDates(date);
    setDates(newDates);
    setSelectedDate(date);
    
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: middleIndex,
          animated: false,
          viewPosition: 0.5,
        });
      }
    }, 0);
    
    hideDatePicker();
  };

  const handleCardSelect = (fullDate: Date) => {
    setSelectedDate(fullDate);
  };

  const getItemLayout = (_data: any, index: number) => ({
    length: ITEM_WIDTH + ITEM_MARGIN_HORIZONTAL,
    offset: (ITEM_WIDTH + ITEM_MARGIN_HORIZONTAL) * index,
    index,
  });

  const todayActivities = activities.filter(
    activity => activity.date.toDateString() === selectedDate.toDateString()
  );

  const renderCalendarCard = ({ item }: { item: DateItem }) => {
    const isSelected = item.fullDate.toDateString() === selectedDate.toDateString();
    return (
      <TouchableOpacity
        onPress={() => handleCardSelect(item.fullDate)}
        className={`w-14 h-16 items-center justify-center mx-1 rounded-xl ${
          isSelected ? "bg-[#512B81]" : "bg-white"
        } shadow-sm`}
        style={{
          elevation: 2,
        }}
      >
        <Text 
          className={`text-sm font-medium ${isSelected ? "text-white" : "text-[#FF715B]"}`}
        >
          {item.dayName}
        </Text>
        <Text 
          className={`text-lg font-semibold ${isSelected ? "text-white" : "text-black"}`}
        >
          {item.dayNumber}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 pt-4">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-2xl font-semibold">
                {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
              </Text>
              <Text className="text-gray-500">
                {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </Text>
            </View>
            <TouchableOpacity
              onPress={showDatePicker}
              className="bg-white p-3 rounded-full shadow-sm"
            >
              <Icon name="calendar-today" size={24} color="#512B81" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1">
          {/* Calendar Strip */}
          <View className="mt-4">
            <FlatList
              ref={flatListRef}
              horizontal
              data={dates}
              renderItem={renderCalendarCard}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              getItemLayout={getItemLayout}
            />
          </View>

          {/* Activities Section */}
          <View className="px-4 mt-6">
            <Text className="text-xl font-bold mb-4">Today's Activities</Text>
            {todayActivities.length === 0 ? (
              <View className="bg-white rounded-xl p-4 shadow-sm">
                <Text className="text-gray-500 text-center">No activities for today</Text>
              </View>
            ) : (
              <View className="space-y-3">
                {todayActivities.map((activity) => (
                  <TouchableOpacity
                    key={activity.id}
                    onLongPress={() => setActivityToDelete(activity)}
                    className="bg-white p-4 rounded-xl shadow-sm flex-row items-center"
                  >
                    <View 
                      className={`w-10 h-10 rounded-full items-center justify-center ${
                        activity.category === "Running" ? "bg-blue-100" : "bg-purple-100"
                      }`}
                    >
                      <Icon
                        name={activity.category === "Running" ? "directions-run" : "fitness-center"}
                        size={20}
                        color={activity.category === "Running" ? "#1E88E5" : "#512B81"}
                      />
                    </View>
                    <View className="ml-3 flex-1">
                      <Text className="text-lg font-medium">{activity.name}</Text>
                      <Text className="text-gray-500">{activity.category}</Text>
                    </View>
                    <TouchableOpacity 
                      onPress={() => setActivityToDelete(activity)}
                      className="p-2"
                    >
                      <Icon name="delete-outline" size={24} color="#FF4444" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Get Started Section */}
          <View className="px-4 mt-6 mb-20">
            <Text className="text-lg font-semibold">Get Started</Text>
            <TouchableOpacity
              onPress = {() => navigation.navigate('Workout Plan')}
              className="flex-row items-center justify-between bg-white rounded-lg py-4 px-4 mt-2 shadow-sm">
              <Text className="text-lg">Week 1</Text>
              <Icon name="arrow-forward" size={24} color="#512B81" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View className="bg-white border-t border-gray-200">
          <SafeAreaView>
            <View className="flex-row justify-around items-center py-4 px-6">
              <TouchableOpacity>
                <Icon name="home" size={28} color="#512B81" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("WorkoutPage")}>
                <Icon name="fitness-center" size={28} color="#666" />
                </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActivityModalVisible(true)}
                className="bg-[#512B81] p-4 rounded-full -mt-8"
              >
                <Icon name="add" size={28} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="mail" size={28} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="person" size={28} color="#666" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        {/* Delete Confirmation Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={!!activityToDelete}
          onRequestClose={() => setActivityToDelete(null)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-2xl p-6 w-11/12 max-w-sm">
              <Text className="text-xl font-semibold mb-4">Delete Activity</Text>
              <Text className="text-gray-600 mb-6">Are you sure you want to delete this activity?</Text>
              <View className="flex-row justify-end space-x-3">
                <TouchableOpacity
                  onPress={() => setActivityToDelete(null)}
                  className="px-4 py-2 rounded-lg bg-gray-100"
                >
                  <Text className="text-gray-600">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDeleteActivity}
                  className="px-4 py-2 rounded-lg bg-red-500"
                >
                  <Text className="text-white">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Date Picker Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          display="inline"
        />

        {/* Activity Modal */}
        <ActivityModal
          visible={isActivityModalVisible}
          onClose={() => setActivityModalVisible(false)}
          onAddActivity={handleAddActivity}
          //selectedDate={selectedDate}
        />
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
