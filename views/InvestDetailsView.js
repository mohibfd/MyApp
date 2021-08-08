import React from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  LogBox,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
import Header from '../components/Header';

const DeveloperDetailsView = ({route}) => {
  const investment = route.params.investment;

  const setInvestments = route.params.setInvestments;

  const [refresh, setRefresh] = useState();

  const deleteAsset = assetToDelete => {
    investment.assets = investment.assets.filter(
      asset => asset.key != assetToDelete.key,
    );

    //updating our object
    setInvestments(prevItems => {
      return prevItems.filter(item => item.key != investment.key);
    });

    setInvestments(prevItems => {
      return [
        ...prevItems,
        {
          name: investment.name,
          key: investment.key,
          originalInvestment: investment.originalInvestment,
          currentAmount: investment.currentAmount,
          assets: investment.assets,
        },
      ];
    });
    setRefresh(!refresh);
  };

  const Asset = ({name, photo, quantity, totalValue, asset}) => (
    <View style={styles.listContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={photo} />
      </View>
      <Text style={styles.text}>{name}</Text>
      <Text style={[styles.text, styles.quantityText]}>
        {quantity.toFixed(4)}
      </Text>
      <Text style={styles.text}>£{totalValue}</Text>
      <Icon
        // style={styles.redCross}
        name="remove"
        size={EStyleSheet.value('30rem')}
        color="firebrick"
        onPress={() => deleteAsset(asset)}
      />
    </View>
  );

  const renderItem = ({item}) => (
    <Asset
      name={item.name}
      photo={item.imageSource}
      quantity={item.quantity}
      totalValue={item.totalValue}
      asset={item}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
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
    flex: 1,
    backgroundColor: myBlack,
  },
  listContainer: {
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
    marginLeft: EStyleSheet.value('7rem'),
    fontSize: EStyleSheet.value('16rem'),
    flex: 1,
  },
  quantityText: {
    textAlign: 'center',
    marginRight: '5%',
  },
});

export default DeveloperDetailsView;
