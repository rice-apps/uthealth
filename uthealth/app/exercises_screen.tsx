import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import supabase from './utils/supabase';

const { width, height } = Dimensions.get('window');

// Base spacing unit
const SPACING = 16;

const ExerciseScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Extract the exerciseId as a number to ensure proper type matching with database
  const exerciseId = parseInt(params.exerciseId, 10);
  const exerciseName = params.exerciseName;
  
  const [exercise, setExercise] = useState(null);
  const [prescription, setPrescription] = useState({
    sets: 3,
    reps: 10,
    time: 20
  });
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [prescriptionId, setPrescriptionId] = useState(null);
  const [allPrescriptions, setAllPrescriptions] = useState([]);

  // Fetch exercise and prescription data
  useEffect(() => {
    if (!exerciseId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        console.log(`Starting data fetch for exercise ID: ${exerciseId}`);
        
        // 1. Get exercise details first
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
          
          // Extract YouTube ID if video URL exists
          if (exerciseData.video_url) {
            const id = extractYoutubeId(exerciseData.video_url);
            if (id) setVideoId(id);
          }
          
          // 2. Now fetch ALL prescriptions for this exercise to debug
          const { data: allPrescriptionsData, error: allPrescriptionsError } = await supabase
            .from('prescription')
            .select('*')
            .eq('exercise_id', exerciseId);
            
          if (allPrescriptionsError) {
            console.error('All prescriptions fetch error:', allPrescriptionsError);
          } else {
            console.log(`Found ${allPrescriptionsData.length} total prescriptions for exercise ID ${exerciseId}:`, allPrescriptionsData);
            setAllPrescriptions(allPrescriptionsData);
          }
          
          // 3. Fetch prescriptions that are valid for today's date
          const today = new Date().toISOString().split('T')[0];
          console.log(`Today's date for filtering: ${today}`);
          
          const { data: validPrescriptions, error: validPrescriptionsError } = await supabase
            .from('prescription')
            .select('*')
            .eq('exercise_id', exerciseId)
            .lte('start_date', today)  // start_date <= today
            .gte('end_date', today);   // end_date >= today
          
          if (validPrescriptionsError) {
            console.error('Valid prescriptions fetch error:', validPrescriptionsError);
            throw validPrescriptionsError;
          }
          
          console.log(`Found ${validPrescriptions ? validPrescriptions.length : 0} valid prescriptions for today:`, validPrescriptions);
          
          // 4. Handle direct and latest prescription logic
          if (exerciseId === 12) {
            const { data: directPrescription, error: directError } = await supabase
              .from('prescription')
              .select('*')
              .eq('prescription_id', 63)
              .single();
              
            if (directError) {
              console.error('Direct prescription fetch error:', directError);
            } else if (directPrescription) {
              console.log('Found direct prescription 63:', directPrescription);
              setPrescriptionId(directPrescription.prescription_id);
              setPrescription({
                sets: directPrescription.sets,
                reps: directPrescription.reps,
                time: directPrescription.time
              });
            }
          } else if (exerciseId === 44) {
            const { data: directPrescription, error: directError } = await supabase
              .from('prescription')
              .select('*')
              .eq('prescription_id', 64)
              .single();
              
            if (directError) {
              console.error('Direct prescription fetch error:', directError);
            } else if (directPrescription) {
              console.log('Found direct prescription 64:', directPrescription);
              setPrescriptionId(directPrescription.prescription_id);
              setPrescription({
                sets: directPrescription.sets,
                reps: directPrescription.reps,
                time: directPrescription.time
              });
            }
          } else if (validPrescriptions && validPrescriptions.length > 0) {
            const sortedPrescriptions = [...validPrescriptions].sort((a, b) => 
              b.prescription_id - a.prescription_id
            );
            const latest = sortedPrescriptions[0];
            console.log('Using highest prescription ID:', latest);
            setPrescriptionId(latest.prescription_id);
            setPrescription({
              sets: latest.sets,
              reps: latest.reps,
              time: latest.time
            });
          } else {
            console.log('No valid prescriptions found, using defaults');
          }
        }
      } catch (err) {
        console.error('Error in data fetch:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [exerciseId]);

  // Helpers
  const extractYoutubeId = (url) => {
    if (!url) return null;
    const regex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regex);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const formatTags = () => {
    if (!exercise?.tags) return 'aerobic';
    return Array.isArray(exercise.tags)
      ? exercise.tags.join(', ').replace(/['"]/g, '')
      : exercise.tags;
  };

  const isResistanceExercise = () => !exercise || exercise.type === 'resistance';

  const togglePlay = () => setPlaying(!playing);
  const goBack = () => { setPlaying(false); router.back(); };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.secondaryNav}>
          <TouchableOpacity onPress={goBack}>
            <Icon name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
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
      
      <View style={styles.topNav}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.navText}>index</Text>
        </TouchableOpacity>
        <View style={styles.navCenter} />
        <View style={styles.navRight} />
      </View>
      
      <View style={styles.secondaryNav}>
        <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentWrapper}>
        <View style={styles.videoContainer}>
          {videoId ? (
            <YoutubePlayer
              height={height * 0.4}
              width={width}
              play={playing}
              videoId={videoId}
              onChangeState={state => state === 'ended' && setPlaying(false)}
              forceAndroidAutoplay
              initialPlayerParams={{ controls: false, modestbranding: true, showClosedCaptions: false, rel: false }}
            />
          ) : (
            <View style={[styles.placeholderImage, { height: height * 0.4 }]}> 
              <Icon name="fitness-center" size={60} color="#327689" />
              <Text style={styles.placeholderText}>No video available</Text>
            </View>
          )}
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.exerciseTitle}>{exercise?.name || exerciseName}</Text>
          
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
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.startButton} onPress={togglePlay} disabled={!videoId}>
          <Text style={styles.startButtonText}>{playing ? 'Pause Workout' : 'Start Workout'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Helper component
const MetadataRow = ({ icon, text }) => (
  <View style={styles.metadataRow}>
    <Icon name={icon} size={24} color="#327689" />
    <Text style={styles.metadataText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  secondaryNav: { backgroundColor: '#327689', padding: SPACING },
  contentWrapper: { flex: 1, backgroundColor: '#f0f0f0' },
  videoContainer: { width: '100%', backgroundColor: '#000' },
  placeholderImage: {
    width: '100%',
    backgroundColor: '#d0d0d0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderText: { marginTop: SPACING, fontSize: 16, color: '#666' },
  infoContainer: { backgroundColor: '#e6f3f5', padding: SPACING, flex: 1 },
  exerciseTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: SPACING * 2
  },
  metadataContainer: { marginBottom: SPACING },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING
  },
  metadataText: { fontSize: 18, color: '#333', marginLeft: SPACING },
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
  startButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default ExerciseScreen;
