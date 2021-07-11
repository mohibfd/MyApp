import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
import {ActionSheet} from './online_components/ActionSheet';
import styles from '../stylesheets/stylesheet';
import {AddTimeInterval} from './AddTimeInterval';

function PlantItem({plant, deletion}) {
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

  const createTimeInterval = () => {
    console.log('hi');
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
        key={plant.key}
        onPress={() => {
          setActionSheetVisible(true);
        }}
        bottomDivider>
        <ListItem.Content key={plant.key} style={styles.listItemContainer}>
          <ListItem.Title>{plant.name}</ListItem.Title>
          {/* <Icon name="check" size={20} /> */}
        </ListItem.Content>
      </ListItem>
      {showAddTimeInterval && (
        <AddTimeInterval
          createTimeInterval={createTimeInterval}
          closeModal={toggleShowAddTimeInterval}
        />
      )}
    </>
  );
}

export default PlantItem;
