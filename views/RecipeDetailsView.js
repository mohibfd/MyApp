import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';

import RecipeItem from '../components/flatListRendering/RecipeItem';
import Header from '../components/Header';
import DeleteOrCancel from '../components/modals/DeleteOrCancel';
import {launchImageLibrary} from 'react-native-image-picker';
import EStyleSheet from 'react-native-extended-stylesheet';

const RecipeDetailsView = ({route}) => {
  const {recipe, refresh} = route.params;

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

  const renderItem = item => {
    return (
      <RecipeItem
        recipe={recipe}
        deleteItemFromStorage={openDeleteOrCancel}
        refresh={refresh}
        instruction={item.item}
      />
    );
  };

  const imageSource = () => {
    if (recipe.photo) {
      return {uri: recipe.photo};
    } else {
      return require('../components/assets/Recipes.jpeg');
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: myBlack}}>
      <Header
        title={recipe.name}
        instantAdd={addInstruction}
        cameraAdd={openImageLibrary}
      />
      <ImageBackground source={imageSource()} style={styles.image}>
        <View style={styles.textContainer}>
          <Text style={styles.text}> Ingredients</Text>
          <Text style={[styles.text, styles.text2]}> Quantity</Text>
          {/* adding transparent icon will ensure we have perfect alignment */}
        </View>

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
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    width: '50%',
    fontSize: EStyleSheet.value('22rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: myWhite,
  },
  text2: {
    width: '30%',
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
