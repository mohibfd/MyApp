import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const ListDeveloperItems = ({item, deleteItemFromStorage}) => {
  const [backgroundColor, setBackGroundColor] = useState(myBlue);

  //this will delete the item when the user clicks twice
  let temp = 0;
  const deletion = () => {
    temp += 1;
    if (temp === 2 || backgroundColor === myRed) {
      deleteItemFromStorage(item);
    } else {
      setBackGroundColor(myRed);
    }
  };

  return (
    <Pressable
      style={[styles.container, {backgroundColor}]}
      onPress={() => deletion()}>
      <Text style={styles.developerText}>{item.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {borderBottomWidth: 2},
  developerText: {
    textAlign: 'center',
    fontSize: EStyleSheet.value('17rem'),
    color: myWhite,
  },
});

ListDeveloperItems.propTypes = {
  item: PropTypes.object.isRequired,
  deleteItemFromStorage: PropTypes.func.isRequired,
};

export default ListDeveloperItems;
