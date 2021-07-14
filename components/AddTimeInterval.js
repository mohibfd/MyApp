import React, {useState} from 'react';
import {Overlay, Input, Button} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../stylesheets/stylesheet';

import PushNotification from 'react-native-push-notification';

const handleNotification = (interval, plantName) => {
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

  // PushNotification.localNotification({
  //   channelId: 'test-channel',
  //   title: 'You clicked on' + name,
  //   title: 'babyyyyy',
  //   message: 'I really like you and miss you :)',
  // });

  PushNotification.localNotificationSchedule({
    channelId: 'test-channel',
    title: plantName,
    message: `Reminder to water ${plantName} now`,
    date: new Date(Date.now() + repeatTime * 1000),
    allowWhileIdle: true,
    // repeatType: 'day',
    // repeatTime,
    // repeatType: 'minute',
    // repeatTime: 1,
  });

  PushNotification.cancelAllLocalNotifications();

  // console.log(PushNotification.getScheduledLocalNotifications('test-channel'));
};

export function AddTimeInterval({createTimeInterval, closeModal, plantName}) {
  const [overlayVisible, setOverlayVisible] = useState(true);
  // const [timeInterval, setTimeInterval] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [timeInterval, setTimeInterval] = useState([
    {label: 'Daily', value: 'daily'},
    {label: 'Three times a week', value: 'three'},
    {label: 'Twice a week', value: 'two'},
    {label: 'Once a week', value: 'one'},
    {label: 'Once every two weeks', value: 'biweekly'},
  ]);

  const closeOverlays = () => {
    setOverlayVisible(false);
    closeModal();
  };

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
            closeOverlays();
            createTimeInterval(value);
            handleNotification(value, plantName);
          }}
        />
      </>
    </Overlay>
  );
}
