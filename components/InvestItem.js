import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
import {View, Text} from 'react-native';
import uuid from 'react-native-uuid';
import CurrencyInput from 'react-native-currency-input';

import {ActionSheet} from './online_components/ActionSheet';
import styles from '../stylesheets/stylesheet';

const InvestItem = ({investment, deletion, setInvestments}) => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const [value, setValue] = useState(investment.originalInvestment);

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
                onChangeText={formattedValue => {
                  console.log(formattedValue); // $2,310.46
                }}
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
                onChangeText={formattedValue => {
                  console.log(formattedValue); // $2,310.46
                }}
              />
            </View>
            <View style={styles.investmentTextContainer}>
              <Text style={styles.investmentText}>Gain/loss: %</Text>
              <CurrencyInput
                style={styles.currencyInputContainer}
                value={value}
                onChangeValue={setValue}
                prefix="£"
                delimiter=","
                separator="."
                precision={0}
                maxLength={10}
                onChangeText={formattedValue => {
                  console.log(formattedValue); // $2,310.46
                }}
              />
            </View>
          </View>
        </ListItem.Content>
      </ListItem>
      {/* {showTimeInterval && (
        <TimeInterval
          createTimeInterval={createTimeInterval}
          closeModal={toggleShowTimeInterval}
          investment={investment}
          timeIntervalAction={timeIntervalAction}
          deleteTimeInterval={deleteTimeInterval}
        />
      )} */}
    </>
  );
};

InvestItem.propTypes = {
  investment: PropTypes.object.isRequired,
  deletion: PropTypes.func.isRequired,
  setInvestments: PropTypes.func.isRequired,
};

export default InvestItem;
