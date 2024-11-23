import { Text, View } from "react-native";
import Dateofbirth from "./dateofbirth";
import ScrollButton from "./scrollbutton";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.row}>
      <Dateofbirth />
      </View>
   </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  }
})
