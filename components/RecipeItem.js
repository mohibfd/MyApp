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
  const [investmentName, setInvestmentName] = useState(
    instruction ? instruction.name : '',
  );

  const changeName = newName => {
    if (instruction) {
      instruction.name = newName;
      setInvestmentName(newName);
    } else {
      recipe.name = newName;
    }
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
    <Pressable style={styles.ListItem} onPress={() => navigateTo()}>
      <View style={styles.ListItemView}>
        <TextInput
          style={styles.listItemText}
          value={instruction ? investmentName : recipe.name}
          onChangeText={changeName}
          placeholder="add name"
          keyboardType="numeric"
        />
        <View style={styles.iconContainer}>
          <Icon
            style={styles.redCross}
            name="remove"
            size={EStyleSheet.value('40rem')}
            color="firebrick"
            onPress={() =>
              deleteItemFromStorage(instruction ? instruction : recipe)
            }
          />
        </View>
      </View>
    </Pressable>
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
  },
  iconContainer: {
    flex: 1,
  },
  listItemText: {
    fontSize: EStyleSheet.value('25rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: myWhite,
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
