import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import uuid from 'react-native-uuid';

import styles from '../stylesheets/stylesheet.js';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import DeleteOrCancel from '../components/DeleteOrCancel.js';

const DeveloperView = () => {
  const [cardsStorage, setCardsStorage] = useStorage('cardss');

  const [cards, setCards] = useState(cardsStorage ? cardsStorage : []);

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteCard, setDeleteCard] = useState(null);

  useEffect(() => {
    setCardsStorage(cards);
    // console.log(cards);
  }, [cards]);

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
  };

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

  //also returns card to be deleted
  const openDeleteOrCancel = mainItem => {
    toggleDeleteOrCancel();
    setDeleteCard(mainItem);
  };

  const completeDeletion = card => {
    // toggleDeleteOrCancel();

    setCards(prevItems => {
      return prevItems.filter(item => item.key != card.key);
    });
  };

  return (
    <SafeAreaView style={styles.welcome}>
      <Header title="My Cards" add={createCard} />

      {/* <FlatList
        data={cards}
        renderItem={({card}) => (
          <ListItem item={card} deleteItemFromStorage={openDeleteOrCancel} />
        )}
        numColumns={2}
      /> */}

      {cards &&
        cards.map(card =>
          card ? (
            <ListItem
              item={card}
              deleteItemFromStorage={() => completeDeletion(card)}
              developer={true}
            />
          ) : null,
        )}
    </SafeAreaView>
  );
};

export default DeveloperView;
