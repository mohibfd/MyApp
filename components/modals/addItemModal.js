import React, {useState} from 'react';
import {View, Modal, FlatList, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../stylesheets/stylesheet';
import RenderIcons from '../RenderIcons.js';
import '../../global.js';

const AddModal = ({addMainItem}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <View>
      <Modal visible={modalOpen} animationType="slide">
        <Pressable>
          <Icon
            style={styles.modalClose}
            name="remove"
            size={50}
            color="red"
            onPress={() => toggleModal()}
          />

          <FlatList
            data={globalMenuItems}
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
      </Modal>

      <Icon
        style={styles.modalToggle}
        name="plus"
        size={75}
        color="green"
        onPress={() => toggleModal()}
      />
    </View>
  );
};

export default AddModal;
