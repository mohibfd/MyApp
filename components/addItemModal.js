import React, {useState} from 'react';
import {
  View,
  Alert,
  Modal,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddModal = ({addList}) => {
  //usestate to open or close modal
  const [modalOpen, setModalOpen] = useState(false);

  //usestate to keep track of the text written
  const [text, setText] = useState('');
  const onChange = textValue => setText(textValue);

  return (
    <View>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableOpacity>
          <Icon
            style={{...styles.modalToggle, ...styles.modalClose}}
            name="remove"
            size={30}
            color="red"
            onPress={() => setModalOpen(false)}
          />
          <TextInput
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
          />
        </TouchableOpacity>
      </Modal>

      <Icon
        style={styles.modalToggle}
        name="plus"
        size={30}
        color="green"
        onPress={() => setModalOpen(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalToggle: {
    borderColor: '#f2f2f2',
    paddingTop: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 20,
  },

  input: {
    height: 60,
    padding: 8,
    fontSize: 16,
    marginBottom: 30,
  },
});

export default AddModal;
