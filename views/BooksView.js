import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  StyleSheet,
  Pressable,
  Animated,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import uuid from 'react-native-uuid';

import BookItem from '../components/flatListRendering/BookItem';
import Header from '../components/Header';
import DeleteOrCancel from '../components/modals/DeleteOrCancel';
import ShakeAnimation from '../components/ShakeAnimation';

const BooksView = ({navigation}) => {
  const [booksStorage, setBooksStorage] = useStorage('books');

  const [books, setBooks] = useState(booksStorage ? booksStorage : []);

  const isMountedRef = useRef(null);

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  const [refresh, setRefresh] = useState('');

  const [focus, setFocus] = useState(false);

  const [inEditMode, setInEditMode] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef) {
      setBooksStorage(books);
    }
    return (isMountedRef.current = false);
  }, [books, refresh, setBooksStorage]);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef) {
      setBooks(books);
    }
    return (isMountedRef.current = false);
  }, [books, refresh]);

  const createBook = newBookName => {
    setBooks(prevItems => {
      return [
        ...prevItems,
        {
          name: newBookName,
          key: uuid.v4(),
          chapters: [],
          chapterDetails: [],
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

    setBooks(prevItems => {
      return prevItems.filter(item => item !== deleteItem);
    });
  };

  const renderItem = item => {
    return (
      <BookItem
        book={item.item}
        deleteItemFromStorage={openDeleteOrCancel}
        navigation={navigation}
        refresh={setRefresh}
        focus={focus}
        inEditMode={inEditMode}
        setInEditMode={setInEditMode}
      />
    );
  };

  const animationStyle = ShakeAnimation(inEditMode);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="My Books"
        instantAdd={createBook}
        penAdd={() => setInEditMode(true)}
      />
      <ImageBackground
        source={require('../components/assets/Book.jpeg')}
        style={styles.image}>
        <Pressable
          style={styles.pressable}
          onLongPress={() => {
            setInEditMode(true);
          }}>
          <Animated.View style={animationStyle}>
            <FlatList data={books} renderItem={renderItem} />
          </Animated.View>
        </Pressable>

        {inEditMode && (
          <Pressable
            style={styles.footerContainer}
            onPress={() => setInEditMode(false)}>
            <Text style={styles.text}>Exit edit mode</Text>
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
  pressable: {flex: 1},
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

export default BooksView;
