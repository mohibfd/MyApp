import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  Pressable,
  Animated,
} from 'react-native';
import uuid from 'react-native-uuid';
import EStyleSheet from 'react-native-extended-stylesheet';

import BookItem from '../components/flatListRendering/BookItem';
import Header from '../components/Header';
import DeleteOrCancel from '../components/modals/DeleteOrCancel';
import ShakeAnimation from '../components/ShakeAnimation';

const BookDetailsView = ({route}) => {
  const {book, refresh} = route.params;

  const {chapters, chapterDetails} = book;

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  const [refreshFlastList, setRefreshFlatList] = useState('');

  const order = [...book.chapters, ...book.chapterDetails].length;

  const [focus, setFocus] = useState(false);

  const [inEditMode, setInEditMode] = useState(false);

  const addInstruction = () => {
    book.chapters.push({name: '', details: '', key: uuid.v4(), order});

    refresh();
    setRefreshFlatList(uuid.v4());

    setFocus(true);
  };

  const addChapterDetails = () => {
    book.chapterDetails.push({name: '', key: uuid.v4(), order});

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

  const sortList = () => {
    let sortedList = [...book.chapters, ...book.chapterDetails].sort((a, b) =>
      a.order > b.order ? 1 : -1,
    );

    let whereToChangeOrder = 0;
    for (let i = 0; i < sortedList.length; i++) {
      if (sortedList[i].key === deleteItem.key) {
        whereToChangeOrder = i;
      }
    }

    book.chapters.forEach(chapter => {
      if (chapter.order >= whereToChangeOrder) {
        chapter.order -= 1;
      }
    });

    book.chapterDetails.forEach(i => {
      if (i.order >= whereToChangeOrder) {
        i.order -= 1;
      }
    });
  };

  const completeDeletion = () => {
    toggleDeleteOrCancel();

    sortList();

    book.chapters = chapters.filter(i => i.key !== deleteItem.key);

    book.chapterDetails = chapterDetails.filter(i => i.key !== deleteItem.key);

    refresh();
  };

  const renderItem = item => {
    return (
      <BookItem
        book={book}
        deleteItemFromStorage={openDeleteOrCancel}
        refresh={refresh}
        chapter={item.item}
        focus={focus}
        inEditMode={inEditMode}
        setInEditMode={setInEditMode}
      />
    );
  };

  const animationStyle = ShakeAnimation(inEditMode);

  const color = inEditMode ? myBlack : 'green';

  return (
    <SafeAreaView style={styles.container}>
      <Header title={book.name} instantAdd={addInstruction} />

      <ImageBackground
        source={require('../components/assets/Book.jpeg')}
        style={styles.image}>
        <Pressable
          style={styles.pressable}
          onLongPress={() => {
            setInEditMode(true);
          }}>
          <Animated.View style={animationStyle}>
            <FlatList
              data={[...book.chapters, ...book.chapterDetails].sort((a, b) =>
                a.order > b.order ? 1 : -1,
              )}
              renderItem={renderItem}
              extraData={refreshFlastList}
            />
          </Animated.View>
        </Pressable>

        <Pressable
          style={styles.footerContainer}
          onPress={inEditMode ? () => setInEditMode(false) : addChapterDetails}>
          <Text style={[styles.text4, {color}]}>
            {inEditMode ? 'Exit edit mode' : 'Add chapter details'}
          </Text>
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
  pressable: {flex: 1},
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
    backgroundColor: myBlue,
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
    fontSize: EStyleSheet.value('20rem'),
    fontWeight: 'bold',
  },
  footerContainer: {
    backgroundColor: '#ffffff' + 'CC',
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

BookDetailsView.propTypes = {
  route: PropTypes.object.isRequired,
};

export default BookDetailsView;
