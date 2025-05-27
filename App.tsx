import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TitleScreen } from "./src/screens/TitleScreen";
import { PlayerSelectionScreen } from "./src/screens/PlayerSelectionScreen";
import { CategorySelectionScreen } from "./src/screens/CategorySelectionScreen";
import { GameScreen } from "./src/screens/GameScreen";
import { SafeScreen } from "./src/components/common/SafeScreen";

export type RootStackParamList = {
  Title: undefined;
  PlayerSelection: undefined;
  CategorySelection: {
    players: string[];
  };
  Game: {
    players: string[];
    category: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "#1a1a1a",
              },
            }}
          >
            <Stack.Screen name="Title" component={TitleScreen} />
            <Stack.Screen
              name="PlayerSelection"
              component={PlayerSelectionScreen}
            />
            <Stack.Screen
              name="CategorySelection"
              component={CategorySelectionScreen}
            />
            <Stack.Screen name="Game" component={GameScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeScreen>
    </SafeAreaProvider>
  );
}
