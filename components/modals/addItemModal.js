import React, {useState} from 'react';
import {View, Modal, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../stylesheet';
import uuid from 'react-native-uuid';
import RenderIcons from '../RenderIcons.js';

const AddModal = ({addMainItem}) => {
  //usestate to open or close modal
  const [modalOpen, setModalOpen] = useState(false);

  //usestate to keep track of the text written
  const [text, setText] = useState('');
  const onChange = textValue => setText(textValue);

  const menuItems = [
    {name: 'plants', icon: 'leaf', color: 'green', key: uuid.v4()},
    {name: 'investment', icon: 'money', color: 'green', key: uuid.v4()},
  ];

  const [menuItem, setMenuItem] = useState(menuItems);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <View>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableOpacity>
          <Icon
            style={{...styles.modalToggle, ...styles.modalClose}}
            name="remove"
            size={50}
            color="red"
            onPress={() => toggleModal()}
          />
          {/* <TextInput
            placeholder="Add Item..."
            style={styles.input}
            onChangeText={onChange}
          />
          <Button
            color="#800080"
            // safety check to make sure that the passed in item is not empty
            onPress={() => {
              if (!text) {
                Alert.alert('Error', 'Item cannot be empty');
              } else {
                addMainItem(text);
                setModalOpen(false);
                setText('');
              }
            }}
            title="Submit"
          /> */}

          <FlatList
            data={menuItem}
            renderItem={({item}) => (
              <RenderIcons
                item={item}
                toggleMainModal={toggleModal}
                addMainItem={addMainItem}
              />
            )}
            numColumns={3}
          />
        </TouchableOpacity>
      </Modal>

      <Icon
        style={styles.modalToggle}
        name="plus"
        size={50}
        color="green"
        onPress={() => toggleModal()}
      />
    </View>
  );
};

export default AddModal;
