import PropTypes from 'prop-types';
import React from 'react';
import {Text, Pressable, StyleSheet, Alert, Animated} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShakeAnimation from '../ShakeAnimation';

const ListItem = ({
  item,
  deleteItemFromStorage,
  navigation,
  inEditMode,
  setInEditMode,
}) => {
  //Which page to go to
  const navigateTo = () => {
    if (navigation) {
      switch (item.name) {
        case 'Invest':
          navigation.navigate('Invest View');
          break;
        case 'Workout':
          navigation.navigate('Workout View');
          break;
        case 'Meditate':
          navigation.navigate('Meditate View');
          break;
        case 'Books':
          navigation.navigate('Books View');
          break;
        case 'Recipes':
          navigation.navigate('Recipes View');
          break;
        case 'Productivity':
          navigation.navigate('Productivity View');
          break;
        case 'Reminders':
          navigation.navigate('Reminders View');
          break;
        case 'Wakeboarding':
          navigation.navigate('Wakeboarding View');
          break;
        default:
          Alert.alert('NOT FOUND');
      }
    }
  };

  const animationStyle = ShakeAnimation(inEditMode);

  return (
    <Pressable
      style={styles.ListItem}
      onPress={() => navigateTo()}
      onLongPress={() => {
        setInEditMode(true);
      }}>
      <Animated.View style={[styles.ListItemView, animationStyle]}>
        <Text style={styles.listItemText}>{item.name}</Text>
        {inEditMode && (
          <Icon
            style={styles.redCross}
            name="trash"
            size={EStyleSheet.value('35rem')}
            color="firebrick"
            onPress={() => deleteItemFromStorage(item)}
          />
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ListItem: {
    flex: 1,
    width: '50%',
    backgroundColor: myBlue + 50,
    paddingVertical: EStyleSheet.value('30rem'),
    borderWidth: EStyleSheet.value('2rem'),
  },
  ListItemView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    flex: 4,
    fontSize: EStyleSheet.value('25rem'),
    textAlign: 'center',
    color: myWhite,
  },
  redCross: {
    flex: 1,
    paddingHorizontal: EStyleSheet.value('5rem'),
  },
});

ListItem.defaultProps = {
  navigation: null,
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  deleteItemFromStorage: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  inEditMode: PropTypes.bool.isRequired,
  setInEditMode: PropTypes.func.isRequired,
};

export default ListItem;
