import * as React from 'react';
import { Text, View, TextInput, Button, ActivityIndicator, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import DataScreen from './DataScreen';

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
      <Text>Assembling Pups...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const Tab = createBottomTabNavigator();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


export default function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const loadData = async () => {
      try {
        await sleep(1000); 
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);
  if (isLoading) {
    return <SplashScreen />;
  }

    return (
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
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Data" component={DataScreen} />
            <Tab.Screen name="About" component={AboutScreen} />
          </Tab.Navigator>
        </NavigationContainer>
  );

}