import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RulerPicker } from "react-native-ruler-picker";

export default function WeightScreen() {
  const [unit, setUnit] = useState<"lbs" | "kg">("lbs");
  const [weight, setWeight] = useState(60);

  return (
    <ThemedView style={styles.container}>
      <Pressable
        onPress={() => router.back()}
        style={styles.backButton}
        hitSlop={8}
      >
        <View style={styles.backButtonContent}>
          <Ionicons name="chevron-back" size={30} color="#666" />
          <ThemedText style={styles.backText}>Back</ThemedText>
        </View>
      </Pressable>

      <ThemedText type="title" style={styles.title}>
        What is your current weight?
      </ThemedText>

      {/* Unit Toggle */}
      <ThemedView style={styles.toggleContainer}>
        <Pressable
          style={[styles.toggleButton, unit === "lbs" && styles.activeToggle]}
          onPress={() => setUnit("lbs")}
        >
          <ThemedText type="default">lbs</ThemedText>
        </Pressable>
        <Pressable
          style={[styles.toggleButton, unit === "kg" && styles.activeToggle]}
          onPress={() => setUnit("kg")}
        >
          <ThemedText type="default">kg</ThemedText>
        </Pressable>
      </ThemedView>

      {/* Weight Display */}
      <ThemedText type="title" style={styles.weightNumber}>
        {weight}
      </ThemedText>

      {/* Weight Slider */}
      <ThemedView style={styles.sliderContainer}>
        <RulerPicker
          min={0}
          max={200}
          step={1}
          value={weight}
          onChange={setWeight}
          style={styles.slider}
          labelStyle={styles.sliderLabels}
        />
      </ThemedView>

      {/* Continue Button */}
      <Pressable
        style={styles.continueButton}
        onPress={() => {
          // Handle continue action
          router.push("/height-input");
        }}
      >
        <ThemedText type="body">Continue</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  backButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 20,
    color: "#666",
    marginLeft: -4,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 150,
    marginBottom: 40,
    marginHorizontal: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeToggle: {
    backgroundColor: "#666",
  },
  weightNumber: {
    fontSize: 48,
    textAlign: "center",
    marginBottom: 40,
    marginTop: 200,
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
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 40,
  },
});
