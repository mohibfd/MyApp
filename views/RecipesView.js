import React, {useEffect, useState, useRef, useMemo} from 'react';
import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import uuid from 'react-native-uuid';

import RecipeItem from '../components/flatListRendering/RecipeItem';
import Header from '../components/Header';
import DeleteOrCancel from '../components/modals/DeleteOrCancel';

const RecipesView = ({navigation}) => {
  const [recipesStorage, setRecipesStorage] = useStorage('recipes');

  const [recipes, setRecipes] = useState(recipesStorage ? recipesStorage : []);

  const isMountedRef = useRef(null);

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  const [refresh, setRefresh] = useState('');

  const [focus, setFocus] = useState(false);

  const [inEditMode, setInEditMode] = useState(false);

  const animation = useMemo(() => new Animated.Value(0), []);

  const interval = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef) {
      setRecipesStorage(recipes);
    }
    return (isMountedRef.current = false);
  }, [recipes, refresh, setRecipesStorage]);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef) {
      setRecipes(recipes);
    }
    return (isMountedRef.current = false);
  }, [recipes, refresh]);

  useEffect(() => {
    const triggerAnimation = () => {
      animation.setValue(0);
      Animated.timing(animation, {
        duration: 400,
        toValue: 3,
        useNativeDriver: true, // <-- Add this
        ease: Easing.bounce,
      }).start();
    };

    if (inEditMode) {
      interval.current = setInterval(() => {
        triggerAnimation();
      }, 2000);
    } else {
      clearInterval(interval.current);
    }
  }, [animation, inEditMode]);

  const createRecipe = newRecipeName => {
    setRecipes(prevItems => {
      return [
        ...prevItems,
        {
          name: newRecipeName,
          key: uuid.v4(),
          ingredients: [],
          cookingSteps: [],
          photo: null,
          multiplier: 1,
        },
      ];
    });
    setFocus(true);
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
      return prevItems.filter(item => item !== deleteItem);
    });
  };

  const renderItem = item => {
    return (
      <RecipeItem
        recipe={item.item}
        deleteItemFromStorage={openDeleteOrCancel}
        navigation={navigation}
        refresh={setRefresh}
        focus={focus}
        inEditMode={inEditMode}
        setInEditMode={setInEditMode}
      />
    );
  };

  const interpolated = animation.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -15, 0, 15, 0, -15, 0],
  });
  const style = {
    transform: [{translateX: interpolated}],
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Recipes" instantAdd={createRecipe} />
      <ImageBackground
        source={require('../components/assets/Recipes.jpeg')}
        style={styles.image}>
        <Pressable
          style={{flex: 1}}
          onLongPress={() => {
            setInEditMode(true);
          }}>
          <Animated.View style={[style, styles.ListItem]}>
            <FlatList data={recipes} renderItem={renderItem} />
          </Animated.View>
        </Pressable>

        {inEditMode && (
          <Pressable
            style={styles.footerContainer}
            onPress={() => setInEditMode(false)}>
            <Text style={styles.text}>Exit Edit Mode</Text>
          </Pressable>
        )}
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
  image: {width: '100%', height: '100%', flex: 1},
  footerContainer: {
    backgroundColor: '#CD7F32' + 'CC',
    height: EStyleSheet.value('50rem'),
    borderColor: myRed,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: myBlack,
    fontSize: EStyleSheet.value('20rem'),
    fontWeight: 'bold',
  },
});

export default RecipesView;
