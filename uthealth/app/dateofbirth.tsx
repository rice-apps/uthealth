import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { Dimensions, TouchableOpacity, TouchableWithoutFeedback, View, Text, Button } from "react-native";
import WheelPicker from '@quidone/react-native-wheel-picker';

export default function Dateofbirth() {
  const monthdata = [...Array(32).keys()].map((index) => ({
    value: index,
    label: index.toString(),
  }))
  monthdata.unshift({ value: 'Month', label: 'Month' })

  const yeardata = [...Array(180).keys()].map((index) => ({
    value: index,
    label: index.toString(),
  }))
  yeardata.unshift({ value: 'Year', label: 'Year' })


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
  };
  const handleMonthButtonPress = () => {
    setMonthIsVisible(true)
  };
  const handleDayButtonPress = () => {
    setDayIsVisible(true)
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 29.52,
    textAlign: "center",
    width: 254,
    paddingTop: 67,
    paddingBottom: 30
  },
  date: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 20,
    width: 200,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderColor: '#844016', // Border color (e.g., white)
    width: 100,
    height: 50,
  },
  buttonNotTouchable: {
    backgroundColor: 'transparent',
    borderRadius: 50, // Rounded corners
    alignItems: 'center', // Center text horizontally
    borderWidth: 2, // Border width
    borderColor: '#844016', // Border color (e.g., white)
    width: 100,
    height: 50,
    pointerEvents: 'none'
  },
  buttonText: {
    fontWeight: '400', // Set font weight
    fontSize: 20, // Set font size
    color: '#844016', // White text color
    fontFamily: 'Proxima Nova',
  },
  year: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerItemText: {
    color: '#844016',
    fontWeight: '400', // Set font weight
    fontSize: 20,
    fontFamily: 'Space Mono Regular',
  }
});