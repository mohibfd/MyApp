import React from 'react';
import {
  Text,
  View,
  Alert,
  Modal,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheet';
import uuid from 'react-native-uuid';
import {set} from 'react-native-reanimated';
const defaultSize = 88;

console.log('??');

const CreateOrCancel = ({action}) => {
  Alert.alert('Alert Title', 'My Alert Msg', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Yes', onPress: () => action()},
  ]);
  return null;
};

export default CreateOrCancel;
