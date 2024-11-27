import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FIREBASE_AUTH } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./components/Login";
import Home from "./components/Home";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      setUser(authUser);
      console.log(" user: ", authUser);
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons react-native-get-random-values react-native-screens react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
