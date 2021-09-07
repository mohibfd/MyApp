import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Animated,
} from 'react-native';
import uuid from 'react-native-uuid';
import EStyleSheet from 'react-native-extended-stylesheet';

import RecipeItem from '../components/flatListRendering/RecipeItem';
import Header from '../components/Header';
// import DeleteOrCancel from '../components/modals/DeleteOrCancel';
import {launchImageLibrary} from 'react-native-image-picker';
import ShakeAnimation from '../components/ShakeAnimation';

const RecipeDetailsView = ({route}) => {
  const {recipe, refresh} = route.params;

  const {ingredients, cookingSteps} = recipe;

  // const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  // const [deleteItem, setDeleteItem] = useState(null);

  const [refreshFlastList, setRefreshFlatList] = useState('');

  const [multiplier, setMultiplier] = useState(`${recipe.multiplier}`);

  const order = [...recipe.ingredients, ...recipe.cookingSteps].length;

  const [focus, setFocus] = useState(false);

  const [inEditMode, setInEditMode] = useState(false);

  const [orderedList, setOrderedList] = useState(
    [...recipe.ingredients, ...recipe.cookingSteps].sort((a, b) =>
      a.order > b.order ? 1 : -1,
    ),
  );

  const [onlyShowIngredients, setOnlyShowIngredients] = useState(false);

  useEffect(() => {
    setOrderedList(
      [...recipe.ingredients, ...recipe.cookingSteps].sort((a, b) =>
        a.order > b.order ? 1 : -1,
      ),
    );
  }, [recipe.cookingSteps, recipe.ingredients, refreshFlastList]);

  const addInstruction = () => {
    recipe.ingredients.push({name: '', quantity: '', key: uuid.v4(), order});

    refresh();
    setRefreshFlatList(uuid.v4());

    setFocus(true);
  };

  const addCookingStep = () => {
    recipe.cookingSteps.push({name: '', key: uuid.v4(), order});

    refresh();
    setRefreshFlatList(uuid.v4());
  };

  // const toggleDeleteOrCancel = () => {
  //   setIsDeleteOrCancel(!isDeleteOrCancel);
  // };

  // const openDeleteOrCancel = mainItem => {
  //   toggleDeleteOrCancel();
  //   setDeleteItem(mainItem);
  // };

  // const sortList = () => {
  //   let sortedList = [...recipe.ingredients, ...recipe.cookingSteps].sort(
  //     (a, b) => (a.order > b.order ? 1 : -1),
  //   );

  //   let whereToChangeOrder = 0;
  //   for (let i = 0; i < sortedList.length; i++) {
  //     if (sortedList[i].key === deleteItem.key) {
  //       whereToChangeOrder = i;
  //     }
  //   }

  //   recipe.ingredients.forEach(ingredient => {
  //     if (ingredient.order >= whereToChangeOrder) {
  //       ingredient.order -= 1;
  //     }
  //   });

  //   recipe.cookingSteps.forEach(i => {
  //     if (i.order >= whereToChangeOrder) {
  //       i.order -= 1;
  //     }
  //   });
  // };

  // const completeDeletion = () => {
  //   toggleDeleteOrCancel();

  //   sortList();

  //   recipe.ingredients = ingredients.filter(i => i.key !== deleteItem.key);

  //   recipe.cookingSteps = cookingSteps.filter(i => i.key !== deleteItem.key);

  //   refresh();
  // };

  const instantDelete = ingredient => {
    recipe.ingredients = ingredients.filter(i => i.key !== ingredient.key);

    recipe.cookingSteps = cookingSteps.filter(i => i.key !== ingredient.key);

    refresh();
    setRefreshFlatList(uuid.v4());
  };

  const openImageLibrary = () => {
    let options = {};
    launchImageLibrary(options, response => {
      if (response.assets) {
        recipe.photo = response.assets[0].uri;
        refresh();
        setRefreshFlatList(uuid.v4());
      }
    });
  };

  const imageSource = () => {
    if (recipe.photo) {
      return {uri: recipe.photo};
    } else {
      return require('../components/assets/Recipes.jpeg');
    }
  };

  const multiplierFunc = value => {
    const numberInputed = Number(value);

    if (numberInputed === 0) {
      setMultiplier(value);
    }
    //only enter and allow changes if the user inputs a valid number
    else if (!isNaN(numberInputed)) {
      let quantities = ingredients
        .map(ingredient => {
          return {quantity: ingredient.quantity, key: ingredient.key};
        })
        .filter(ingredient => ingredient.quantity !== undefined);

      quantities.forEach(originalQuantity => {
        let quantity = originalQuantity.quantity.split('');
        let numberArr = [];
        let stringArr = [];
        let divideByTen = 1;
        quantity.forEach(character => {
          //search for number values
          if (!isNaN(Number(character)) && character !== ' ') {
            numberArr.push(character);
          } else if (character === '.') {
            divideByTen = 10;
          } else {
            stringArr.push(character);
          }
        });

        const numberToBeChanged = Number(numberArr.join('')) / divideByTen;

        const newNumber = (
          (numberToBeChanged * numberInputed) /
          recipe.multiplier
        ).toFixed(1);

        const remainingString = stringArr.join('');

        recipe.ingredients.forEach(i => {
          if (i.key === originalQuantity.key) {
            i.quantity = newNumber + remainingString;
          }
        });
      });
      recipe.multiplier = numberInputed;
      setMultiplier(value);
      refresh();
      setRefreshFlatList(uuid.v4());
    }
  };

  const addOrderedInstruction = itemOrder => {
    incrementOrder(itemOrder);

    recipe.ingredients.push({
      name: '',
      quantity: '',
      key: uuid.v4(),
      order: itemOrder,
    });

    refresh();
    setRefreshFlatList(uuid.v4());

    setFocus(true);
  };

  const addOrderedCookingStep = itemOrder => {
    incrementOrder(itemOrder);
    recipe.cookingSteps.push({
      name: '',
      key: uuid.v4(),
      order: itemOrder,
    });

    refresh();
    setRefreshFlatList(uuid.v4());
  };

  const incrementOrder = itemOrder => {
    recipe.cookingSteps.forEach(i => {
      if (i.order >= itemOrder) {
        i.order += 1;
      }
    });
    recipe.ingredients.forEach(i => {
      if (i.order >= itemOrder) {
        i.order += 1;
      }
    });
  };
  const showIngredientsOnly = () => {
    setOrderedList(recipe.ingredients);
    setOnlyShowIngredients(true);
  };

  const showAll = () => {
    setOnlyShowIngredients(false);
    setOrderedList(
      [...recipe.ingredients, ...recipe.cookingSteps].sort((a, b) =>
        a.order > b.order ? 1 : -1,
      ),
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <RecipeItem
        recipe={recipe}
        deleteItemFromStorage={instantDelete}
        refresh={refresh}
        ingredient={item}
        focus={focus}
        inEditMode={inEditMode}
        setInEditMode={setInEditMode}
        addInstruction={addOrderedInstruction}
        addCookingStep={addOrderedCookingStep}
        index={index}
      />
    );
  };

  const animationStyle = ShakeAnimation(inEditMode);

  const color = inEditMode ? myBlack : 'green';

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={recipe.name}
        instantAdd={addInstruction}
        cameraAdd={openImageLibrary}
      />
      <View style={styles.textContainer}>
        <Pressable
          style={styles.ingredientsContainer}
          onLongPress={() => {
            onlyShowIngredients ? showAll() : showIngredientsOnly();
          }}>
          <Text style={[styles.text, styles.text1]}>
            {onlyShowIngredients ? 'show all' : 'ingredients'}
          </Text>
        </Pressable>
        <Text style={[styles.text, styles.text2]}>Quantity</Text>
        <Text style={[styles.text]}>X</Text>
        <TextInput
          style={[styles.text, styles.text3]}
          value={multiplier}
          onChangeText={multiplierFunc}
          maxLength={1}
          keyboardType="numeric"
        />
      </View>
      <ImageBackground source={imageSource()} style={styles.image}>
        <Pressable
          style={styles.pressable}
          onLongPress={() => {
            setInEditMode(true);
          }}>
          <Animated.View style={animationStyle}>
            <FlatList
              data={orderedList}
              renderItem={renderItem}
              extraData={refreshFlastList}
            />
          </Animated.View>
        </Pressable>

        <Pressable
          style={styles.footerContainer}
          onPress={inEditMode ? () => setInEditMode(false) : addCookingStep}>
          <Text style={[styles.text4, {color}]}>
            {inEditMode ? 'Exit edit mode' : 'Add cooking step'}
          </Text>
        </Pressable>
      </ImageBackground>

      {/* {isDeleteOrCancel && (
        <DeleteOrCancel
          name={deleteItem.name}
          deletion={completeDeletion}
          closeOverlay={toggleDeleteOrCancel}
        />
      )} */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  pressable: {flex: 1},
  container: {flex: 1, backgroundColor: myBlack},
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: myBlue,
  },
  ingredientsContainer: {
    width: '50%',
    // backgroundColor: 'gold',
  },
  text: {
    // flex: 1,
    fontSize: EStyleSheet.value('22rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: myWhite,
  },
  // text1: {
  //   width: '50%',
  // },
  text2: {
    width: '30%',
  },
  text3: {
    marginLeft: 0,
  },
  text4: {
    fontSize: EStyleSheet.value('20rem'),
    fontWeight: 'bold',
  },
  footerContainer: {
    backgroundColor: '#CD7F32' + 'CC',
    height: EStyleSheet.value('50rem'),
    borderColor: myRed,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  transparentIcon: {
    alignSelf: 'flex-end',
    paddingHorizontal: EStyleSheet.value('5rem'),
  },
});

RecipeDetailsView.propTypes = {
  route: PropTypes.object.isRequired,
};

export default RecipeDetailsView;
