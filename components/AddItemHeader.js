import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {Overlay, Input} from 'react-native-elements';
import generalStyles from '../stylesheets/generalStylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';

const AddItemHeader = ({
  createItem,
  instantAdd,
  cameraAdd,
  openNotifications,
  penAdd,
}) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [keyboardStatus, setKeyboardStatus] = useKeyboardState();

  const overlayFunction = () => {
    if (instantAdd) {
      instantAdd();
    } else if (openNotifications) {
      openNotifications();
    } else {
      setOverlayVisible(true);
    }
  };

  const renderIcon = () => {
    let icon = 'plus';
    let color = 'green';
    let size = EStyleSheet.value('40rem');
    if (cameraAdd) {
      icon = 'camera-retro';
      color = 'white';
    } else if (openNotifications) {
      icon = 'bell';
      color = 'white';
      size = EStyleSheet.value('30rem');
    } else if (penAdd) {
      icon = 'pencil';
      color = 'yellow';
      size = EStyleSheet.value('30rem');
    }
    return (
      <Icon
        style={generalStyles.plusButton}
        name={icon}
        size={size}
        color={color}
        onPress={() => {
          overlayFunction();
        }}
      />
    );
  };

  const bottom = keyboardStatus === 'Keyboard Shown' ? '10%' : null;

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={[
          generalStyles.borderContainer,
          styles.container,
          {bottom},
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
      {renderIcon()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
  },
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-evenly'},
});

AddItemHeader.defaultProps = {
  createItem: null,
  instantAdd: null,
  openNotifications: null,
  cameraAdd: false,
  penAdd: false,
};

AddItemHeader.propTypes = {
  createItem: PropTypes.func,
  instantAdd: PropTypes.func,
  openNotifications: PropTypes.func,
  cameraAdd: PropTypes.bool,
  penAdd: PropTypes.bool,
};

export default AddItemHeader;
