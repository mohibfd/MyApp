import PropTypes from 'prop-types';
import React from 'react';
import {Text, Pressable} from 'react-native';
import styles from '../stylesheets/stylesheet';

const ListDeveloperItems = ({item, deleteItemFromStorage}) => {
  //this will delete the item when the user clicks twice
  let temp = 0;
  const deletion = () => {
    temp += 1;
    if (temp == 2) {
      deleteItemFromStorage(item);
    }
  };

  return (
    <Pressable style={styles.hairBorder} onPress={() => deletion()}>
      <Text style={styles.developerText}>{item.name}</Text>
    </Pressable>
  );
};

ListDeveloperItems.propTypes = {
  item: PropTypes.object.isRequired,
  deleteItemFromStorage: PropTypes.func.isRequired,
};

export default ListDeveloperItems;
