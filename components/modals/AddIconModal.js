import PropTypes from 'prop-types';
import React, {useState} from 'react';
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

const AddIconModal = ({menuItems, addMainItem}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Modal visible={modalOpen} animationType="slide">
        <SafeAreaView style={styles.container}>
          <Pressable>
            <Icon
              style={generalStyles.modalClose}
              name="remove"
              size={EStyleSheet.value(50)}
              color="red"
              onPress={() => toggleModal()}
            />

            <FlatList
              data={menuItems}
              renderItem={({item}) => (
                <RenderIcons
                  item={item}
                  toggleMainModal={toggleModal}
                  addMainItem={() => addMainItem(item)}
                />
              )}
              numColumns={3}
            />
          </Pressable>
        </SafeAreaView>
      </Modal>

      <Icon
        style={styles.modalToggle}
        name="plus"
        size={75}
        color="green"
        onPress={() => toggleModal()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: myBlack},
  modalToggle: {
    borderColor: '#f2f2f2',
    padding: EStyleSheet.value('20rem'),
    paddingRight: EStyleSheet.value('25rem'),
    alignSelf: 'flex-end',
  },
});

AddIconModal.propTypes = {
  addMainItem: PropTypes.func.isRequired,
};

export default AddIconModal;
