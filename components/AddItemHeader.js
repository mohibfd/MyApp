import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {Overlay, Input} from 'react-native-elements';
import generalStyles from '../stylesheets/generalStylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddItemHeader = ({createItem}) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={generalStyles.borderContainer}
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
          setOverlayVisible(true);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-evenly'},
});
AddItemHeader.propTypes = {
  createItem: PropTypes.func.isRequired,
};

export default AddItemHeader;
