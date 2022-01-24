import PropTypes from 'prop-types';
import React, {useState, useRef} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

const BookItem = ({
  book,
  deleteItemFromStorage,
  navigation,
  refresh,
  chapter,
  focus,
  inEditMode,
}) => {
  const isChapterDetails = useRef(false);

  const [instructionName, setInstructionName] = useState(
    chapter ? chapter.name : '',
  );

  if (chapter) {
    if (chapter.details === undefined) {
      isChapterDetails.current = true;
    }
  }

  const changeName = newName => {
    if (chapter) {
      chapter.name = newName;
    } else {
      book.name = newName;
    }
    setInstructionName(newName);
    refresh(book.name);
  };

  //tells you which page to go to
  const navigateTo = () => {
    if (navigation) {
      navigation.navigate('Book Details View', {
        book,
        refresh,
      });
    }
  };

  const bin = () => (
    <Icon
      style={styles.redCross}
      name="trash"
      size={EStyleSheet.value('40rem')}
      color="firebrick"
      onPress={() =>
        chapter ? deleteItemFromStorage(chapter) : deleteItemFromStorage(book)
      }
    />
  );

  if (chapter) {
    return (
      <View
        style={
          isChapterDetails.current ? styles.detailsListItem : styles.ListItem
        }>
        <View style={styles.ListItemView}>
          <View style={styles.chaptersNameContainer}>
            <TextInput
              style={styles.listItemText}
              value={instructionName}
              onChangeText={changeName}
              placeholder={
                isChapterDetails.current ? 'add details' : 'add chapter'
              }
              autoFocus={focus}
              multiline={true}
            />
          </View>

          <View style={styles.iconContainer}>{inEditMode ? bin() : null}</View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.ListItem}>
        <View style={styles.ListItemView}>
          <TextInput
            style={styles.listItemText}
            value={book.name}
            onChangeText={changeName}
            placeholder="add book name"
            multiline={true}
            autoFocus={focus}
          />

          <View style={styles.iconContainer}>
            {inEditMode ? (
              bin()
            ) : (
              <Icon
                style={styles.redCross}
                name="arrow-right"
                size={EStyleSheet.value('40rem')}
                color={myGreen}
                onPress={() => navigateTo()}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
  },
  ListItem: {
    backgroundColor: '#FFFFFF' + 99,
    borderWidth: EStyleSheet.value('2rem'),
    borderColor: myWhite,
  },
  detailsListItem: {
    borderWidth: EStyleSheet.value('2rem'),
    // height: EStyleSheet.value('50rem'),
  },
  ListItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  listItemText: {
    flex: 1,
    fontSize: EStyleSheet.value('22rem'),
    marginLeft: EStyleSheet.value('10rem'),
    color: 'black',
  },
  chaptersNameContainer: {flexDirection: 'row', flex: 3},
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  redCross: {
    alignSelf: 'flex-end',
    paddingHorizontal: EStyleSheet.value('5rem'),
  },
  marginLeft: {
    marginLeft: EStyleSheet.value('15rem'),
  },
});

BookItem.defaultProps = {
  navigation: null,
  chapter: null,
};

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  deleteItemFromStorage: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  chapter: PropTypes.object,
  focus: PropTypes.bool.isRequired,
  inEditMode: PropTypes.bool.isRequired,
};

export default BookItem;
