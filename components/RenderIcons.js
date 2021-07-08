import React, {useEffect, useState} from 'react';
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
import CreateOrCancel from './CreateOrCancel';
const defaultSize = 88;

const RenderIcons = ({item}) => {
  const [isCreateOrCancel, setIsCreateOrCancel] = useState(false);

  const toggleCreateOrCancel = () => {
    setIsCreateOrCancel(!isCreateOrCancel);
  };

  const openCreateOrCancel = () => {
    useEffect(() => {
      toggleCreateOrCancel();
    }, []);
    return <CreateOrCancel action={createMainItem} />;
  };

  const Item = ({item, icon, color}) => {
    return (
      <View style={styles.threeFlatList}>
        {/* <CreateOrCancel /> */}

        <Icon
          name={icon}
          size={defaultSize}
          color={color}
          onPress={() => {
            setIsCreateOrCancel(true);
          }}
        />

        {isCreateOrCancel && openCreateOrCancel()}
      </View>
    );
  };

  const createMainItem = () => {
    // console.log(mainItem.name);
    if (item.name == 'test') {
      console.log('1');
    } else if (item.name == 'test2') {
      console.log('2');
    }
  };
  return <Item item={item} icon={item.icon} color={item.color} />;
};

export default RenderIcons;
