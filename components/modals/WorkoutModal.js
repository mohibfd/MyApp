import React from 'react';
import {
  SafeAreaView,
  Image,
  Modal,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';

import generalStyles from '../../stylesheets/generalStylesheet';

const WorkoutModal = ({
  modalVisible,
  setModalVisible,
  openImageLibrary,
  imagePickedStorage,
}) => {
  return (
    <Modal
      animationType="slide"
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
          style={[generalStyles.modalClose, {zIndex: 1}]}
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

export default WorkoutModal;
