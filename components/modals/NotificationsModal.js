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
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';

const NotificationsModal = ({modalVisible, closeModal}) => {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        closeModal();
      }}>
      <SafeAreaView style={styles.container}>
        <Icon
          style={styles.modalClose}
          name="arrow-left"
          size={EStyleSheet.value('50rem')}
          color="grey"
          onPress={() => closeModal()}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: myBlack},
  modalClose: {
    marginLeft: '3%',
    marginTop: '3%',
  },
});

NotificationsModal.defaultProps = {
  // name: '',
  // extraName: '',
};

NotificationsModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  // deletion: PropTypes.func.isRequired,
  // closeOverlay: PropTypes.func.isRequired,
};

export default NotificationsModal;
