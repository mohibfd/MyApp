import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Alert,
  StyleSheet,
  Pressable,
  Text,
  ImageBackground,
} from 'react-native';
import uuid from 'react-native-uuid';
import PushNotification from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/FontAwesome';

import ListItem from '../components/flatListRendering/ListItem';
import Header from '../components/Header';
import AddIconModal from '../components/modals/AddIconModal';
import DeleteOrCancel from '../components/modals/DeleteOrCancel';
import NotificationsModal from '../components/modals/NotificationsModal';

import EStyleSheet from 'react-native-extended-stylesheet';
import {Platform} from 'react-native';

const WelcomeView = ({navigation}) => {
  //sets up notifications
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      if (notification.action === 'Take me there') {
        navigation.navigate('Invest View');
      }
    },
    requestPermissions: Platform.OS === 'ios',
  });

  // const [item1, setItem1] = useStorage('PlantsId');
  const [item2, setItem2] = useStorage('InvestId');
  const [item3, setItem3] = useStorage('WorkoutId');
  const [item4, setItem4] = useStorage('MeditateId');
  const [item5, setItem5] = useStorage('BooksId');
  const [item6, setItem6] = useStorage('RecipesId');
  const [item7, setItem7] = useStorage('ProductivityId');
  const [item8, setItem8] = useStorage('RemindersId');
  const [item9, setItem9] = useStorage('WakeboardingId');

  const [items, setItems] = useState();

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false);

  const [inEditMode, setInEditMode] = useState(false);

  const menuItems = [
    // {name: 'Plants', icon: 'envira', color: myGreen, key: uuid.v4()},
    {name: 'Invest', icon: 'money', color: 'green', key: uuid.v4()},
    {name: 'Workout', icon: 'heartbeat', color: myRed, key: uuid.v4()},
    // {name: 'Meditate', icon: 'pause', color: myWhite, key: uuid.v4()},
    {name: 'Books', icon: 'book', color: myBrown, key: uuid.v4()},
    {name: 'Recipes', icon: 'lemon-o', color: myYellow, key: uuid.v4()},
    // {name: 'Productivity', icon: 'themeisle', color: 'pink', key: uuid.v4()},
    // {name: 'Reminders', icon: 'calendar', color: 'orange', key: uuid.v4()},
    // {name: 'Wakeboarding', icon: 'tint', color: myBlue, key: uuid.v4()},
  ];

  useEffect(() => {
    const readItemFromStorage = async () => {
      let newList = [];
      // if (item1) {
      //   newList.push(item1);
      // }
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

    readItemFromStorage();
    createChannels();
  }, [item2, item3, item4, item5, item6, item7, item8, item9]);

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
  };

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel1',
      channelName: 'Test Channel',
    });
  };

  //adding list to storage
  const addMainItem = mainItem => {
    if (isDuplicate(mainItem)) {
      return;
    }

    switch (mainItem.name) {
      // case 'Plants':
      //   setItem1(mainItem);
      //   break;
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
      case 'Recipes':
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
      return [...prevItems, {name: mainItem.name, id: uuid.v4()}];
    });
  };

  //checks if this item has been created already
  const isDuplicate = mainItem => {
    let breakFunction = false;
    items.map(item => {
      if (item.name === mainItem.name) {
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
      return prevItems.filter(item => item !== deleteItem);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="My Items"
        openNotifications={() => navigation.navigate('Plants View')}
      />
      <ImageBackground
        source={require('../components/assets/WelcomeView.jpeg')}
        style={styles.image}>
        <FlatList
          data={items}
          renderItem={({item}) => (
            <ListItem
              item={item}
              deleteItemFromStorage={openDeleteOrCancel}
              navigation={navigation}
              inEditMode={inEditMode}
              setInEditMode={setInEditMode}
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

        {inEditMode ? (
          <Pressable
            style={styles.footerContainer}
            onPress={() => setInEditMode(false)}>
            <Text style={styles.text}>Exit edit mode</Text>
          </Pressable>
        ) : (
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Developer View')}>
              <Text
                style={[styles.textStylesDark, styles.developerButtonColour]}>
                Go to developer menu
              </Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Online View')}>
              <Text style={[styles.textStylesDark, styles.onlineButtonColour]}>
                Go to online section
              </Text>
            </Pressable>
          </View>
        )}
      </ImageBackground>

      {isDeleteOrCancel && (
        <DeleteOrCancel
          name={deleteItem.name}
          deletion={completeDeletion}
          closeOverlay={toggleDeleteOrCancel}
        />
      )}

      {isNotificationsModalOpen && (
        <NotificationsModal
          modalVisible={isNotificationsModalOpen}
          closeModal={() => setIsNotificationsModalOpen(false)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: myBlack},
  image: {flex: 1, width: '100%', height: '100%'},
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  button: {
    borderWidth: 1,
    borderColor: myWhite,
    borderRadius: 20,
    marginVertical: EStyleSheet.value('20rem'),
    padding: EStyleSheet.value('10rem'),
    alignSelf: 'center',
    width: '48%',
    backgroundColor: myWhite + 10,
  },
  textStylesDark: {
    fontSize: EStyleSheet.value('14rem'),
    textAlign: 'center',
  },
  developerButtonColour: {
    color: '#bd444c',
  },
  onlineButtonColour: {
    color: '#5a9156',
  },
  modalToggle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: '12%',
    right: '5%',
  },
  footerContainer: {
    height: EStyleSheet.value('50rem'),
    borderColor: myRed,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: EStyleSheet.value('20rem'),
  },
  text: {
    fontSize: EStyleSheet.value('20rem'),
    color: 'white',
  },
});

export default WelcomeView;
