import React, { FC, useState, useEffect } from 'react'
import Svg, { Circle, Text as SvgText } from 'react-native-svg'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import Icon from 'react-native-vector-icons/MaterialIcons'
import supabase from './utils/supabase'

/** Main TimerScreen */
const TimerScreen: FC = () => {
    const router = useRouter()
    const params = useLocalSearchParams()
    
    // Get params from route
    const exerciseTimeParam = (params.exerciseTime as string) || '5'
    const exerciseTime = parseInt(exerciseTimeParam, 10)
    const exerciseId = params.exerciseId ? parseInt(params.exerciseId as string, 10) : null
    const exerciseDate = (params.exerciseDate as string) || new Date().toISOString().split('T')[0]
    const patientId = params.patientId ? parseInt(params.patientId as string, 10) : 1
    const exerciseName = (params.exerciseName as string) || 'Exercise'
    
    // Constants
    const MS_PER_MINUTE = 60 * 1000
    const TICK_MS = 10 // 1 centisecond

    // State
    const [durationMs, setDurationMs] = useState<number>(exerciseTime * MS_PER_MINUTE)
    const [timeLeft, setTimeLeft] = useState<number>(durationMs)
    const [running, setRunning] = useState<boolean>(false)
    const [isComplete, setIsComplete] = useState<boolean>(false)
    const [isLoggingProgress, setIsLoggingProgress] = useState<boolean>(false)

    // When timer completes, log exercise and navigate
    useEffect(() => {
        if (timeLeft === 0 && !isComplete) {
            setIsComplete(true)
            setRunning(false)
            logExerciseProgress()
        }
    }, [timeLeft])

    // Timer effect
    useEffect(() => {
        let id: NodeJS.Timeout
        if (running && timeLeft > 0) {
            id = setInterval(() => {
                setTimeLeft((prev) => {
                    const next = Math.max(prev - TICK_MS, 0)
                    return next
                })
            }, TICK_MS)
        }
        return () => clearInterval(id)
    }, [running])

    // Format time display
    const mins = Math.floor(timeLeft / MS_PER_MINUTE)
    const secs = Math.floor((timeLeft % MS_PER_MINUTE) / 1000)
    const centis = Math.floor((timeLeft % 1000) / 10)
    const formatTime = (m: number, s: number, c: number) =>
        `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${c
            .toString()
            .padStart(2, '0')}`

    const progress = timeLeft / durationMs

    // Circle math for progress indicator
    const R = 45
    const C = 2 * Math.PI * R
    const angle = 2 * Math.PI * progress
    const markerX = 50 + R * Math.cos(angle - Math.PI/2)
    const markerY = 50 + R * Math.sin(angle - Math.PI/2)

    // Log exercise progress and navigate back to landing page
    const logExerciseProgress = async () => {
        if (!exerciseId) {
            console.log('Cannot log progress: No exercise ID provided')
            navigateToLandingPage()
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
                navigateToLandingPage()
                return false
            }
            
            if (existingProgress) {
                console.log('Exercise was already logged for this date:', existingProgress)
                navigateToLandingPage()
                return true
            }
            
            const { data, error } = await supabase
                .from('progress')
                .insert([{ 
                    exercise_id: exerciseId,
                    date: exerciseDate,
                }])
                
            if (error) {
                console.error('Error logging progress:', error)
                navigateToLandingPage()
                return false
            }
            
            console.log('Progress logged successfully:', data)
            navigateToLandingPage()
            return true
            
        } catch (error) {
            console.error('Exception while logging progress:', error)
            navigateToLandingPage()
            return false
        } finally {
            setIsLoggingProgress(false)
        }
    }

    // Navigate back to landing page
    const navigateToLandingPage = () => {
        if (exerciseDate) {
            router.replace({
                pathname: '/',
                params: { date: exerciseDate }
            })
        } else {
            router.replace('/')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>timer</Text>
            </View>
            
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.content}>
                    <View style={styles.timerContainer}>
                        <Svg width={300} height={300} viewBox="0 0 100 100">
                            <Circle
                                cx="50"
                                cy="50"
                                r={R}
                                stroke="#E0E0E0"
                                strokeWidth="6"
                                fill="none"
                            />
                            <Circle
                                cx="50"
                                cy="50"
                                r={R}
                                stroke="#337689"
                                strokeWidth="6"
                                fill="none"
                                strokeDasharray={C}
                                strokeDashoffset={C - C * progress}
                                strokeLinecap="butt"
                                transform="rotate(-90, 50, 50)"
                            />
                            <Circle
                                cx={markerX}
                                cy={markerY}
                                r={3}
                                fill="#FFFFFF"
                                stroke="#999999"
                            />
                            <SvgText
                                x="50"
                                y="50"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fontSize="14" 
                                fill="#844016"
                                fontWeight="500"
                            >
                                {formatTime(mins, secs, centis)}
                            </SvgText>
                        </Svg>
                        <Text style={styles.exerciseNameText}>{exerciseName}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        {!running ? (
                            <>
                                <TouchableOpacity
                                    style={styles.startButton}
                                    onPress={() => setRunning(true)}
                                >
                                    <Text style={styles.buttonText}>Start</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.nextButton}
                                    onPress={() => {
                                        // Log exercise progress and navigate to landing page
                                        logExerciseProgress()
                                    }}
                                >
                                    <Text style={styles.buttonText}>Next</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity
                                    style={styles.pauseButton}
                                    onPress={() => setRunning(false)}
                                >
                                    <Text style={styles.buttonText}>Pause</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.resetButton}
                                    onPress={() => {
                                        setRunning(false)
                                        setTimeLeft(durationMs)
                                    }}
                                >
                                    <Text style={styles.buttonText}>Reset</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>

                    {isComplete && (
                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={navigateToLandingPage}
                        >
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default TimerScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        paddingTop: 40,
        alignItems: 'center',
        paddingBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '500',
        color: '#000000',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 100,
    },
    timerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
    },
    exerciseNameText: {
        fontSize: 18,
        color: '#555555',
        marginTop: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 80,
        gap: 10,
    },
    startButton: {
        backgroundColor: '#337689',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    nextButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    pauseButton: {
        backgroundColor: '#F0A500',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginRight: 10,
    },
    resetButton: {
        backgroundColor: '#CC4C4C',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginLeft: 10,
    },
    doneButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        position: 'absolute',
        bottom: 30,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500',
    },
});