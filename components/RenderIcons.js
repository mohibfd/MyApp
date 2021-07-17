import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheets/stylesheet';
import CreateOrCancel from './CreateOrCancel';
const defaultSize = 88;

const RenderIcons = ({item, toggleMainModal, addMainItem}) => {
  const [isCreateOrCancel, setIsCreateOrCancel] = useState(false);

  const toggleCreateOrCancel = () => {
    setIsCreateOrCancel(!isCreateOrCancel);
  };

  const openCreateOrCancel = () => {
    useEffect(() => {
      toggleCreateOrCancel();
    }, []);
    return <CreateOrCancel name={item.icon} addition={createMainItem} />;
  };

  const Item = ({icon, color}) => {
    return (
      <View style={styles.threeFlatList}>
        <Icon
          name={icon}
          size={defaultSize}
          color={color}
          onPress={() => {
            toggleCreateOrCancel();
          }}
        />

        {isCreateOrCancel && openCreateOrCancel()}
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
