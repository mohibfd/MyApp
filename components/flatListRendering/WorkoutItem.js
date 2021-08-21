import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Text, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import CurrencyInput from 'react-native-currency-input';

const WorkoutItem = ({
  muscle,
  navigation,
  deleteItemFromStorage,
  workout,
  refresh,
}) => {
  const changeName = newName => {
    workout.name = newName;
    refresh();
  };
  const changeMinWeight = newNumber => {
    workout.minimumWeight = newNumber;
    refresh();
  };
  const changeMaxWeight = newNumber => {
    workout.maximumWeight = newNumber;
    refresh();
  };
  //tells you which page to go to
  const navigateTo = () => {
    if (navigation) {
      navigation.navigate('Workout Details View', {
        muscle,
      });
    }
  };

  //return our items alongside a delete icon that calls on deleteList function taking the element's id

  if (deleteItemFromStorage) {
    return (
      <View style={[styles.musclesContainer, styles.paddingVertical]}>
        <TextInput
          style={styles.text}
          value={workout.name}
          onChangeText={changeName}
          placeholder="add name"
          placeholderTextColor={'grey'}
          multiline={true}
        />
        <CurrencyInput
          style={styles.numbers}
          value={workout.minimumWeight}
          onChangeValue={changeMinWeight}
          separator=""
          maxLength={4}
          minValue={0}
        />
        <Text style={styles.kg}>/</Text>

        <CurrencyInput
          style={styles.numbers}
          value={workout.maximumWeight}
          onChangeValue={changeMaxWeight}
          separator=""
          maxLength={4}
          minValue={0}
        />

        <Text style={styles.kg}>Kg</Text>

        <View style={styles.iconContainer}>
          <Icon
            style={styles.redCross}
            name="remove"
            size={EStyleSheet.value('40rem')}
            color="firebrick"
            onPress={() => deleteItemFromStorage(workout)}
          />
        </View>
      </View>
    );
  } else {
    return (
      <Pressable style={styles.musclesContainer} onPress={() => navigateTo()}>
        <Text style={styles.listItemText}>{muscle}</Text>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  musclesContainer: {
    backgroundColor: '#000000' + 99,
    paddingVertical: '6.44%',
    borderBottomWidth: EStyleSheet.value('2rem'),
    borderColor: myRed,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingVertical: {
    paddingVertical: '5%',
  },
  listItemText: {
    fontSize: EStyleSheet.value('40rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: 'white',
  },
  text: {
    flex: 1,
    // backgroundColor: 'gold',
    fontSize: EStyleSheet.value('23rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: 'white',
  },
  numbers: {
    // flex: 0.6,
    fontSize: EStyleSheet.value('30rem'),
    textAlign: 'center',
    color: 'white',
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kg: {
    color: myWhite,
    fontSize: EStyleSheet.value('25rem'),
  },
  redCross: {
    alignSelf: 'flex-end',
    paddingHorizontal: EStyleSheet.value('5rem'),
    paddingLeft: EStyleSheet.value('25rem'),
  },
});

WorkoutItem.defaultProps = {
  muscle: null,
  navigation: null,
  deleteItemFromStorage: null,
  workout: null,
  refresh: null,
};

WorkoutItem.propTypes = {
  muscle: PropTypes.string,
  navigation: PropTypes.object,
  deleteItemFromStorage: PropTypes.func,
  workout: PropTypes.object,
  refresh: PropTypes.func,
};

export default WorkoutItem;
