import React, { useState, useEffect, useRef } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Modal,
    SafeAreaView,
} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'
import supabase from './utils/supabase'
import '../global.css'

const RANGE = 20
const ITEM_WIDTH = 64
const ITEM_MARGIN_HORIZONTAL = 8

interface DateItem {
    id: string
    dayName: string
    dayNumber: number
    fullDate: Date
}

interface Activity {
    id: string
    name: string
    category: string
    date: Date
}

interface Exercise {
    exercise_id: number
    name: string
}

interface Prescription {
    prescription_id: number
    exercise_id: number
    start_date: string
    end_date: string
    days: any[] | null // Using any[] to handle possible different formats
}

interface ActivityModalProps {
    visible: boolean
    onClose: () => void
    onAddActivity: (activity: Omit<Activity, 'id'>) => void
    selectedDate: Date
    exercises: Exercise[]
}

// ActivityModal Component
const ActivityModal: React.FC<ActivityModalProps> = ({
    visible,
    onClose,
    onAddActivity,
    selectedDate,
    exercises,
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [selectedExercise, setSelectedExercise] = useState<string>('')
    const [selectedDuration, setSelectedDuration] = useState<string>('')

    const categories = [
        { id: '1', name: 'Strength Training', icon: 'fitness-center' },
        { id: '2', name: 'Aerobics', icon: 'directions-run' },
    ]

    const strengthExercises = exercises.map(ex => ex.name)
    const aerobicExercises = ['Walk', 'Run']
    const durations = ['5 m', '15 m', '30 m', '45 m', '60 m', 'Other']

    const handleAdd = () => {
        if (selectedCategory && selectedExercise && selectedDuration) {
            const category = categories.find((c) => c.id === selectedCategory)?.name || ''
            
            onAddActivity({
                name: `${selectedExercise} - ${selectedDuration}`,
                category,
                date: selectedDate,
            })
            
            setSelectedCategory('')
            setSelectedExercise('')
            setSelectedDuration('')
            onClose()
        }
    }

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId)
        setSelectedExercise('')
    }

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
                        <Text className="text-2xl font-semibold text-[#327689]">
                            Add activity
                        </Text>
                        <TouchableOpacity onPress={onClose} className="p-2">
                            <Icon name="close" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    {/* Category Selection */}
                    <View className="mb-6">
                        <Text className="text-gray-600 mb-3">
                            Choose Category
                        </Text>
                        <View className="flex-row gap-3">
                            {categories.map((category) => (
                                <TouchableOpacity
                                    key={category.id}
                                    onPress={() => handleCategorySelect(category.id)}
                                    className={`flex-1 flex-row items-center justify-center px-4 py-3 rounded-full border ${
                                        selectedCategory === category.id
                                            ? 'bg-[#327689] border-[#327689]'
                                            : 'border-gray-200'
                                    }`}
                                >
                                    <Icon
                                        name={category.icon}
                                        size={20}
                                        color={selectedCategory === category.id ? '#fff' : '#666'}
                                    />
                                    <Text
                                        className={`ml-2 font-medium ${
                                            selectedCategory === category.id
                                                ? 'text-white'
                                                : 'text-gray-700'
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
                            <Text className="text-gray-600 mb-3">
                                Choose Exercise
                            </Text>
                            {selectedCategory === '1' ? (
                                <ScrollView className="max-h-48">
                                    <View className="space-y-2">
                                        {strengthExercises.map((exercise) => (
                                            <TouchableOpacity
                                                key={exercise}
                                                onPress={() => setSelectedExercise(exercise)}
                                                className={`p-3 rounded-xl border ${
                                                    selectedExercise === exercise
                                                        ? 'bg-[#327689] border-[#327689]'
                                                        : 'border-gray-200'
                                                }`}
                                            >
                                                <Text
                                                    className={`text-center font-medium ${
                                                        selectedExercise === exercise
                                                            ? 'text-white'
                                                            : 'text-gray-700'
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
                                                    ? 'bg-[#327689] border-[#327689]'
                                                    : 'border-gray-200'
                                            }`}
                                        >
                                            <Text
                                                className={`text-center font-medium ${
                                                    selectedExercise === exercise
                                                        ? 'text-white'
                                                        : 'text-gray-700'
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
                            <Text className="text-gray-600 mb-3">
                                Select Duration
                            </Text>
                            <View className="flex-row flex-wrap gap-2">
                                {durations.map((duration) => (
                                    <TouchableOpacity
                                        key={duration}
                                        onPress={() => setSelectedDuration(duration)}
                                        className={`px-4 py-2 rounded-full border ${
                                            selectedDuration === duration
                                                ? 'bg-[#327689] border-[#327689]'
                                                : 'border-gray-200'
                                        }`}
                                    >
                                        <Text
                                            className={`font-medium ${
                                                selectedDuration === duration
                                                    ? 'text-white'
                                                    : 'text-gray-700'
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
                            <Icon name="timer" size={24} color="#327689" />
                            <Text className="ml-2 text-gray-600">Timer</Text>
                        </View>
                    )}

                    {/* Add Button */}
                    <TouchableOpacity
                        onPress={handleAdd}
                        disabled={!selectedCategory || !selectedExercise || !selectedDuration}
                        className={`rounded-xl py-3 px-6 flex-row justify-between items-center ${
                            selectedCategory && selectedExercise && selectedDuration
                                ? 'bg-[#327689]'
                                : 'bg-gray-200'
                        }`}
                    >
                        <Text
                            className={`font-semibold ${
                                selectedCategory && selectedExercise && selectedDuration
                                    ? 'text-white'
                                    : 'text-gray-400'
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
    )
}

// Helper function
const generateSurroundingDates = (
    centerDate: Date,
    range = RANGE
): DateItem[] => {
    const dates = []
    for (let i = -range; i <= range; i++) {
        const newDate = new Date(centerDate)
        newDate.setDate(centerDate.getDate() + i)
        dates.push({
            id: `${newDate.toISOString()}`,
            dayName: newDate.toLocaleDateString('en-US', { weekday: 'short' }),
            dayNumber: newDate.getDate(),
            fullDate: newDate,
        })
    }
    return dates
}

const formatDateForSupabase = (date: Date): string => {
    return date.toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'
}

// Helper function for checking day matches
const isDayInArray = (dayValue: number, daysArray: any[] | null): boolean => {
    // If days is null, include for all days
    if (!daysArray) return true;
    
    // Convert day to string for comparison
    const dayString = dayValue.toString();
    
    // Check if the day string exists in the array
    return daysArray.some(day => {
        // Remove any quotes and whitespace
        const cleanDay = String(day).replace(/['"]/g, '').trim();
        return cleanDay === dayString;
    });
}

const LandingPage: React.FC = () => {
    const [activityToDelete, setActivityToDelete] = useState<Activity | null>(null)
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false)
    const [isActivityModalVisible, setActivityModalVisible] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [dates, setDates] = useState<DateItem[]>(generateSurroundingDates(new Date()))
    const [activities, setActivities] = useState<Activity[]>([])
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    // Debug state removed

    const flatListRef = useRef<FlatList<DateItem>>(null)
    const middleIndex = RANGE
    const router = useRouter()

    // Fetch exercises from Supabase
    const fetchExercises = async () => {
        try {
            const { data, error } = await supabase
                .from('exercises')
                .select('*')
            
            if (error) {
                console.error('Error fetching exercises:', error)
                return
            }
            
            if (data) {
                setExercises(data)
            }
        } catch (error) {
            console.error('Error fetching exercises:', error)
        }
    }

    // Fetch prescribed exercises for the selected date
    const fetchPrescribedExercises = async (date: Date) => {
        setLoading(true)
        try {
            const formattedDate = formatDateForSupabase(date)
            const dayOfWeek = date.getDay() 
            const { data, error } = await supabase
                .from('prescription')
                .select('prescription_id, exercise_id, start_date, end_date, days')
                .lte('start_date', formattedDate)
                .gte('end_date', formattedDate)
            
            if (error) {
                console.error('Error fetching prescriptions:', error)
                setLoading(false)
                return
            }
            
            if (data && data.length > 0) {
                const filteredPrescriptions = data.filter(prescription => {
                    return isDayInArray(dayOfWeek, prescription.days);
                });
                
                if (filteredPrescriptions.length === 0) {
                    setActivities([]);
                    setLoading(false);
                    return;
                }
                
                const exerciseIds = filteredPrescriptions.map(prescription => prescription.exercise_id);
                
                const { data: exerciseData, error: exerciseError } = await supabase
                    .from('exercises')
                    .select('*')
                    .in('exercise_id', exerciseIds)
                
                if (exerciseError) {
                    console.error('Error fetching exercise details:', exerciseError)
                    setLoading(false)
                    return
                }
                
                if (exerciseData) {
                    const newActivities: Activity[] = exerciseData.map(exercise => ({
                        id: `${exercise.exercise_id}`,
                        name: exercise.name,
                        category: 'Strength Training', 
                        date: date
                    }))
                    
                    setActivities(newActivities)
                }
            } else {
                setActivities([])
            }
        } catch (error) {
            console.error('Error fetching prescribed exercises:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Initial data loading
        fetchExercises()
        fetchPrescribedExercises(selectedDate)
        
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
                index: middleIndex,
                animated: false,
                viewPosition: 0.5,
            })
        }
    }, [])

    useEffect(() => {
        fetchPrescribedExercises(selectedDate)
    }, [selectedDate])

    const handleDeleteActivity = () => {
        if (activityToDelete) {
            setActivities((prev) =>
                prev.filter((activity) => activity.id !== activityToDelete.id)
            )
            setActivityToDelete(null)
        }
    }

    const handleAddActivity = (newActivity: Omit<Activity, 'id'>) => {
        const activity = {
            ...newActivity,
            id: Date.now().toString(),
        }
        setActivities((prev) => [...prev, activity])
    }

    const showDatePicker = () => setDatePickerVisibility(true)
    const hideDatePicker = () => setDatePickerVisibility(false)

    const handleConfirm = (date: Date) => {
        const newDates = generateSurroundingDates(date)
        setDates(newDates)
        setSelectedDate(date)

        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({
                    index: middleIndex,
                    animated: false,
                    viewPosition: 0.5,
                })
            }
        }, 0)

        hideDatePicker()
    }

    const handleCardSelect = (fullDate: Date) => {
        setSelectedDate(fullDate)
    }

    // Navigate to exercise details
    const handleExercisePress = (activity: Activity) => {
        router.push({
            pathname: "./exercises_screen",
            params: { 
                exerciseId: activity.id, 
                exerciseName: activity.name 
            }
        });
    }

    const getItemLayout = (_data: any, index: number) => ({
        length: ITEM_WIDTH + ITEM_MARGIN_HORIZONTAL,
        offset: (ITEM_WIDTH + ITEM_MARGIN_HORIZONTAL) * index,
        index,
    })

    const renderCalendarCard = ({ item }: { item: DateItem }) => {
        const isSelected = item.fullDate.toDateString() === selectedDate.toDateString()
        return (
            <TouchableOpacity
                onPress={() => handleCardSelect(item.fullDate)}
                className={`w-14 h-16 items-center justify-center mx-1 rounded-xl ${
                    isSelected ? 'bg-[#327689]' : 'bg-white'
                } shadow-sm`}
                style={{ elevation: 2 }}
            >
                <Text
                    className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-[#FF715B]'}`}
                >
                    {item.dayName}
                </Text>
                <Text
                    className={`text-lg font-semibold ${isSelected ? 'text-white' : 'text-black'}`}
                >
                    {item.dayNumber}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-1">
                {/* Header */}
                <View className="px-4 pt-4">
                    <View className="flex-row justify-between items-start">
                        <View>
                            <Text className="text-2xl font-semibold">
                                {selectedDate.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                })}
                            </Text>
                            <Text className="text-gray-500">
                                {selectedDate.toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={showDatePicker}
                            className="bg-white p-3 rounded-full shadow-sm"
                        >
                            <Icon
                                name="calendar-today"
                                size={24}
                                color="#327689"
                            />
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
                        <Text className="text-xl font-bold mb-4">
                            Today's Activities
                        </Text>
                        {loading ? (
                            <View className="bg-white rounded-xl p-4 shadow-sm">
                                <Text className="text-gray-500 text-center">
                                    Loading activities...
                                </Text>
                            </View>
                        ) : activities.length === 0 ? (
                            <View className="bg-white rounded-xl p-4 shadow-sm">
                                <Text className="text-gray-500 text-center">
                                    No activities for today
                                </Text>
                            </View>
                        ) : (
                            <View className="space-y-3">
                                {activities.map((activity) => (
                                    <TouchableOpacity
                                        key={activity.id}
                                        onPress={() => handleExercisePress(activity)}
                                        onLongPress={() => setActivityToDelete(activity)}
                                        className="bg-white p-4 rounded-xl shadow-sm flex-row items-center"
                                    >
                                        <View
                                            className={`w-10 h-10 rounded-full items-center justify-center ${
                                                activity.category === 'Aerobics'
                                                    ? 'bg-blue-100'
                                                    : 'bg-purple-100'
                                            }`}
                                        >
                                            <Icon
                                                name={
                                                    activity.category === 'Aerobics'
                                                        ? 'directions-run'
                                                        : 'fitness-center'
                                                }
                                                size={20}
                                                color={
                                                    activity.category === 'Aerobics'
                                                        ? '#1E88E5'
                                                        : '#327689'
                                                }
                                            />
                                        </View>
                                        <View className="ml-3 flex-1">
                                            <Text className="text-lg font-medium">
                                                {activity.name}
                                            </Text>
                                            <Text className="text-gray-500">
                                                {activity.category}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => setActivityToDelete(activity)}
                                            className="p-2"
                                        >
                                            <Icon
                                                name="delete-outline"
                                                size={24}
                                                color="#FF4444"
                                            />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Get Started Section */}
                    <View className="px-4 mt-6 mb-20">
                        <Text className="text-lg font-semibold">
                            Get Started
                        </Text>
                        <TouchableOpacity
                            className="flex-row items-center justify-between bg-white rounded-lg py-4 px-4 mt-2 shadow-sm"
                        >
                            <Text
                                className="text-lg color-[#327689] font-bold"
                                style={{ fontFamily: 'Avenir' }}
                            >
                                Week 1
                            </Text>
                            <Icon
                                name="arrow-forward"
                                size={24}
                                color="#327689"
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* Bottom Navigation */}
                <View className="bg-white border-t border-gray-200">
                    <SafeAreaView>
                        <View className="flex-row justify-around items-center py-4 px-6">
                            <TouchableOpacity>
                                <Icon name="home" size={28} color="#327689" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.push('./WorkoutPage')}
                            >
                                <Icon
                                    name="fitness-center"
                                    size={28}
                                    color="#666"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setActivityModalVisible(true)}
                                className="bg-[#327689] p-4 rounded-full -mt-8"
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
                            <Text className="text-xl font-semibold mb-4">
                                Delete Activity
                            </Text>
                            <Text className="text-gray-600 mb-6">
                                Are you sure you want to delete this activity?
                            </Text>
                            <View className="flex-row justify-end space-x-3">
                                <TouchableOpacity
                                    onPress={() => setActivityToDelete(null)}
                                    className="px-4 py-2 rounded-lg bg-gray-100"
                                >
                                    <Text className="text-gray-600">
                                        Cancel
                                    </Text>
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
                    selectedDate={selectedDate}
                    exercises={exercises}
                />
            </View>
        </SafeAreaView>
    )
}

export default LandingPage