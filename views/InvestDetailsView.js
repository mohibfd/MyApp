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

  const Asset = ({name, photo, quantity, totalValue}) => (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={photo} />
      </View>
      <Text style={styles.text}>{name}</Text>
      <Text style={[styles.text, {textAlign: 'center', marginRight: '5%'}]}>
        {quantity}
      </Text>
      <Text style={styles.text}>£{totalValue}</Text>
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

      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Text style={[styles.textHeader, styles.textHeader1]}>Name</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Text style={[styles.textHeader, styles.textHeader1]}>Amount</Text>
          </View>
        </View>
        <View style={[styles.textContainer, styles.alignCenter]}>
          <View style={styles.nameContainer}>
            <Text style={[styles.textHeader, styles.textHeader1]}>Value</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={investment.assets}
        renderItem={renderItem}
        numColumns={1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: myWhite,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    width: '10%',
    height: '100%',
    padding: EStyleSheet.value('30rem'),
  },
  headerContainer: {
    height: '7%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '1%',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  alignCenter: {
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    borderLeftWidth: 2,
    borderColor: myWhite,
    paddingHorizontal: EStyleSheet.value('9rem'),
  },
  textHeader: {
    color: myWhite,
    fontSize: EStyleSheet.value('18rem'),
  },
  text: {
    color: myWhite,
    marginLeft: EStyleSheet.value('10rem'),
    fontSize: EStyleSheet.value('18rem'),
    flex: 1,
  },
});

export default DeveloperDetailsView;
