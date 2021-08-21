import React from 'react';
import PropTypes from 'prop-types';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';

import generalStyles from '../../stylesheets/generalStylesheet';

const DeleteOrCancel = ({name, extraName, deletion, closeOverlay}) => {
  return (
    <Overlay
      isVisible={true}
      overlayStyle={[styles.deleteOverlay, generalStyles.borderContainer]}
      onBackdropPress={() => closeOverlay()}>
      {deletion && (
        <>
          <Text style={styles.deleteOverlayText}>
            Are you sure you want to delete {name}
            {extraName} ?
          </Text>
          <View style={styles.buttonsContainer}>
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
    flex: 0.22,
    justifyContent: 'space-between',
  },
  deleteOverlayText: {
    flex: 1,
    paddingLeft: '5%',
    fontSize: EStyleSheet.value('25rem'),
    color: myWhite,
  },
  buttonsContainer: {flexDirection: 'row', justifyContent: 'space-evenly'},
});

DeleteOrCancel.defaultProps = {
  name: '',
  extraName: '',
};

DeleteOrCancel.propTypes = {
  name: PropTypes.string,
  extraName: PropTypes.string,
  deletion: PropTypes.func.isRequired,
  closeOverlay: PropTypes.func.isRequired,
};

export default DeleteOrCancel;
