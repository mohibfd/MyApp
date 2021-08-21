import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {Pressable, View, Text, StyleSheet, Keyboard} from 'react-native';
import {Overlay, Input} from 'react-native-elements';
import generalStyles from '../stylesheets/generalStylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddItemHeader = ({createItem, instantAdd}) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const _keyboardDidShow = () => setKeyboardStatus('Keyboard Shown');
  const _keyboardDidHide = () => setKeyboardStatus('Keyboard Hidden');

  const overlayFunction = () => {
    if (instantAdd) {
      instantAdd();
    } else {
      setOverlayVisible(true);
    }
  };

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={[
          generalStyles.borderContainer,
          {
            flex: 1,
            position: 'absolute',
            bottom: keyboardStatus == 'Keyboard Shown' ? '10%' : null,
          },
        ]}
        onBackdropPress={() => setOverlayVisible(false)}>
        <>
          <Input
            placeholder="New Item Name"
            onChangeText={text => setNewItemName(text)}
            autoFocus={true}
            style={{color: myWhite}}
          />
          <View style={styles.buttonContainer}>
            <Pressable
              style={generalStyles.darkButtonContainer}
              onPress={() => {
                setOverlayVisible(false);
              }}>
              <Text style={generalStyles.textStylesDark}>Cancel</Text>
            </Pressable>
            <Pressable
              style={generalStyles.darkButtonContainer}
              onPress={() => {
                setOverlayVisible(false);
                createItem(newItemName);
              }}>
              <Text style={generalStyles.textStylesDark}>Create</Text>
            </Pressable>
          </View>
        </>
      </Overlay>
      <Icon
        style={generalStyles.plusButton}
        name="plus"
        size={75}
        color="green"
        onPress={() => {
          overlayFunction();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-evenly'},
});

AddItemHeader.defaultProps = {
  createItem: null,
  instantAdd: null,
};

AddItemHeader.propTypes = {
  createItem: PropTypes.func,
  instantAdd: PropTypes.func,
};

export default AddItemHeader;
