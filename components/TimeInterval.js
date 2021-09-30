import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Pressable, Text, Platform, StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import PushNotification from 'react-native-push-notification';

// import DeleteOrCancel from '../components/modals/DeleteOrCancel.js';
import generalStyles from '../stylesheets/generalStylesheet';
import EStyleSheet from 'react-native-extended-stylesheet';

const TimeInterval = props => {
  const {
    createTimeInterval,
    closeModal,
    plant,
    timeIntervalAction,
    deleteTimeInterval,
  } = props;

  const {name, notificationText} = plant;

  const [overlayVisible, setOverlayVisible] = useState(true);

  const [showDropDownPicker, setShowDropDownPicker] = useState(false);
  const [dropDownPickerValue, setDropDownPickerValue] = useState(null);

  const [timeInterval, setTimeInterval] = useState([
    {label: 'Every day', value: 'daily'},
    {label: 'Every 2 days', value: 'every two days'},
    {label: 'Every 3 days', value: 'every three days'},
    {label: 'Twice a week', value: 'twice a week'},
    {label: 'Weekly', value: 'once a week'},
    {label: 'Every two weeks', value: 'once every two weeks'},
    {label: 'Monthly', value: 'once a month'},
  ]);

  const [showSplashText, setShowSplashText] = useState(false);

  const handleNotification = async interval => {
    if (!interval) {
      setShowSplashText(true);

      setTimeout(() => {
        setShowSplashText(false);
      }, 2000);

      return;
    }

    let repeatTime;
    switch (interval) {
      case 'daily':
        repeatTime = 1;
        break;
      case 'every two days':
        repeatTime = 2;
        break;
      case 'every three days':
        repeatTime = 3;
        break;
      case 'twice a week':
        repeatTime = 3.5;
        break;
      case 'once a week':
        repeatTime = 7;
        break;
      case 'once every two weeks':
        repeatTime = 14;
        break;
      case 'once a month':
        repeatTime = 30;
        break;
    }

    //generating random number for id
    const dateId = Date().toString();
    const numberId = Math.round(Math.random() * 100000000);
    const notificationId = Platform.OS === 'ios' ? dateId : numberId;

    const addNotification = () => {
      PushNotification.localNotificationSchedule({
        channelId: 'test-channel1',
        id: notificationId,
        date: new Date(Date.now()),
        title: name,
        message: notificationText,
        allowWhileIdle: true,
        repeatType: 'day',
        repeatTime,
      });
    };

    // const addNotification = () => {
    //   [...Array(globalRepeatNotifications)].map((e, i) => {
    //     const specificDate = new Date(
    //       Date.now() + globalOneDayInMilliSeconds * i * repeatTime,
    //     );

    //     const newId = notificationId + i;

    //     PushNotification.localNotificationSchedule({
    //       channelId: 'test-channel1',
    //       id: newId,
    //       date: specificDate,
    //       title,
    //       message: `Reminder for ${title}`,
    //       allowWhileIdle: true,
    //     });

    //     if (i === globalRepeatNotifications - 1) {
    //       PushNotification.localNotificationSchedule({
    //         channelId: 'test-channel1',
    //         id: newId,
    //         date: specificDate,
    //         title: `notifications for ${title} are finished`,
    //         message: `Please reset the notifications for ${title} as the ${globalRepeatNotifications} notifications limit has been reached`,
    //         allowWhileIdle: true,
    //       });
    //     }
    //   });
    // };

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
      <>
        <DropDownPicker
          open={showDropDownPicker}
          value={dropDownPickerValue}
          items={timeInterval}
          setOpen={setShowDropDownPicker}
          setValue={setDropDownPickerValue}
          setItems={setTimeInterval}
          arrowIconStyle={{tintColor: myWhite}}
          tickIconStyle={{tintColor: myWhite}}
          style={{backgroundColor: myGreen}}
          dropDownContainerStyle={{
            backgroundColor: myGreen,
            minHeight: EStyleSheet.value('265rem'),
          }}
          textStyle={{color: myWhite}}
        />
        <Text style={generalStyles.splashText}>
          {showSplashText ? 'please select one of the available options' : null}
        </Text>
        <Pressable
          style={[
            {
              ...generalStyles.darkButtonContainer,
              ...styles.addButton,
            },
          ]}
          onPress={() => handleNotification(dropDownPickerValue)}>
          <Text style={generalStyles.textStylesDark}>Add</Text>
        </Pressable>
      </>
    </Overlay>
  );
};
// }

const styles = StyleSheet.create({
  overlay: {
    height: EStyleSheet.value('350rem'),
    justifyContent: 'space-between',
  },
  addButton: {
    width: '75%',
    alignSelf: 'center',
  },
});

TimeInterval.propTypes = {
  createTimeInterval: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  plant: PropTypes.object.isRequired,
  timeIntervalAction: PropTypes.string.isRequired,
  deleteTimeInterval: PropTypes.func.isRequired,
};

export default TimeInterval;
