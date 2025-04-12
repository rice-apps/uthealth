import React, { useState, useCallback } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'
import YoutubePlayer from 'react-native-youtube-iframe'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')

const WorkoutPage: React.FC = () => {
    const router = useRouter()
    const [playing, setPlaying] = useState(true)
    const [isPressed, setIsPressed] = useState(false)

    const onStateChange = useCallback((state: string) => {
        if (state === 'ended') {
            setPlaying(false)
        }
    }, [])

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
                        <Text style={styles.title}>Hip Flexion</Text>
                        <Text style={styles.instructor}>
                            With instructor name
                        </Text>
                    </View>

                    {/* Info Section */}
                    <View style={styles.infoSection}>
                        <View style={styles.infoRow}>
                            <Icon name="schedule" size={24} color="#337689" />
                            <Text style={styles.infoText}>
                                20 mins, Beginner
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Icon
                                name="fitness-center"
                                size={24}
                                color="#337689"
                            />
                            <Text style={styles.infoText}>
                                Strength: back, arms
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
                                {playing ? 'Pause Workout' : 'Start Workout'}
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
})

export default WorkoutPage
