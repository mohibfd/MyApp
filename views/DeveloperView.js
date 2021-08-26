import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import uuid from 'react-native-uuid';

import Header from '../components/Header';
import ListDeveloperItems from '../components/flatListRendering/ListDeveloperItems';
import EStyleSheet from 'react-native-extended-stylesheet';

const DeveloperView = () => {
  const [cardsStorage, setCardsStorage] = useStorage('cardss');

  const [bugsStorage, setBugsStorage] = useStorage('bugss');

  const [cards, setCards] = useState(cardsStorage ? cardsStorage : []);

  const [bugs, setBugs] = useState(bugsStorage ? bugsStorage : []);

  useEffect(() => {
    setCardsStorage(cards);
    setBugsStorage(bugs);
  }, [cards, bugs, setCardsStorage, setBugsStorage]);

  const createCard = newCardName => {
    setCards(prevItems => {
      return [
        {
          name: newCardName,
          key: uuid.v4(),
        },
        ...prevItems,
      ];
    });
  };

  const createBug = newBugName => {
    setBugs(prevItems => {
      return [
        ...prevItems,
        {
          name: newBugName,
          key: uuid.v4(),
        },
      ];
    });
  };

  const completeDeletion = card => {
    setCards(prevItems => {
      return prevItems.filter(item => item.key !== card.key);
    });
  };

  const completeBugDeletion = bug => {
    setBugs(prevItems => {
      return prevItems.filter(item => item.key !== bug.key);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Cards" developerAdd={createCard} add={createBug} />

      <View style={styles.insideContainer}>
        <View style={styles.listContainer}>
          <Text style={styles.text}>New Ideas</Text>

          {cards &&
            cards.map(card =>
              card ? (
                <ListDeveloperItems
                  key={card.key}
                  item={card}
                  deleteItemFromStorage={() => completeDeletion(card)}
                />
              ) : null,
            )}
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.text}>Bugs</Text>
          {bugs &&
            bugs.map(bug =>
              bug ? (
                <ListDeveloperItems
                  key={bug.key}
                  item={bug}
                  deleteItemFromStorage={() => completeBugDeletion(bug)}
                />
              ) : null,
            )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: myBlack},
  insideContainer: {flexDirection: 'row', flex: 1},
  listContainer: {flexDirection: 'column', flex: 1},
  text: {
    fontSize: EStyleSheet.value('30rem'),
    textAlign: 'center',
    color: myWhite,
  },
});

export default DeveloperView;
