import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import {ActionSheet} from './online_components/ActionSheet';

const InvestItem = ({investment, deletion, setInvestments}) => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  // const [value, setValue] = useState(investment.originalInvestment);

  const actions = [
    {
      title: 'Delete investment',
      action: () => {
        deletion(investment);
      },
    },
  ];

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
        },
        ...prevItems,
      ];
    });
  };

  const calculatePercentage = () => {
    return (investment.currentAmount / investment.originalInvestment - 1) * 100;
  };

  return (
    <>
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
    </>
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
  },
  currencyInputContainer: {
    color: 'black',
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
