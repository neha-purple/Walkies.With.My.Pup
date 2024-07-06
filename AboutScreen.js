import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Image } from 'react-native';
import {useValue} from './ValueContext';
import * as ImagePicker from 'expo-image-picker';
const PlaceholderImage = require('./images/default-dog.jpeg');

export default function AboutScreen() {
  const { currentValue, setCurrentValue } = useValue();
  const [selectedImage, setSelectedImage] = useState(PlaceholderImage);
  const handleDogChange = (index, key, value) => {
    const updatedDogs = [...currentValue.dogs];
    updatedDogs[index] = { ...updatedDogs[index], [key]: value };
    setCurrentValue({ ...currentValue, dogs: updatedDogs });
  };
  const pickImageAsync = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
  });
      if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      setSelectedImage(PlaceholderImage);
    }
  };
  return (
    <ScrollView style={{ backgroundColor: '#FFE8FB' }}>
      <View style={styles.container}> 
      <View style={{justifyContent: 'center', alignItems: 'center' }}><Text style={styles.topText}>About</Text></View>
      <Text style={styles.text}>Daily Walking Goal (miles):  </Text>  
        <TextInput style={styles.inputDogText}
            placeholder="   ...type here"
            onChangeText={(text) => {
                setCurrentValue({...currentValue, dailyWalkingGoal: text});
            }}
            inputMode="numeric" 
        />
      <Text style={styles.text}>Daily Vitamin-D Goal (UI):  </Text>   
        <TextInput style={styles.inputDogText}
            placeholder="   ...type here"
            onChangeText={(text) => {
                setCurrentValue({...currentValue, dailyVitaminDGoal: text});
            }}
            inputMode="numeric" 
      />
      <Text style={styles.text}>How many dogs you have:  </Text>    
        <TextInput style={styles.inputDogText}
            placeholder="   ...type here"
        onChangeText={(text) => {
           const count = parseInt(text, 10);
           const dogs = new Array(count).fill({ name: '', dailyDogWalkingGoal: '', currentDogWalk: 0, recording:false });
           setCurrentValue({ ...currentValue, dogs });
                }}
            inputMode="numeric" 
      />
      {currentValue.dogs.map((dog, index) => (
        <View key={index} >
          <View style= {{margin: 14}}></View>
          <Pressable onPress={pickImageAsync} >
            <Image
              style={styles.image}
              source={selectedImage}
            />
          </Pressable>
          <Text style={styles.text}>Your Dog's Name:     
          <TextInput style={styles.inputDogText}
            placeholder="   ...type here"
            onChangeText={(text) => handleDogChange(index, 'name', text)}
          /></Text>
          <Text style={styles.text}>Daily Dog-Walking Goal:    
          <TextInput style={styles.inputDogText}
            placeholder="   ...type here"
            onChangeText={(text) => handleDogChange(index, 'dailyDogWalkingGoal', text)}
            inputMode="numeric"
          /></Text>
        </View>
      ))}
      </View>
      </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  text: {
    fontFamily: 'Georgia',
    margin: 10,
    fontSize: 20
  },
  inputDogText: {
    fontFamily: 'Georgia',
    fontSize: 15,
  },
  image: {
    width: '90%',
    height: 140,
    borderRadius: 38,
    alignSelf: 'center'
  },
  topText: {
    fontFamily: 'Georgia',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 30,
    justifyText: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
});
