import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';

import {ActionSheet} from './online_components/ActionSheet';
import generalStyles from '../stylesheets/generalStylesheet';
import TimeInterval from './TimeInterval';
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
    //deleting item then recreating it to make it easier to modify one of its parameters
    setPlants(prevItems => {
      return prevItems.filter(item => item.key != plant.key);
    });

    setPlants(prevItems => {
      return [{name: plant.name, key: uuid.v4(), notificationId}, ...prevItems];
    });
  };

  const deleteTimeInterval = () => {
    [...Array(globalRepeatNotifications)].map((e, i) => {
      const id = plant.notificationId + i;
      PushNotification.cancelLocalNotifications({id});
    });

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
          <ListItem.Title
            style={{
              fontSize: EStyleSheet.value('40rem'),
            }}>
            {plant.name}
          </ListItem.Title>
          {plant.notificationId && <Icon name="check" size={40} />}
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
});

TimeInterval.defaultProps = {
  delete: null,
  setPlants: null,
};

TimeInterval.propTypes = {
  plant: PropTypes.object.isRequired,
  deletion: PropTypes.func,
  setPlants: PropTypes.func,
};

export default PlantItem;
