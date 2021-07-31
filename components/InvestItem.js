import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
import {View, Text, StyleSheet, Image} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import uuid from 'react-native-uuid';

import {ActionSheet} from './online_components/ActionSheet';
import AddIconModal from '../components/modals/AddIconModal';

const InvestItem = ({investment, deletion, setInvestments}) => {
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

  const setAsset = asset => {
    //deleting item then recreating it to make it easier to modify one of its parameters

    setInvestments(prevItems => {
      return prevItems.filter(item => item.key != investment.key);
    });

    assets = investment.assets.push(asset);

    setInvestments(prevItems => {
      return [
        {
          name: investment.name,
          key: investment.key,
          originalInvestment: investment.originalInvestment,
          currentAmount: investment.currentAmount,
          assets,
        },
        ...prevItems,
      ];
    });
  };

  const setOriginalInvestment = formattedValue => {
    //deleting item then recreating it to make it easier to modify one of its parameters

    setInvestments(prevItems => {
      return prevItems.filter(item => item.key != investment.key);
    });

    setInvestments(prevItems => {
      return [
        {
          name: investment.name,
          key: investment.key,
          originalInvestment: formattedValue,
          currentAmount: investment.currentAmount,
          assets: investment.assets,
        },
        ...prevItems,
      ];
    });
  };

  const setCurrentAmount = formattedValue => {
    //deleting item then recreating it to make it easier to modify one of its parameters

    setInvestments(prevItems => {
      return prevItems.filter(item => item.key != investment.key);
    });

    setInvestments(prevItems => {
      return [
        {
          name: investment.name,
          key: investment.key,
          currentAmount: formattedValue,
          originalInvestment: investment.originalInvestment,
          assets: investment.assets,
        },
        ...prevItems,
      ];
    });
  };

  const calculatePercentage = () => {
    return (investment.currentAmount / investment.originalInvestment - 1) * 100;
  };

  return (
    <View style={{backgroundColor: myBlack}}>
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
        containerStyle={{backgroundColor: myBlue}}
        bottomDivider>
        <ListItem.Content style={styles.investmentContainer}>
          <ListItem.Title style={styles.investmentTitle}>
            {investment.name}
          </ListItem.Title>
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
                precision={0}
                maxLength={10}
                minValue={0}
                // onChangeText={formattedValue => {
                //   console.log(formattedValue); // $2,310.46
                // }}
              />
            </View>
            <View style={styles.investmentTextContainer}>
              <Text style={styles.investmentText}>Current amount: </Text>
              <CurrencyInput
                style={styles.currencyInputContainer}
                value={investment.currentAmount}
                onChangeValue={setCurrentAmount}
                prefix="£"
                delimiter=","
                separator="."
                precision={0}
                maxLength={10}
                minValue={0}
                // onChangeText={formattedValue => {
                // console.log(formattedValue); // $2,310.46
                // }}
              />
            </View>
            <View style={styles.investmentTextContainer}>
              <Text style={styles.investmentText}>Gain/loss:</Text>
              <Text
                style={[
                  styles.currencyInputContainer,
                  {
                    color: calculatePercentage() >= 0 ? 'green' : 'red',
                    marginHorizontal: 7,
                    marginTop: 5,
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
          addMainItem={setAsset}
          setModalVisible={setOpenAddAssetModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  investmentContainer: {
    height: EStyleSheet.value('80rem'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  investmentTitle: {
    width: '31%',
    fontSize: EStyleSheet.value('27rem'),
    color: myWhite,
  },
  textAndCurrencyContainer: {
    flex: 1,
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
  },
});

InvestItem.propTypes = {
  investment: PropTypes.object.isRequired,
  deletion: PropTypes.func.isRequired,
  setInvestments: PropTypes.func.isRequired,
};

export default InvestItem;
