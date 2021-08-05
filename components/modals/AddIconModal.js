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
    <Modal visible={true} animationType="slide">
      <SafeAreaView style={styles.container}>
        <Pressable style={{flex: 1}}>
          <Icon
            style={generalStyles.modalClose}
            name="remove"
            size={EStyleSheet.value(50)}
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
  container: {flex: 1, backgroundColor: myBlack},
});

AddIconModal.propTypes = {
  menuItems: PropTypes.array.isRequired,
  addMainItem: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

export default AddIconModal;
