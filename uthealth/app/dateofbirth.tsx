import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

const Index = () => {
  const [month, setMonth] = useState('Month');
  const [day, setDay] = useState('Day');
  const [year, setYear] = useState('Year');

  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString());

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-2xl mb-6 font-bold">Date of Birth</Text>
      <View className="flex-row items-center mb-6">
        <TouchableOpacity className="border border-gray-300 rounded-lg p-2 m-1">
          <Text className="text-gray-700">{month}</Text>
        </TouchableOpacity>
        <Text>/</Text>
        <TouchableOpacity className="border border-gray-300 rounded-lg p-2 m-1">
          <Text className="text-gray-700">{day}</Text>
        </TouchableOpacity>
        <Text>/</Text>
        <TouchableOpacity className="border border-gray-300 rounded-lg p-2 m-1">
          <Text className="text-gray-700">{year}</Text>
        </TouchableOpacity>
      </View>

      {/* Month Picker */}
      <ScrollPicker
        dataSource={months}
        selectedIndex={0}
        onValueChange={(data, selectedIndex) => {
          setMonth(data[selectedIndex]);
        }}
        wrapperHeight={120}
        wrapperBackground="#FFFFFF"
        itemHeight={40}
        highlightColor="#d8d8d8"
        highlightBorderWidth={2}
      />

      {/* Day Picker */}
      <ScrollPicker
        dataSource={days}
        selectedIndex={0}
        onValueChange={(data, selectedIndex) => {
          setDay(data[selectedIndex]);
        }}
        wrapperHeight={120}
        wrapperBackground="#FFFFFF"
        itemHeight={40}
        highlightColor="#d8d8d8"
        highlightBorderWidth={2}
      />

      {/* Year Picker */}
      <ScrollPicker
        dataSource={years}
        selectedIndex={0}
        onValueChange={(data, selectedIndex) => {
          setYear(data[selectedIndex]);
        }}
        wrapperHeight={120}
        wrapperBackground="#FFFFFF"
        itemHeight={40}
        highlightColor="#d8d8d8"
        highlightBorderWidth={2}
      />

      <TouchableOpacity className="bg-blue-500 mt-6 p-4 rounded">
        <Text className="text-white font-semibold text-center">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;