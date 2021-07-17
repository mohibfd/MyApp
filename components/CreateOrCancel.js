import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text, Modal} from 'react-native';
import {Overlay} from 'react-native-elements';

import styles from '../stylesheets/stylesheet';

const CreateOrCancel = ({name, deletion, closeOverlay}) => {
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
            <TouchableOpacity
              style={styles.darkButtonContainer}
              activeScale={0.7}
              onPress={() => closeOverlay()}>
              <Text style={styles.textStylesDark}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.darkButtonContainer}
              activeScale={0.7}
              onPress={() => deletion()}>
              <Text style={styles.textStylesDark}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Overlay>
  );
};

CreateOrCancel.defaultProps = {
  deletion: null,
};

CreateOrCancel.propTypes = {
  name: PropTypes.string.isRequired,
  deletion: PropTypes.func,
};

export default CreateOrCancel;
