import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Animated,
    Alert,
    ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import YoutubePlayer from 'react-native-youtube-iframe'
import { LinearGradient } from 'expo-linear-gradient'
import supabase from './utils/supabase'
const { width, height } = Dimensions.get('window')

interface WorkoutRoundsProps {}

const WorkoutRounds: React.FC<WorkoutRoundsProps> = () => {
    const router = useRouter()
    const params = useLocalSearchParams()
    const playerRef = useRef(null)
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const exerciseType = (params.exerciseType as string) || 'resistance'
    const exerciseSets = parseInt((params.exerciseSets as string) || '3', 10)
    const exerciseReps = parseInt((params.exerciseReps as string) || '10', 10)
    const exerciseTime = parseInt((params.exerciseTime as string) || '20', 10)
    const exerciseName = (params.exerciseName as string) || 'Exercise'
    const videoId = (params.videoId as string) || ''
    const videoUrl = (params.videoUrl as string) || ''
    const exerciseDate = (params.exerciseDate as string) || new Date().toISOString().split('T')[0]
    const exerciseIdParam = (params.exerciseId as string) || ''
    const exerciseId = exerciseIdParam ? parseInt(exerciseIdParam, 10) : null
    const patientIdParam = (params.patientId as string) || '1'
    const patientId = parseInt(patientIdParam, 10)
    
    const [playing, setPlaying] = useState(true)
    const [completedSets, setCompletedSets] = useState<boolean[]>(Array(exerciseSets).fill(false))
    const [currentSet, setCurrentSet] = useState(1)
    const [shouldRestart, setShouldRestart] = useState(false)
    const [timerActive, setTimerActive] = useState(exerciseType !== 'resistance')
    const [timeRemaining, setTimeRemaining] = useState(exerciseTime * 60) // Convert to seconds
    const [isLoggingProgress, setIsLoggingProgress] = useState(false)
    const [borgScore, setBorgScore] = useState(5) // Default value

    const onStateChange = useCallback((state: string) => {
        if (state === 'ended') {
            setPlaying(false)
        }
    }, [])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const restartVideo = useCallback(() => {
        if (playerRef.current) {
            try {
                playerRef.current?.seekTo(0, true)
            } catch (error) {
                console.log('Error seeking video:', error)
            }
        }
        setPlaying(true)
    }, [playerRef])

    const [progress] = useState(new Animated.Value(0))
    
    const startTimer = useCallback(() => {
        if (timerIntervalRef.current) return
        
        setTimerActive(true)
        timerIntervalRef.current = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    if (timerIntervalRef.current) {
                        clearInterval(timerIntervalRef.current)
                        timerIntervalRef.current = null
                    }
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }, [])

    const pauseTimer = useCallback(() => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current)
            timerIntervalRef.current = null
        }
        setTimerActive(false)
    }, [])

    const toggleTimer = useCallback(() => {
        if (timerActive) {
            pauseTimer()
        } else {
            startTimer()
        }
    }, [timerActive, pauseTimer, startTimer])

    const updateProgress = () => {
        let progressValue
        
        if (exerciseType === 'resistance') {
            const completedSetCount = completedSets.filter(set => set).length
            progressValue = completedSetCount / exerciseSets
        } else {
            const totalTime = exerciseTime * 60
            progressValue = 1 - (timeRemaining / totalTime)
        }
        
        Animated.timing(progress, {
            toValue: progressValue,
            duration: 500,
            useNativeDriver: false,
        }).start()
    }

    useEffect(() => {
        if (exerciseType !== 'resistance') {
            startTimer()
        }
        
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current)
            }
        }
    }, [exerciseType, startTimer])

    useEffect(() => {
        updateProgress()
    }, [completedSets, timeRemaining])

    useEffect(() => {
        if (shouldRestart) {
            restartVideo()
            setShouldRestart(false)
        }
    }, [shouldRestart, restartVideo])

    const togglePlayback = () => {
        setPlaying(!playing)
        if (exerciseType !== 'resistance') {
            toggleTimer()
        }
    }

    const toggleSetCompletion = (setIndex: number) => {
        const newCompletedSets = [...completedSets]
        newCompletedSets[setIndex] = !newCompletedSets[setIndex]
        
        // If marking as completed and it's not already completed
        if (newCompletedSets[setIndex] && !completedSets[setIndex]) {
            // Find the next incomplete set
            const nextIncompleteIndex = newCompletedSets.findIndex(set => !set)
            if (nextIncompleteIndex !== -1) {
                setCurrentSet(nextIncompleteIndex + 1)
            }
            
            setShouldRestart(true)
        }
        
        setCompletedSets(newCompletedSets)
    }

    const logExerciseProgress = async () => {
        if (!exerciseId) {
            console.log('Cannot log progress: No exercise ID provided')
            return false
        }

        try {
            setIsLoggingProgress(true)
            
            console.log(`Logging progress for exercise ${exerciseId} on ${exerciseDate}`)
            
            const { data: existingProgress, error: checkError } = await supabase
                .from('progress')
                .select('*')
                .eq('exercise_id', exerciseId)
                .eq('date', exerciseDate)
                .single()
                
            if (checkError && checkError.code !== 'PGRST116') { 
                console.error('Error checking existing progress:', checkError)
                return false
            }
            
            if (existingProgress) {
                console.log('Exercise was already logged for this date:', existingProgress)
                return true 
            }
            
            const { data: patientExists, error: patientError } = await supabase
                .from('patient')
                .select('id')
                .eq('id', patientId)
                .single()
            
            if (patientError && patientError.code !== 'PGRST116') {
                console.error('Error checking patient:', patientError)
            }
            
            let validPatientId = patientId
            if (!patientExists) {
                console.log(`Patient with ID ${patientId} not found, using default`)
                const { data: firstPatient } = await supabase
                    .from('patient')
                    .select('id')
                    .limit(1)
                    .single()
                
                if (firstPatient) {
                    validPatientId = firstPatient.id
                    console.log(`Using alternative patient ID: ${validPatientId}`)
                } else {
                    console.error('No patients found in database')
                    return false
                }
            }
            
            const { data, error } = await supabase
                .from('progress')
                .insert([
                    { 
                        exercise_id: exerciseId,
                        date: exerciseDate,
                    }
                ])
                
            if (error) {
                console.error('Error logging progress:', error)
                return false
            }
            
            console.log('Progress logged successfully:', data)
            return true
            
        } catch (error) {
            console.error('Exception while logging progress:', error)
            return false
        } finally {
            setIsLoggingProgress(false)
        }
    }

    const checkWorkoutComplete = async () => {
        const allCompleted = exerciseType === 'resistance' 
            ? completedSets.every(set => set)
            : timeRemaining === 0
            
        if (allCompleted && !isLoggingProgress) {
            const logSuccess = await logExerciseProgress()
            
            Alert.alert(
                "Workout Complete!",
                logSuccess 
                    ? "Great job! Your progress has been saved."
                    : "Great job! You've completed the workout",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            if (exerciseDate) {
                                router.replace({
                                    pathname: '/',
                                    params: { date: exerciseDate }
                                })
                            } else {
                                router.replace('/')
                            }
                        }
                    }
                ]
            )
        }
    }
    
    useEffect(() => {
        const isComplete = exerciseType === 'resistance' 
            ? completedSets.every(set => set)
            : timeRemaining === 0
            
        if (isComplete) {
            checkWorkoutComplete()
        }
    }, [completedSets, timeRemaining])

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
                {videoId ? (
                    <YoutubePlayer
                        ref={playerRef}
                        height={height * 0.3}
                        width={width}
                        play={playing}
                        videoId={videoId}
                        onChangeState={onStateChange}
                        forceAndroidAutoplay={true}
                        initialPlayerParams={{
                            controls: false,
                            modestbranding: true,
                            showClosedCaptions: false,
                            rel: false,
                        }}
                    />
                ) : (
                    <View style={[styles.placeholderVideo, { height: height * 0.3 }]}>
                        <Icon name="fitness-center" size={60} color="#337689" />
                        <Text style={styles.placeholderText}>No video available</Text>
                    </View>
                )}
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

                {/* Conditional Content: Sets for resistance / Timer for aerobic */}
                {exerciseType === 'resistance' ? (
                    <>
                        {/* Set information for resistance exercises */}
                        <ScrollView 
                            style={styles.setsScrollContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            {Array.from({ length: exerciseSets }).map((_, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.setOptionButton,
                                        completedSets[index] && styles.optionSelected,
                                        currentSet - 1 === index && !completedSets[index] && styles.currentSetButton
                                    ]}
                                    onPress={() => toggleSetCompletion(index)}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            completedSets[index] && styles.optionTextSelected,
                                        ]}
                                    >
                                        {`Set ${index + 1} - ${exerciseReps} reps`}
                                    </Text>
                                    <Icon
                                        name={
                                            completedSets[index]
                                                ? 'check-circle'
                                                : 'radio-button-unchecked'
                                        }
                                        size={24}
                                        color={
                                            completedSets[index]
                                                ? '#ffffff'
                                                : '#337689'
                                        }
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </>
                ) : (
                    // Central Timer for aerobic exercises
                    <View style={styles.centeredTimerContainer}>
                        <View style={styles.timerCircle}>
                            <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
                            <Text style={styles.timerLabel}>remaining</Text>
                        </View>
                        
                        <View style={styles.timeProgressInfo}>
                            <Text style={styles.timeDescription}>
                                {timeRemaining === 0 
                                    ? 'Workout Complete!' 
                                    : 'Keep Going!'}
                            </Text>
                        </View>
                    </View>
                )}

                {/* Play/Pause Button */}
                <View style={styles.bottomControls}>
                    <TouchableOpacity
                        onPress={togglePlayback}
                        style={styles.pauseButton}
                    >
                        <Icon
                            name={
                                playing
                                    ? 'pause-circle-filled'
                                    : 'play-circle-filled'
                            }
                            size={50}
                            color="#337689"
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
        top: height * 0.08,
        left: 0,
        right: 0,
        height: height * 0.3,
        zIndex: 1,
    },
    placeholderVideo: {
        width: '100%',
        backgroundColor: '#d0d0d0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    exerciseInfoContainer: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    exerciseName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 5,
        textAlign: 'center',
    },
    setsScrollContainer: {
        marginTop: 10,
        maxHeight: height * 0.35,
    },
    centeredTimerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },
    timerCircle: {
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 7,
        borderWidth: 3,
        borderColor: '#337689',
    },
    timeProgressInfo: {
        marginTop: 24,
        alignItems: 'center',
    },
    timeDescription: {
        fontSize: 22,
        color: '#333333',
        fontWeight: '600',
    },
    timerLabel: {
        fontSize: 18,
        color: '#555555',
        marginTop: 8,
    },
    timerText: {
        fontSize: 48,
        color: '#337689',
        fontWeight: 'bold',
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#e0e0e0',
        marginTop: 20,
        marginBottom: 12,
        borderRadius: 3,
        marginHorizontal: 5,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#337689',
        borderRadius: 3,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 24,
        paddingBottom: 32,
        marginTop: height * 0.32,
    },
    backButton: {
        padding: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
    },
    setOptionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#E5E5E5',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    currentSetButton: {
        borderColor: '#337689',
        borderWidth: 3,
    },
    optionSelected: {
        backgroundColor: '#337689',
        borderColor: '#337689',
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
        position: 'absolute',
        bottom: 90,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pauseButton: {
        padding: 25,
    },
})

export default WorkoutRounds