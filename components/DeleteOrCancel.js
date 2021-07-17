import React from 'react';
import PropTypes from 'prop-types';
import {Pressable, View, Text, Modal} from 'react-native';
import {Overlay} from 'react-native-elements';

import styles from '../stylesheets/stylesheet';

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
              style={styles.darkButtonContainer}
              activeScale={0.7}
              onPress={() => closeOverlay()}>
              <Text style={styles.textStylesDark}>Cancel</Text>
            </Pressable>
            <Pressable
              style={styles.darkButtonContainer}
              activeScale={0.7}
              onPress={() => deletion()}>
              <Text style={styles.textStylesDark}>Delete</Text>
            </Pressable>
          </View>
        </>
      )}
    </Overlay>
  );
};

DeleteOrCancel.defaultProps = {
  deletion: null,
};

DeleteOrCancel.propTypes = {
  name: PropTypes.string.isRequired,
  deletion: PropTypes.func.isRequired,
};

export default DeleteOrCancel;
