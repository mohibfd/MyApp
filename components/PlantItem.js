import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
import uuid from 'react-native-uuid';

import {ActionSheet} from './online_components/ActionSheet';
import styles from '../stylesheets/stylesheet';
import {AddTimeInterval} from './AddTimeInterval';

function PlantItem({plant, deletion, setPlants}) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const [showAddTimeInterval, setShowAddTimeInterval] = useState(false);

  const toggleShowAddTimeInterval = () => {
    setShowAddTimeInterval(!showAddTimeInterval);
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
      action: () => toggleShowAddTimeInterval(),
    });
  }

  const createTimeInterval = timeInterval => {
    //deleting item then recreating it to make it easier to modify one of its parameters
    setPlants(prevItems => {
      return prevItems.filter(item => item.key != plant.key);
    });

    setPlants(prevItems => {
      return [{name: plant.name, key: uuid.v4(), timeInterval}, ...prevItems];
    });
  };
  // if (task.status !== Task.STATUS_IN_PROGRESS) {
  //   actions.push({
  //     title: 'Mark In Progress',
  //     action: () => {
  //       setTaskStatus(task, Task.STATUS_IN_PROGRESS);
  //     },
  //   });
  // }
  // if (task.status !== Task.STATUS_COMPLETE) {
  //   actions.push({
  //     title: 'Mark Complete',
  //     action: () => {
  //       setTaskStatus(task, Task.STATUS_COMPLETE);
  //     },
  //   });
  // }

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
          {/* <Icon name="check" size={20} /> */}
        </ListItem.Content>
      </ListItem>
      {showAddTimeInterval && (
        <AddTimeInterval
          createTimeInterval={createTimeInterval}
          closeModal={toggleShowAddTimeInterval}
          plantName={plant.name}
        />
      )}
    </>
  );
}

export default PlantItem;