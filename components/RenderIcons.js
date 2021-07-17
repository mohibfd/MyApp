import React, {useEffect, useState} from 'react';
// import {View, Modal, TouchableOpacity, Text} from 'react-native';
import {
  TouchableHighlight,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheets/stylesheet';
import CreateOrCancel from './CreateOrCancel';
const defaultSize = 88;

const RenderIcons = ({item, toggleMainModal, addMainItem}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const Item = ({icon, color}) => {
    return (
      <View style={styles.threeFlatList}>
        <Icon
          name={icon}
          size={defaultSize}
          color={color}
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
              setIsCreateOrCancel(!isCreateOrCancel);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableHighlight
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.button, styles.buttonClose]}
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

  const createMainItem = () => {
    addMainItem(item);
    toggleMainModal();
  };

  return <Item item={item} icon={item.icon} color={item.color} />;
};

export default RenderIcons;
