import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const RecipeItem = ({muscle, navigation}) => {
  //tells you which page to go to
  const navigateTo = () => {
    if (navigation) {
      navigation.navigate('Workout Details View', {
        muscle,
      });
    }
  };

  //return our items alongside a delete icon that calls on deleteList function taking the element's id
  return (
    <Pressable style={styles.ListItem} onPress={() => navigateTo()}>
      <View style={styles.ListItemView}>
        <Text style={styles.listItemText}>{muscle}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ListItem: {
    backgroundColor: '#000000' + 99,
    paddingVertical: '6.44%',
    borderBottomWidth: EStyleSheet.value('2rem'),
    borderColor: myRed,
  },
  ListItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemText: {
    fontSize: EStyleSheet.value('40rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: 'white',
  },
});

RecipeItem.defaultProps = {
  // navigation: null,
  // instruction: null,
};

RecipeItem.propTypes = {
  muscle: PropTypes.string.isRequired,
};

export default RecipeItem;
