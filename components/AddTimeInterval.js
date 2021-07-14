import React, {useState} from 'react';
import {Overlay, Input, Button} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../stylesheets/stylesheet';

import PushNotification from 'react-native-push-notification';

const handleNotification = (interval, plantName) => {
  let notificationTime;
  switch (interval) {
    //these are all per week
    case 'daily':
      notificationTime = 5;
      break;
    case 'three':
      notificationTime = 5;
      break;
    case 'two':
      notificationTime = 5;
      break;
    case 'one':
      notificationTime = 5;
      break;
    case 'biweekly':
      notificationTime = 20;
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
    date: new Date(Date.now() + notificationTime * 1000),
    allowWhileIdle: true,
  });
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
