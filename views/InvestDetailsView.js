import React from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '../components/Header';

const DeveloperDetailsView = ({route}) => {
  const investment = route.params.investment;

  // investment.assets.map(asset => {
  //   console.log(asset);
  // });

  let potato = {hi: 'test'};

  potato.hey = 'tea';

  console.log(potato);

  const Asset = ({name, photo, quantity, totalValue}) => (
    <View
      style={{
        borderWidth: 1,
        borderColor: myWhite,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={photo} />
      </View>
      <Text
        style={{
          color: myWhite,
          marginLeft: EStyleSheet.value('10rem'),
          flex: 1,
        }}>
        {name}
      </Text>
      <Text
        style={{
          color: myWhite,
          marginLeft: EStyleSheet.value('10rem'),
          flex: 1,
        }}>
        {quantity}
      </Text>
      <Text
        style={{
          color: myWhite,
          marginLeft: EStyleSheet.value('10rem'),
          flex: 1,
        }}>
        {totalValue}
      </Text>
    </View>
  );

  const renderItem = ({item}) => (
    <Asset
      name={item.name}
      photo={item.imageSource}
      quantity={item.quantity}
      totalValue={item.totalValue}
    />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: myBlack}}>
      <Header title={investment.name} />

      <FlatList
        data={investment.assets}
        renderItem={renderItem}
        numColumns={1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    // flex: 2.5,
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  image: {
    width: '10%',
    height: '100%',
    padding: EStyleSheet.value('30rem'),
  },
});

export default DeveloperDetailsView;
