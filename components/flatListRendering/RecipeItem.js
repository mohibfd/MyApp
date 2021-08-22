import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {View, Pressable, StyleSheet, TextInput} from 'react-native';
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

  //return our items alongside a delete icon that calls on deleteList function taking the element's id
  return (
    <View style={styles.ListItem}>
      <View style={styles.ListItemView}>
        <TextInput
          style={[
            styles.listItemText,
            {
              width: navigation ? '65%' : '50%',
            },
          ]}
          value={instruction ? instructionName : recipe.name}
          onChangeText={changeName}
          placeholder="add name"
          multiline={true}
        />
        {instruction && (
          <TextInput
            style={[
              styles.listItemText,
              {
                width: '30%',
              },
            ]}
            value={instructionQuantity}
            onChangeText={changeQuantity}
            placeholder="amount"
            multiline={true}
          />
        )}
        <View style={styles.iconContainer}>
          {navigation && (
            <Icon
              style={styles.redCross}
              name="arrow-right"
              size={EStyleSheet.value('40rem')}
              color="gold"
              onPress={() => navigateTo()}
            />
          )}
          <Icon
            style={[
              styles.redCross,
              {
                marginLeft: navigation ? EStyleSheet.value('15rem') : 0,
              },
            ]}
            name="remove"
            size={EStyleSheet.value('40rem')}
            color="firebrick"
            onPress={() =>
              deleteItemFromStorage(instruction ? instruction : recipe)
            }
          />
        </View>
      </View>
    </View>
  );
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  redCross: {
    alignSelf: 'flex-end',
    paddingHorizontal: EStyleSheet.value('5rem'),
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
