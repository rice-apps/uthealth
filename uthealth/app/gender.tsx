import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

// Gender Selection Screen Component
const GenderScreen: React.FC = () => {
  const router = useRouter();
  const navigateBack = () => {
    // Logic to navigate to home screen
    router.back()
  }
  const navigateNext = () => {
    // Logic to navigate to home screen
    router.push('/dobInput')
  }
  
  const [otherGender, setOtherGender] = useState('');

  const [showingNext, setShowingNext] = useState(false);
  const handleOptionSelect = (option: string) => {
    setShowingNext(true)
    console.log("Selected:", option);
  };
  

  const handleNext = () => {
    // Add functionality for the "Next" button here
    console.log("Next button pressed");
  };

  const handleOtherInputChange = (text: string) => {
    setShowingNext(true)
    setOtherGender(text);
    console.log("Other Gender Input:", text);
  };

  {/* Next Button */ }
  


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"< Assessment"}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Gender</Text>

      <View style={styles.optionsContainer}>
        {['Male', 'Female'].map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.optionButton}
            onPress={() => handleOptionSelect(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        <TextInput
          style={styles.otherInput}
          placeholder="Other"
          placeholderTextColor="#888"
          value={otherGender}
          onChangeText={handleOtherInputChange}
          textAlign="center"
        />
      </View>
      {showingNext&&<TouchableOpacity style={styles.nextButton} onPress={navigateNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#888',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 8,
    width: '90%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  otherInput: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8,
    width: '90%',
    fontSize: 18,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#4CAF50', // Green background color for the button
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20, // Add space between the input and the button
    width: '90%',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff', // White text color for the button
  },
});

// Export GenderScreen if it needs to be used in other parts of the app
export default GenderScreen;
