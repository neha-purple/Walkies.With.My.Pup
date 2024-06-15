import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DataScreen() {
  return (
    <View style={styles.container}>
      <Text>Data Screen that shows averages of how much you
        have walked over the following week, and month. And
        how much you walked your dog if you have one. You will
        also have a calender that displays your ovulation cycle
        if you have one, your medicines, and your work and fun
        schedule which idealy be imported from google calender.
        If those apps that track your period, diet, fitness it
        would be really nice if that could be imported somehow. You can also add notes if something
        special happens that day in case you want to keep track
        of it. Like if your dog gets sick, you can look at your
        calender and see that your dog ate the sofa a few days ago.
        All of this information would be 
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

