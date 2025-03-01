import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const TIMER_DURATION = 300; // 5 minutes in seconds

const TimerScreen = () => {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const progress = timeLeft / TIMER_DURATION;

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Svg width={200} height={200} viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="#E0E0E0"
            strokeWidth="5"
            fill="none"
          />
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="#2C7A7B"
            strokeWidth="5"
            fill="none"
            strokeDasharray={283} // Circumference of the circle
            strokeDashoffset={283 - 283 * progress}
            strokeLinecap="round"
          />
        </Svg>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 32,
    color: '#8B4513',
    position: 'absolute',
    top: '40%',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  startButton: {
    backgroundColor: '#2C7A7B',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  stopButton: {
    backgroundColor: '#B0BEC5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  pauseButton: {
    backgroundColor: '#B0BEC5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default TimerScreen;
