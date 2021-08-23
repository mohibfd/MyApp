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
        ? [
            {label: 'lb', value: 'lb'},
            {label: 's', value: 's'},
          ]
        : [
            {label: 'kg', value: 'kg'},
            {label: 's', value: 's'},
          ]
      : null,
  );

  useEffect(() => {
    if (dropDownPickerValue) {
      if (dropDownPickerValue != workout.measurement) {
        if (dropDownPickerValue == 'kg') {
          if (workout.measurement == 'lb') {
            workout.maximumWeight = workout.maximumWeight / 2.205;
            workout.minimumWeight = workout.minimumWeight / 2.205;
          }
          workout.measurement = 'kg';
          setInterestInterval([
            {label: 'lb', value: 'lb'},
            {label: 's', value: 's'},
          ]);
        } else if (dropDownPickerValue == 'lb') {
          if (workout.measurement == 'kg') {
            workout.maximumWeight = workout.maximumWeight * 2.205;
            workout.minimumWeight = workout.minimumWeight * 2.205;
          }
          workout.measurement = 'lb';
          setInterestInterval([
            {label: 'kg', value: 'kg'},
            {label: 's', value: 's'},
          ]);
        } else if (dropDownPickerValue == 's') {
          workout.measurement = 's';
          setInterestInterval([
            {label: 'kg', value: 'kg'},
            {label: 'lb', value: 'lb'},
          ]);
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
  const changeSets = value => {
    let number = new Number(value) * 1;
    if (value == '') {
      workout.sets = '';
      refresh();
    } else if (!isNaN(number)) {
      workout.sets = number;
      refresh();
    }
  };
  const changeReps = value => {
    let number = new Number(value) * 1;
    if (value == '') {
      workout.reps = '';
      refresh();
    } else if (!isNaN(number)) {
      workout.reps = number;
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
      <View style={[styles.musclesContainer, styles.detailsContainer]}>
        <TextInput
          style={styles.text}
          value={workout.name}
          onChangeText={changeName}
          placeholder="add name"
          placeholderTextColor={'grey'}
          multiline={true}
        />
        <View>
          <View style={styles.minMaxContainer}>
            <TextInput
              style={[styles.numbers, styles.rightAlign]}
              value={`${Math.round(workout.minimumWeight)}`}
              onChangeText={changeMinWeight}
              maxLength={3}
              keyboardType="numeric"
            />

            <Text style={styles.divider}>/</Text>

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
                dropDownContainerStyle={[styles.insideDropDownStyle]}
                listItemContainerStyle={styles.listItemContainerStyle}
                placeholder={workout.measurement}
              />
            </View>
          </View>
          <View style={styles.minMaxContainer}>
            <Text style={styles.smallFont}>Sets:</Text>
            <TextInput
              style={[styles.smallFont, styles.goldBorder]}
              value={`${workout.sets}`}
              onChangeText={changeSets}
              maxLength={1}
              keyboardType="numeric"
            />
            <Text style={styles.smallFont}>Reps:</Text>
            <TextInput
              style={[styles.smallFont, styles.goldBorder, styles.reps]}
              value={`${workout.reps}`}
              onChangeText={changeReps}
              maxLength={2}
              keyboardType="numeric"
            />
          </View>
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
  detailsContainer: {
    height: EStyleSheet.value('100rem'),
  },
  listItemText: {
    fontSize: EStyleSheet.value('40rem'),
    color: 'white',
  },
  minMaxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    height: '100%',
    fontSize: EStyleSheet.value('17rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: 'white',
  },
  numbers: {
    flex: 1,
    fontSize: EStyleSheet.value('19rem'),
    color: 'white',
  },
  rightAlign: {
    textAlign: 'right',
  },
  divider: {
    fontSize: EStyleSheet.value('19rem'),
    color: 'white',
  },
  smallFont: {
    // flex: 1,
    fontSize: EStyleSheet.value('18rem'),
    // width: 50,
    color: 'white',
  },
  goldBorder: {borderBottomWidth: 2, borderBottomColor: 'gold'},
  reps: {width: EStyleSheet.value('36rem')},
  dropDownContainer: {
    width: EStyleSheet.value('50rem'),
  },
  dropDownStyle: {
    backgroundColor: myBlack,
    borderColor: 'gold',
    height: EStyleSheet.value('31rem'),
  },
  insideDropDownStyle: {
    backgroundColor: myBlack,
    borderColor: 'gold',
  },
  listItemContainerStyle: {
    height: EStyleSheet.value('25rem'),
  },
  arrowIconStyle: {
    tintColor: myWhite,
    width: EStyleSheet.value('5rem'),
  },
  tickIconStyle: {tintColor: myWhite, width: 0},
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
