import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {ListItem} from 'react-native-elements';
import CurrencyInput from 'react-native-currency-input';
import uuid from 'react-native-uuid';

import {ActionSheet} from './online_components/ActionSheet';
import AddAssetModal from '../components/modals/AddAssetModal';
import EStyleSheet from 'react-native-extended-stylesheet';

const InvestItem = ({
  investment,
  deletion,
  refresh,
  navigation,
  investments,
  setInvestmentsStorage,
}) => {
  const [originalInvestmentState, setOriginalInvestmentState] = useState(
    investment.originalInvestment,
  );

  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [openAddAssetModal, setOpenAddAssetModal] = useState(false);

  const actions = [
    {
      title: 'Add asset',
      action: () => {
        setOpenAddAssetModal(true);
      },
    },
    {
      title: 'View more details',

      action: () => {
        navigation.navigate('Invest Details View');
        navigation.navigate('Invest Details View', {
          investment,
          refresh,
          investments,
        });
      },
    },
    {
      title: 'Delete investment',
      action: () => {
        deletion(investment);
      },
    },
  ];

  const menuItems = [
    {
      name: 'Ethereum',
      imageSource: require('../components/assets/Ethereum.jpeg'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
    {
      name: 'WorldIndex',
      imageSource: require('../components/assets/MSCIWorldIndex.png'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
    {
      name: 'Bitcoin',
      imageSource: require('../components/assets/Bitcoin.jpeg'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
    {
      name: 'Ripple',
      imageSource: require('../components/assets/XRP.jpeg'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
    {
      name: 'BinanceCoin',
      imageSource: require('../components/assets/BNB.jpeg'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
    {
      name: 'Cardano',
      imageSource: require('../components/assets/Cardano.png'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
    {
      name: 'MaticNetwork',
      imageSource: require('../components/assets/Polygon.jpeg'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
    {
      name: 'Stellar',
      imageSource: require('../components/assets/XLM.jpeg'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
    {
      name: 'Nano',
      imageSource: require('../components/assets/Nano.png'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
    {
      name: 'Monero',
      imageSource: require('../components/assets/XMR.jpeg'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
    {
      name: 'Chainlink',
      imageSource: require('../components/assets/LINK.jpeg'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
    {
      name: 'Algorand',
      imageSource: require('../components/assets/Algo.jpeg'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
    {
      name: 'Tron',
      imageSource: require('../components/assets/Tron.jpeg'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
    {
      name: 'USDCoin',
      imageSource: require('../components/assets/USDC.png'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
    {
      name: 'CelsiusCoin',
      imageSource: require('../components/assets/CEL.jpeg'),
      quantity: 0,
      key: uuid.v4(),
      totalValue: 0,
    },
  ];

  const setOriginalInvestment = amount => {
    //first one will change the value that appears instantly
    setOriginalInvestmentState(amount);

    for (let i of investments) {
      if (i.key == investment.key) {
        i.originalInvestment = amount;
      }
    }
    setInvestmentsStorage(investments);
  };

  const setAsset = item => {
    let investmentAssets = investment.assets;

    let duplicateFound = false;
    for (var i = 0; i < investmentAssets.length; i++) {
      if (investmentAssets[i].name === item.name) {
        duplicateFound = true;
        const index = i;
        console.log('index???/', index);
        Alert.alert(
          'Caution',
          `You already own ${item.name}, are you sure you would want to override it?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Continue',
              onPress: () => continueSettingAsset(item, index),
            },
          ],
        );
      }
    }
    if (!duplicateFound) {
      continueSettingAsset(item);
    }
  };
  const continueSettingAsset = (item, index) => {
    let myAssets = investment.assets;

    if (index != undefined) {
      myAssets.splice(index, 1);
    }

    myAssets.push(item);

    for (let i of investments) {
      if (i.key == investment.key) {
        i.assets = myAssets;
      }
    }
    refresh();
  };

  const calculateGainOrLoss = () => {
    return investment.currentAmount - investment.originalInvestment;
  };

  const calculatePercentage = () => {
    return (investment.currentAmount / investment.originalInvestment - 1) * 100;
  };

  const alignWhere = () => {
    if (investment.assets.length == 0) {
      return 'center';
    }
  };

  const renderNumber = number => {
    let numbersWithDecimal = [];
    for (let i of number) {
      numbersWithDecimal.push(i);
    }

    let numberAsList = [];
    for (let i = 0; i < numbersWithDecimal.length; i++) {
      if (i == 6 || i == 9) {
        numberAsList.splice(numbersWithDecimal.length - i, 0, ',');
      }
      numberAsList.push(numbersWithDecimal[i]);
    }

    return '£' + numberAsList.join('');
  };

  const showCurrentAmount = () => {
    if (investment.currentAmount) {
      let currentAmount = investment.currentAmount.toFixed(2);
      return renderNumber(currentAmount);
    } else if (investment.currentAmount == 0) {
      return 'Add asset';
    } else {
      return 'Updating price';
    }
  };

  const containerHeight = () => {
    let size = 80;
    for (let i = 0; i < investment.assets.length; i++) {
      if (i % 4 == 0 && i != 0) {
        size += 40;
      }
    }
    const remValue = size + 'rem';
    return EStyleSheet.value(remValue);
  };

  //this will return photos in a nested list where every list
  //contains 4 photos inside of it
  let fourPhotosList = [];
  let fourPhotos = [];

  investment.assets.map((photo, index) => {
    if (index % 4 == 0 && index != 0) {
      fourPhotosList.push(fourPhotos);
      fourPhotos = [];
    }
    if (investment.assets.length == index + 1) {
      fourPhotosList.push(fourPhotos);
    }
    fourPhotos.push(photo.imageSource);
  });

  return (
    <View>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          setActionSheetVisible(false);
        }}
        actions={actions}
      />
      <ListItem
        onPress={() => {
          setActionSheetVisible(true);
        }}
        containerStyle={{
          backgroundColor: myBlack,
          borderColor: 'gold',
          borderWidth: 1.5,
        }}>
        <ListItem.Content
          style={[
            styles.investmentContainer,
            {alignItems: alignWhere(), height: containerHeight()},
          ]}>
          <View style={styles.titleAndImageContainer}>
            <ListItem.Title style={styles.investmentTitle}>
              {investment.name}
            </ListItem.Title>

            {fourPhotosList.length != 0 && (
              <View style={{flex: 1}}>
                {fourPhotosList.map(photosList => {
                  return (
                    <View style={styles.imageContainer} key={uuid.v4()}>
                      {photosList.map(photo => {
                        return (
                          <Image
                            style={styles.image}
                            source={photo}
                            key={uuid.v4()}
                          />
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
          <View style={styles.textAndCurrencyContainer}>
            <View style={styles.investmentTextContainer}>
              <Text style={styles.investmentText}>Original investment: </Text>
              <CurrencyInput
                style={styles.currencyInputContainer}
                value={originalInvestmentState}
                onChangeValue={setOriginalInvestment}
                prefix="£"
                delimiter=","
                separator="."
                precision={2}
                maxLength={10}
                minValue={0}
              />
            </View>
            <View style={styles.investmentTextContainer}>
              <Text style={styles.investmentText}>Current amount: </Text>
              <Text style={styles.currencyInputContainer}>
                {showCurrentAmount()}
              </Text>
            </View>
            <View style={styles.investmentTextContainer}>
              <Text style={[styles.investmentText, {flex: 3.1}]}>
                Gain/loss:
              </Text>
              <Text
                style={[
                  styles.currencyInputContainer,
                  {
                    color: calculatePercentage() >= 0 ? 'green' : 'red',
                  },
                ]}>
                £{calculateGainOrLoss().toFixed(2)}
                {'   '}
                {calculatePercentage().toFixed(2)}%
              </Text>
            </View>
          </View>
        </ListItem.Content>
      </ListItem>
      {openAddAssetModal && (
        <AddAssetModal
          menuItems={menuItems}
          setModalVisible={setOpenAddAssetModal}
          addMainItem={setAsset}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  investmentContainer: {
    flexDirection: 'row',
  },
  titleAndImageContainer: {
    flexDirection: 'column',
    flex: 0.55,
  },
  investmentTitle: {
    fontSize: EStyleSheet.value('27rem'),
    color: myWhite,
    marginLeft: EStyleSheet.value('5rem'),
  },
  textAndCurrencyContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  investmentTextContainer: {
    //for some reason 46% takes the entire space
    height: '46%',
    flexDirection: 'row',
  },
  investmentText: {
    flex: 7,
    fontSize: EStyleSheet.value('15rem'),
    alignSelf: 'center',
    textAlign: 'right',
    color: myWhite,
  },
  currencyInputContainer: {
    color: myWhite,
    flex: 4,
    fontSize: EStyleSheet.value('15rem'),
    textAlign: 'center',
    alignSelf: 'center',
  },
  imageContainer: {
    marginLeft: EStyleSheet.value('8rem'),
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: '33.5%',
    height: '88%',
    marginVertical: EStyleSheet.value('5rem'),
  },
});

InvestItem.propTypes = {
  investment: PropTypes.object.isRequired,
  deletion: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  investments: PropTypes.array.isRequired,
  setInvestmentsStorage: PropTypes.func.isRequired,
};

export default InvestItem;
