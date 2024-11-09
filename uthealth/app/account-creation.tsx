import { View, Text, TextInput, StyleSheet, SafeAreaView, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

export default function AccountCreation() {
  type UserData = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    reenterPassword: string;
  };

  const [formData, setFormData] = useState<UserData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    reenterPassword: '',
  });

  const handleChange = (name: keyof UserData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.page}>
            
            <Image
              // source={{ uri: '' }} // Replace with the actual path to your logo image
              style={styles.logo}
            />

            <View style={styles.formContainer}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(value) => handleChange('firstName', value)}
              />

              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(value) => handleChange('lastName', value)}
              />

              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={formData.phoneNumber}
                onChangeText={(value) => handleChange('phoneNumber', value)}
                keyboardType="phone-pad"
              />

              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => handleChange('email', value)}
                keyboardType="email-address"
              />

              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry
              />

              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                value={formData.reenterPassword}
                onChangeText={(value) => handleChange('reenterPassword', value)}
                secureTextEntry
              />

              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

const darkOrange = '#844016';
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: '#e0e0e0', // Placeholder color for the logo
  },
  inputLabel: {
    fontSize: 15,
    color: 'black',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: darkOrange,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#FFF',
    color: darkOrange,
  },
  primaryButton: {
    backgroundColor: darkOrange,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  enrollLink: {
    fontWeight: 'bold',
    color: '#000080', // Dark blue for emphasis
    alignSelf: 'flex-start',
  },
});
