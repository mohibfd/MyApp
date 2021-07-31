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
import EStyleSheet from 'react-native-extended-stylesheet';

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
    <SafeAreaView style={styles.container}>
      <Header title="My Workouts" />

      <Button
        onPress={() => setModalVisible(true)}
        title="QR Code"
        color={myGreen}
      />

      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <SafeAreaView style={{flex: 1}}>
          <View style={[generalStyles.centeredView, styles.imageContainer]}>
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
            size={EStyleSheet.value('50rem')}
            color="red"
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.cameraIconContainer}>
            <Icon
              name="camera-retro"
              size={Dimensions.get('window').width * 0.9}
              color={imagePickedStorage ? 'transparent' : 'gold'}
              onPress={() => openImageLibrary()}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: myBlack},
  imageContainer: {
    position: 'absolute',
    alignSelf: 'center',
    height: '100%',
  },
  qrCodeImage: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,
  },
  cameraIconContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WorkoutView;
