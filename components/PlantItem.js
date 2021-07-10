import React, {useState} from 'react';
import {Text, ListItem, Icon} from 'react-native-elements';
import {useTasks} from '../../providers/TasksProvider';
import {ActionSheet} from './online_components/ActionSheet';
import styles from '../stylesheets/stylesheet';

function PlantItem({plant, deletion}) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const actions = [
    {
      title: 'Delete',
      action: () => {
        deletion(plant);
      },
    },
  ];

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
    </>
  );
}

export default PlantItem;
