import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {ListItem} from 'react-native-elements';
import {View, Text, StyleSheet, Image} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import uuid from 'react-native-uuid';

import {ActionSheet} from './online_components/ActionSheet';
import AddIconModal from '../components/modals/AddIconModal';
import {getCryptoData} from '../services/CryptoData';
import EStyleSheet from 'react-native-extended-stylesheet';

const InvestItem = ({investment, deletion, setInvestments}) => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [openAddAssetModal, setOpenAddAssetModal] = useState(false);

  const [ETHPrice, setETHPrice] = useState(0);
  const [BTCPrice, setBTCPrice] = useState(0);

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
        setOpenAddAssetModal(true);
      },
    },
    {
      title: 'Delete investment',
      action: () => {
        deletion(investment);
      },
    },
  ];

  // const getPrice = async () => {
  //   let temp = await getCryptoData();
  //   return temp;
  // };
  useEffect(() => {
    const fetchExactPrices = async () => {
      const [ETHPrice, BTCPrice] = await getCryptoData();

      setETHPrice(ETHPrice);
      setBTCPrice(BTCPrice);
    };
    fetchExactPrices();
  }, []);
  // test().then(EthPrice => console.log(EthPrice));
  // console.log('ethprice', EthPrice);
  // console.log('ethprice', getPrice());
  const menuItems = [
    {
      name: 'Ethereum',
      imageSource: require('../components/assets/Ethereum.jpeg'),
      price: ETHPrice,
      quantity: 0,
      key: uuid.v4(),
    },
    {
      name: 'MSCI World',
      imageSource: require('../components/assets/MSCIWorldIndex.png'),
      key: uuid.v4(),
    },
    {
      name: 'Bitcoin',
      imageSource: require('../components/assets/Bitcoin.jpeg'),
      price: BTCPrice,
      quantity: 0,
      key: uuid.v4(),
    },
    {
      name: 'XRP',
      imageSource: require('../components/assets/XRP.jpeg'),
      key: uuid.v4(),
    },
    {
      name: 'BNB',
      imageSource: require('../components/assets/BNB.jpeg'),
      key: uuid.v4(),
    },
    {
      name: 'Cardano',
      imageSource: require('../components/assets/Cardano.png'),
      key: uuid.v4(),
    },
    {
      name: 'Polygon',
      imageSource: require('../components/assets/Polygon.jpeg'),
      key: uuid.v4(),
    },
    {
      name: 'XLM',
      imageSource: require('../components/assets/XLM.jpeg'),
      key: uuid.v4(),
    },
    {
      name: 'Nano',
      imageSource: require('../components/assets/Nano.png'),
      key: uuid.v4(),
    },
    {
      name: 'XMR',
      imageSource: require('../components/assets/XMR.jpeg'),
      key: uuid.v4(),
    },
    {
      name: 'Link',
      imageSource: require('../components/assets/LINK.jpeg'),
      key: uuid.v4(),
    },
    {
      name: 'Algo',
      imageSource: require('../components/assets/Algo.jpeg'),
      key: uuid.v4(),
    },
    {
      name: 'Tron',
      imageSource: require('../components/assets/Tron.jpeg'),
      key: uuid.v4(),
    },
  ];

  const setOriginalInvestment = amount => {
    //deleting item then recreating it to make it easier to modify one of its parameters

    setInvestments(prevItems => {
      return prevItems.filter(item => item.key != investment.key);
    });

    setInvestments(prevItems => {
      return [
        {
          name: investment.name,
          key: investment.key,
          originalInvestment: amount,
          currentAmount: investment.currentAmount,
          assets: investment.assets,
        },
        ...prevItems,
      ];
    });
  };

  const setAsset = item => {
    const price = item.price;
    const quantity = item.quantity;
    //deleting item then recreating it to make it easier to modify one of its parameters

    let assets = investment.assets;

    assets.push(item);

    let currentamount = investment.currentAmount + price * quantity;

    setCurrentAmount(currentamount, assets);
  };

  const setCurrentAmount = (currentAmount, assets) => {
    //deleting item then recreating it to make it easier to modify one of its parameters

    setInvestments(prevItems => {
      return prevItems.filter(item => item.key != investment.key);
    });

    setInvestments(prevItems => {
      return [
        {
          name: investment.name,
          key: investment.key,
          originalInvestment: investment.originalInvestment,
          currentAmount,
          assets,
        },
        ...prevItems,
      ];
    });
  };

  const calculatePercentage = () => {
    return (investment.currentAmount / investment.originalInvestment - 1) * 100;
  };

  const alignWhere = () => {
    if (investment.assets.length == 0) {
      return 'center';
    }
  };

  return (
    <View style={{backgroundColor: 'red'}}>
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
          style={[styles.investmentContainer, {alignItems: alignWhere()}]}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.55,
            }}>
            <ListItem.Title style={styles.investmentTitle}>
              {investment.name}
            </ListItem.Title>
            {investment.assets.length != 0 && (
              <View style={{flex: 1, width: '100%', flexDirection: 'row'}}>
                {investment.assets.map(asset => {
                  return (
                    <Image
                      style={{
                        width: '33%',
                        height: '100%',
                        marginVertical: EStyleSheet.value('5rem'),
                      }}
                      source={asset.imageSource}
                      key={asset.imageSource}
                    />
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
                value={investment.originalInvestment}
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
                £{investment.currentAmount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.investmentTextContainer}>
              <Text style={styles.investmentText}>Gain/loss:</Text>
              <Text
                style={[
                  styles.currencyInputContainer,
                  {
                    color: calculatePercentage() >= 0 ? 'green' : 'red',
                  },
                ]}>
                {calculatePercentage().toFixed(2)}%
              </Text>
            </View>
          </View>
        </ListItem.Content>
      </ListItem>
      {openAddAssetModal && (
        <AddIconModal
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
    height: EStyleSheet.value('80rem'),
    flexDirection: 'row',
  },
  investmentTitle: {
    width: '100%',
    fontSize: EStyleSheet.value('27rem'),
    color: myWhite,
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
});

InvestItem.propTypes = {
  investment: PropTypes.object.isRequired,
  deletion: PropTypes.func.isRequired,
  setInvestments: PropTypes.func.isRequired,
};

export default InvestItem;
