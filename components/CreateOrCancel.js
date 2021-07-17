import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, Button} from 'react-native';
import {TouchableOpacity, View, Text} from 'react-native';
import {Overlay} from 'react-native-elements';

// import Modal from 'react-native-modal';

import styles from '../stylesheets/stylesheet';

const CreateOrCancel = ({name, deletion, addition}) => {
  const [overlayVisible, setOverlayVisible] = useState(true);

  if (addition) {
    Alert.alert('Create item?', 'Do you want to create <' + name + '> icon?', [
      {
        text: 'Cancel',
        style: 'destructive',
      },
      {text: 'Yes', onPress: () => addition(), style: 'default'},
    ]);
    return null;
  }
  return (
    <Overlay
      isVisible={overlayVisible}
      overlayStyle={styles.deleteOverlay}
      onBackdropPress={() => setOverlayVisible(false)}>
      {deletion && (
        <>
          <Text style={styles.deleteOverlayText}>
            Are you sure you want to delete {name} ?
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              style={styles.darkButtonContainer}
              activeScale={0.7}
              onPress={() => setOverlayVisible(false)}>
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
  addition: null,
};

export default CreateOrCancel;
