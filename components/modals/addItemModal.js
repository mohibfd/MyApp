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
import uuid from 'react-native-uuid';

import generalStyles from '../../stylesheets/generalStylesheet';
import RenderIcons from '../RenderIcons.js';
import EStyleSheet from 'react-native-extended-stylesheet';

const AddModal = ({addMainItem}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const menuItems = [
    {name: 'Plants', icon: 'envira', color: myGreen, key: uuid.v4()},
    {name: 'Invest', icon: 'money', color: myGreen, key: uuid.v4()},
    {name: 'Workout', icon: 'heartbeat', color: myRed, key: uuid.v4()},
    {name: 'Meditate', icon: 'pause', color: myRed, key: uuid.v4()},
    {name: 'Books', icon: 'book', color: myRed, key: uuid.v4()},
    {name: 'Cooking', icon: 'lemon-o', color: myRed, key: uuid.v4()},
    {name: 'Productivity', icon: 'themeisle', color: myRed, key: uuid.v4()},
    {name: 'Reminders', icon: 'calendar', color: myRed, key: uuid.v4()},
    {name: 'Wakeboarding', icon: 'tint', color: myRed, key: uuid.v4()},
  ];
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
                  addMainItem={addMainItem}
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

AddModal.propTypes = {
  addMainItem: PropTypes.func.isRequired,
};

export default AddModal;
