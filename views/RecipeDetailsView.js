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
} from 'react-native';
import uuid from 'react-native-uuid';

import RecipeItem from '../components/flatListRendering/RecipeItem';
import Header from '../components/Header';
import DeleteOrCancel from '../components/modals/DeleteOrCancel';
import {launchImageLibrary} from 'react-native-image-picker';
import EStyleSheet from 'react-native-extended-stylesheet';

const RecipeDetailsView = ({route}) => {
  const {recipe, refresh} = route.params;

  const {ingredients, cookingSteps} = recipe;

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  const [refreshFlastList, setRefreshFlatList] = useState('');

  const [multiplier, setMultiplier] = useState(`${recipe.multiplier}`);

  const order = ingredients.length;

  // console.log()

  // const [instructionsList, setInstructionsList] = useState([
  //   ...ingredients,
  //   ...cookingSteps,
  // ]);

  // useEffect(() => {
  //   console.log('?');
  //   setInstructionsList([...recipe.ingredients, ...recipe.cookingSteps]);
  // }, [recipe.ingredients, recipe.cookingSteps]);

  // // console.log(instructionsList);

  // // console.log(recipe.cookingSteps);

  // // useEffect(() => {
  // //   recipe.ingredients.sort((a, b) => (a.order > b.order ? 1 : -1));
  // // }, recipe.ingredients)

  const addInstruction = () => {
    recipe.ingredients.push({name: '', quantity: '', key: uuid.v4(), order});

    refresh();
    setRefreshFlatList(uuid.v4());
  };

  const addCookingStep = () => {
    recipe.cookingSteps.push({name: '', key: uuid.v4(), order});

    refresh();
    setRefreshFlatList(uuid.v4());
  };

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
  };

  const openDeleteOrCancel = mainItem => {
    toggleDeleteOrCancel();
    setDeleteItem(mainItem);
  };

  const completeDeletion = () => {
    toggleDeleteOrCancel();
    recipe.ingredients = ingredients.filter(i => i.key != deleteItem.key);

    recipe.cookingSteps = cookingSteps.filter(i => i.key != deleteItem.key);

    refresh();
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
    const numberInputed = new Number(value) * 1;

    if (numberInputed == 0) {
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
          if (!isNaN(new Number(character)) && character != ' ') {
            numberArr.push(character);
          } else if (character == '.') {
            divideByTen = 10;
          } else {
            stringArr.push(character);
          }
        });

        const numberToBeChanged =
          (new Number(numberArr.join('')) * 1) / divideByTen;

        // console.log('number to change', numberToBeChanged);
        // console.log('number inputed', numberInputed);
        // console.log('number multiplier', recipe.multiplier);

        const newNumber = (
          (numberToBeChanged * numberInputed) /
          recipe.multiplier
        ).toFixed(1);

        const remainingString = stringArr.join('');

        recipe.ingredients.forEach(i => {
          if (i.key == originalQuantity.key) {
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

  const renderItem = item => {
    return (
      <RecipeItem
        recipe={recipe}
        deleteItemFromStorage={openDeleteOrCancel}
        refresh={refresh}
        ingredient={item.item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={recipe.name}
        instantAdd={addInstruction}
        cameraAdd={openImageLibrary}
      />
      <ImageBackground source={imageSource()} style={styles.image}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.text1]}>ingredients</Text>
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

        <FlatList
          data={[...recipe.ingredients, ...recipe.cookingSteps].sort((a, b) =>
            a.order > b.order ? 1 : -1,
          )}
          renderItem={renderItem}
          extraData={refreshFlastList}
        />
        <Pressable style={styles.footerContainer} onPress={addCookingStep}>
          <Text style={styles.text4}>Add cooking step</Text>
        </Pressable>
      </ImageBackground>

      {isDeleteOrCancel && (
        <DeleteOrCancel
          name={deleteItem.name}
          deletion={completeDeletion}
          closeOverlay={toggleDeleteOrCancel}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
  },
  text: {
    fontSize: EStyleSheet.value('22rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: myWhite,
  },
  text1: {
    width: '50%',
  },
  text2: {
    width: '30%',
  },
  text3: {
    marginLeft: 0,
  },
  text4: {
    color: myBlack,
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
