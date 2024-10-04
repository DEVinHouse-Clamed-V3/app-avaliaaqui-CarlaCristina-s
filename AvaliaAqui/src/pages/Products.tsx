import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";

interface ProductsProps {
  navigation: NavigationProp<any>;
}

export default function Products({ navigation }: ProductsProps) {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
