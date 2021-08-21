import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, FlatList, ImageBackground} from 'react-native';
import uuid from 'react-native-uuid';
import RecipeItem from '../components/RecipeItem';

import Header from '../components/Header';
import DeleteOrCancel from '../components/modals/DeleteOrCancel';

const RecipesView = ({navigation}) => {
  const [recipesStorage, setRecipesStorage] = useStorage('recipes');

  const [recipes, setRecipes] = useState(recipesStorage ? recipesStorage : []);

  const isMountedRef = useRef(null);

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  const [refresh, setRefresh] = useState('');

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef) {
      setRecipesStorage(recipes);
    }
    return (isMountedRef.current = false);
  }, [recipes, refresh]);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef) {
      setRecipes(recipes);
    }
    return (isMountedRef.current = false);
  }, [refresh]);

  const toggleRefresh = () => {
    setRefresh(uuid.v4());
  };

  const createRecipe = newRecipeName => {
    setRecipes(prevItems => {
      return [
        ...prevItems,
        {
          name: newRecipeName,
          key: uuid.v4(),
          instructions: [],
          photo: null,
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

  const renderItem = item => {
    return (
      <RecipeItem
        recipe={item.item}
        deleteItemFromStorage={openDeleteOrCancel}
        navigation={navigation}
        refresh={toggleRefresh}
      />
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: myBlack}}>
      <Header title="My Recipes" instantAdd={createRecipe} />
      <ImageBackground
        source={require('../components/assets/Recipes.jpeg')}
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
