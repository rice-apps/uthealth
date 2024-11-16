import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RulerPicker } from "react-native-ruler-picker";
import HeightScreen from "./height-input";

export default function WeightScreen() {
  const router = useRouter();
  const [unit, setUnit] = useState<"lbs" | "kg">("lbs");
  const [weight, setWeight] = useState<number>(60);

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#C3592F" />
      </Pressable>
        <Text style={styles.question}>What is your current weight?</Text>
        <View style={styles.toggleContainer}>
            <Pressable
            style={[styles.toggleButton, unit === "lbs" && styles.activeToggle]}
            onPress={() => setUnit("lbs")}
            >
            <Text style={[styles.toggleText, unit === "lbs" && styles.activeToggleText]}>lbs</Text>
            </Pressable>
            <Pressable
            style={[styles.toggleButton, unit === "kg" && styles.activeToggle]}
            onPress={() => setUnit("kg")}
            >
                <Text style={[styles.toggleText, unit === "kg" && styles.activeToggleText]}>kg</Text>
            </Pressable>
        </View>
        <RulerPicker
          min={0}
          max={200}
          step={1}
          initialValue={weight}
          fractionDigits={0}
          onValueChange={(value: string) => setWeight(parseInt(value))}
          unit={""}
          indicatorColor="#327689"
          shortStepColor="#B3D8E2"
          longStepColor="#B3D8E2"
        //   shortStepHeight={46}
        //   longStepHeight={58}
        //   indicatorHeight={92}
          valueTextStyle={styles.weightNumber}
        />
      <Pressable 
  style={styles.continueButton}
  onPress={() => router.push("/height-input")}  // Assuming your file is at app/height-input.tsx
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
    fontWeight: 700,
    lineHeight: 29.52,
    textAlign: "center",
    width: 254,
    paddingTop: 30,
    paddingBottom: 30
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 700,
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
  weightNumber: {
    fontSize: 86,
    textAlign: "center",
    marginBottom: 40,
    color: "#C3592F"
  },
  sliderContainer: {
    marginHorizontal: 20,
  },
  slider: {
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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