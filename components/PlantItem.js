import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
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

  console.log(plant.key);

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
    </>
  );
}

export default PlantItem;
