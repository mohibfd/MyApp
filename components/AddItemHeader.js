import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Overlay, Input, Button, Text} from 'react-native-elements';
import styles from '../stylesheets/stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddItemHeader = ({createItem}) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{width: '90%'}}
        onBackdropPress={() => setOverlayVisible(false)}>
        <>
          <Input
            placeholder="New Item Name"
            onChangeText={text => setNewItemName(text)}
            autoFocus={true}
          />
          <Button
            title="Create"
            onPress={() => {
              setOverlayVisible(false);
              createItem(newItemName);
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
};

AddItemHeader.propTypes = {
  createItem: PropTypes.func.isRequired,
};

export default AddItemHeader;
