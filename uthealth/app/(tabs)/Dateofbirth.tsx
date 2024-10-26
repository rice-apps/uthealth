import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTailwind } from 'nativewind';

export default function DateofBirth() {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (text) => {
        const cleanedInput = text.replace(/\D/g, '')
        console.log(cleanedInput)
    
        // Create a new formatted date string
        let formattedDate = 'MM / DD / YYYY';
    
        // Replace characters in the format based on user input
        for (let i = 0; i < cleanedInput.length; i++) {
            console.log(formattedDate.substring(0, i))
            console.log(cleanedInput[i])
            console.log(formattedDate.substring(i + 1))
            if (formattedDate[i] !== '/') {
                formattedDate = formattedDate.substring(0, i) + cleanedInput[i] + formattedDate.substring(i + 1);
            }
        }
        console.log(formattedDate)
        setSelectedDate(formattedDate);
      };
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
      };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };

    const handleConfirm = (date) => {
        const formattedDate = `${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear()}`;
        setSelectedDate(formattedDate);
        hideDatePicker();
      };
      
    return (
        <View style={verticalView.container}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() } accessible = {false}>
                <View style={styles.dateInputContainer}>
                    <TextInput
                        style={styles.textBox}
                        placeholder="MM / DD / YYYY"
                        placeholderTextColor="#000000"
                        value={selectedDate}
                        onChangeText={handleDateChange}
                        maxLength={10}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.iconContainer} onPress={showDatePicker}>
                        <Image
                            source={require('@/assets/images/calendar-icon.png')} 
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>


            <TouchableOpacity style={styles.greyButton}>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>

    );
}

const verticalView = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: "#FFFFFF",
    },
})
const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
      },
    textBox: {
        width: 295,
        height: 47,
        borderRadius: 66,
        textAlign: 'left',
    },
    iconContainer: {
        marginLeft: -50,
      },

    icon: {
        width: 20,  
        height: 20, 
      },

    placeholderButton: {
        backgroundColor: '#D9D9D9',
        height: 50,
        borderRadius: 25,
      },

    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 47,
        width: 295,
        color: "Black"
    },
    greyButton: {
        backgroundColor: '#D9D9D9',
        borderRadius: 66,
        height: 65,
        width: 295,
        marginTop: 80,
        alignItems: 'center',
    },

})