import React, { useState, useEffect }  from 'react';
import { Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import DataScreen from './DataScreen';
import ValueProvider from './ValueContext';
import axios from 'axios';

  export default function App() {
  const data = {
      dailyWalkingGoal: 10000,
      dailyVitaminDGoal: 600,
      dogs: [],
      dailyDogWalkingGoal: 2,
      currentDailyWalk: 0,
      currentVitaminD: 0,
      isPedometerAvailable: false,
  };
  const server = 'https://48d9-209-6-142-225.ngrok-free.app';
  const group = 'dog_walking_tracker';
  useEffect(() => {
    const logDataServer = async () => {
        try {
        await axios({
          method: 'post',
          url: server + '/room',
          data: { id: group, uid: 'neha', data: new Date().toISOString() }
        })
      }catch (error) {
        console.error('Error logging data to server:', error);
      }
    }
    }, []);

  function SplashScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFE8FB' }}>
        <Text style={styles.text}>Assembling Pups...</Text>
        <ActivityIndicator size="large" color="pink"/>
      </View>
    );
  }
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
      const loadData = async () => {
        try {
          await sleep(800);
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    }, []);
    if (isLoading) {
      return <SplashScreen />;
    }
  const Tab = createBottomTabNavigator();
    return (
      <ValueProvider value={data}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                }
                else if (route.name === 'Data') {
                  iconName = focused ? 'share-social' : 'analytics-outline';
                }
                else if (route.name === 'About') {
                  iconName = focused ? 'heart' : 'heart-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'pink',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
            sceneContainerStyle={{ backgroundColor: 'white' }}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Data" component={DataScreen} />
            <Tab.Screen name="About" component={AboutScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ValueProvider>
    );
  }

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Georgia',
    margin: 10,
    fontSize: 20
  },
})