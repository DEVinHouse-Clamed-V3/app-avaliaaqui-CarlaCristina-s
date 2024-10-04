import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./src/pages/Home";
import Products from "./src/pages/Products";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: "#eee",
            },
          }}
        />

        <Stack.Screen
          name="Products"
          component={Products}
          options={{
            headerStyle: {
              backgroundColor: "#eee",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
