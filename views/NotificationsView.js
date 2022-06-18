import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Alert,
  // Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import uuid from 'react-native-uuid';
import PushNotification from 'react-native-push-notification';

import Header from '../components/Header';
import NotificationItem from '../components/flatListRendering/NotificationItem';
import DeleteOrCancel from '../components/modals/DeleteOrCancel.js';
import EStyleSheet from 'react-native-extended-stylesheet';

const NotificationsView = () => {
  const [notificationsStorage, setNotificationsStorage] =
    useStorage('notificationss');

  const [notifications, setNotifications] = useState(
    notificationsStorage ? notificationsStorage : [],
  );

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteNotification, setDeleteNotification] = useState(null);

  const [openTimeInterval, setOpenTimeInterval] = useState(false);

  const [deleteAllNotificationsCounter, setDeleteAllNotificationsCounter] =
    useState(0);

  useEffect(() => {
    setNotificationsStorage(notifications);
  }, [notifications, setNotificationsStorage]);

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
  };

  // const maxNotifications = Math.floor(500 / globalRepeatNotifications);

  const createNotification = (newNotificationName, notificationText) => {
    // if (notifications.length === 5) {
    // Alert.alert(
    //   'Too many notifications',
    //   `Sorry you cannot have more than ${maxNotifications} notifications at a time`,
    //   [{text: 'OK'}],
    // );
    //   return;
    // }

    setNotifications(prevItems => {
      return [
        ...prevItems,
        {
          name: newNotificationName,
          key: uuid.v4(),
          notificationId: null,
          interval: '',
          notificationText,
        },
      ];
    });

    setOpenTimeInterval(true);
  };

  //also returns notification to be deleted
  const openDeleteOrCancel = mainItem => {
    toggleDeleteOrCancel();
    setDeleteNotification(mainItem);
  };

  const completeDeletion = () => {
    toggleDeleteOrCancel();

    if (deleteNotification.notificationId) {
      const id = deleteNotification.notificationId;
      PushNotification.cancelLocalNotifications({id});

      // [...Array(globalRepeatNotifications)].map((e, i) => {
      // const id = deleteNotification.notificationId + i;
      //   PushNotification.cancelLocalNotifications({id});
      // });
    }

    setNotifications(prevItems => {
      return prevItems.filter(item => item.key !== deleteNotification.key);
    });
  };

  const deleteAllNotifications = () => {
    setDeleteAllNotificationsCounter(deleteAllNotificationsCounter + 1);
    if (deleteAllNotificationsCounter === 5) {
      //delete all notifications
      PushNotification.cancelAllLocalNotifications();

      Alert.alert(
        'All notifications deleted',
        'Please reset your notifications by clicking change reminder',
        [{text: 'OK'}],
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../components/assets/Notifications.jpeg')}
        style={styles.image}>
        <Header
          hiddenIcon={deleteAllNotifications}
          title="My Notifications"
          notificationAdd={createNotification}
        />

        {/* <Text style={styles.warning}>
          {`Each notifications will trigger ${globalRepeatNotifications} times before stopping`}
        </Text> */}
        <ScrollView>
          {notifications &&
            notifications.map(notification =>
              notification ? (
                <NotificationItem
                  key={notification.key}
                  notification={notification}
                  deletion={openDeleteOrCancel}
                  notifications={notifications}
                  setNotificationsStorage={setNotificationsStorage}
                  openTimeInterval={openTimeInterval}
                  // maxNotifications={maxNotifications}
                />
              ) : null,
            )}
        </ScrollView>

        {isDeleteOrCancel && (
          <DeleteOrCancel
            name={deleteNotification.name}
            deletion={completeDeletion}
            closeOverlay={toggleDeleteOrCancel}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {width: '100%', height: '100%'},
  container: {backgroundColor: myBlack, flex: 1},
  warning: {
    height: EStyleSheet.value('20rem'),
    fontSize: EStyleSheet.value('12rem'),
    textAlign: 'center',
    color: myWhite,
  },
});

export default NotificationsView;
