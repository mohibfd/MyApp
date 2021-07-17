import React, {useState, useEffect} from 'react';
import {Overlay, Input, Button, View, Text} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import uuid from 'react-native-uuid';
import PushNotification from 'react-native-push-notification';
import {StyleSheet, Dimensions} from 'react-native';

import styles from '../stylesheets/stylesheet';
import DeleteOrCancel from '../components/CreateOrCancel.js';

export function TimeInterval({
  createTimeInterval,
  closeModal,
  plantName,
  timeIntervalAction,
  deleteTimeInterval,
}) {
  //   const [savedNotificationsStorage, setSavedNotificationsStorage] = useStorage(
  //     'plantsNotificationss',
  //   );

  //   const [savedNotifications, setSavedNotifications] = useStateWithPromise(
  //     savedNotificationsStorage ? savedNotificationsStorage : [],
  //   );

  //   useEffect(() => {
  //     setSavedNotificationsStorage(savedNotifications);
  //     console.log('state nots', savedNotifications);
  //   }, [savedNotifications]);

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

    const addNotification = () => {
      PushNotification.localNotificationSchedule({
        channelId: 'test-channel1',
        title: plantName,
        message: `Reminder to water ${plantName} now`,
        date: new Date(Date.now()),
        allowWhileIdle: true,
        repeatType: 'day',
        repeatTime,
      });
    };

    if (timeIntervalAction == 'add') {
      addNotification();

      //this will store the id
      PushNotification.getScheduledLocalNotifications(async nots => {
        let notificationId = nots[nots.length - 1].id;

        // await setSavedNotifications(prevItems => {
        //   return [{key: notificationId, repeatTime}, ...prevItems];
        // });

        console.log('nots?', nots);

        console.log('not here');

        //these 2 lines will delete all notifications
        //
        // await setSavedNotifications([]);
        // PushNotification.cancelAllLocalNotifications();
        //

        closeOverlays();

        await createTimeInterval(value, notificationId);
      });
    } else if (timeIntervalAction == 'edit') {
      console.log('edit');
      // PushNotification.cancelLocalNotifications({id: '123'});
    } else if (timeIntervalAction == 'delete') {
      console.log('delete');
    }
  };

  const [overlayVisible, setOverlayVisible] = useState(true);

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
    return <DeleteOrCancel name={'this notification'} deletion={true} />;
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
