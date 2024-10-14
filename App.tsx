import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import GeoCheckScreen from './src/screens/GeoCheckScreen';
import SelectLevelScreen from './src/screens/SelectLevelScreen';
import LevelScreen from './src/screens/LevelScreen';
import RulesScreen from './src/screens/RulesScreen';
import { initializeApp } from 'firebase/app';
import OneSignal from 'react-native-onesignal';

const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
        const firebaseConfig = {
          apiKey: "mymind-62b2c", 
          authDomain: "your-project-id.firebaseapp.com",
          projectId: "your-project-id",
          storageBucket: "your-project-id.appspot.com",
          messagingSenderId: "1061195729989", 
          appId: "1:1061195729989:web:99f5083fa40d9160f0e72c", 
          measurementId: "1061195729989" 
        };

        const app = initializeApp(firebaseConfig);
        console.log('Firebase Initialized');
      }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GeoCheck">
        <Stack.Screen 
        name="GeoCheck" 
        component={GeoCheckScreen} />
        <Stack.Screen
         name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
           />
          <Stack.Screen
          name="SelectLevelScreen"
          component={SelectLevelScreen} 
          options={{
            headerShown: false,
          }}
          />
          <Stack.Screen
          name="LevelScreen"
          component={LevelScreen} 
          options={{
            headerShown: false,
          }}
          />
          <Stack.Screen
          name="RulesScreen"
          component={RulesScreen} 
          options={{
            headerShown: false,
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
