import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';

import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import uuid from 'react-native-uuid';
import RecipeItem from '../components/RecipeItem';

import Header from '../components/Header';
import DeleteOrCancel from '../components/DeleteOrCancel';
import RecipesView from './RecipesView';

const RecipeDetailsView = ({route}) => {
  const {recipe, refresh} = route.params;

  const {instructions} = recipe;

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  const [refreshFlastList, setRefreshFlatList] = useState('');

  const addInstruction = () => {
    recipe.instructions.push({name: 'test', key: uuid.v4()});

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

    // recipe.instructions.filter(item => item != deleteItem);

    recipe.instructions = instructions.filter(j => j.key != deleteItem.key);

    refresh();
  };

  // console.log(RecipeDetails[1].name);

  const renderItem = item => {
    return (
      <RecipeItem
        recipe={item.item}
        deleteItemFromStorage={openDeleteOrCancel}
      />
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: myBlack}}>
      <Header title={recipe.name} instantAdd={addInstruction} />
      <ImageBackground
        source={require('../components/assets/Recipes.jpeg')}
        style={{width: '100%', height: '100%'}}>
        <FlatList
          data={recipe.instructions}
          renderItem={renderItem}
          extraData={refreshFlastList}
        />
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

RecipeDetailsView.propTypes = {
  route: PropTypes.object.isRequired,
};

export default RecipeDetailsView;
