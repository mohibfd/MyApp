import PropTypes from 'prop-types';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Animated,
  Pressable,
  Easing,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecipeItem = ({
  recipe,
  deleteItemFromStorage,
  navigation,
  refresh,
  ingredient,
  focus,
  inEditMode,
  setInEditMode,
}) => {
  const isCookingStep = useRef(false);

  const [instructionName, setInstructionName] = useState(
    ingredient ? ingredient.name : '',
  );

  const [instructionQuantity, setInstructionQuantity] = useState(
    ingredient ? ingredient.quantity : '',
  );

  if (ingredient) {
    if (ingredient.quantity === undefined) {
      isCookingStep.current = true;
    }
  }

  if (ingredient) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setInstructionQuantity(ingredient.quantity);
    }, [ingredient.quantity]);
  }

  const changeName = newName => {
    if (ingredient) {
      ingredient.name = newName;
    } else {
      recipe.name = newName;
    }
    setInstructionName(newName);
    refresh(recipe.name);
  };

  const changeQuantity = newQuantity => {
    ingredient.quantity = newQuantity;
    setInstructionQuantity(newQuantity);
    refresh(ingredient.quantity);
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

  const borderColor = isCookingStep.current ? 'green' : 'black';

  const width = isCookingStep.current ? '80%' : '50%';

  if (ingredient) {
    return (
      <View
        style={[
          styles.ListItem,
          {
            borderColor,
          },
        ]}>
        <View style={styles.ListItemView}>
          <TextInput
            style={[styles.listItemText, {width}]}
            value={instructionName}
            onChangeText={changeName}
            placeholder="add name"
            multiline={true}
            autoFocus={focus}
          />
          {!isCookingStep.current && (
            <TextInput
              style={styles.listItemText}
              value={instructionQuantity}
              onChangeText={changeQuantity}
              placeholder="amount"
              multiline={true}
              maxWidth={'30%'}
            />
          )}
          <View style={styles.iconContainer}>
            <Icon
              style={styles.redCross}
              name="remove"
              size={EStyleSheet.value('40rem')}
              color="firebrick"
              onPress={() => deleteItemFromStorage(ingredient)}
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
            style={styles.listItemText}
            value={recipe.name}
            onChangeText={changeName}
            placeholder="add name"
            multiline={true}
            autoFocus={focus}
            maxWidth={'65%'}
          />

          <View style={styles.iconContainer}>
            {inEditMode ? (
              <Icon
                style={[styles.redCross, styles.marginLeft]}
                name="bin"
                size={EStyleSheet.value('40rem')}
                color="firebrick"
                onPress={() => deleteItemFromStorage(recipe)}
              />
            ) : (
              <Icon
                style={styles.redCross}
                name="arrow-right"
                size={EStyleSheet.value('40rem')}
                color="gold"
                onPress={() => navigateTo()}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: '#333',
  },
  text: {
    color: '#FFF',
  },

  ListItem: {
    backgroundColor: '#CD7F32' + 99,
    paddingVertical: EStyleSheet.value('10rem'),
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
  marginLeft: {
    marginLeft: EStyleSheet.value('15rem'),
  },
});

RecipeItem.defaultProps = {
  navigation: null,
  ingredient: null,
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  deleteItemFromStorage: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  ingredient: PropTypes.object,
  focus: PropTypes.bool.isRequired,
  inEditMode: PropTypes.bool.isRequired,
  setInEditMode: PropTypes.func.isRequired,
};

export default RecipeItem;
