import { StyleSheet, View, Text, FlatList, Pressable, Image, SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ExerciseScreen() {
  const exercises = [
    {
      id: "1",
      name: "Quad Stretch",
      info: "5 reps • Flexibility",
      image: "image", // Replace with your image URL
    },
    {
      id: "2",
      name: "Push-ups",
      info: "10 reps • Strength",
      image: "images",
    },
  ];

  const equipment = [
    "Chair", "Table", "Yoga Mat"
  ];

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.content}>

    <Text style={styles.header}>Week 3</Text>

    <Text style={styles.subhead}>Level 3 - 15 minutes </Text>

    <View style={styles.equipmentContainer}>
          <Text style={styles.equipmentHeader}>Equipment Needed:</Text>
          <View style={styles.equipmentList}>
            {equipment.map((item, index) => (
              <View key={index} style={styles.equipmentItem}>
                <Text style={styles.equipmentText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            {/* Exercise Image */}
            <View style = {styles.exerciseImage}>
              <Text style = {styles.imageText}>IMG</Text>
              {/*<Image source={{ uri: item.image }} style={styles.exerciseImage} />*/}
            </View>
            
            {/* Exercise Details */}
            <View style={styles.exerciseDetails}>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseInfo}>{item.info}</Text>
            </View>

            {/* Three-Dot Menu Button */}
            <Pressable style={styles.menuButton} onPress={() => console.log("Menu pressed!")}>
              <Ionicons name="ellipsis-vertical" size={24} color="brown" />
            </Pressable>
          </View>
        )}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  equipmentContainer: {
    marginBottom: 20,
  },
  equipmentHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#555",
  },
  equipmentList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  equipmentItem: {
    backgroundColor: "#fffff",
    color: "#276893",
    borderWidth: 1,
    borderColor: "#276893",
 
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  equipmentText: {
    color: "#276893",
    fontSize: 14,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#276893",
  },
  subhead: {
    fontSize: 16,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "FF0000",
  },

  imageText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 12,
  },

  exerciseDetails: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  exerciseInfo: {
    color: "#777",
    fontSize: 14,
    marginTop: 5,
  },
  menuButton: {
    padding: 10,
  },
});
