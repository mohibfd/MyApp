import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import uuid from 'react-native-uuid';

import styles from '../stylesheets/stylesheet.js';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import ListDeveloperItems from '../components/ListDeveloperItems';
import {View} from 'react-native';

const DeveloperView = () => {
  const [cardsStorage, setCardsStorage] = useStorage('cardss');

  const [bugsStorage, setBugsStorage] = useStorage('bugss');

  const [cards, setCards] = useState(cardsStorage ? cardsStorage : []);

  const [bugs, setBugs] = useState(bugsStorage ? bugsStorage : []);

  useEffect(() => {
    setCardsStorage(cards);
    setBugsStorage(bugs);
    // console.log(cards);
  }, [cards, bugs]);

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
        {
          name: newBugName,
          key: uuid.v4(),
        },
        ...prevItems,
      ];
    });
  };

  const completeDeletion = card => {
    setCards(prevItems => {
      return prevItems.filter(item => item.key != card.key);
    });
  };

  const completeBugDeletion = bug => {
    setBugs(prevItems => {
      return prevItems.filter(item => item.key != bug.key);
    });
    console.log(bugsStorage);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="My Cards" developerAdd={createCard} add={createBug} />

      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}> New Ideas</Text>

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
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}>Bugs</Text>
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

export default DeveloperView;
