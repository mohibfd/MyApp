import PropTypes from 'prop-types';
import React from 'react';
import {
  Modal,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';

import generalStyles from '../../stylesheets/generalStylesheet';
import RenderIcons from '../RenderIcons.js';

const AddIconModal = ({menuItems, addMainItem, setModalVisible}) => {
  return (
    <Modal
      visible={true}
      animationType="slide"
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <SafeAreaView style={styles.container}>
        <Pressable style={{flex: 1}}>
          <Icon
            style={styles.modalClose}
            name="remove"
            size={EStyleSheet.value(75)}
            color="red"
            onPress={() => setModalVisible(false)}
          />

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
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myBlack,
  },
  modalClose: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: '12%',
    right: '5%',
    zIndex: 1,
  },
});

AddIconModal.propTypes = {
  menuItems: PropTypes.array.isRequired,
  addMainItem: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

export default AddIconModal;
