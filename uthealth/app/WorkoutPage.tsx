import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import YoutubePlayer from "react-native-youtube-iframe";

const { width, height } = Dimensions.get('window');

const WorkoutPage: React.FC = () => {
  const navigation = useNavigation();
  const [playing, setPlaying] = useState(true);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    <View className="flex-1 bg-[#512B81]/90"> {/* Subtle purple background */}
      {/* Video Container Moved Lower */}
      <View className="absolute top-40 left-0 right-0 h-1/2"> {/* Adjusted top position */}
        <YoutubePlayer
          height={height * 0.5} // Half of the screen height
          width={width}
          play={playing}
          videoId="DSd57gJ59Wc" // Replace with your video ID
          onChangeState={onStateChange}
          forceAndroidAutoplay={true}
          initialPlayerParams={{
            controls: false,
            modestbranding: true,
            showClosedCaptions: false,
            rel: false,
          }}
        />
      </View>

      {/* Content Container */}
      <SafeAreaView className="flex-1">
        {/* Back Button */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="p-6 absolute top-0 left-0 z-10"
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Content */}
        <View className="flex-1 justify-end px-6 pb-12 mt-[55%]">
          {/* Title Section */}
          <View className="mb-8">
            <Text className="text-4xl font-bold text-white text-center mb-2">
              Quad Stretch
            </Text>
            <Text className="text-lg text-gray-200 text-center">
              With instructor name
            </Text>
          </View>

          {/* Info Section */}
          <View className="space-y-4 mb-12">
            <View className="flex-row items-center">
              <Icon name="schedule" size={24} color="white" />
              <Text className="text-lg text-white ml-3">
                20 mins, Beginner
              </Text>
            </View>

            <View className="flex-row items-center">
              <Icon name="fitness-center" size={24} color="white" />
              <Text className="text-lg text-white ml-3">
                Strength: back, arms
              </Text>
            </View>
          </View>

          {/* Start Button */}
          <TouchableOpacity
            onPress={() => setPlaying(!playing)}
            className="bg-white rounded-full py-4 px-8 items-center"
          >
            <Text className="text-[#512B81] text-center text-lg font-semibold"> {/* Purple text color */}
              {playing ? 'Pause Workout' : 'Start Workout'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default WorkoutPage;