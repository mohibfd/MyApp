import PropTypes from 'prop-types';
import React, {useEffect, useState, useRef} from 'react';
import {ListItem} from 'react-native-elements';
import {View, Text, StyleSheet, Image} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import uuid from 'react-native-uuid';

import {ActionSheet} from './online_components/ActionSheet';
import AddIconModal from '../components/modals/AddIconModal';
import {getCryptoData} from '../services/CryptoData';
import EStyleSheet from 'react-native-extended-stylesheet';

const InvestItem = ({investment, deletion, setInvestments, refresh}) => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [openAddAssetModal, setOpenAddAssetModal] = useState(false);

  const [ETHPrice, setETHPrice] = useState(0);
  const [BTCPrice, setBTCPrice] = useState(0);
  const [MSCIPrice, setMSCIPrice] = useState(0);
  const [XRPrice, setXRPrice] = useState(0);
  const [BNBPrice, setBNBPrice] = useState(0);
  const [ADAPrice, setADAPrice] = useState(0);
  const [MATICPrice, setMATICPrice] = useState(0);
  const [XLMPrice, setXLMPrice] = useState(0);
  const [NANOPrice, setNANOPrice] = useState(0);
  const [XMRPrice, setXMRPrice] = useState(0);
  const [LINKPirce, setLINKPirce] = useState(0);
  const [ALGOPrice, setALGOPrice] = useState(0);
  const [TRXPrice, setTRXPrice] = useState(0);

  const isMountedRef = useRef(null);

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

  useEffect(() => {
    isMountedRef.current = true;

    const fetchExactPrices = async () => {
      if (isMountedRef) {
        const [
          ETHPrice,
          BTCPrice,
          MSCIPrice,
          XRPrice,
          BNBPrice,
          ADAPrice,
          MATICPrice,
          XLMPrice,
          NANOPrice,
          XMRPrice,
          LINKPirce,
          ALGOPrice,
          TRXPrice,
        ] = await getCryptoData();
        setETHPrice(ETHPrice);
        setBTCPrice(BTCPrice);
        setMSCIPrice(MSCIPrice);
        setXRPrice(XRPrice);
        setBNBPrice(BNBPrice);
        setADAPrice(ADAPrice);
        setMATICPrice(MATICPrice);
        setXLMPrice(XLMPrice);
        setNANOPrice(NANOPrice);
        setXMRPrice(XMRPrice);
        setLINKPirce(LINKPirce);
        setALGOPrice(ALGOPrice);
        setTRXPrice(TRXPrice);
      }
    };
    if (isMountedRef) {
      fetchExactPrices();
    }

    return (isMountedRef.current = false);
  }, []);

  const menuItems = [
    {
      name: 'Ethereum',
      imageSource: require('../components/assets/Ethereum.jpeg'),
      price: ETHPrice,
      quantity: 0,
      key: uuid.v4(),
    },
    {
      name: 'WorldIndex',
      imageSource: require('../components/assets/MSCIWorldIndex.png'),
      price: MSCIPrice,
      quantity: 0,
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
      name: 'Ripple',
      imageSource: require('../components/assets/XRP.jpeg'),
      price: XRPrice,
      quantity: 0,
      key: uuid.v4(),
    },
    {
      name: 'BinanceCoin',
      imageSource: require('../components/assets/BNB.jpeg'),
      price: BNBPrice,
      quantity: 0,
      key: uuid.v4(),
    },
    {
      name: 'Cardano',
      imageSource: require('../components/assets/Cardano.png'),
      price: ADAPrice,
      quantity: 0,
      key: uuid.v4(),
    },
    {
      name: 'MaticNetwork',
      imageSource: require('../components/assets/Polygon.jpeg'),
      price: MATICPrice,
      quantity: 0,
      key: uuid.v4(),
    },
    {
      name: 'Stellar',
      imageSource: require('../components/assets/XLM.jpeg'),
      price: XLMPrice,
      quantity: 0,
      key: uuid.v4(),
    },
    {
      name: 'Nano',
      imageSource: require('../components/assets/Nano.png'),
      price: NANOPrice,
      quantity: 0,
      key: uuid.v4(),
    },
    {
      name: 'Monero',
      imageSource: require('../components/assets/XMR.jpeg'),
      price: XMRPrice,
      quantity: 0,
      key: uuid.v4(),
    },
    {
      name: 'Chainlink',
      imageSource: require('../components/assets/LINK.jpeg'),
      price: LINKPirce,
      quantity: 0,
      key: uuid.v4(),
    },
    {
      name: 'Algorand',
      imageSource: require('../components/assets/Algo.jpeg'),
      price: ALGOPrice,
      quantity: 0,
      key: uuid.v4(),
    },
    {
      name: 'Tron',
      imageSource: require('../components/assets/Tron.jpeg'),
      price: TRXPrice,
      quantity: 0,
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

    let myAssets;
    if (investment.assets.length == 0) {
      myAssets = [];
    } else {
      myAssets = investment.assets;
    }

    for (var i = 0; i < myAssets.length; i++) {
      if (myAssets[i].name === item.name) {
        console.log('???');
        myAssets.splice(i, 1);
        refresh();
      }
    }

    // console.log(typeof myAssets);
    // let temp = [];
    myAssets.push(item);
    // temp.push('tomato');

    let currentamount = investment.currentAmount + price * quantity;

    setCurrentAmount(currentamount, myAssets);
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

  let fourPhotosList = [];
  let fourPhotos = [];
  console.log('start');
  investment.assets.map((photo, index) => {
    if (index % 4 == 0 && index != 0) {
      console.log('?');
      fourPhotosList.push(fourPhotos);
      fourPhotos = [];
    }
    if (investment.assets.length == index + 1) {
      // fourPhotos.push(photo);
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
                {showCurrentAmount()}
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
    flexDirection: 'row',
  },
  titleAndImageContainer: {
    flexDirection: 'column',
    // align: 'center',
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
    width: '33%',
    height: '100%',
    marginVertical: EStyleSheet.value('5rem'),
  },
});

InvestItem.propTypes = {
  investment: PropTypes.object.isRequired,
  deletion: PropTypes.func.isRequired,
  setInvestments: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default InvestItem;
