import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {SafeAreaView, FlatList, ImageBackground} from 'react-native';
import uuid from 'react-native-uuid';
import RecipeItem from '../components/RecipeItem';

import Header from '../components/Header';
import DeleteOrCancel from '../components/DeleteOrCancel';

const RecipeDetailsView = ({route}) => {
  const {recipe, refresh, recipes} = route.params;

  const {instructions} = recipe;

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  const [refreshFlastList, setRefreshFlatList] = useState('');

  const addInstruction = () => {
    recipe.instructions.push({name: '', key: uuid.v4()});

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
    recipe.instructions = instructions.filter(i => i.key != deleteItem.key);

    console.log(instructions.filter(i => i.key != deleteItem.key));

    refresh();
  };

  const renderItem = item => {
    return (
      <RecipeItem
        recipe={recipe}
        deleteItemFromStorage={openDeleteOrCancel}
        recipes={recipes}
        refresh={refresh}
        instruction={item.item}
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
