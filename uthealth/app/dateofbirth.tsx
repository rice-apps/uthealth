import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { Dimensions, TouchableOpacity, TouchableWithoutFeedback, View, Text, Button } from "react-native";
import WheelPicker from '@quidone/react-native-wheel-picker';

export default function Dateofbirth() {
  const monthdata = [...Array(13).keys()].map((index) => ({
    value: index,
    label: index.toString(),
  }))
  monthdata.unshift({ value: 'Month', label: 'Month' })

  const currentYear = new Date().getFullYear(); // Get the current year
  const yeardata = [...Array(currentYear - 1900 + 1).keys()].map((index) => ({
    value: currentYear - index, // Start from the current year and subtract to get past years
    label: (currentYear - index).toString(),
  }));
  
  // Add a placeholder option for "Year"
  yeardata.unshift({ value: 'Year', label: 'Year' });

  const daydata = [...Array(32).keys()].map((index) => ({
    value: index,
    label: index.toString(),
  }))
  daydata.unshift({ value: 'Day', label: 'Day' })


  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });


  const [month, setMonth] = useState('Month');
  const [year, setYear] = useState('Year');
  const [day, setDay] = useState('Day');


  const [isYearVisible, setYearIsVisible] = useState(false);
  const [isMonthVisible, setMonthIsVisible] = useState(false);
  const [isDayVisible, setDayIsVisible] = useState(false);


  const monthValueRef = useRef(month);
  const yearValueRef = useRef(year);
  const dayValueRef = useRef(day);

  const handleYearButtonPress = () => {
    setYearIsVisible(true)
    setDayIsVisible(false)
    setMonthIsVisible(false)

    setMonth(monthValueRef.current)
    setYear(yearValueRef.current)
    setDay(dayValueRef.current)
  };
  const handleMonthButtonPress = () => {
    setMonthIsVisible(true)
    setYearIsVisible(false)
    setDayIsVisible(false)

    setMonth(monthValueRef.current)
    setYear(yearValueRef.current)
    setDay(dayValueRef.current)
  };
  const handleDayButtonPress = () => {
    setDayIsVisible(true)
    setMonthIsVisible(false)
    setYearIsVisible(false)

    setMonth(monthValueRef.current)
    setYear(yearValueRef.current)
    setDay(dayValueRef.current)
  };

  const handleMonthValueChanging = ({ item: { value } }) => {
    monthValueRef.current = value;
    console.log(value)
  };


  const handleDayValueChanging = ({ item: { value } }) => {
    dayValueRef.current = value;
    console.log(value)
  };
  const handleDayValueChanged = ({ item: { value } }) => {
    setDay(value)
  }


  const handleYearValueChanging = ({ item: { value } }) => {
    yearValueRef.current = value;
    console.log(value)
  };
  const handleYearValueChanged = ({ item: { value } }) => {
    setYear(value)
  }


  const handleTapOutside = () => {
    setMonth(monthValueRef.current)
    setYear(yearValueRef.current)
    setDay(dayValueRef.current)
    console.log("pressed")
    setYearIsVisible(false)
    setDayIsVisible(false)
    setMonthIsVisible(false)
  }
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleTapOutside} accessible={false}>
        <View style={[styles.wrapper, { width, height }]} onLayout={() => setSize(Dimensions.get('window'))} />
      </TouchableWithoutFeedback>
      <Text style={styles.title}>Date of Birth</Text>
      <View style={styles.row}>
        <View></View>
        <View></View>

        <View style={styles.year}>
          {isMonthVisible && (
            <View style={styles.year}>
              <View style={styles.date}>
                <WheelPicker
                  data={monthdata} // Data to be used by the picker
                  value={month} // Current value
                  onValueChanging={handleMonthValueChanging} // Handle value change
                  renderOverlay={() => null}
                  itemTextStyle={styles.pickerItemText}
                />
              </View>
              <View style={styles.buttonNotTouchable}></View>
            </View>
          )}
          {!isMonthVisible && (
            <TouchableOpacity style={styles.button} onPress={handleMonthButtonPress}>
              <Text style={styles.buttonText}>{`${month}`}</Text>
            </TouchableOpacity>
          )}
        </View>
       <Text style={styles.buttonText}>/</Text>
        
        <View style={styles.year}>
          {isDayVisible && (
            <View style={styles.year}>
              <View style={styles.date}>
                <WheelPicker
                  data={daydata} // Data to be used by the picker
                  value={day} // Current value
                  onValueChanging={handleDayValueChanging} // Handle value change
                  renderOverlay={() => null}
                  itemTextStyle={styles.pickerItemText}
                />
              </View>
              <View style={styles.buttonNotTouchable}></View>
            </View>
          )}
          {!isDayVisible && (
            <TouchableOpacity style={styles.button} onPress={handleDayButtonPress}>
              <Text style={styles.buttonText}>{`${day}`}</Text>
            </TouchableOpacity>
          )}
        </View>
       <Text style={styles.buttonText}>/</Text>
        
        <View style={styles.year}>
          {isYearVisible && (
            <View style={styles.year}>
              <View style={styles.date}>
                <WheelPicker
                  data={yeardata} // Data to be used by the picker
                  value={year} // Current value
                  onValueChanging={handleYearValueChanging} // Handle value change
                  renderOverlay={() => null}
                  itemTextStyle={styles.pickerItemText}
                />
              </View>
              <View style={styles.buttonNotTouchable}></View>
            </View>
          )}
          {!isYearVisible && (
            <TouchableOpacity style={styles.button} onPress={handleYearButtonPress}>
              <Text style={styles.buttonText}>{`${year}`}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.container1}>
      <TouchableOpacity style={styles.button1}>
        <Text style={styles.buttonText1}>Continue</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    position: 'relative',
  },
  container1: {
    paddingTop: 287
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 29.52,
    textAlign: "center",
    width: 254,
    paddingTop: 67,
  },
  date: {
    position: 'absolute', // Free positioning
    top: '50%', // Position from the top
    left: '50%', // Position from the left
    transform: [
      { translateX: -50 }, // Move back by half the width
      { translateY: -50 }, // Move back by half the height
    ],
    width: 100, // Component's width
    height: 100, // Component's height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 20,
    width: 200,
  },
  column: {
    alignItems: "center"
  },
  row: {
    paddingTop: 161,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 50,
    width: '90%',
  },
  wrapper: {
    backgroundColor: 'transparent', // Invisible background
    position: 'absolute', // Optional: keeps it in place
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 50, // Rounded corners
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center',
    borderWidth: 2, // Border width
    borderColor: '#327689', // Border color (e.g., white)
    width: 100,
    height: 50,
  },
  button1: {
    backgroundColor: '#327689',
    borderRadius: 50, // Rounded corners
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center',
    borderWidth: 2, // Border width
    borderColor: '#1E4F5D', // Border color (e.g., white)
    width: 295,
    height: 65,
  },
  buttonNotTouchable: {
    backgroundColor: 'transparent',
    borderRadius: 50, // Rounded corners
    alignItems: 'center', // Center text horizontally
    borderWidth: 2, // Border width
    borderColor: '#327689', // Border color (e.g., white)
    width: 100,
    height: 50,
    pointerEvents: 'none'
  },
  buttonText: {
    fontWeight: '400', // Set font weight
    fontSize: 20, // Set font size
    color: '#327689', // White text color
    fontFamily: 'Proxima Nova',
  },
  buttonText1: {
    fontWeight: '400', // Set font weight
    fontSize: 20, // Set font size
    width: 86,
    height: 25,
    color: '#FFFFFF', // White text color
    fontFamily: 'Proxima Nova',
  },
  year: {
    alignItems: 'center',
  },
  pickerItemText: {
    color: '#327689',
    fontWeight: '400', // Set font weight
    fontSize: 20,
    fontFamily: 'Space Mono Regular',
  }
});