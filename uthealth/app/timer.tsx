import React, { FC, useState, useEffect } from 'react'
import Svg, { Circle, Text as SvgText } from 'react-native-svg'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'

/** TopBar props */
interface TopBarProps {
    onSetTime: (minutes: number) => void
}

/** Constants */
const PRESET_MINUTES = [5, 15, 30, 45, 60]
const MS_PER_MINUTE = 60 * 1000
const TICK_MS = 10 // 1 centisecond

/** Main TimerScreen */
const TimerScreen: FC = () => {
    // durations in ms
    const [durationMs, setDurationMs] = useState<number>(
        PRESET_MINUTES[0] * MS_PER_MINUTE
    )
    const [timeLeft, setTimeLeft] = useState<number>(durationMs)
    const [running, setRunning] = useState<boolean>(false)

    // tick effect
    useEffect(() => {
        let id: any
        if (running && timeLeft > 0) {
            id = setInterval(() => {
                setTimeLeft((prev) => {
                    const next = Math.max(prev - TICK_MS, 0)
                    if (next === 0) setRunning(false)
                    return next
                })
            }, TICK_MS)
        }
        return () => clearInterval(id)
    }, [running])

    // derive display
    const mins = Math.floor(timeLeft / MS_PER_MINUTE)
    const secs = Math.floor((timeLeft % MS_PER_MINUTE) / 1000)
    const centis = Math.floor((timeLeft % 1000) / 10)
    const formatTime = (m: number, s: number, c: number) =>
        `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${c
            .toString()
            .padStart(2, '0')}`

    const progress = timeLeft / durationMs

    // circle math
    const R = 45
    const C = 2 * Math.PI * R
    const angle = 2 * Math.PI * progress
    const markerX = 50 + R * Math.cos(angle)
    const markerY = 50 + R * Math.sin(angle)

    const handleSetTime = (minutes: number) => {
        const ms = minutes * MS_PER_MINUTE
        setDurationMs(ms)
        setTimeLeft(ms)
        setRunning(false)
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
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
                            stroke="#2C7A7B"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={C}
                            strokeDashoffset={C - C * progress}
                            strokeLinecap="butt"
                        />
                        <Circle
                            cx={markerX}
                            cy={markerY}
                            r={3}
                            fill="#FFFFFF"
                            stroke="gray"
                        />
                        <SvgText
                            x="50"
                            y="50"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fontSize="10" // ~36px in a 100x100 viewBox
                            fill="#844016"
                            fontWeight="500"
                        >
                            {formatTime(mins, secs, centis)}
                        </SvgText>
                    </Svg>
                </View>

                <View style={styles.buttonRow}>
                    {!running ? (
                        <TouchableOpacity
                            style={styles.startButton}
                            onPress={() => setRunning(true)}
                        >
                            <Text style={styles.buttonText}>Start</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity
                                style={styles.stopButton}
                                onPress={() => {
                                    setRunning(false)
                                    setTimeLeft(durationMs)
                                }}
                            >
                                <Text style={styles.buttonText}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.pauseButton}
                                onPress={() => setRunning(false)}
                            >
                                <Text style={styles.buttonText}>Pause</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default TimerScreen

/** Styles */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 40,
    },
    topBar: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 100,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        borderRadius: 10,
    },
    presetRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeOption: {
        paddingVertical: 6,
        paddingHorizontal: 9,
    },
    timeOptionActive: {
        borderWidth: 1,
        borderColor: '#32768929',
        backgroundColor: '#B3D8E22E',
        borderRadius: 5,
        padding: 6,
    },
    timeText: {
        fontSize: 16,
        color: '#000',
    },
    timeTextActive: {
        color: '#327689',
    },
    customButton: {
        backgroundColor: '#2C7A7B',
        padding: 6,
        borderRadius: 20,
        marginLeft: 8,
    },
    customButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    customRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    customInput: {
        borderWidth: 1,
        borderColor: '#327689',
        borderRadius: 5,
        padding: 8,
        width: 80,
        textAlign: 'center',
    },
    timerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        position: 'absolute',
        top: '45%',
        fontSize: 36,
        fontWeight: '500',
        color: '#844016',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: 40,
    },
    startButton: {
        backgroundColor: '#327680',
        padding: 14,
        borderRadius: 12,
    },
    stopButton: {
        backgroundColor: '#CC4C4C',
        padding: 14,
        borderRadius: 12,
    },
    pauseButton: {
        backgroundColor: '#F0A500',
        padding: 14,
        borderRadius: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
})
