import React, {useState, useEffect} from 'react';
import {Overlay, Input, Button, View, Text} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import uuid from 'react-native-uuid';
import PushNotification from 'react-native-push-notification';
import {StyleSheet, Dimensions} from 'react-native';

import styles from '../stylesheets/stylesheet';
import DeleteOrCancel from '../components/DeleteOrCancel.js';

export function TimeInterval({
  createTimeInterval,
  closeModal,
  plant,
  timeIntervalAction,
  deleteTimeInterval,
}) {
  const plantName = plant.name;

  const handleNotification = async (interval, plantName) => {
    let repeatTime;
    switch (interval) {
      //these are all per week
      case 'daily':
        repeatTime = 1;
        break;
      case 'three':
        repeatTime = 2;
        break;
      case 'two':
        repeatTime = 3;
        break;
      case 'one':
        repeatTime = 7;
        break;
      case 'biweekly':
        repeatTime = 14;
        break;
    }
    const min = 1;
    const max = 100000000;
    const rand = Math.round(min + Math.random() * (max - min));

    console.log(rand);
    // const id = uuid.v4();
    const notificationId = '989832';

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
      PushNotification.getScheduledLocalNotifications(async nots => {
        console.log('nots?', nots);
      });
    };

    if (timeIntervalAction == 'add') {
      addNotification();

      closeOverlays();

      createTimeInterval(value, notificationId);
    }
    // else if (timeIntervalAction == 'edit') {
    //    deleteTimeInterval();

    //   addNotification();

    //   closeOverlays();

    //   createTimeInterval(value, notificationId);
    // }
  };

  const [overlayVisible, setOverlayVisible] = useState(true);

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(true);

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
    // setIsDeleteOrCancel(!isDeleteOrCancel);
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [timeInterval, setTimeInterval] = useState([
    {label: 'Daily', value: 'daily'},
    {label: 'Three times a week', value: 'three'},
    {label: 'Twice a week', value: 'two'},
    {label: 'Once a week', value: 'one'},
    {label: 'Once every two weeks', value: 'biweekly'},
  ]);

  const onPressFunction = async () => {
    handleNotification(value, plantName);
  };

  const closeOverlays = () => {
    setOverlayVisible(false);
    closeModal();
  };

  if (timeIntervalAction == 'delete') {
    return (
      isDeleteOrCancel && (
        <DeleteOrCancel
          name={'this notification'}
          deletion={deleteTimeInterval}
          closeOverlay={toggleDeleteOrCancel}
        />
      )
    );
  } else {
    return (
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={styles.overlay}
        onBackdropPress={() => closeOverlays()}>
        <>
          <DropDownPicker
            open={open}
            value={value}
            items={timeInterval}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setTimeInterval}
          />
          <Button
            title="Add"
            onPress={() => {
              onPressFunction();
            }}
          />
        </>
      </Overlay>
    );
  }
}

// DeleteOrCancel.propTypes = {
//   name: PropTypes.string.isRequired,
//   deletion: PropTypes.func.isRequired,
// };
