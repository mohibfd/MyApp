import React, {useState} from 'react';
import {Overlay, Input, Button} from 'react-native-elements';

export function AddTimeInterval({createTimeInterval, closeModal}) {
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [timeInterval, setTimeInterval] = useState('');

  const closeOverlays = () => {
    setOverlayVisible(false);
    closeModal();
  };
  return (
    <Overlay
      isVisible={overlayVisible}
      overlayStyle={{width: '90%'}}
      onBackdropPress={() => closeOverlays()}>
      <>
        <Input
          placeholder="Time interval"
          onChangeText={text => setTimeInterval(text)}
          autoFocus={true}
        />
        <Button
          title="Create"
          onPress={() => {
            closeOverlays();
            createTimeInterval(timeInterval);
          }}
        />
      </>
    </Overlay>
  );
}
