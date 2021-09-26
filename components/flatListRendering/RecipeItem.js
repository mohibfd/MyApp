import PropTypes from 'prop-types';
import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, TextInput, Pressable, Text} from 'react-native';
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
  addInstruction,
  addCookingStep,
  index,
  onlyShowIngredients,
}) => {
  const isCookingStep = useRef(false);

  const [instructionName, setInstructionName] = useState(
    ingredient ? ingredient.name : '',
  );

  const [instructionQuantity, setInstructionQuantity] = useState(
    ingredient ? ingredient.quantity : '',
  );

  const [crossIngredient, setCrossIngredient] = useState(false);

  if (ingredient) {
    if (ingredient.quantity === undefined) {
      isCookingStep.current = true;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setInstructionQuantity(ingredient.quantity);
    }, [ingredient.quantity]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setCrossIngredient(false);
    }, [onlyShowIngredients]);
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

  const bin = () => (
    <Icon
      style={styles.redCross}
      name="trash"
      size={EStyleSheet.value('40rem')}
      color="firebrick"
      onPress={() => deleteItemFromStorage(ingredient)}
    />
  );

  if (ingredient) {
    return (
      <Pressable onPress={() => setCrossIngredient(!crossIngredient)}>
        {crossIngredient && <View style={styles.crossedLine} />}
        {inEditMode && (
          <View style={styles.editModeContainer}>
            <Pressable
              style={styles.cookingStepContainer}
              onPress={() => addCookingStep(index)}>
              <Text style={styles.cookingStepText}>Add cooking step</Text>
            </Pressable>

            <Icon
              style={styles.plus}
              name="plus"
              size={EStyleSheet.value('40rem')}
              color="green"
              onPress={() => addInstruction(index)}
            />
          </View>
        )}

        <View
          style={[
            styles.ListItem,
            {
              borderColor,
            },
          ]}>
          <View
            style={styles.ListItemView}
            pointerEvents={onlyShowIngredients ? 'none' : 'auto'}>
            <View style={styles.ingredientsNameContainer}>
              <TextInput
                style={styles.listItemText}
                value={instructionName}
                onChangeText={changeName}
                placeholder="add name"
                multiline={true}
                autoFocus={focus}
              />
            </View>
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
            {inEditMode ? (
              <View style={styles.iconContainer}>{bin()}</View>
            ) : (
              <View style={{width: EStyleSheet.value('10rem')}} />
            )}
          </View>
        </View>
      </Pressable>
    );
  } else {
    return (
      <View style={[styles.ListItem, styles.verticalPadding]}>
        <View style={styles.ListItemView}>
          <TextInput
            style={styles.listItemText}
            value={recipe.name}
            onChangeText={changeName}
            placeholder="add name"
            multiline={true}
            autoFocus={focus}
          />

          <View style={styles.iconContainer}>
            {inEditMode ? (
              <Icon
                style={[styles.redCross, styles.marginLeft]}
                name="trash"
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
  editModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cookingStepContainer: {
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'white',
    paddingRight: EStyleSheet.value('5rem'),
    paddingLeft: EStyleSheet.value('5rem'),
    height: EStyleSheet.value('40rem'),
    justifyContent: 'center',
    backgroundColor: '#FFFFFF' + 99,
  },
  cookingStepText: {
    fontSize: EStyleSheet.value('20rem'),
    color: 'green',
  },
  plus: {
    borderColor: 'white',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    paddingRight: EStyleSheet.value('5rem'),
    paddingLeft: EStyleSheet.value('5rem'),
    backgroundColor: '#FFFFFF' + 99,
  },
  text: {
    color: '#FFF',
  },
  ListItem: {
    backgroundColor: '#CD7F32' + 99,
    borderWidth: EStyleSheet.value('2rem'),
  },
  ListItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  listItemText: {
    flex: 1,
    fontSize: EStyleSheet.value('20rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: myWhite,
  },
  ingredientsNameContainer: {flexDirection: 'row', flex: 3},
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  redCross: {
    alignSelf: 'flex-end',
    paddingHorizontal: EStyleSheet.value('5rem'),
  },
  marginLeft: {
    marginLeft: EStyleSheet.value('15rem'),
  },
  verticalPadding: {
    paddingVertical: EStyleSheet.value('10rem'),
  },
  crossedLine: {
    zIndex: 1,
    height: '50%',
    width: '100%',
    borderBottomWidth: 4,
    position: 'absolute',
    borderColor: 'red',
  },
});

RecipeItem.defaultProps = {
  navigation: null,
  ingredient: null,
  addInstruction: null,
  addCookingStep: null,
  index: 0,
  onlyShowIngredients: false,
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  deleteItemFromStorage: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  ingredient: PropTypes.object,
  focus: PropTypes.bool.isRequired,
  inEditMode: PropTypes.bool.isRequired,
  addInstruction: PropTypes.func,
  addCookingStep: PropTypes.func,
  index: PropTypes.number,
  onlyShowIngredients: PropTypes.bool,
};

export default RecipeItem;
