import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
} from 'react-native';
import uuid from 'react-native-uuid';
import RecipeItem from '../components/flatListRendering/RecipeItem';

import Header from '../components/Header';
import DeleteOrCancel from '../components/modals/DeleteOrCancel';
import {launchImageLibrary} from 'react-native-image-picker';

const WorkoutDetailsView = ({route}) => {
  const {muscle} = route.params;

  const [recipesStorage, setRecipesStorage] = useStorage('workoutss');

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
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: myBlack}}>
      <Header
        title={muscle}
        // instantAdd={addInstruction}
      />
      <ImageBackground
        source={require('../components/assets/Workout.jpeg')}
        style={styles.image}>
        {/* <FlatList
          data={recipe.instructions}
          renderItem={renderItem}
          extraData={refreshFlastList}
        /> */}
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
  image: {
    width: '100%',
    height: '100%',
  },
});
WorkoutDetailsView.propTypes = {
  route: PropTypes.object.isRequired,
};

export default WorkoutDetailsView;
