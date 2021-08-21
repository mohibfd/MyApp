import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import generalStyles from '../../stylesheets/generalStylesheet';

const NotificationsModal = (modalVisible, closeModal) => {
  console.log('hello');
  return (
    <Modal
      animationType="slide"
      // transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        closeModal();
      }}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={[generalStyles.centeredView, styles.imageContainer]}></View>
        <Icon
          style={[generalStyles.modalClose, {zIndex: 1}]}
          name="remove"
          size={EStyleSheet.value('50rem')}
          color="red"
          onPress={() => closeModal()}
        />
        <View style={styles.cameraIconContainer}></View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  deleteOverlay: {
    flex: 0.22,
    justifyContent: 'space-between',
  },
  deleteOverlayText: {
    flex: 1,
    paddingLeft: '5%',
    fontSize: EStyleSheet.value('25rem'),
    color: myWhite,
  },
  buttonsContainer: {flexDirection: 'row', justifyContent: 'space-evenly'},
});

NotificationsModal.defaultProps = {
  // name: '',
  // extraName: '',
};

NotificationsModal.propTypes = {
  // name: PropTypes.string,
  // extraName: PropTypes.string,
  // deletion: PropTypes.func.isRequired,
  // closeOverlay: PropTypes.func.isRequired,
};

export default NotificationsModal;
