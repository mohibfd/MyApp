import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecipeItem = ({
  recipe,
  deleteItemFromStorage,
  navigation,
  refresh,
  instruction,
}) => {
  const [instructionName, setInstructionName] = useState(
    instruction ? instruction.name : '',
  );

  const [instructionQuantity, setInstructionQuantity] = useState(
    instruction ? instruction.quantity : '',
  );

  if (instruction) {
    useEffect(() => {
      setInstructionQuantity(instruction.quantity);
    }, [instruction.quantity]);
  }

  const changeName = newName => {
    if (instruction) {
      instruction.name = newName;
      setInstructionName(newName);
    } else {
      recipe.name = newName;
    }
    refresh();
  };

  const changeQuantity = newQuantity => {
    instruction.quantity = newQuantity;
    setInstructionQuantity(newQuantity);

    refresh();
  };

  //tells you which page to go to
  const navigateTo = () => {
    if (navigation) {
      navigation.navigate('Recipe Details View', {
        recipe,
        refresh,
      });
    }
  };

  if (instruction) {
    return (
      <View style={styles.ListItem}>
        <View style={styles.ListItemView}>
          <TextInput
            style={[styles.listItemText, styles.widthOne]}
            value={instructionName}
            onChangeText={changeName}
            placeholder="add name"
            multiline={true}
          />
          <TextInput
            style={[styles.listItemText, styles.widthTwo]}
            value={instructionQuantity}
            onChangeText={changeQuantity}
            placeholder="amount"
            multiline={true}
          />
          <View style={styles.iconContainer}>
            <Icon
              style={styles.redCross}
              name="remove"
              size={EStyleSheet.value('40rem')}
              color="firebrick"
              onPress={() => deleteItemFromStorage(instruction)}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.ListItem}>
        <View style={styles.ListItemView}>
          <TextInput
            style={[styles.listItemText, styles.widthThree]}
            value={recipe.name}
            onChangeText={changeName}
            placeholder="add name"
            multiline={true}
          />

          <View style={styles.iconContainer}>
            <Icon
              style={styles.redCross}
              name="arrow-right"
              size={EStyleSheet.value('40rem')}
              color="gold"
              onPress={() => navigateTo()}
            />
            <Icon
              style={[styles.redCross, styles.marginLeft]}
              name="remove"
              size={EStyleSheet.value('40rem')}
              color="firebrick"
              onPress={() => deleteItemFromStorage(recipe)}
            />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  ListItem: {
    backgroundColor: '#CD7F32' + 99,
    paddingVertical: EStyleSheet.value('20rem'),
    borderWidth: EStyleSheet.value('2rem'),
  },
  ListItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  listItemText: {
    fontSize: EStyleSheet.value('22rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: myWhite,
  },
  widthOne: {
    width: '50%',
  },
  widthTwo: {
    width: '30%',
  },
  widthThree: {
    width: '65%',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  redCross: {
    alignSelf: 'flex-end',
    paddingHorizontal: EStyleSheet.value('5rem'),
  },
  marginLeft: {
    marginLeft: EStyleSheet.value('15rem'),
  },
});

RecipeItem.defaultProps = {
  navigation: null,
  instruction: null,
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  deleteItemFromStorage: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  instruction: PropTypes.object,
};

export default RecipeItem;
