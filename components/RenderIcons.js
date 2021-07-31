import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {TouchableHighlight, Modal, Text, View, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

import generalStyles from '../stylesheets/generalStylesheet';

const defaultSize = EStyleSheet.value('80rem');

const RenderIcons = ({item, toggleMainModal, addMainItem}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const createMainItem = () => {
    addMainItem(item);
    toggleMainModal();
  };

  return (
    <View style={styles.container}>
      <Icon
        name={item.icon}
        size={defaultSize}
        color={item.color}
        onPress={() => {
          setModalVisible(true);
        }}
      />

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={generalStyles.centeredView}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 2,
                borderColor: myWhite,
                borderRadius: 10,
                paddingVertical: EStyleSheet.value('10rem'),
                backgroundColor: myBlack + 'BF',
              }}>
              <TouchableHighlight
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.button, styles.buttonOpen]}
                onPress={() => createMainItem()}>
                <Text style={styles.textStyle}>Create {item.name}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: EStyleSheet.value('10rem'),
    // justifyContent: 'space-',
    width: '33%',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: '2%',
    borderRadius: EStyleSheet.value('20rem'),
    paddingHorizontal: EStyleSheet.value('5rem'),
    paddingVertical: EStyleSheet.value('10rem'),
  },
  buttonOpen: {
    backgroundColor: myPurple,
    width: '55%',
  },
  buttonClose: {
    backgroundColor: myBlue,
    width: '35%',
  },
  textStyle: {
    fontSize: EStyleSheet.value('20rem'),
    color: myWhite,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

RenderIcons.propTypes = {
  item: PropTypes.object.isRequired,
  toggleMainModal: PropTypes.func.isRequired,
  addMainItem: PropTypes.func.isRequired,
};

export default RenderIcons;
