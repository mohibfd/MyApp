import React, {useState} from 'react';
import {
  Text,
  View,
  Alert,
  Modal,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../stylesheet';
import uuid from 'react-native-uuid';
import {set} from 'react-native-reanimated';
import RenderIcons from '../RenderIcons.js';

const AddModal = ({addList}) => {
  //usestate to open or close modal
  const [modalOpen, setModalOpen] = useState(false);

  //usestate to keep track of the text written
  const [text, setText] = useState('');
  const onChange = textValue => setText(textValue);

  let menuItems = [
    {name: 'test', icon: 'leaf', color: 'green', key: uuid.v4()},
    {name: 'test2', icon: 'money', color: 'green', key: uuid.v4()},
  ];

  const [menuItem, setMenuItem] = useState(menuItems);

  // const renderItem = ({item}) => (
  //   <Item item={item} icon={item.icon} color={item.color} />
  // );

  // const Item = ({item, icon, color}) => (
  //   <View style={styles.threeFlatList}>
  //     <Icon
  //       name={icon}
  //       size={defaultSize}
  //       color={color}
  //       onPress={() => createOrCancel(item)}
  //     />
  //   </View>
  // );

  return (
    <View>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableOpacity>
          <Icon
            style={{...styles.modalToggle, ...styles.modalClose}}
            name="remove"
            size={50}
            color="red"
            onPress={() => setModalOpen(false)}
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
                addList(text);
                setModalOpen(false);
                setText('');
              }
            }}
            title="Submit"
          /> */}

          <FlatList
            data={menuItem}
            renderItem={({item}) => <RenderIcons item={item} />}
            numColumns={3}
          />
        </TouchableOpacity>
      </Modal>

      <Icon
        style={styles.modalToggle}
        name="plus"
        size={50}
        color="green"
        onPress={() => setModalOpen(true)}
      />
    </View>
  );
};

export default AddModal;
