import React, {useEffect, useState, useRef} from 'react';
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

const RecipesView = () => {
  const [recipesStorage, setRecipesStorage] = useStorage('recipes');

  const [recipes, setRecipes] = useState(recipesStorage ? recipesStorage : []);

  const isMountedRef = useRef(null);

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef) {
      setRecipesStorage(recipes);
    }
    return (isMountedRef.current = false);
  }, [recipes]);

  const createRecipe = newRecipeName => {
    setRecipes(prevItems => {
      return [
        ...prevItems,
        {
          name: newRecipeName,
          key: uuid.v4(),
        },
      ];
    });
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

    MMKV.removeItem(deleteItem.name + 'Id');

    setRecipes(prevItems => {
      return prevItems.filter(item => item != deleteItem);
    });
  };

  // console.log(recipes[1].name);

  const renderItem = item => {
    return (
      <RecipeItem item={item.item} deleteItemFromStorage={openDeleteOrCancel} />
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: myBlack}}>
      <Header title="My Recipes" add={createRecipe} />
      <ImageBackground
        source={require('../components/assets/Plants.jpeg')}
        style={{width: '100%', height: '100%'}}>
        <FlatList data={recipes} renderItem={renderItem} />
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

export default RecipesView;
