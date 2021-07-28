import React, {useState} from 'react';
import {
  SafeAreaView,
  Button,
  Image,
  Modal,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import generalStyles from '../stylesheets/generalStylesheet';
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
    <SafeAreaView style={{flex: 1}}>
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
        <SafeAreaView style={{flex: 1}}>
          <View style={[styles.centeredView, styles.imageContainer]}>
            <Image
              style={styles.qrCodeImage}
              source={{
                uri: imagePickedStorage,
              }}
            />
          </View>
          <Icon
            style={generalStyles.modalClose}
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

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    height: '100%',
  },
  qrCodeImage: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default WorkoutView;
