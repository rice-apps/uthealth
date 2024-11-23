import { Text, View } from "react-native";
import Dateofbirth from "./dateofbirth";
import ScrollButton from "./scrollbutton";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
      <Dateofbirth />
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  }
})
