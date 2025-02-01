import { Text, View } from "react-native";
import { UserProvider } from "@/user/UserContext";
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../global.css"

export default function Index() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <UserProvider>
        <View className="items-center">
          <Text className="text-red-500">Edit app/index.tsx to edit this screen.</Text>
        </View>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
