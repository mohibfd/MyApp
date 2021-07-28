import React from 'react';
import PropTypes from 'prop-types';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';

import generalStyles from '../stylesheets/generalStylesheet';

const DeleteOrCancel = ({name, deletion, closeOverlay}) => {
  return (
    <Overlay
      isVisible={true}
      overlayStyle={styles.deleteOverlay}
      onBackdropPress={() => closeOverlay()}>
      {deletion && (
        <>
          <Text style={styles.deleteOverlayText}>
            Are you sure you want to delete {name} ?
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Pressable
              style={generalStyles.darkButtonContainer}
              onPress={() => closeOverlay()}>
              <Text style={generalStyles.textStylesDark}>Cancel</Text>
            </Pressable>
            <Pressable
              style={generalStyles.darkButtonContainer}
              onPress={() => deletion()}>
              <Text style={generalStyles.textStylesDark}>Delete</Text>
            </Pressable>
          </View>
        </>
      )}
    </Overlay>
  );
};

const styles = StyleSheet.create({
  deleteOverlay: {
    flex: 0.17,
    width: '90%',
    justifyContent: 'space-between',
  },
  deleteOverlayText: {
    flex: 1,
    paddingLeft: '5%',
    fontSize: EStyleSheet.value('25rem'),
  },
});

DeleteOrCancel.propTypes = {
  name: PropTypes.string.isRequired,
  deletion: PropTypes.func.isRequired,
  closeOverlay: PropTypes.func.isRequired,
};

export default DeleteOrCancel;
