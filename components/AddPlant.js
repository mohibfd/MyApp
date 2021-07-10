import React, {useState} from 'react';
import {Overlay, Input, Button, Text} from 'react-native-elements';
import styles from '../stylesheets/stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

export function AddPlant({createTask}) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newPlantName, setNewPlantName] = useState('');

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{width: '90%'}}
        onBackdropPress={() => setOverlayVisible(false)}>
        <>
          <Input
            placeholder="New Plant Name"
            onChangeText={text => setNewPlantName(text)}
            autoFocus={true}
          />
          <Button
            title="Create"
            onPress={() => {
              setOverlayVisible(false);
              createTask(newPlantName);
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
