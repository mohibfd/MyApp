import React, {useState} from 'react';
import {Overlay, Input, Button} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../stylesheets/stylesheet';

export function AddTimeInterval({createTimeInterval, closeModal}) {
  const [overlayVisible, setOverlayVisible] = useState(true);
  // const [timeInterval, setTimeInterval] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [timeInterval, setTimeInterval] = useState([
    {label: 'Daily', value: 'daily'},
    {label: 'Three times a week', value: 'three'},
    {label: 'Twice a week', value: 'two'},
    {label: 'Once a week', value: 'one'},
    {label: 'Once every two weeks', value: 'biweekly'},
  ]);

  const closeOverlays = () => {
    setOverlayVisible(false);
    closeModal();
  };

  return (
    <Overlay
      isVisible={overlayVisible}
      overlayStyle={styles.overlay}
      onBackdropPress={() => closeOverlays()}>
      <>
        <DropDownPicker
          open={open}
          value={value}
          items={timeInterval}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setTimeInterval}
        />
        <Button
          title="Add"
          onPress={() => {
            closeOverlays();
            createTimeInterval(timeInterval);
          }}
        />
      </>
    </Overlay>
  );
}
