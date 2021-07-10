import React, {useState} from 'react';
import {Text, ListItem, Icon} from 'react-native-elements';
import {useTasks} from '../../providers/TasksProvider';
import {ActionSheet} from './ActionSheet';
import {Task} from '../../schemas';
import styles from '../stylesheets/stylesheet';

function PlantItem({task}) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  console.log(task.name);
  return (
    <>
      {/* <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (task.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
      /> */}

      <ListItem
        // onPress={() => {
        //   setActionSheetVisible(true);
        // }}
        bottomDivider>
        <ListItem.Content style={styles.listItemContainer}>
          <ListItem.Title>{task.name}</ListItem.Title>
          <Icon name="check" size={20} />
        </ListItem.Content>
      </ListItem>
    </>
  );
}

export default PlantItem;
