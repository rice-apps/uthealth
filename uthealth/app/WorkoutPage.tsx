import React, { useState, useCallback, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import YoutubePlayer from 'react-native-youtube-iframe'
import { LinearGradient } from 'expo-linear-gradient'
import { supabase } from './lib/supabase' // You'll need to create this
import { Exercise } from './types/Exercise'
import { WorkoutPageProps } from './types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './types/navigation'

const { width, height } = Dimensions.get('window')

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutPage'>

const WorkoutPage: React.FC = () => {
    const router = useRouter()
    const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>()

    const [playing, setPlaying] = useState(true)
    const [isPressed, setIsPressed] = useState(false)
    const [exercise, setExercise] = useState<Exercise | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (exerciseId) {
            fetchExerciseDetails(Number(exerciseId))
        }
    }, [exerciseId])

    const fetchExerciseDetails = async (id: number) => {
        try {
            const { data, error } = await supabase
                .from('exercises')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                if (error.code === 'PGRST116') {
                    console.error(`Exercise with ID ${id} not found`)
                    // You could show a user-friendly error message here
                } else {
                    console.error('Error fetching exercise:', error)
                }
                return
            }

            setExercise(data)
        } catch (error) {
            console.error('Error fetching exercise:', error)
        } finally {
            setLoading(false)
        }
    }

    const onStateChange = useCallback((state: string) => {
        if (state === 'ended') {
            setPlaying(false)
        }
    }, [])

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#337689" />
            </View>
        )
    }

    if (!exercise) {
        return (
            <View style={styles.errorContainer}>
                <Icon name="error-outline" size={48} color="#FF4444" />
                <Text style={styles.errorText}>
                    Exercise not found. Please try another exercise.
                </Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.errorButton}
                >
                    <Text style={styles.errorButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <LinearGradient
            colors={['#337689', '#337689', '#ffffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.6 }}
            style={styles.container}
        >
            {/* Video Container */}
            <View style={styles.videoContainer}>
                <YoutubePlayer
                    height={height * 0.4}
                    width={width}
                    play={playing}
                    videoId={exercise.video_id || 'dtnMrfS9aX8'} // Fallback video ID
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
                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Icon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                {/* Content */}
                <View style={styles.contentWrapper}>
                    {/* Title Section */}
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>{exercise.name}</Text>
                        <Text style={styles.instructor}>{exercise.type}</Text>
                    </View>

                    {/* Info Section */}
                    <View style={styles.infoSection}>
                        <View style={styles.infoRow}>
                            <Icon name="label" size={24} color="#337689" />
                            <Text style={styles.infoText}>
                                {exercise.tags.join(', ')}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Icon
                                name="description"
                                size={24}
                                color="#337689"
                            />
                            <Text style={styles.infoText}>
                                {exercise.description}
                            </Text>
                        </View>
                    </View>

                    {/* Start Button */}
                    <TouchableOpacity
                        onPress={() => {
                            setPlaying(!playing)
                            setIsPressed(true)
                            setTimeout(() => setIsPressed(false), 200)
                        }}
                        style={[
                            styles.startButton,
                            isPressed && styles.startButtonPressed,
                        ]}
                    >
                        <View style={styles.buttonContent}>
                            <Text style={styles.buttonText}>
                                {playing ? 'Pause Exercise' : 'Start Exercise'}
                            </Text>
                        </View>
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
    contentContainer: {
        flex: 1,
    },
    backButton: {
        padding: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
        paddingBottom: 32,
        marginTop: height * 0.4,
    },
    titleSection: {
        marginBottom: 32,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    instructor: {
        fontSize: 18,
        color: '#333333',
    },
    infoSection: {
        marginBottom: 48,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoText: {
        fontSize: 16,
        color: '#1A1A1A',
        marginLeft: 12,
    },
    startButton: {
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#337689',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    startButtonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    buttonContent: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 24,
    },
    errorButton: {
        backgroundColor: '#337689',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    errorButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})

export default WorkoutPage
