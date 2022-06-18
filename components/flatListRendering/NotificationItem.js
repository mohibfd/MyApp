import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {ActionSheet} from '../online_components/ActionSheet';
import TimeInterval from '../TimeInterval';
import PushNotification from 'react-native-push-notification';
import EStyleSheet from 'react-native-extended-stylesheet';

const NotificationItem = ({
  notification,
  deletion,
  notifications,
  setNotificationsStorage,
  openTimeInterval,
  // maxNotifications,
}) => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const [timeIntervalAction, setTimeIntervalAction] = useState(
    openTimeInterval ? 'add' : '',
  );

  const [showTimeInterval, setShowTimeInterval] = useState(openTimeInterval);

  const toggleShowTimeInterval = () => {
    setShowTimeInterval(!showTimeInterval);
  };

  const actions = [
    {
      title: 'Delete notification',
      action: () => {
        deletion(notification);
      },
    },
  ];

  const changeReminder = action => {
    toggleShowTimeInterval();
    setTimeIntervalAction(action);
  };

  if (!notification.notificationId) {
    actions.push({
      title: 'Set reminder',
      action: () => changeReminder('add'),
    });
  } else {
    actions.push({
      title: 'Change reminder',
      action: () => changeReminder('edit'),
    });
  }

  const createTimeInterval = (notificationId, interval) => {
    for (let i of notifications) {
      if (i.key === notification.key) {
        i.notificationId = notificationId;
        i.interval = interval;
      }
    }
    setNotificationsStorage(notifications);
  };

  const deleteTimeInterval = () => {
    const id = notification.notificationId;
    PushNotification.cancelLocalNotifications({id});
    // [...Array(globalRepeatNotifications)].map((e, i) => {
    //   PushNotification.cancelLocalNotifications({id});
    // });

    for (let i of notifications) {
      if (i.key === notification.key) {
        i.notificationId = null;
      }
    }

    setNotificationsStorage(notifications);
  };

  //the margin left is the size of the icon
  const marginLeft = notification.notificationId
    ? EStyleSheet.value('40rem')
    : 0;

  const windowHeightMinusWarning =
    Dimensions.get('window').height -
    // EStyleSheet.value('20rem') -
    Dimensions.get('window').height * 0.07;
  //header takes 7% of screen
  //and warning takes 20 rem from screen

  // const height = windowHeightMinusWarning * (1 / maxNotifications);
  const height = windowHeightMinusWarning * (1 / 7);

  return (
    <>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          setActionSheetVisible(false);
        }}
        actions={actions}
      />

      <ListItem
        onPress={() => {
          setActionSheetVisible(true);
        }}
        containerStyle={[styles.container, {height}]}
        bottomDivider>
        <ListItem.Content style={styles.listItemContainer}>
          <View style={styles.insideContainer}>
            <Text
              style={[styles.notificationName, {marginLeft}]}
              numberOfLines={1}>
              {notification.name}
            </Text>
            {notification.notificationId && (
              <Icon
                name="check"
                size={EStyleSheet.value('40rem')}
                color={'#00FF004D'}
              />
            )}
          </View>
          <Text style={styles.text1} numberOfLines={1}>
            {notification.notificationText}
          </Text>
          <Text style={styles.text2}>{notification.interval}</Text>
        </ListItem.Content>
      </ListItem>
      {showTimeInterval && (
        <TimeInterval
          createTimeInterval={createTimeInterval}
          closeModal={toggleShowTimeInterval}
          notification={notification}
          timeIntervalAction={timeIntervalAction}
          deleteTimeInterval={deleteTimeInterval}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: myGreen + '99',
  },
  text1: {
    color: myWhite,
  },
  text2: {
    color: myRed,
  },
  listItemContainer: {
    alignItems: 'center',
  },
  insideContainer: {
    flexDirection: 'row',
  },
  notificationName: {
    flex: 1,
    fontSize: EStyleSheet.value('30rem'),
    color: myWhite,
    textAlign: 'center',
  },
});

TimeInterval.defaultProps = {
  delete: null,
  notifications: null,
  setNotificationsStorage: null,
  openTimeInterval: null,
};

TimeInterval.propTypes = {
  notification: PropTypes.object.isRequired,
  deletion: PropTypes.func,
  notifications: PropTypes.array,
  setNotificationsStorage: PropTypes.func,
  openTimeInterval: PropTypes.bool,
};

export default NotificationItem;
