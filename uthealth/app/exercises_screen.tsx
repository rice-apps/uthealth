import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import supabase from './utils/supabase';
const { width, height } = Dimensions.get('window');

const SPACING = 16;

const ExerciseScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const exerciseId = parseInt(params.exerciseId, 10);
  const exerciseName = params.exerciseName;
  const exerciseDate = params.date || new Date().toISOString().split('T')[0];
  
  const [exercise, setExercise] = useState(null);
  const [prescription, setPrescription] = useState({
    sets: 3,
    reps: 10,
    time: 20
  });
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [patientId, setPatientId] = useState(null);
  console.log(patientId)
  useEffect(() => {
    if (!exerciseId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        console.log(`Fetching data for exercise ID: ${exerciseId}`);
        
        const { data: exerciseData, error: exerciseError } = await supabase
          .from('exercises')
          .select('*')
          .eq('exercise_id', exerciseId)
          .single();

        if (exerciseError) {
          console.error('Exercise fetch error:', exerciseError);
          throw exerciseError;
        }
        
        if (exerciseData) {
          console.log('Exercise data found:', exerciseData);
          setExercise(exerciseData);
          
          if (exerciseData.video_url) {
            setVideoUrl(exerciseData.video_url);
            
            const id = extractYoutubeId(exerciseData.video_url);
            if (id) setVideoId(id);
          }
        }
        
        const currentPatientId = await getPatientId();
        setPatientId(currentPatientId);
        
        const { data: progressData, error: progressError } = await supabase
          .from('progress')
          .select('*')
          .eq('exercise_id', exerciseId)
          .eq('date', exerciseDate)
          .single();
          
        if (progressError && progressError.code !== 'PGRST116') {
          console.error('Progress check error:', progressError);
        } else if (progressData) {
          console.log('Exercise already completed on this date:', progressData);
          setIsCompleted(true);
        }
        
      
        const { data: prescriptionData, error: prescriptionError } = await supabase
          .from('prescription')
          .select('*')
          .eq('exercise_id', exerciseId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        
        if (!prescriptionError && prescriptionData) {
          setPrescription({
            sets: prescriptionData.sets || 3,
            reps: prescriptionData.reps || 10,
            time: prescriptionData.time || 20
          });
        }
      } catch (err) {
        console.error('Error in data fetch:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [exerciseId, exerciseDate]);

  const getPatientId = async () => {
    try {
     
      return 1; // Default patient ID
    } catch (error) {
      console.error('Error getting patient ID:', error);
      return 1; // Default fallback
    }
  };

  // Helpers
  const extractYoutubeId = (url) => {
    if (!url) return null;
    const regex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regex);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const formatTags = () => {
    if (!exercise?.tags) return 'aerobic';
    if (Array.isArray(exercise.tags)) {
      return exercise.tags.join(', ').replace(/['"]/g, '');
    }
    if (typeof exercise.tags === 'string') {
      try {
        const parsed = JSON.parse(exercise.tags);
        if (Array.isArray(parsed)) {
          return parsed.join(', ');
        }
        return exercise.tags;
      } catch (e) {
        // If not a valid JSON, just return the string
        return exercise.tags;
      }
    }
    return 'aerobic';
  };

  const isResistanceExercise = () => !exercise || exercise?.type === 'resistance';

  const togglePlay = () => setPlaying(!playing);
  const goBack = () => { setPlaying(false); router.back(); };
  
  const startWorkout = () => {
    setPlaying(false);
    
    const type = isResistanceExercise() ? 'resistance' : 'aerobic';
    
    const sets = prescription.sets || 3;
    const reps = prescription.reps || 10;
    const time = prescription.time || 20;

    router.push({
      pathname: './WorkoutRounds',
      params: {
        exerciseType: type,
        exerciseSets: sets.toString(),
        exerciseReps: reps.toString(),
        exerciseTime: time.toString(),
        exerciseName: exercise?.name || exerciseName,
        videoId: videoId || '',
        videoUrl: videoUrl || '',
        exerciseDate: exerciseDate, 
        exerciseId: exerciseId.toString(), 
        patientId: patientId?.toString() || '1' 
        
      }
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.secondaryNav}>
          <TouchableOpacity onPress={goBack}>
            <Icon name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#327689" />
          <Text style={styles.loadingText}>Loading exercise details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const displaySets = prescription.sets ?? 3;
  const displayReps = prescription.reps ?? 10;
  const displayTime = prescription.time ?? 20;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.navText}>index</Text>
        </TouchableOpacity>
        <View style={styles.navCenter} />
        <View style={styles.navRight} />
      </View>
      
      {/* Secondary Navigation Bar (blue header) */}
      <View style={styles.secondaryNav}>
        <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        
        {isCompleted && (
          <View style={styles.completedBadge}>
            <Icon name="check-circle" size={20} color="white" />
            <Text style={styles.completedText}>Completed</Text>
          </View>
        )}
      </View>
      
      <ScrollView 
        style={styles.contentWrapper}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Video Section */}
        <View style={styles.videoContainer}>
          {videoId ? (
            <YoutubePlayer
              height={height * 0.35}
              width={width}
              play={playing}
              videoId={videoId}
              onChangeState={state => state === 'ended' && setPlaying(false)}
              forceAndroidAutoplay
              initialPlayerParams={{ controls: false, modestbranding: true, showClosedCaptions: false, rel: false }}
            />
          ) : (
            <View style={[styles.placeholderImage, { height: height * 0.35 }]}> 
              <Icon name="fitness-center" size={60} color="#327689" />
              <Text style={styles.placeholderText}>No video available</Text>
            </View>
          )}
        </View>
        
        {/* Information Section */}
        <View style={styles.infoContainer}>
          {/* Exercise Title */}
          <Text style={styles.exerciseTitle}>{exercise?.name || exerciseName}</Text>
          
          {/* Metadata (Sets, Reps, Type) */}
          <View style={styles.metadataContainer}>
            {isResistanceExercise() ? (
              <>
                <MetadataRow icon="fitness-center" text={`Sets: ${displaySets}`} />
                <MetadataRow icon="repeat" text={`Reps: ${displayReps}`} />
              </>
            ) : (
              <MetadataRow icon="schedule" text={`Duration: ${displayTime} mins`} />
            )}
            <MetadataRow icon="layers" text={`Type: ${formatTags()}`} />
          </View>
          
          {/* Exercise description if available */}
          {exercise?.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{exercise.description}</Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      {/* Start Workout Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.startButton,
            isCompleted && styles.startButtonDisabled
          ]} 
          onPress={startWorkout}
          disabled={isCompleted}
        >
          <Text style={styles.startButtonText}>
            {isCompleted ? 'Already Completed' : 'Start Workout'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const MetadataRow = ({ icon, text }) => (
  <View style={styles.metadataRow}>
    <Icon name={icon} size={24} color="#327689" />
    <Text style={styles.metadataText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'white' 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666'
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING,
    paddingVertical: SPACING,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  navCenter: { flex: 1, alignItems: 'center' },
  navText: { color: '#327689', fontSize: 16 },
  navRight: { width: SPACING * 2 },
  secondaryNav: { 
    backgroundColor: '#327689', 
    padding: SPACING,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  completedBadge: {
    backgroundColor: '#22aa55',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12
  },
  completedText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 14
  },
  contentWrapper: { 
    flex: 1, 
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    paddingBottom: 100, 
  },
  videoContainer: { 
    width: '100%', 
    backgroundColor: '#000',
    minHeight: 200
  },
  placeholderImage: {
    width: '100%',
    backgroundColor: '#d0d0d0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderText: { 
    marginTop: SPACING, 
    fontSize: 16, 
    color: '#666' 
  },
  infoContainer: { 
    backgroundColor: '#e6f3f5', 
    padding: SPACING * 1.5,
    paddingTop: SPACING * 2,
    paddingBottom: SPACING * 3
  },
  exerciseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: SPACING * 2,
    lineHeight: 34
  },
  metadataContainer: { 
    marginBottom: SPACING * 2
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING,
    paddingVertical: SPACING * 0.5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingLeft: 5
  },
  metadataText: { 
    fontSize: 18, 
    color: '#333', 
    marginLeft: SPACING,
    fontWeight: '500'
  },
  descriptionContainer: {
    marginTop: SPACING,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: SPACING / 2
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING,
    paddingVertical: SPACING,
    backgroundColor: 'rgba(230, 243, 245, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#d0d0d0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  startButton: {
    backgroundColor: '#327689',
    borderRadius: SPACING * 2,
    padding: SPACING,
    alignItems: 'center',
    justifyContent: 'center'
  },
  startButtonDisabled: {
    backgroundColor: '#888888'
  },
  startButtonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});

export default ExerciseScreen;