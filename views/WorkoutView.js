import React, {useEffect, useState} from 'react';
import {SafeAreaView, Button, Image} from 'react-native';
import uuid from 'react-native-uuid';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';

import styles from '../stylesheets/stylesheet.js';
import Header from '../components/Header';
import InvestItem from '../components/InvestItem';
import DeleteOrCancel from '../components/DeleteOrCancel.js';

const WorkoutView = () => {
  const [imagePicked, setImagePicked] = useState(null);

  console.log(imagePicked);

  const test = () => {
    let options = {};
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      console.log('uri = ', response.assets[0].uri);

      setImagePicked(response.assets[0].uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
    });
  };

  return (
    <SafeAreaView style={styles.welcome}>
      <Header title="My Workouts" />

      <Button onPress={() => test()} title="open gallery" color="gold" />

      <Image
        style={{width: 200, height: 200}}
        source={{
          uri: imagePicked,
        }}
      />
    </SafeAreaView>
  );
};

export default WorkoutView;
