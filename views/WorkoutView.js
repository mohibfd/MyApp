import React, {useState} from 'react';
import {SafeAreaView, Button, Image, Modal, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../stylesheets/stylesheet.js';
import Header from '../components/Header';

const WorkoutView = () => {
  const [imagePickedStorage, setImagePickedStorage] =
    useStorage('imagePickedd');

  const [modalVisible, setModalVisible] = useState(false);

  // const [imagePicked, setImagePicked] = useState(null);

  const openImageLibrary = () => {
    let options = {};
    launchImageLibrary(options, response => {
      if (response.assets) {
        setImagePickedStorage(response.assets[0].uri);
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
        <SafeAreaView style={styles.welcome}>
          <View style={[styles.centeredView, styles.imageContainer]}>
            <Image
              style={styles.qrCodeImage}
              source={{
                uri: imagePickedStorage,
              }}
            />
          </View>
          <Icon
            style={styles.modalClose}
            name="remove"
            size={50}
            color="red"
            onPress={() => setModalVisible(false)}
          />
          <Button
            onPress={() => openImageLibrary()}
            title="open gallery"
            color="gold"
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default WorkoutView;
