import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

// Gender Selection Screen Component
const GenderScreen: React.FC = () => {
  const [otherGender, setOtherGender] = useState('');
  
  const handleOptionSelect = (option: string) => {
    console.log("Selected:", option);
  };

  const handleOtherInputChange = (text: string) => {
    setOtherGender(text);
    console.log("Other Gender Input:", text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
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
          placeholder="Please specify"
          value={otherGender}
          onChangeText={handleOtherInputChange}
        />
      </View>
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
});

// Export GenderScreen if it needs to be used in other parts of the app
export default GenderScreen;
