import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
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
  const changeMinWeight = value => {
    let number = new Number(value) * 1;
    if (!isNaN(number)) {
      workout.minimumWeight = number;
      refresh();
    }
  };
  const changeMaxWeight = value => {
    let number = new Number(value) * 1;
    if (!isNaN(number)) {
      workout.maximumWeight = number;
      refresh();
    }
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
        <TextInput
          style={styles.numbers}
          value={`${Math.round(workout.minimumWeight)}`}
          onChangeText={changeMinWeight}
          maxLength={3}
          keyboardType="numeric"
        />

        <Text style={styles.separator}>/</Text>

        <TextInput
          style={styles.numbers}
          value={`${Math.round(workout.maximumWeight)}`}
          onChangeText={changeMaxWeight}
          maxLength={3}
          keyboardType="numeric"
        />

        <View style={styles.dropDownContainer}>
          <DropDownPicker
            open={showDropDownPicker}
            value={dropDownPickerValue}
            setOpen={setShowDropDownPicker}
            setValue={setDropDownPickerValue}
            items={interestInterval}
            setItems={setInterestInterval}
            arrowIconStyle={styles.arrowIconStyle}
            tickIconStyle={styles.tickIconStyle}
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
    //this will ensure we take the entire screen with our 6 muscles
    height: Dimensions.get('window').height * 0.1545,
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
    color: 'white',
  },
  text: {
    flex: 1,
    fontSize: EStyleSheet.value('20rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: 'white',
  },
  numbers: {
    fontSize: EStyleSheet.value('25rem'),
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
  arrowIconStyle: {
    tintColor: myWhite,
    width: EStyleSheet.value('5rem'),
  },
  tickIconStyle: {tintColor: myWhite, width: 0},
  separator: {
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
