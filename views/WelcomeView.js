import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Button,
  FlatList,
  Alert,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import uuid from 'react-native-uuid';
import PushNotification from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/FontAwesome';

import ListItem from '../components/ListItem';
import Header from '../components/Header';
import AddIconModal from '../components/modals/AddIconModal';
import DeleteOrCancel from '../components/DeleteOrCancel';
import EStyleSheet from 'react-native-extended-stylesheet';
import generalStyles from '../stylesheets/generalStylesheet';

const WelcomeView = ({navigation}) => {
  const [item1, setItem1] = useStorage('PlantsId');
  const [item2, setItem2] = useStorage('InvestId');
  const [item3, setItem3] = useStorage('WorkoutId');
  const [item4, setItem4] = useStorage('MeditateId');
  const [item5, setItem5] = useStorage('BooksId');
  const [item6, setItem6] = useStorage('CookingId');
  const [item7, setItem7] = useStorage('ProductivityId');
  const [item8, setItem8] = useStorage('RemindersId');
  const [item9, setItem9] = useStorage('WakeboardingId');

  const [items, setItems] = useState();

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const menuItems = [
    {name: 'Plants', icon: 'envira', color: myGreen, key: uuid.v4()},
    {name: 'Invest', icon: 'money', color: 'green', key: uuid.v4()},
    {name: 'Workout', icon: 'heartbeat', color: myRed, key: uuid.v4()},
    {name: 'Meditate', icon: 'pause', color: myWhite, key: uuid.v4()},
    {name: 'Books', icon: 'book', color: myBrown, key: uuid.v4()},
    {name: 'Cooking', icon: 'lemon-o', color: myYellow, key: uuid.v4()},
    {name: 'Productivity', icon: 'themeisle', color: 'pink', key: uuid.v4()},
    {name: 'Reminders', icon: 'calendar', color: 'orange', key: uuid.v4()},
    {name: 'Wakeboarding', icon: 'tint', color: myBlue, key: uuid.v4()},
  ];

  useEffect(() => {
    readItemFromStorage();
    createChannels();
  }, []);

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
  };

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel1',
      channelName: 'Test Channel',
    });
  };

  const readItemFromStorage = async () => {
    newList = [];
    if (item1) {
      newList.push(item1);
    }
    if (item2) {
      newList.push(item2);
    }
    if (item3) {
      newList.push(item3);
    }
    if (item4) {
      newList.push(item4);
    }
    if (item5) {
      newList.push(item5);
    }
    if (item6) {
      newList.push(item6);
    }
    if (item7) {
      newList.push(item7);
    }
    if (item8) {
      newList.push(item8);
    }
    if (item9) {
      newList.push(item9);
    }
    setItems(newList);
  };

  //adding list to storage
  const addMainItem = mainItem => {
    if (isDuplicate(mainItem)) {
      return;
    }

    switch (mainItem.name) {
      case 'Plants':
        setItem1(mainItem);
        break;
      case 'Invest':
        setItem2(mainItem);
        break;
      case 'Workout':
        setItem3(mainItem);
        break;
      case 'Meditate':
        setItem4(mainItem);
        break;
      case 'Books':
        setItem5(mainItem);
        break;
      case 'Cooking':
        setItem6(mainItem);
        break;
      case 'Productivity':
        setItem7(mainItem);
        break;
      case 'Reminders':
        setItem8(mainItem);
        break;
      case 'Wakeboarding':
        setItem9(mainItem);
        break;
      default:
        Alert.alert('NOT FOUND');
    }

    //returning the new list with all the previous ones to show on our app
    setItems(prevItems => {
      return [{name: mainItem.name, id: uuid.v4()}, ...prevItems];
    });
  };

  //checks if this item has been created already
  const isDuplicate = mainItem => {
    let breakFunction = false;
    items.map(item => {
      if (item.name == mainItem.name) {
        breakFunction = true;
      }
    });
    return breakFunction;
  };

  //deleting item from storage pop up
  const openDeleteOrCancel = mainItem => {
    toggleDeleteOrCancel();
    setDeleteItem(mainItem);
  };

  const completeDeletion = () => {
    toggleDeleteOrCancel();

    MMKV.removeItem(deleteItem.name + 'Id');

    setItems(prevItems => {
      return prevItems.filter(item => item != deleteItem);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Items" />

      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem
            item={item}
            deleteItemFromStorage={openDeleteOrCancel}
            navigation={navigation}
          />
        )}
        numColumns={2}
      />
      {openModal && (
        <AddIconModal
          menuItems={menuItems}
          addMainItem={addMainItem}
          setModalVisible={setOpenModal}
        />
      )}

      <Icon
        style={styles.modalToggle}
        name="plus"
        size={EStyleSheet.value('75rem')}
        color="green"
        onPress={() => setOpenModal(true)}
      />

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Developer View')}>
        <Text style={[generalStyles.textStylesDark, {color: '#5a9156'}]}>
          Go to developer menu
        </Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Online View')}>
        <Text style={[generalStyles.textStylesDark, {color: '#bd444c'}]}>
          Go to online section
        </Text>
      </Pressable>

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
  button: {
    borderWidth: 1,
    borderColor: myWhite,
    borderRadius: 20,
    marginVertical: EStyleSheet.value('20rem'),
    padding: EStyleSheet.value('10rem'),
    alignSelf: 'center',
    width: '70%',
    backgroundColor: myWhite + 10,
  },
  modalToggle: {
    paddingRight: EStyleSheet.value('25rem'),
    alignSelf: 'flex-end',
  },
});

export default WelcomeView;
