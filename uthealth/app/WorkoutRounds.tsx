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
import { useNavigation } from '@react-navigation/native'
import YoutubePlayer from 'react-native-youtube-iframe'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')

const WorkoutRounds: React.FC = () => {
    const navigation = useNavigation()
    const [playing, setPlaying] = useState(true)
    const [isPressed, setIsPressed] = useState(false)
    const [unchecked, setUnchecked] = useState(true)
    const [checked, setChecked] = useState(false)

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
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Icon name="arrow-back" size={24} color="#337689" />
                </TouchableOpacity>

                {/* Content */}
                <View style={styles.contentWrapper}>
                    {/* Title Section */}
                    <TouchableOpacity
                        onPress={() => {
                            if (checked == false){
                                setUnchecked(!checked)
                                setChecked(true)
                        }
                        if (checked == true){
                            setUnchecked(checked)
                            setChecked(false)
                    }

                        }}
                        style={[
                            styles.task,
                            checked && styles.taskDone,
                        ]}
                    >
                        <View style={styles.buttonContent}>
                            <Text style={styles.buttonText}>
                                {playing ? 'Pause Workout' : 'Start Workout'}
                            </Text>
                        </View>
                    </TouchableOpacity>

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
    task: {
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    taskDone: {
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#337689',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
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

export default WorkoutRounds

// import React, { useState, useCallback } from 'react'
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     SafeAreaView,
//     Dimensions,
//     StyleSheet,
// } from 'react-native'
// import Icon from 'react-native-vector-icons/MaterialIcons'
// import { useNavigation } from '@react-navigation/native'
// import YoutubePlayer from 'react-native-youtube-iframe'
// import { LinearGradient } from 'expo-linear-gradient'


// interface Exercise {
//   id: string;
//   name: string;
//   completed: boolean;
// }

// const WorkoutRounds = () => {
//   const [exercises, setExercises] = useState<Exercise[]>([
//     { id: '1', name: 'Side Plank', completed: false },
//     { id: '2', name: 'Push-ups', completed: false },
//     { id: '3', name: 'Mountain Climbers', completed: false },
//     { id: '4', name: 'Leg Raises', completed: false }
//   ]);

//   const toggleExercise = (id: string) => {
//     setExercises(exercises.map(exercise => 
//       exercise.id === id 
//         ? { ...exercise, completed: !exercise.completed }
//         : exercise
//     ));
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 space-y-3">
//       {exercises.map(exercise => (
//         <div 
//           key={exercise.id}
//           className="flex items-center bg-slate-600 rounded-lg p-4 text-white cursor-pointer"
//           onClick={() => toggleExercise(exercise.id)}
//         >
//           <span className="flex-grow text-lg">{exercise.name}</span>
//           <div className={`
//             w-6 h-6 rounded-full flex items-center justify-center
//             ${exercise.completed ? 'bg-white' : 'border-2 border-white'}
//           `}>
//             {exercise.completed && (
//               <svg 
//                 className="w-4 h-4 text-slate-600" 
//                 fill="none" 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round" 
//                 strokeWidth="2" 
//                 viewBox="0 0 24 24" 
//                 stroke="currentColor"
//               >
//                 <path d="M5 13l4 4L19 7" />
//               </svg>
//             )}
//           </div>
//         </div>
//       ))}
      
//       <div className="fixed bottom-4 right-4 flex gap-2">
//         <button className="p-3 bg-slate-600 rounded-full text-white">
//           <svg 
//             className="w-6 h-6" 
//             fill="none" 
//             strokeLinecap="round" 
//             strokeLinejoin="round" 
//             strokeWidth="2" 
//             viewBox="0 0 24 24" 
//             stroke="currentColor"
//           >
//             <path d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         </button>
//         <button className="p-3 bg-slate-600 rounded-full text-white">
//           <svg 
//             className="w-6 h-6" 
//             fill="none" 
//             strokeLinecap="round" 
//             strokeLinejoin="round" 
//             strokeWidth="2" 
//             viewBox="0 0 24 24" 
//             stroke="currentColor"
//           >
//             <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WorkoutRounds;