import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';

import {ActionSheet} from './online_components/ActionSheet';
import styles from '../stylesheets/stylesheet';
import {TimeInterval} from './TimeInterval';
import PushNotification from 'react-native-push-notification';

const PlantItem = ({plant, deletion, setPlants}) => {
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
        PushNotification.cancelLocalNotifications({id: plant.notificationId});
      },
    },
  ];

  if (!plant.timeInterval) {
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

  const createTimeInterval = (timeInterval, notificationId) => {
    //deleting item then recreating it to make it easier to modify one of its parameters
    setPlants(prevItems => {
      return prevItems.filter(item => item.key != plant.key);
    });

    setPlants(prevItems => {
      return [
        {name: plant.name, key: uuid.v4(), timeInterval, notificationId},
        ...prevItems,
      ];
    });
  };

  const deleteTimeInterval = () => {
    PushNotification.cancelLocalNotifications({id: plant.notificationId});

    //delete all notifications
    // PushNotification.cancelAllLocalNotifications();

    //deleting item then recreating it to make it easier to modify one of its parameters
    setPlants(prevItems => {
      return prevItems.filter(item => item.key != plant.key);
    });

    setPlants(prevItems => {
      return [
        {
          name: plant.name,
          key: uuid.v4(),
          timeInterval: null,
          notificationId: null,
        },
        ...prevItems,
      ];
    });
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
        bottomDivider>
        <ListItem.Content style={styles.listItemContainer}>
          <ListItem.Title>{plant.name}</ListItem.Title>
          {plant.timeInterval && <Icon name="check" size={20} />}
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

export default PlantItem;
