import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';
import {View, Text, Pressable, StyleSheet, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecipeItem = ({recipe, deleteItemFromStorage, navigation, refresh}) => {
  //tells you which page to go to
  const navigateTo = () => {
    if (navigation) {
      navigation.navigate('Recipe Details View', {
        recipe,
        refresh,
      });
    }
  };

  //return our items alongside a delete icon that calls on deleteList function taking the element's id
  return (
    <Pressable style={styles.ListItem} onPress={() => navigateTo()}>
      <View style={styles.ListItemView}>
        <Text style={styles.listItemText}>{recipe.name}</Text>
        <Icon
          style={styles.redCross}
          name="remove"
          size={EStyleSheet.value('40rem')}
          color="firebrick"
          onPress={() => deleteItemFromStorage(recipe)}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ListItem: {
    flex: 1,
    backgroundColor: '#CD7F32' + 99,
    paddingVertical: EStyleSheet.value('20rem'),
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

RecipeItem.defaultProps = {
  refresh: null,
  navigation: null,
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  deleteItemFromStorage: PropTypes.func.isRequired,
  refresh: PropTypes.func,
  navigation: PropTypes.object,
};

export default RecipeItem;
