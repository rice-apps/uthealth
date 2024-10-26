import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useState } from 'react';

export default function PhoneSignIn() {
  const [username, setUsername] = useState(" ")
  const [password, setPassword] = useState(" ")
  return (
    <SafeAreaView style = {styles.page}>
      <Image
            source={{ uri: '' }} // Use the path to the image
            style={styles.logo}
      /> 

<Text style={styles.title}>Sign in with your mobile number</Text>

      <View>

        <Text style = {styles.label} >Username</Text>
        <TextInput
          style = {styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />

        <Text style= {styles.label} >Password</Text>
        
        <TextInput
          style = {styles.input}
          placeholder="Enter your password"
          
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Button title="Sign Up" />

        <Text style= {styles.normal} >Need Help?</Text>

        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialButtonsContainer}>
          <View style={styles.socialButton}>
            <Button title="Sign in with Google"/>
          </View>
          <View style={styles.socialButton}>
            <Button title="Sign in with Facebook"/>
          </View>
        </View>

        <Text style= {styles.normal} >No Account? Enroll Now!</Text>

      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  page: {
    flex: 1, // Make the container take the full height of the screen
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    padding: 16, // Add some padding around the edges
  },
  title: { 
    fontSize: 20,
    color: 'black',
    marginBottom: 20,
  },
  normal: { 
    fontSize: 15,
    color: 'black',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18, // Make the text a bit larger
    marginBottom: 8, // Add spacing below the label
    color: 'blue', // Keep the text color blue
    textAlign: 'center',
  },
  input: {
    padding: 10, // Add padding inside the input box
    borderWidth: 1, // Add a border around the text input
    borderColor: 'gray', // Make the border color gray
    borderRadius: 5, // Slightly round the corners of the input box
    marginBottom: 16, // Add spacing between input fields
    marginHorizontal: 20,
  },
  logo: {
    width: 150, // Set the width of the logo
    height: 150, // Set the height of the logo
    marginBottom: 20, // Add some space between the logo and the rest of the form
    resizeMode: 'contain', // Ensure the image fits within the box
  },
  socialButtonsContainer: {
    marginTop: 20, // Add space above the social buttons
    //width: '80%', // Keep the width consistent with other elements
    gap: 10, // Add spacing between the buttons (React Native 0.71+)
    alignItems: 'center',
    marginHorizontal: 30,
  },
  socialButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgray', // Light gray border color
    borderRadius: 5,
    padding: 5, // Add some padding around the button
    alignItems: 'center', // Center text inside the button
    justifyContent: 'center', // Center the content vertically
  },
  lineContainer: {
    flexDirection: 'row', // Align children horizontally
    alignItems: 'center', // Center items vertically
    width: '100%', // Full width
    marginVertical: 10, // Spacing above and below the line
  },
  line: {
    height: 1, // Height of the line
    backgroundColor: 'gray', // Color of the line
    flex: 1, // Take up available space
    marginHorizontal: 20,
  },
  orText: {
    marginHorizontal: 10, // Spacing around the "or" text
    fontSize: 16, // Font size for the "or" text
    color: 'black', // Color for the "or" text
  },
});

