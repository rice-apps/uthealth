import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/MaterialIcons"; // MaterialIcons for icons
import "../global.css";

// Helper function to generate surrounding days
const generateSurroundingDates = (centerDate: Date, range: number = 3) => {
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

export default function LandingPage() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 5, 21)); // Default date
  const [dates, setDates] = useState(generateSurroundingDates(new Date(2024, 5, 21)));

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setDates(generateSurroundingDates(date));
    hideDatePicker();
  };

  const handleCardSelect = (fullDate: Date) => {
    setSelectedDate(fullDate);
    setDates(generateSurroundingDates(fullDate)); // Adjust surrounding dates
  };

  const renderCalendarCard = ({ item }: { item: { id: string; dayName: string; dayNumber: number; fullDate: Date } }) => {
    const isSelected = item.fullDate.toDateString() === selectedDate.toDateString();
    return (
      <TouchableOpacity
        onPress={() => handleCardSelect(item.fullDate)}
        className={`w-16 h-20 items-center justify-center mx-2 rounded-lg ${
          isSelected ? "bg-black" : "bg-white"
        } shadow-sm`}
      >
        <Text className={`text-sm font-bold ${isSelected ? "text-white" : "text-black"}`}>
          {item.dayName}
        </Text>
        <Text className={`text-lg ${isSelected ? "text-white" : "text-black"}`}>{item.dayNumber}</Text>
      </TouchableOpacity>
    );
  };

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <View className="flex-1 bg-blue-50 px-4">
      {/* Calendar Button in the top-right corner */}
      <TouchableOpacity
        onPress={showDatePicker}
        className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md z-10"
      >
        <Icon name="calendar-today" size={24} color="#007bff" />
      </TouchableOpacity>

      {/* Display Selected Date */}
      <View className="mt-4">
        <Text className="text-xl font-bold">{formattedDate.split(",")[0]}</Text>
        <Text className="text-sm text-gray-600">{formattedDate.split(",").slice(1).join(",")}</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Horizontal Date Selector */}
        <FlatList
          className="mt-4"
          horizontal
          data={dates}
          renderItem={renderCalendarCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 8,
            paddingVertical: 8,
          }}
        />

        {/* Welcome Section */}
        <View className="mt-6">
          <Text className="text-xl font-bold">Welcome, Jane Doe!</Text>
          <Text className="text-sm text-gray-600 mt-1">Get started - choose your plan</Text>
        </View>

        {/* Buttons Section */}
        <View className="mt-6 space-y-4">
          {/* Week 1 Button */}
          <TouchableOpacity
            onPress={() => console.log("Week 1 Pressed")}
            className="flex-row items-center justify-between bg-white rounded-lg py-3 px-4 shadow-sm"
          >
            <Text className="text-black font-bold">Week 1</Text>
            <Icon name="arrow-forward" size={24} color="#000" />
          </TouchableOpacity>

          {/* Create My Own Workout Button */}
          <TouchableOpacity
            onPress={() => console.log("Create Workout Pressed")}
            className="flex-row items-center justify-between bg-white rounded-lg py-3 px-4 mt-4 shadow-sm"
          >
            <Text className="text-black font-bold">Create my own workout</Text>
            <Icon name="arrow-forward" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Catalog Block */}
        <Text className="mt-6 text-md font-bold mb-2">Catalog</Text>
        <View className="p-4 bg-white rounded-lg shadow-sm"></View>
      </ScrollView>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display={"inline"}
      />
    </View>
  );
}
