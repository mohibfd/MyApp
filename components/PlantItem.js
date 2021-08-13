import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';

import {ActionSheet} from './online_components/ActionSheet';
import TimeInterval from './TimeInterval';
import PushNotification from 'react-native-push-notification';

const PlantItem = ({plant, deletion, plants}) => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const [timeIntervalAction, setTimeIntervalAction] = useState(false);

  const [showTimeInterval, setShowTimeInterval] = useState(false);

  const toggleShowTimeInterval = () => {
    setShowTimeInterval(!showTimeInterval);
  };

  const actions = [
    {
      title: 'Delete plant',
      action: () => {
        deletion(plant);
      },
    },
  ];

  if (!plant.notificationId) {
    actions.push({
      title: 'Set reminder',
      action: () => (toggleShowTimeInterval(), setTimeIntervalAction('add')),
    });
  } else {
    // actions.push({
    //   title: 'Edit time interval',
    //   action: () => (toggleShowTimeInterval(), setTimeIntervalAction('edit')),
    // });

    actions.push({
      title: 'Delete reminder',
      action: () => (toggleShowTimeInterval(), setTimeIntervalAction('delete')),
    });
  }

  const createTimeInterval = notificationId => {
    for (let i of plants) {
      if (i.key == plant.key) {
        i.notificationId = notificationId;
      }
    }
  };

  const deleteTimeInterval = closeOverlay => {
    [...Array(globalRepeatNotifications)].map((e, i) => {
      const id = plant.notificationId + i;
      PushNotification.cancelLocalNotifications({id});
    });

    //delete all notifications
    // PushNotification.cancelAllLocalNotifications();

    for (let i of plants) {
      if (i.key == plant.key) {
        i.notificationId = null;
      }
    }

    closeOverlay();
  };

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
        containerStyle={{backgroundColor: myGreen + '99'}}
        bottomDivider>
        <ListItem.Content style={styles.listItemContainer}>
          <ListItem.Title style={styles.plantName}>{plant.name}</ListItem.Title>
          {plant.notificationId && (
            <Icon name="check" size={40} color={'#00FF004D'} />
          )}
        </ListItem.Content>
      </ListItem>
      {showTimeInterval && (
        <TimeInterval
          createTimeInterval={createTimeInterval}
          closeModal={toggleShowTimeInterval}
          plant={plant}
          timeIntervalAction={timeIntervalAction}
          deleteTimeInterval={deleteTimeInterval}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plantName: {
    fontSize: EStyleSheet.value('40rem'),
    color: myWhite,
  },
});

TimeInterval.defaultProps = {
  delete: null,
};

TimeInterval.propTypes = {
  plant: PropTypes.object.isRequired,
  deletion: PropTypes.func,
  plants: PropTypes.array.isRequired,
};

export default PlantItem;
