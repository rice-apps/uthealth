import React, { useState, useEffect } from 'react';
import Svg, { Circle } from 'react-native-svg';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';


const durations = [5, 15, 30, 45, 60];


const TopBar = ({ onSetTime }) => {
   const [selectedTime, setSelectedTime] = useState(0);
   const [showingCustom, setShowingCustom] = useState(true);
   const [customTime, setCustomTime] = useState('');


   const handleCustomPress = () => {
       setShowingCustom(false);
   };


   const handleSetCustomTime = () => {
       let time = parseInt(customTime, 10);
       if (!isNaN(time) && time > 0) {
           onSetTime(time);
           setCustomTime('');
           setShowingCustom(true);
       }
   };


   return (
       <View style={styles.topBar}>
           {showingCustom && (
               <View style={{ flex: 1, flexDirection: 'row' }}>
                   {durations.map((time) => (
                       <TouchableOpacity
                           key={time}
                           style={[styles.timeOption, selectedTime === time && styles.selectedTime]}
                           onPress={() => {
                               setSelectedTime(time);
                               onSetTime(time);
                           }}
                       >
                           <Text style={[styles.timeText, selectedTime === time && styles.selectedText]}>
                               {time}
                           </Text>
                       </TouchableOpacity>
                   ))}
               </View>
           )}
           {!showingCustom ? (
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                   <TextInput
                       placeholder="Enter custom time"
                       keyboardType="numeric"
                       style={styles.input}
                       value={customTime}
                       onChangeText={setCustomTime}
                   />
                   <TouchableOpacity style={styles.addButton} onPress={handleSetCustomTime}>
                       <Text style={styles.addButtonText}>Set</Text>
                   </TouchableOpacity>
               </View>
           ) : (
               <TouchableOpacity style={styles.addButton} onPress={handleCustomPress}>
                   <Text style={styles.addButtonText}>+ Custom</Text>
               </TouchableOpacity>
           )}
       </View>
   );
};


const TimerScreen = () => {
   const [timerDuration, setTimerDuration] = useState(30000);
   const [timeLeft, setTimeLeft] = useState(timerDuration);
   const [isRunning, setIsRunning] = useState(false);


   useEffect(() => {
       let timer;
       let startTime = Date.now();
       if (isRunning && timeLeft > 0) {
           timer = setInterval(() => {
               const elapsedTime = Date.now() - startTime;
               setTimeLeft((prevTime) => Math.max(timerDuration - elapsedTime, 0));
           }, 10); // Update every 10ms
       } else {
           setIsRunning(false);
       }


       return () => clearInterval(timer);
   }, [isRunning, timerDuration]);


   const formatTime = (time) => {
       const minutes = Math.floor(time / 60000);
       const seconds = Math.floor((time % 60000) / 1000);
       const centiseconds = Math.floor((time % 1000) / 10);
       return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
   };


   const progress = timeLeft / timerDuration;


   const handleSetTime = (new_time) => {
       const convertedTime = new_time * 1000; // Convert to milliseconds
       setTimerDuration(convertedTime);
       setTimeLeft(convertedTime);
       setIsRunning(false);
   };


   return (
       <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
           <View style={styles.container}>
               <TopBar onSetTime={handleSetTime} />
               <View style={styles.timerContainer}>
                   <Svg width={300} height={300} viewBox="0 0 100 100">
                       {/* Background Circle */}
                       <Circle cx="50" cy="50" r="45" stroke="#E0E0E0" strokeWidth="6" fill="none" />


                       {/* Progress Circle */}
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


                       {/* Moving White Dot (Counterclockwise & Starts from Right) */}
                       <Circle
                           cx={50 + 45 * Math.cos(2 * Math.PI * progress)}
                           cy={50 + 45 * Math.sin(2 * Math.PI * progress)}
                           r="3"
                           fill="white"
                       />
                   </Svg>


                   <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
               </View>


               {/* Start/Pause/Stop Buttons */}
               <View style={styles.buttonContainer}>
                   {!isRunning ? (
                       <TouchableOpacity style={styles.startButton} onPress={() => setIsRunning(true)}>
                           <Text style={styles.buttonText}>Start Timer</Text>
                       </TouchableOpacity>
                   ) : (
                       <>
                           <TouchableOpacity
                               style={styles.stopButton}
                               onPress={() => {
                                   setIsRunning(false);
                                   setTimeLeft(timerDuration);
                               }}
                           >
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
       width: '90%',
       flexDirection: 'row',
       alignItems: 'center',
       alignSelf: 'center',
       justifyContent: 'space-between',
       marginTop: 50,
       paddingVertical: 5,
       paddingHorizontal: 10,
       backgroundColor: '#FFFFFF',
       shadowColor: '#000',
       shadowOpacity: 0.1,
       shadowOffset: { width: 0, height: 2 },
       shadowRadius: 6,
       borderRadius: 10,
   },
   timeOption: { paddingVertical: 6, paddingHorizontal: 6, flex: 1 },
   selectedTime: { borderWidth: 1, padding: 6, borderRadius: 5, borderColor: "#32768929", backgroundColor: '#B3D8E22E' },
   timeText: { color: '#000', fontSize: 16, fontFamily: 'Avenir' },
   selectedText: { color: '#327689' },
   addButton: { backgroundColor: '#2C7A7B', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, flex: 0.40 },
   addButtonText: { color: '#FFFFFF', fontSize: 16 },
   container: { flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 40 },
   timerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
   timerText: { fontSize: 36, color: '#844016', position: 'absolute', top: '45%', fontFamily: 'Avenir', fontWeight: '500' },
   buttonContainer: { flexDirection: 'row', gap: 15, marginBottom: 40 },
   startButton: { backgroundColor: '#327680', paddingVertical: 14, paddingHorizontal: 45, borderRadius: 12 },
   stopButton: { backgroundColor: '#327680', paddingVertical: 14, paddingHorizontal: 25, borderRadius: 12 },
   pauseButton: { backgroundColor: '#327680', paddingVertical: 14, paddingHorizontal: 25, borderRadius: 12 },
   buttonText: { color: '#FFFFFF', fontSize: 20, textAlign: 'center' },
   input: { borderWidth: 1, borderColor: '#327689', borderRadius: 5, padding: 8, fontSize: 16, textAlign: 'center', width: '63%', marginHorizontal: 10 },
});


export default TimerScreen;





