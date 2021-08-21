import PropTypes from 'prop-types';
import React from 'react';
import {View, Text, Pressable, StyleSheet, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecipeItem = ({item, deleteItemFromStorage}) => {
  //tells you which page to go to
  const navigateTo = () => {};

  //return our items alongside a delete icon that calls on deleteList function taking the element's id
  return (
    <Pressable style={styles.ListItem} onPress={() => navigateTo()}>
      <View style={styles.ListItemView}>
        <Text style={styles.listItemText}>{item.name}</Text>
        <Icon
          style={styles.redCross}
          name="remove"
          size={EStyleSheet.value('40rem')}
          color="firebrick"
          onPress={() => deleteItemFromStorage(item)}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ListItem: {
    flex: 1,
    width: '50%',
    backgroundColor: myBlue,
    paddingVertical: EStyleSheet.value('30rem'),
    borderWidth: EStyleSheet.value('2rem'),
  },
  ListItemView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    flex: 4,
    fontSize: EStyleSheet.value('25rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: myWhite,
  },
  redCross: {
    flex: 1,
    paddingHorizontal: EStyleSheet.value('5rem'),
  },
});

RecipeItem.propTypes = {
  item: PropTypes.object.isRequired,
  deleteItemFromStorage: PropTypes.func.isRequired,
};

export default RecipeItem;
