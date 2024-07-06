import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import {useValue} from './ValueContext';
import Mapbox, {MapView, UserTrackingMode, LocationPuck, Camera, Images, Image, UserLocation } from "@rnmapbox/maps";
import { SafeAreaView } from 'react-native-safe-area-context';

Mapbox.setAccessToken("pk.eyJ1IjoibmVoYWthbGFrdW50bGEiLCJhIjoiY2x5MjM3Ymp5MTUzZTJqcTF5NzRwZXJqMSJ9.s9UPH90c2tPDr0zLwGLydw");

export default function DataScreen() {
  const { currentValue, setCurrentValue } = useValue();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        let { status: foreStatus } = await Location.requestForegroundPermissionsAsync();
        if (!foreStatus) {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let { status: backStatus } = await Location.requestBackgroundPermissionsAsync();
        if (!backStatus) {
          setErrorMsg('Permission to access backround location was denied');
          return;
        }
        setLocation((await Location.getCurrentPositionAsync({})).coords);
      }
      catch (error) {
        setErrorMsg('An error occurred while fetching location.');
        console.log(error);
      }
    })();
  }, []);
  return (
    <ScrollView style={styles.container}>
    <View style={{alignItems: 'center' }}><Text style={styles.topText}>Data</Text></View>
    {errorMsg ? <Text>{errorMsg}</Text> : null}
    {currentValue.dogs.map((dog, index) => (
    <View key={index} style={styles.dogContainer}>
       <View><Text style={styles.text}>{dog.name}'s history: </Text></View>
          {location?(
                <MapView
                  style={styles.map}
                  styleURL='mapbox://styles/nehakalakuntla/cly23jc4b00bv01qo76806mo8'
                />
          ) : (
            <Text style={styles.text}>boo</Text>
          )}
      </View>
      ))}
  </ScrollView>
      );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE8FB',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontFamily: 'Georgia',
    margin: 10,
    fontSize: 20,
  },
  topText: {
    fontFamily: 'Georgia',
    marginTop: 30,
    fontSize: 30,
    justifyText: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  dogContainer: {
    height: 305, // Set a fixed height to ensure the map is visible
    marginBottom: 50,
    alignItems: 'center',
  },
});


