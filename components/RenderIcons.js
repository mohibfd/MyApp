import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {TouchableHighlight, Modal, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheets/stylesheet';
const defaultSize = 88;

const RenderIcons = ({item, toggleMainModal, addMainItem}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const createMainItem = () => {
    addMainItem(item);
    toggleMainModal();
  };

  return (
    <View style={styles.threeFlatList}>
      <Icon
        name={item.icon}
        size={defaultSize}
        color={item.color}
        onPress={() => {
          setModalVisible(true);
        }}
      />

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableHighlight
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.button, styles.buttonOpen]}
                onPress={() => createMainItem()}>
                <Text style={styles.textStyle}>Create {item.name}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

RenderIcons.PropTypes = {
  item: PropTypes.object,
  toggleMainModal: PropTypes.func.isRequired,
  addMainItem: PropTypes.func.isRequired,
};

export default RenderIcons;
