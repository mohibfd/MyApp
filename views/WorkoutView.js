import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  Button,
  Image,
  Modal,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';

import generalStyles from '../stylesheets/generalStylesheet';
import Header from '../components/Header';
import WorkoutModal from '../components/modals/WorkoutModal';

const WorkoutView = () => {
  const [imagePickedStorage, setImagePickedStorage] =
    useStorage('imagePickedd');

  const [modalVisible, setModalVisible] = useState(false);

  const [recipesStorage, setRecipesStorage] = useStorage('workoutss');

  const [recipes, setRecipes] = useState(recipesStorage ? recipesStorage : []);

  const isMountedRef = useRef(null);

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  const [refresh, setRefresh] = useState('');

  const differentMuscles = [
    'Arms',
    'Shoulders',
    'Chest',
    'Back',
    'Abs',
    'Legs',
  ];

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

  const openImageLibrary = () => {
    let options = {};
    launchImageLibrary(options, response => {
      if (response.assets) {
        setImagePickedStorage(response.assets[0].uri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Workouts" instantAdd={createRecipe} />

      <Button
        onPress={() => setModalVisible(true)}
        title="QR Code"
        color={myGreen}
      />

      <ImageBackground
        source={require('../components/assets/Workout.jpeg')}
        style={styles.image}>
        <FlatList data={differentMuscles} renderItem={renderItem} />
      </ImageBackground>

      {isDeleteOrCancel && (
        <DeleteOrCancel
          name={deleteItem.name}
          deletion={completeDeletion}
          closeOverlay={toggleDeleteOrCancel}
        />
      )}
      {modalVisible && (
        <WorkoutModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          openImageLibrary={openImageLibrary}
          imagePickedStorage={imagePickedStorage}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  image: {width: '100%', height: '100%'},
});

export default WorkoutView;
