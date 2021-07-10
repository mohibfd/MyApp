import React, {useState} from 'react';
import {Overlay, Input, Button, Text} from 'react-native-elements';
import styles from '../stylesheets/stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddPlant({createTask}) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{width: '90%'}}
        onBackdropPress={() => setOverlayVisible(false)}>
        <>
          <Input
            placeholder="New Task Name"
            onChangeText={text => setNewTaskName(text)}
            autoFocus={true}
          />
          <Button
            title="Create"
            onPress={() => {
              setOverlayVisible(false);
              createTask(newTaskName);
            }}
          />
        </>
      </Overlay>
      <Icon
        style={styles.plusButton}
        name="plus"
        size={75}
        color="green"
        onPress={() => {
          setOverlayVisible(true);
        }}
      />
    </>
  );
}
