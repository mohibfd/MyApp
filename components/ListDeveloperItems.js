import PropTypes from 'prop-types';
import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import generalStyles from '../stylesheets/generalStylesheet';

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
    <Pressable
      style={{borderWidth: EStyleSheet.hairlineWidth}}
      onPress={() => deletion()}>
      <Text style={styles.developerText}>{item.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  developerText: {
    textAlign: 'center',
    fontSize: EStyleSheet.value('30rem'),
  },
});

ListDeveloperItems.propTypes = {
  item: PropTypes.object.isRequired,
  deleteItemFromStorage: PropTypes.func.isRequired,
};

export default ListDeveloperItems;
