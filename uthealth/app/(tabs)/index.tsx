import React, { useState, useEffect } from 'react';
import Svg, { Circle } from 'react-native-svg';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

const durations = [5, 15, 30, 45, 60];
const TopBar = ({ onSetTime }) => {
    const [selectedTime, setSelectedTime] = useState(0);

    const [showingCustom, setShowingCustom] = useState(true)
    const handleCustomPress = () => {
        console.log("custom pressed")
        console.log(showingCustom)
        let time = 300
        setShowingCustom(false)
        onSetTime(time)
    }
    return (
        <View style={styles.topBar}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ justifyContent: 'space-between' }}
                style={{ flex: 1, flexDirection: 'row' }}
            >    {durations.map((time) => (
                <TouchableOpacity
                    key={time}
                    style={[styles.timeOption, selectedTime === time && styles.selectedTime]}
                    onPress={() => {
                        setSelectedTime(time);
                        onSetTime(time);
                    }}
                >
                    <Text style={[styles.timeText, selectedTime == time && styles.selectedText,]}>{time}</Text>
                </TouchableOpacity>
            ))}
            </ScrollView>
            <View style={{ flex: 0.25, backgroundColor: 'transparent' }} ></View>

            {!showingCustom ? (
                <TextInput
                    placeholder="Enter custom time"
                    keyboardType="numeric" // to allow only numbers
                // You can add onChangeText and value here if needed for custom time
                />
            ) : (
                <TouchableOpacity style={styles.addButton} onPress={handleCustomPress}>
                    <Text style={styles.addButtonText}>+ Custom</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};


const TimerScreen = () => {
    const [timerDuration, setTimerDuration] = useState(30000)
    const [timeLeft, setTimeLeft] = useState(timerDuration);
    const [minutes, setMinutesLeft] = useState(Math.floor(timerDuration / 6000));
    const [seconds, setSecondsLeft] = useState(Math.floor((timerDuration % 6000) / 100));
    const [centiseconds, setCentisecondsLeft] = useState(timerDuration % 100);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setCentisecondsLeft(centiseconds-1)
                if(centiseconds <= 0){
                    setCentisecondsLeft(99)
                    setSecondsLeft(seconds-1)
                }
                if(seconds <= 0){
                    setSecondsLeft(59)
                    setMinutesLeft(minutes-1)
                }
                setTimeLeft(timeLeft - 1);
            }, 1);
        } else if (minutes === 0) {
            setIsRunning(false);
        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);





    const formatTime = (minutes, seconds, centiseconds) => {
        console.log(centiseconds)
        //const min = Math.floor(centiseconds / 6000); // Get the minutes (6000 centiseconds = 1 minute)
        //const sec = Math.floor((centiseconds % 6000) / 100); // Get the seconds (100 centiseconds = 1 second)
        //const centisec = centiseconds % 100; // Get the centiseconds (remaining after seconds)

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
    };

    const progress = timeLeft / timerDuration;

    const handleSetTime = (new_time) => {
        console.log(new_time*6000)
        new_time=new_time*6000
        setTimerDuration(new_time * 6000);
        setTimeLeft(new_time * 6000);
        setMinutesLeft(Math.floor(new_time / 6000));
        setSecondsLeft(Math.floor((timerDuration % 6000) / 100));
        setCentisecondsLeft(new_time % 100);
    }

    const handleTouchablePress = () => {
        console.log("dismissing keyboard")
        Keyboard.dismiss()
    }

    return (
        <TouchableWithoutFeedback onPress={handleTouchablePress}>
            <View style={styles.container}>
                {/* Timer in the center */}
                <View style={styles.timer}>
                    <TopBar
                        onSetTime={handleSetTime}>
                    </TopBar>
                </View>
                <View style={styles.timerContainer}>
                    <Svg width={300} height={300} viewBox="0 0 100 100">
                        <Circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#E0E0E0"
                            strokeWidth="6"
                            fill="none"
                        />
                        <Circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#2C7A7B"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={283}
                            strokeDashoffset={283 - 283 * progress}
                            strokeLinecap="round"
                        />
                    </Svg>
                    <Text style={styles.timerText}>{formatTime(minutes, seconds, centiseconds)}</Text>
                </View>

                {/* Buttons at the bottom */}
                <View style={styles.buttonContainer}>
                    {!isRunning ? (
                        <TouchableOpacity style={styles.startButton} onPress={() => setIsRunning(true)}>
                            <Text style={styles.buttonText}>Start Timer</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.stopButton} onPress={() => setIsRunning(false)}>
                                <Text style={styles.buttonText}>Stop</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pauseButton} onPress={() => setIsRunning(false)}>
                                <Text style={styles.buttonText}>Pause</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    topBar: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: 130,
        paddingVertical: 5,
        paddingHorizontal: 11,
        backgroundColor: '#FFFFFF', //changed this for testing
        //elevation: 2, // dropshadow Android
        shadowColor: '#000', // dropshadow iOS
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        borderWidth: 0,
        borderRadius: 10,

    },
    timeOption: {
        paddingVertical: 6,
        paddingHorizontal: 9,
        flex: 1,
    },
    selectedTime: {
        borderWidth: 1,
        padding: 6,
        borderRadius: 5,
        borderColor: "#32768929",
        backgroundColor: '#B3D8E22E',
    },
    timeText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'Avenir',
    },
    selectedText: {
        color: '#327689'
    },

    addButton: {
        backgroundColor: '#2C7A7B',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        flex: 0.40,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 40, // Keep buttons lower
    },
    timer: {
        borderWidth: 0,
        borderColor: "327680",
        borderRadius: 50,
    },
    timerContainer: {
        flex: 1, // Makes it take available space
        justifyContent: 'center', // Centers vertically
        alignItems: 'center', // Centers horizontally
    },
    timerText: {
        fontSize: 36,
        color: '#844016',
        position: 'absolute',
        top: '45%',
        fontFamily: 'Avenir',
        fontWeight: '500'
    },
    picker: {
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 40,
    },
    startButton: {
        backgroundColor: '#327680',
        paddingVertical: 14,
        paddingHorizontal: 45,
        borderRadius: 12,
    },
    stopButton: {
        backgroundColor: '#327680',
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 12,
    },
    pauseButton: {
        backgroundColor: '#327680',
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
    },

    color: {
        backgroundColor: "FF0000"
    }
});

export default TimerScreen;