import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Pressable, Text, Platform, StyleSheet, View} from 'react-native';
import {Overlay} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import PushNotification from 'react-native-push-notification';

import generalStyles from '../stylesheets/generalStylesheet';
import EStyleSheet from 'react-native-extended-stylesheet';

const TimeInterval = props => {
  const {
    createTimeInterval,
    closeModal,
    notification,
    timeIntervalAction,
    deleteTimeInterval,
  } = props;

  const {name, notificationText} = notification;

  const [overlayVisible, setOverlayVisible] = useState(true);

  const toDropdownObj = dropdownList => {
    let intervalsList = [];
    dropdownList.forEach(dropdownItem => {
      intervalsList.push({label: dropdownItem, value: dropdownItem});
    });
    return intervalsList;
  };

  const [showDropDownPickerInterval, setShowDropDownPickerInterval] =
    useState(false);
  const [dropDownPickerValueInterval, setDropDownPickerValueInterval] =
    useState(null);
  const intervals = [
    'Daily',
    'Every two days',
    'Every three days',
    'Twice a week',
    'Weekly',
    'Every two weeks',
    'Monthly',
  ];
  const intervalsList = toDropdownObj(intervals);
  const [timeInterval, setTimeInterval] = useState(intervalsList);

  const [showDropDownPickerDay, setShowDropDownPickerDay] = useState(false);
  const [dropDownPickerValueDay, setDropDownPickerValueDay] = useState(null);
  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const daysList = toDropdownObj(weekdays);
  const [dayInterval, setDayInterval] = useState(daysList);

  const [showDropDownPickerHour, setShowDropDownPickerHour] = useState(false);
  const [dropDownPickerValueHour, setDropDownPickerValueHour] = useState(null);
  let hoursInDay = [];
  const noonLoop = timeline => {
    for (let i = 1; i < 12; i++) {
      hoursInDay.push(i.toString() + ' ' + timeline);
    }
  };
  noonLoop('am');
  hoursInDay.push('12 pm');
  noonLoop('pm');
  hoursInDay.push('12 am');
  const hoursList = toDropdownObj(hoursInDay);
  const [hourInterval, setHourInterval] = useState(hoursList);

  const [showSplashText, setShowSplashText] = useState(false);

  const intervalToInt = interval => {
    switch (interval) {
      case 'Daily':
        interval = 1;
        break;
      case 'Every two days':
        interval = 2;
        break;
      case 'Every three days':
        interval = 3;
        break;
      case 'Twice a week':
        interval = 3.5;
        break;
      case 'Once a week':
        interval = 7;
        break;
      case 'Once every two weeks':
        interval = 14;
        break;
      case 'Once a month':
        interval = 30;
        break;
    }
    return interval;
  };

  const handleNotification = async (interval, day, hour) => {
    if (!interval) {
      setShowSplashText(true);

      setTimeout(() => {
        setShowSplashText(false);
      }, 3000);

      return;
    }

    let repeatTime = intervalToInt(interval);

    let repeatDay = 0;
    if (day) {
      repeatDay = weekdays.indexOf(day) + 1;
    }

    let repeatHour = 1;
    if (hour) {
      repeatHour = hoursInDay.indexOf(hour) + 1;
    }

    // console.warn(day, hour, repeatDay, repeatHour);

    //generating random number for id
    const dateId = Date().toString();
    const numberId = Math.round(Math.random() * 100000000);
    const notificationId = Platform.OS === 'ios' ? dateId : numberId;

    let currDate = new Date(Date.now());
    const currDay = currDate.getDay();
    let newDate = Date.now();

    if (currDay !== repeatDay && day !== null) {
      console.warn(day);
      if (currDay < repeatDay) {
        newDate += globalOneDayInMilliSeconds * (repeatDay - currDay);
      } else {
        newDate += globalOneDayInMilliSeconds * (7 - (currDay - repeatDay));
      }
    }
    newDate = new Date(newDate);

    if (hour !== null) {
      newDate.setHours(repeatHour);
    }
    newDate.setMinutes(0);
    newDate.setSeconds(0);

    // const newDate = currDay;
    console.warn(new Date(newDate));

    const addNotification = () => {
      PushNotification.localNotificationSchedule({
        channelId: 'test-channel1',
        id: notificationId,
        date: newDate,
        title: name,
        message: notificationText,
        allowWhileIdle: true,
        repeatType: 'day',
        repeatTime,
      });
    };

    if (timeIntervalAction === 'edit') {
      deletion();
    }

    addNotification();

    closeOverlays();

    createTimeInterval(notificationId, interval);
  };

  const closeOverlays = () => {
    setOverlayVisible(false);
    closeModal();
  };

  const deletion = () => {
    closeOverlays();
    deleteTimeInterval();
  };

  return (
    <Overlay
      isVisible={overlayVisible}
      overlayStyle={[styles.overlay, generalStyles.borderContainer]}
      onBackdropPress={() => closeOverlays()}>
      <View style={styles.container}>
        <Text style={styles.textHeader}>
          How often would you like to get reminded?
        </Text>
        <DropDownPicker
          open={showDropDownPickerInterval}
          value={dropDownPickerValueInterval}
          items={timeInterval}
          setOpen={setShowDropDownPickerInterval}
          setValue={setDropDownPickerValueInterval}
          setItems={setTimeInterval}
          arrowIconStyle={{tintColor: myWhite}}
          tickIconStyle={{tintColor: myWhite}}
          style={styles.dropdownContainer}
          dropDownContainerStyle={[
            {...styles.dropdownContainer, ...styles.dropdownHeight},
          ]}
          textStyle={{color: myWhite}}
          placeholder="Select how often"
          zIndex={3000}
          zIndexInverse={1000}
        />
        <Text style={generalStyles.splashText}>
          {showSplashText ? 'Please select one of the available options' : null}
        </Text>
        <Text style={styles.textHeader}>
          What day do you want the reminder to start?
        </Text>
        <DropDownPicker
          open={showDropDownPickerDay}
          value={dropDownPickerValueDay}
          items={dayInterval}
          setOpen={setShowDropDownPickerDay}
          setValue={setDropDownPickerValueDay}
          setItems={setDayInterval}
          arrowIconStyle={{tintColor: myWhite}}
          tickIconStyle={{tintColor: myWhite}}
          style={styles.dropdownContainer}
          dropDownContainerStyle={[
            {...styles.dropdownContainer, ...styles.dropdownHeight},
          ]}
          textStyle={{color: myWhite}}
          placeholder="Today"
          zIndex={2000}
          zIndexInverse={2000}
        />

        <Text style={generalStyles.splashText} />

        <Text style={styles.textHeader}>
          What time do you want the reminder to start?
        </Text>
        <DropDownPicker
          open={showDropDownPickerHour}
          value={dropDownPickerValueHour}
          items={hourInterval}
          setOpen={setShowDropDownPickerHour}
          setValue={setDropDownPickerValueHour}
          setItems={setHourInterval}
          arrowIconStyle={{tintColor: myWhite}}
          tickIconStyle={{tintColor: myWhite}}
          style={styles.dropdownContainer}
          dropDownContainerStyle={[
            {...styles.dropdownContainer, ...styles.dropdownHeight},
          ]}
          textStyle={{color: myWhite}}
          placeholder="Right now"
          zIndex={1000}
          zIndexInverse={3000}
          bottomOffset={150}
        />

        <Pressable
          style={[
            {
              ...styles.addButton,
            },
          ]}
          onPress={() =>
            handleNotification(
              dropDownPickerValueInterval,
              dropDownPickerValueDay,
              dropDownPickerValueHour,
            )
          }>
          <Text
            style={[
              {
                ...generalStyles.textStylesDark,
                ...styles.buttonContainer,
              },
            ]}>
            Add
          </Text>
        </Pressable>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    height: EStyleSheet.value('350rem'),
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  addButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    bottom: '2%',
  },
  buttonContainer: {
    width: '50%',
    paddingVertical: EStyleSheet.value('3rem'),
    borderRadius: EStyleSheet.value('5rem'),
    backgroundColor: myBlue,
  },
  textHeader: {
    color: 'white',
    alignSelf: 'center',
    paddingVertical: '2%',
  },
  dropdownContainer: {
    backgroundColor: myGreen,
    width: '75%',
    alignSelf: 'center',
  },
  dropdownHeight: {
    height: EStyleSheet.value('135rem'),
  },
});

TimeInterval.propTypes = {
  createTimeInterval: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  timeIntervalAction: PropTypes.string.isRequired,
  deleteTimeInterval: PropTypes.func.isRequired,
};

export default TimeInterval;
