import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Button,
  Image,
  Dimensions,
  Modal,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import uuid from 'react-native-uuid';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../stylesheets/stylesheet.js';
import Header from '../components/Header';
import InvestItem from '../components/InvestItem';
import DeleteOrCancel from '../components/DeleteOrCancel.js';

const WorkoutView = () => {
  const [modalVisible, setModalVisible] = useState(false);

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

      <Button
        onPress={() => setModalVisible(true)}
        title="QR Code"
        color="black"
      />

      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <Icon
          style={styles.modalClose}
          name="remove"
          size={50}
          color="red"
          onPress={() => setModalVisible(false)}
        />
        <Button onPress={() => test()} title="open gallery" color="gold" />
        <View
          style={[styles.centeredView, {position: 'absolute', height: '100%'}]}>
          {/* <View style={styles.modalView}></View> */}
          <Image
            style={{
              alignSelf: 'center',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').width,
            }}
            source={{
              uri: imagePicked,
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default WorkoutView;
