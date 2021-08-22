import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {View, Pressable, StyleSheet, Text, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import CurrencyInput from 'react-native-currency-input';
import DropDownPicker from 'react-native-dropdown-picker';

const WorkoutItem = ({
  muscle,
  navigation,
  deleteItemFromStorage,
  workout,
  refresh,
}) => {
  const [showDropDownPicker, setShowDropDownPicker] = useState(false);
  const [dropDownPickerValue, setDropDownPickerValue] = useState(
    workout ? workout.measurement : null,
  );

  const [interestInterval, setInterestInterval] = useState(
    workout
      ? workout.measurement == 'kg'
        ? [{label: 'lb', value: 'lb'}]
        : [{label: 'kg', value: 'kg'}]
      : null,
  );

  useEffect(() => {
    if (dropDownPickerValue) {
      if (dropDownPickerValue != workout.measurement) {
        console.log(dropDownPickerValue, workout.measurement);
        if (dropDownPickerValue == 'kg') {
          workout.measurement = 'kg';
          workout.maximumWeight = workout.maximumWeight / 2.205;
          workout.minimumWeight = workout.minimumWeight / 2.205;
          setInterestInterval([{label: 'lb', value: 'lb'}]);
        } else {
          workout.measurement = 'lb';
          workout.maximumWeight = workout.maximumWeight * 2.205;
          workout.minimumWeight = workout.minimumWeight * 2.205;
          setInterestInterval([{label: 'kg', value: 'kg'}]);
        }
        refresh();
      }
    }
  }, [dropDownPickerValue]);

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

  const navigateTo = () => {
    if (navigation) {
      navigation.navigate('Workout Details View', {
        muscle,
      });
    }
  };

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
        <View style={styles.dropDownContainer}>
          <DropDownPicker
            open={showDropDownPicker}
            value={dropDownPickerValue}
            setOpen={setShowDropDownPicker}
            setValue={setDropDownPickerValue}
            items={interestInterval}
            setItems={setInterestInterval}
            arrowIconStyle={{
              tintColor: myWhite,
              width: EStyleSheet.value('5rem'),
            }}
            tickIconStyle={{tintColor: myWhite, width: 0}}
            textStyle={{color: myWhite}}
            style={styles.dropDownStyle}
            dropDownContainerStyle={styles.dropDownStyle}
            placeholder={workout.measurement}
          />
        </View>
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
    paddingVertical: '0%',
    height: EStyleSheet.value('100rem'),
  },
  listItemText: {
    fontSize: EStyleSheet.value('40rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: 'white',
  },
  text: {
    flex: 1,
    fontSize: EStyleSheet.value('23rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: 'white',
  },
  numbers: {
    fontSize: EStyleSheet.value('30rem'),
    textAlign: 'center',
    color: 'white',
  },
  dropDownContainer: {
    justifyContent: 'center',
    height: '100%',
    width: EStyleSheet.value('50rem'),
  },
  dropDownStyle: {
    backgroundColor: myBlack,
    borderColor: 'gold',
    height: EStyleSheet.value('31rem'),
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
