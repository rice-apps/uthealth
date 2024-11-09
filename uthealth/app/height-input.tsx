import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RulerPicker } from "react-native-ruler-picker";

export default function HeightScreen() {
  const router = useRouter();
  const [unit, setUnit] = useState<"ft" | "cm">("ft");
  const [height, setHeight] = useState<number>(170); // Default in cm

  const handleUnitChange = (newUnit: "ft" | "cm") => {
    if (newUnit === "cm" && unit === "ft") {
      // Convert feet to cm
      setHeight(Math.round(height * 30.48));
    } else if (newUnit === "ft" && unit === "cm") {
      // Convert cm to feet
      setHeight(Math.round((height / 30.48) * 10) / 10);
    }
    setUnit(newUnit);
  };

  // Format height display
  const formatHeight = (value: number): string => {
    if (unit === "ft") {
      const feet = Math.floor(value);
      const inches = Math.round((value % 1) * 12);
      return `${feet}'${inches}"`;
    }
    return `${Math.round(value)}`;
  };

  // Get min and max values based on unit
  const getMinMax = () => {
    if (unit === "ft") {
      return { min: 4, max: 7 }; // Common range for height in feet
    } else {
      return { min: 120, max: 220 }; // Equivalent range in centimeters
    }
  };

  const { min, max } = getMinMax();

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#C3592F" />
      </Pressable>

      <Text style={styles.question}>What is your height?</Text>
      
      <View style={styles.toggleContainer}>
        <Pressable
          style={[styles.toggleButton, unit === "ft" && styles.activeToggle]}
          onPress={() => handleUnitChange("ft")}
        >
          <Text style={[styles.toggleText, unit === "ft" && styles.activeToggleText]}>ft</Text>
        </Pressable>
        <Pressable
          style={[styles.toggleButton, unit === "cm" && styles.activeToggle]}
          onPress={() => handleUnitChange("cm")}
        >
          <Text style={[styles.toggleText, unit === "cm" && styles.activeToggleText]}>cm</Text>
        </Pressable>
      </View>

      // Remove the valueFormatter prop and handle the formatting in onValueChange

<RulerPicker
  min={min}
  max={max}
  step={unit === "ft" ? 0.1 : 1}
  initialValue={height}
  fractionDigits={unit === "ft" ? 1 : 0}
  onValueChange={(value: string) => {
    const numValue = parseFloat(value);
    setHeight(numValue);
  }}
  unit={unit === "ft" ? "'" : " cm"}  // Add the unit here
  indicatorColor="#327689"
  shortStepColor="#B3D8E2"
  longStepColor="#B3D8E2"
  valueTextStyle={styles.heightNumber}
/>

      <Pressable 
        style={styles.continueButton}
        onPress={() => router.back()}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  question: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 29.52,
    textAlign: "center",
    width: 254,
    paddingTop: 30,
    paddingBottom: 30
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 19.68,
    color: "#C3592F"
  },
  activeToggle: {
    backgroundColor: "#C3592F",
  },
  activeToggleText: {
    color: "white"
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  heightNumber: {
    fontSize: 86,
    textAlign: "center",
    marginBottom: 40,
    color: "#C3592F",
    fontWeight: "700",
  },
  continueButton: {
    backgroundColor: "#C3592F",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 40,
    width: "100%",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  }
});