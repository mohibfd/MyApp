import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from 'react-native';
import uuid from 'react-native-uuid';

import Header from '../components/Header';
import InvestItem from '../components/InvestItem';
import DeleteOrCancel from '../components/DeleteOrCancel';
import {getCryptoData} from '../services/CryptoData';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const InvestView = () => {
  const [investmentsStorage, setInvestmentsStorage] =
    useStorage('investmentss');

  const [investments, setInvestments] = useState(
    investmentsStorage ? investmentsStorage : [],
  );

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteInvestment, setDeleteInvestment] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  //this state will allow us to refresh once
  const [refresh, setRefresh] = useState('');

  let componentMounted = true;

  const onRefresh = useCallback(() => {
    //giving it a random id so it always calls on a new state
    setRefresh(uuid.v4());
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (componentMounted) {
      const fetchExactPrices = async () => {
        const prices = await getCryptoData();
        return prices;
      };
      fetchExactPrices().then(prices => {
        investments.map(investment => {
          let currentAmount = 0;
          investment.assets.map(asset => {
            // console.log('<>>>>>>>>>>', asset);

            switch (asset.name) {
              case 'Ethereum':
                currentAmount += asset.quantity * prices[0];
                break;
              case 'Bitcoin':
                currentAmount += asset.quantity * prices[1];
                break;
            }
          });

          //updating our object
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
                assets: investment.assets,
              },
              ...prevItems,
            ];
          });
        });
      });
    }
    return () => {
      // This code runs when component is unmounted
      componentMounted = false; // (4) set it to false if we leave the page
    };

    // console.log(investments);
  }, [refresh]);

  let overallOriginalInvestment = 0;
  let overallCurrentAmount = 0;

  for (let i of investments) {
    overallOriginalInvestment += i.originalInvestment;
    overallCurrentAmount += i.currentAmount;
  }

  useEffect(() => {
    setInvestmentsStorage(investments);
  }, [investments]);

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
  };

  const createInvestment = newInvestmentName => {
    setInvestments(prevItems => {
      return [
        {
          name: newInvestmentName,
          key: uuid.v4(),
          originalInvestment: 0,
          currentAmount: 0,
          assets: [],
        },
        ...prevItems,
      ];
    });
  };

  //also returns investment to be deleted
  const openDeleteOrCancel = mainItem => {
    toggleDeleteOrCancel();
    setDeleteInvestment(mainItem);
  };

  const completeDeletion = () => {
    toggleDeleteOrCancel();

    setInvestments(prevItems => {
      return prevItems.filter(item => item.key != deleteInvestment.key);
    });
  };

  const calculateOverall = () => {
    let difference = overallCurrentAmount - overallOriginalInvestment;

    return difference.toFixed(2);
  };

  const calculateOverallPercentage = () => {
    let percentageDiff =
      (overallCurrentAmount / overallOriginalInvestment - 1) * 100;
    return percentageDiff.toFixed(2);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: myBlack}}>
      <Header title="My Investments" add={createInvestment} />

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[myWhite]}
            progressBackgroundColor={myBlack}
          />
        }>
        {investments &&
          investments.map(investment =>
            investment ? (
              <InvestItem
                key={investment.key}
                investment={investment}
                deletion={openDeleteOrCancel}
                setInvestments={setInvestments}
              />
            ) : null,
          )}

        {isDeleteOrCancel && (
          <DeleteOrCancel
            name={deleteInvestment.name}
            deletion={completeDeletion}
            closeOverlay={toggleDeleteOrCancel}
          />
        )}

        <View style={styles.overallGainLossContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.fontSizeStyle}>Overall Gain/Loss: </Text>
            <Text
              style={[
                styles.fontSizeStyle,
                {
                  color: calculateOverall() >= 0 ? 'green' : 'red',
                },
              ]}>
              £{calculateOverall()}
            </Text>
            <Text
              style={[
                styles.fontSizeStyle,
                {
                  color: calculateOverall() >= 0 ? 'green' : 'red',
                },
              ]}>
              {'  '}
              {calculateOverallPercentage()}%
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overallGainLossContainer: {
    bottom: 0,
    marginBottom: EStyleSheet.value('22rem'),
    position: 'absolute',
    alignSelf: 'center',
  },
  fontSizeStyle: {
    fontSize: EStyleSheet.value('20rem'),
    color: myWhite,
  },
  scrollView: {
    flex: 1,
    // backgroundColor: 'pink',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default InvestView;
