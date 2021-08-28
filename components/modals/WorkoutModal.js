import React from 'react';
import {
  SafeAreaView,
  Image,
  Modal,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';

import generalStyles from '../../stylesheets/generalStylesheet';

const WorkoutModal = ({modalVisible, setModalVisible}) => {
  const [imagePickedStorage, setImagePickedStorage] =
    useStorage('imagePickedd');

  const [pinCodeStorage, setPinCodeStorage] = useStorage('pinCodee');

  const openImageLibrary = () => {
    let options = {};
    launchImageLibrary(options, response => {
      if (response.assets) {
        setImagePickedStorage(response.assets[0].uri);
      }
    });
  };

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={'height'} style={styles.container}>
          <View style={[generalStyles.centeredView, styles.imageContainer]}>
            <Image
              style={styles.qrCodeImage}
              source={{
                uri: imagePickedStorage,
              }}
            />
          </View>

          <Icon
            style={styles.icon}
            name="arrow-left"
            size={EStyleSheet.value('50rem')}
            color="grey"
            onPress={() => setModalVisible(false)}
          />

          <View style={styles.pinCodeContainer}>
            <Text style={styles.text}>Pin Code: </Text>

            <TextInput
              style={styles.text}
              value={pinCodeStorage}
              onChangeText={setPinCodeStorage}
              placeholder="add code"
              placeholderTextColor={'grey'}
            />
          </View>

          <View style={styles.cameraIconContainer}>
            <Icon
              name="camera-retro"
              size={Dimensions.get('window').width * 0.9}
              color={imagePickedStorage ? 'transparent' : 'gold'}
              onPress={() => openImageLibrary()}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  icon: {
    paddingTop: EStyleSheet.value('10rem'),
    paddingLeft: EStyleSheet.value('10rem'),
    zIndex: 1,
  },
  pinCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    paddingTop: '10%',
    fontSize: EStyleSheet.value('20rem'),
  },
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

export default WorkoutModal;
