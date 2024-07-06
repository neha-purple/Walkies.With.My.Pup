import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useValue } from './ValueContext';
import { Pedometer } from 'expo-sensors';

export default function HomeScreen() {
  const { currentValue, setCurrentValue } = useValue();
  useEffect(() => {
    const subscribe = async () => {
    try{
    setCurrentValue({ ...currentValue, isPedometerAvailable: await Pedometer.isAvailableAsync() })
    if (currentValue.isPedometerAvailable) {
      const end = new Date();
      const start = new Date(new Date().setHours(0, 0, 0, 0));
      const stepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (stepCountResult) {
        setCurrentValue({ ...currentValue, currentDailyWalk: stepCountResult.steps });
      }
      Pedometer.watchStepCount(result => {
        setCurrentValue(currentValue => ({
          ...currentValue,
          currentDailyWalk: currentValue.currentDailyWalk + result.steps,
        }));
      })
        currentValue.dogs.forEach((dog, index) => {
          if (dog.recording) {
            Pedometer.watchStepCount(result => {
              setCurrentValue(currentValue => {
                const newDogs = [...currentValue.dogs];
                newDogs[index] = { ...newDogs[index], currentDogWalk: newDogs[index].currentDogWalk + result.steps,};
                return { ...currentValue, dogs: newDogs };
              });
            });
          }
        });
      }
    }
    catch (error) {
      console.error('Error subscribing to pedometer:', error);
    }}
    },
  []);

    return (
    <ScrollView style={{ backgroundColor: '#FFE8FB' }}>
      <View style={{justifyContent: 'center', alignItems: 'center' }}><Text style={styles.topText}>Home</Text></View>
      <View style={styles.container} >
          <Text style={styles.text}>Today's walking history: {currentValue['currentDailyWalk']}{'\n'}{((parseInt(currentValue['currentDailyWalk'])/parseInt(currentValue['dailyWalkingGoal']))*100).toFixed(2)} % of your goal</Text>
          {currentValue['dailyVitaminDGoal'] > 0 &&
          <Text style={styles.text}>How much Vitamin-D you got today: {currentValue['currentVitaminD']}{'\n'}{((parseInt(currentValue['currentVitaminD']) / parseInt(currentValue['dailyVitaminDGoal'])) * 100).toFixed(2)} % of your goal</Text>}
          {currentValue.dogs.map((dog, index) => (
          <View key={index} style={styles.container}>
            <Text style={styles.text}>How much you walked {dog.name} today: {dog.currentDogWalk}{'\n'}{(parseInt(dog.currentDogWalk).toFixed(2) / parseInt(dog.dailyDogWalkingGoal) * 100).toFixed(2)} % of your goal</Text>
            <Pressable style={styles.button} onPress={() => {
                const newDogs = [...currentValue.dogs];
                newDogs[index] = { ...newDogs[index], recording: !newDogs[index].recording };
                setCurrentValue({ ...currentValue, dogs: newDogs });
              }}>
            <Text style={styles.buttonText}>{dog.recording ? 'Stop' : 'Start'}</Text>
            </Pressable>
            </View>
          ))}
      </View>
    </ScrollView>
    )
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFE8FB',
    },
    text: {
      margin: 20,
      textAlign: 'center',
      fontFamily: 'Georgia',
      fontSize: 20
    },
    button: {
      marginBottom: 12,
    },
    buttonText: {
      margin: 5,
      padding: 17,
      fontSize: 30,
      backgroundColor: 'white',
      fontFamily: 'Georgia',
      borderRadius: 16,
    },
    topText: {
      fontFamily: 'Georgia',
      marginTop: 30,
      fontSize: 30,
      justifyText: 'center',
      fontWeight: 'bold',
      fontStyle: 'italic'
    },
  });
/*   const subscribe = async () => {
    try{
    setCurrentValue({ ...currentValue, isPedometerAvailable: await Pedometer.isAvailableAsync() })
    if (currentValue.isPedometerAvailable) {
      const end = new Date();
      const start = new Date(new Date().setHours(0, 0, 0, 0));
      const stepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (stepCountResult) {
        setCurrentValue({ ...currentValue, currentDailyWalk: stepCountResult.steps });
      }
      return Pedometer.watchStepCount(result => {
        setCurrentValue({ ...currentValue, currentDailyWalk: prevSteps => prevSteps + result.steps });
      });
      currentValue.dogs.forEach(async(dog, index) => (
          if (stepCountResult && dog.recording) {
              setCurrentValue({ ...currentValue, dog.currentDogWalk: stepCountResult.steps });
            }
          return Pedometer.watchStepCount(result => {
              setCurrentValue({ ...currentValue, dog.currentDogWalk: prevSteps => prevSteps + result.steps });
          }) 
      ))
      }
    }
    catch (error) {
      console.error('Error subscribing to pedometer:', error);
    }
  }*/