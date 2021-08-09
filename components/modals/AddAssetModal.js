import PropTypes from 'prop-types';
import React from 'react';
import {
  Modal,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';

import generalStyles from '../../stylesheets/generalStylesheet';
import RenderIcons from '../RenderIcons.js';

const AddAssetModal = ({menuItems, addMainItem, setModalVisible}) => {
  return (
    <Modal
      visible={true}
      animationType="slide"
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={menuItems}
          renderItem={({item}) => (
            <RenderIcons
              item={item}
              toggleMainModal={() => setModalVisible(false)}
              addMainItem={addMainItem}
            />
          )}
          removeClippedSubviews={false}
          numColumns={3}
        />
        <Pressable
          style={styles.buttonContainer}
          onPress={() => setModalVisible(false)}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myBlack,
    paddingTop: '5%',
  },
  buttonContainer: {
    width: '100%',
    height: '5%',
    alignItems: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'gold',
  },
  buttonText: {
    color: myWhite,
    textAlign: 'center',
    fontSize: EStyleSheet.value('20rem'),
  },
});

AddAssetModal.propTypes = {
  menuItems: PropTypes.array.isRequired,
  addMainItem: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

export default AddAssetModal;
