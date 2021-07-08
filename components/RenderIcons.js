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

export const RenderIcons = ({item}) => {
  return <Item item={item} icon={item.icon} color={item.color} />;
};

const Item = ({item, icon, color}) => {
  return (
    <View style={styles.threeFlatList}>
      <Icon
        name={icon}
        size={defaultSize}
        color={color}
        onPress={() => createOrCancel(item)}
      />
    </View>
  );
};

const createOrCancel = item => {
  {
    setMainItem(item);
    console.log(item);
  }
  Alert.alert('Alert Title', 'My Alert Msg', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Yes', onPress: () => createMainItem()},
  ]);
};

const createMainItem = () => {
  // console.log(mainItem.name);
  if (mainItem.name == 'test') {
    console.log('1');
  } else if (mainItem.name == 'test2') {
    console.log('2');
  }
};

export default RenderIcons;
