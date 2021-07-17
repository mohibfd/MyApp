import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Overlay} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import {Pressable, Text} from 'react-native';
import PushNotification from 'react-native-push-notification';

import styles from '../stylesheets/stylesheet';
import DeleteOrCancel from '../components/DeleteOrCancel.js';

const TimeInterval = props => {
  const {
    createTimeInterval,
    closeModal,
    plant,
    timeIntervalAction,
    deleteTimeInterval,
  } = props;

  const plantName = plant.name;

  const handleNotification = async (interval, plantName) => {
    let repeatTime;
    switch (interval) {
      case 'daily':
        repeatTime = 1;
        break;
      case 'every two days':
        repeatTime = 2;
        break;
      case 'every three day':
        repeatTime = 3;
        break;
      case 'once a week':
        repeatTime = 7;
        break;
      case 'once every two weeks':
        repeatTime = 14;
        break;
    }

    //generating random number for id
    const notificationId = Math.round(Math.random() * 100000000);

    const addNotification = () => {
      PushNotification.localNotificationSchedule({
        id: notificationId,
        channelId: 'test-channel1',
        title: plantName,
        message: `Reminder to water ${plantName} now`,
        date: new Date(Date.now()),
        allowWhileIdle: true,
        repeatType: 'day',
        repeatTime,
      });

      // this will show us all stored notifications
      // PushNotification.getScheduledLocalNotifications(async nots => {
      //   console.log('nots?', nots);
      // });
    };

    if (timeIntervalAction == 'add') {
      addNotification();

      closeOverlays();

      createTimeInterval(dropDownPickerValue, notificationId);
    }
    // else if (timeIntervalAction == 'edit') {
    //    deleteTimeInterval();
    //   addNotification();
    //   closeOverlays();
    //   createTimeInterval(value, notificationId);
    // }
  };

  const [overlayVisible, setOverlayVisible] = useState(true);

  const [showDropDownPicker, setShowDropDownPicker] = useState(false);
  const [dropDownPickerValue, setDropDownPickerValue] = useState(null);

  const [timeInterval, setTimeInterval] = useState([
    {label: 'Every day', value: 'daily'},
    {label: 'Every 2 days', value: 'every two days'},
    {label: 'Every 3 days', value: 'every three days'},
    {label: 'Every week', value: 'once a week'},
    {label: 'Every two weeks', value: 'once every two weeks'},
  ]);

  const onPressFunction = async () => {
    handleNotification(dropDownPickerValue, plantName);
  };

  const closeOverlays = () => {
    setOverlayVisible(false);
    closeModal();
  };

  if (timeIntervalAction == 'delete') {
    return (
      <DeleteOrCancel
        name={'this notification'}
        deletion={deleteTimeInterval}
        closeOverlay={() => closeOverlays()}
      />
    );
  } else {
    return (
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={styles.overlay}
        onBackdropPress={() => closeOverlays()}>
        <>
          <DropDownPicker
            open={showDropDownPicker}
            value={dropDownPickerValue}
            items={timeInterval}
            setOpen={setShowDropDownPicker}
            setValue={setDropDownPickerValue}
            setItems={setTimeInterval}
          />
          <Pressable
            style={[{...styles.darkButtonContainer, ...styles.addButton}]}
            onPress={() => onPressFunction()}>
            <Text style={styles.textStylesDark}>Add</Text>
          </Pressable>
        </>
      </Overlay>
    );
  }
};

TimeInterval.propTypes = {
  createTimeInterval: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  plant: PropTypes.object.isRequired,
  timeIntervalAction: PropTypes.string.isRequired,
  deleteTimeInterval: PropTypes.func.isRequired,
};

export default TimeInterval;
