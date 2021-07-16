import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';

import {ActionSheet} from './online_components/ActionSheet';
import styles from '../stylesheets/stylesheet';
import {TimeInterval} from './TimeInterval';

const PlantItem = ({plant, deletion, setPlants}) => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  //   const [showAddTimeInterval, setShowAddTimeInterval] = useState(false);

  //   const [showEditTimeInterval, setShowEditTimeInterval] = useState(false);

  //   const [showDeleteTimeInterval, setShowDeleteTimeInterval] = useState(false);

  const [timeIntervalAction, setTimeIntervalAction] = useState(false);

  const [showTimeInterval, setShowTimeInterval] = useState(false);

  //   const toggleShowAddTimeInterval = () => {
  //     setShowAddTimeInterval(!showAddTimeInterval);
  //   };

  //   const toggleEditTimeInterval = () => {
  //     setShowEditTimeInterval(!showEditTimeInterval);
  //   };

  //   const toggleDeleteTimeInterval = () => {
  //     setShowDeleteTimeInterval(!showDeleteTimeInterval);
  //   };

  const toggleShowTimeInterval = () => {
    setShowTimeInterval(!showTimeInterval);
  };

  const actions = [
    {
      title: 'Delete',
      action: () => {
        deletion(plant);
      },
    },
  ];

  if (!plant.timeInterval) {
    actions.push({
      title: 'Set time interval',
      action: () => (toggleShowTimeInterval(), setTimeIntervalAction('add')),
    });
  } else {
    actions.push({
      title: 'Edit time interval',
      action: () => (toggleShowTimeInterval(), setTimeIntervalAction('edit')),
    });

    actions.push({
      title: 'Delete time interval',
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
          plantName={plant.name}
          timeIntervalAction={timeIntervalAction}
        />
      )}
    </>
  );
};

export default PlantItem;
