import React, { useState, useCallback } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Animated,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'
import YoutubePlayer from 'react-native-youtube-iframe'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')

const WorkoutRounds: React.FC = () => {
    const router = useRouter()
    const [playing, setPlaying] = useState(true)
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]) // Allow multiple selections

    const onStateChange = useCallback((state: string) => {
        if (state === 'ended') {
            setPlaying(false)
        }
    }, [])

    const options = ['Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum'] // Only 3 options

    // Toggle selection for multiple options
    const toggleOption = (index: number) => {
        setSelectedOptions(
            (prevSelected) =>
                prevSelected.includes(index)
                    ? prevSelected.filter((i) => i !== index) // Deselect if already selected
                    : [...prevSelected, index] // Add to selection if not selected
        )
    }

    const [progress] = useState(new Animated.Value(0))
    const allOptionsSelected = selectedOptions.length === options.length

    // Update progress bar based on the number of selected options
    const updateProgress = () => {
        const progressValue = selectedOptions.length / options.length
        Animated.timing(progress, {
            toValue: progressValue,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    // Watch for changes in selected options
    React.useEffect(() => {
        updateProgress()
    }, [selectedOptions])

    return (
        <LinearGradient
            colors={['#337689', '#337689', '#ffffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.6 }}
            style={styles.container}
        >
            {/* Back Button */}
            <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
            >
                <Icon name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Video Container */}
            <View style={styles.videoContainer}>
                <YoutubePlayer
                    height={height * 0.4}
                    width={width}
                    play={playing}
                    videoId="dtnMrfS9aX8"
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
            <SafeAreaView style={styles.contentContainer}>
                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                    <Animated.View
                        style={[
                            styles.progressBarFill,
                            {
                                width: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%'],
                                }),
                            },
                        ]}
                    />
                </View>

                {/* Options List */}
                <View style={styles.optionList}>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.optionButton,
                                selectedOptions.includes(index) &&
                                    styles.optionSelected,
                            ]}
                            onPress={() => toggleOption(index)}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    selectedOptions.includes(index) &&
                                        styles.optionTextSelected,
                                ]}
                            >
                                {option}
                            </Text>
                            <Icon
                                name={
                                    selectedOptions.includes(index)
                                        ? 'check-circle'
                                        : 'radio-button-unchecked'
                                }
                                size={24}
                                color={
                                    selectedOptions.includes(index)
                                        ? '#ffffff'
                                        : '#337689'
                                }
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Bottom Controls */}
                <View style={styles.bottomControls}>
                    {/* Pause Button */}
                    <TouchableOpacity
                        onPress={() => setPlaying(!playing)}
                        style={styles.pauseButton}
                    >
                        <Icon
                            name={
                                playing
                                    ? 'pause-circle-filled'
                                    : 'play-circle-filled'
                            }
                            size={40}
                            color="#337689"
                        />
                    </TouchableOpacity>

                    {/* Next Button */}
                    <TouchableOpacity
                        onPress={() => {
                            if (allOptionsSelected) {
                                router.push('./NextScreen')
                            }
                        }}
                        style={[
                            styles.nextButton,
                            allOptionsSelected && styles.nextButtonActive, // Apply active style if all options are selected
                        ]}
                    >
                        <Icon
                            name="arrow-forward"
                            size={28}
                            color={allOptionsSelected ? '#FFFFFF' : '#337689'}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    videoContainer: {
        position: 'absolute',
        top: height * 0.1,
        left: 0,
        right: 0,
        height: height * 0.35,
    },
    progressBarContainer: {
        height: 5,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
        borderRadius: 3,
        marginTop: 16,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#337689',
        borderRadius: 3,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start', // Push content upward slightly
        paddingHorizontal: 24,
        paddingBottom: 32,
        marginTop: height * 0.34,
    },
    progressBar: {
        width: '85%',
    },
    backButton: {
        padding: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
    },
    optionList: {
        marginBottom: 16, // Reduced bottom margin for better alignment
        marginTop: height * 0.07,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 2, // Add border for unselected state
        borderColor: '#E5E5E5', // Light gray border for unselected items
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,

        // Adjust width and centering
        width: width * 0.85, // Set button width to be smaller than the screen width (85%)
        alignSelf: 'center', // Center the button horizontally
    },
    optionSelected: {
        backgroundColor: '#337689',
        borderColor: '#337689', // Match selected background color to remove border contrast
    },
    optionText: {
        fontSize: 18,
        color: '#337689',
        fontWeight: '500',
    },
    optionTextSelected: {
        color: '#ffffff',
    },
    bottomControls: {
        position: 'absolute', // Position it at the bottom
        bottom: 20, // Adjust bottom spacing
        right: 20, // Align to the right
        flexDirection: 'row', // Arrange buttons in a row
        alignItems: 'center', // Keep them aligned vertically
        gap: 5, // Space between buttons
    },
    pauseButton: {
        padding: 5,
    },

    nextButton: {
        width: 34, // Diameter of the circle
        height: 34, // Diameter of the circle
        borderRadius: 17, // Half of the width/height to make it circular
        borderColor: '#337689',
        borderWidth: 3,
        backgroundColor: '#ffffff', // Circle background color
        justifyContent: 'center', // Center the icon vertically
        alignItems: 'center', // Center the icon horizontally
    },

    nextButtonActive: {
        backgroundColor: '#337689',
        borderColor: '#337689',
    },
})

export default WorkoutRounds
