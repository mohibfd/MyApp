/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Alert,
} from 'react-native';
import uuid from 'react-native-uuid';

import Header from '../components/Header';
import InvestItem from '../components/flatListRendering/InvestItem';
import DeleteOrCancel from '../components/modals/DeleteOrCancel';
import {getAssetsData} from '../services/AssetsData';
import EStyleSheet from 'react-native-extended-stylesheet';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

// const sortListByOrder = list => {
//   return list.sort((a, b) => (a.order > b.order ? 1 : -1));
// };

const InvestView = ({navigation}) => {
  const [investmentsStorage, setInvestmentsStorage] =
    useStorage('investmentss');

  const [investments, setInvestments] = useState(
    investmentsStorage ? investmentsStorage : [],
  );

  const [overallOriginalInvestment, setOverallOriginalInvestment] = useState(0);

  const [overallCurrentAmount, setOverallCurrentAmount] = useState(0);

  const [overallInvestmentChanged, setOverallInvestmentChanged] = useState();

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteInvestment, setDeleteInvestment] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  //this state will allow us to refresh only once
  const [refresh, setRefresh] = useState('');

  const [focus, setFocus] = useState(false);

  const isMountedRef = useRef(null);

  const toggleOverallInvestmentChanged = () => {
    setOverallInvestmentChanged(!overallInvestmentChanged);
  };

  const onRefresh = useCallback(() => {
    //giving it a random id so it always calls on a new state
    setRefresh(uuid.v4());
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      const fetchExactPrices = async () => {
        return await getAssetsData();
      };
      if (isMountedRef.current) {
        if (investments.length !== 0) {
          setRefreshing(true);
          fetchExactPrices().then(prices => {
            if (!prices) {
              Alert.alert(
                'Too many refreshes',
                'Please wait before refreshing again',
                [{text: 'OK'}],
              );
              setRefreshing(false);
              return;
            }
            investments.map(investment => {
              let currentAmount = 0;
              investment.assets.map(asset => {
                let oldCurrentAmount = currentAmount;

                switch (asset.name) {
                  case 'Ethereum':
                    currentAmount += asset.quantity * prices[0];
                    break;
                  case 'WorldIndex':
                    currentAmount += asset.quantity * prices[1];
                    break;
                  case 'Bitcoin':
                    currentAmount += asset.quantity * prices[2];
                    break;
                  case 'Ripple':
                    currentAmount += asset.quantity * prices[3];
                    break;
                  case 'BinanceCoin':
                    currentAmount += asset.quantity * prices[4];
                    break;
                  case 'Cardano':
                    currentAmount += asset.quantity * prices[5];
                    break;
                  case 'MaticNetwork':
                    currentAmount += asset.quantity * prices[6];
                    break;
                  case 'Stellar':
                    currentAmount += asset.quantity * prices[7];
                    break;
                  case 'Nano':
                    currentAmount += asset.quantity * prices[8];
                    break;
                  case 'Monero':
                    currentAmount += asset.quantity * prices[9];
                    break;
                  case 'Chainlink':
                    currentAmount += asset.quantity * prices[10];
                    break;
                  case 'Algorand':
                    currentAmount += asset.quantity * prices[11];
                    break;
                  case 'Tron':
                    currentAmount += asset.quantity * prices[12];
                    break;
                  case 'USDCoin':
                    currentAmount += asset.quantity * prices[13];
                    break;
                  case 'CelsiusCoin':
                    currentAmount += asset.quantity * prices[14];
                    break;
                }

                let newAmount = currentAmount - oldCurrentAmount;

                asset.totalValue = newAmount;
              });

              investment.currentAmount = currentAmount;

              //updating our object
              setInvestmentsStorage(investments);
              toggleOverallInvestmentChanged();
            });
          });
        }
      }
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [refresh]);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef) {
      setInvestmentsStorage(investments);
    }
    return (isMountedRef.current = false);
  }, [investments]);

  //this will calculate interest on any asset
  useEffect(() => {
    if (isMountedRef) {
      investments.forEach(investment => {
        investment.assets.forEach(asset => {
          if (asset.interest) {
            const interest = asset.interest;
            const {earnedInterest, interval, percentage, startDate} = interest;
            const {name} = asset;
            let intervalInNumbers;

            //this is for testing different dates//
            // let dateNow = Date.now() + globalOneDayInMilliSeconds * 61;
            let dateNow = Date.now();

            let timePassed = dateNow - startDate;
            if (interest.until) {
              const until = interest.until;
              let period;
              switch (until) {
                case 15:
                  period = '15 days';
                  break;
                case 30:
                  period = '30 days';
                  break;
                case 60:
                  period = '60 days';
                  break;
                case 90:
                  period = '90 days';
                  break;
              }

              if (timePassed > until * globalOneDayInMilliSeconds) {
                Alert.alert(
                  'Interest ended',
                  `your ${name} from ${investment.name} has finished its ${period} staking period`,
                  [{text: 'Understood'}],
                );
                delete asset.interest;
              }
            }

            switch (interval) {
              case 'daily':
                intervalInNumbers = 1;
                break;
              case 'weekly':
                intervalInNumbers = 7;
                break;
              case 'monthly':
                intervalInNumbers = 30.44;
                break;
              case 'yearly':
                intervalInNumbers = 365.25;
                break;
            }

            const timeUntilInterest =
              intervalInNumbers * globalOneDayInMilliSeconds;

            let showPopup = false;
            while (timePassed >= timeUntilInterest) {
              interest.startDate += timeUntilInterest;

              const percentageValue = percentage / 100;

              const division = 365 / intervalInNumbers;

              const earnedInterestInPrice =
                (asset.totalValue * percentageValue) / division;

              const pricePerOneAsset = asset.totalValue / asset.quantity;

              const earnedInterestInAsset =
                earnedInterestInPrice / pricePerOneAsset;

              asset.quantity = asset.quantity + earnedInterestInAsset;

              asset.totalValue += earnedInterestInPrice;

              interest.earnedInterest += earnedInterestInPrice;

              timePassed = dateNow - interest.startDate;

              showPopup = true;
            }
            const newEarnedInterest = interest.earnedInterest - earnedInterest;
            if (showPopup) {
              Alert.alert(
                'Congratulations!!',
                `You have earned £${newEarnedInterest.toFixed(
                  2,
                )} worth of ${name} from ${
                  investment.name
                } through your ${interval} interest`,
                [{text: 'OK'}],
              );
            }
          }
        });
      });
    }
    return (isMountedRef.current = false);
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      let overallOriginalInvestmentTemp = 0;
      let overallCurrentAmountTemp = 0;
      for (let i of investments) {
        overallOriginalInvestmentTemp += i.originalInvestment;
        overallCurrentAmountTemp += i.currentAmount;
      }

      setOverallOriginalInvestment(overallOriginalInvestmentTemp);
      setOverallCurrentAmount(overallCurrentAmountTemp);

      if (refreshing) {
        setRefreshing(false);
      }
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [overallInvestmentChanged]);

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
  };

  const createInvestment = newInvestmentName => {
    let maxOrder = -1;
    investments.map(investment => {
      if (investment.order > maxOrder) {
        maxOrder = investment.order;
      }
    });
    maxOrder += 1;

    setInvestments(prevItems => {
      return [
        ...prevItems,
        {
          name: newInvestmentName,
          key: uuid.v4(),
          originalInvestment: 0,
          currentAmount: 0,
          assets: [],
          order: maxOrder,
        },
      ];
    });
    setFocus(true);
  };

  //also returns investment to be deleted
  const openDeleteOrCancel = mainItem => {
    toggleDeleteOrCancel();
    setDeleteInvestment(mainItem);
  };

  const completeDeletion = () => {
    toggleDeleteOrCancel();

    setInvestments(prevItems => {
      return prevItems.filter(item => item.key !== deleteInvestment.key);
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

  const color = calculateOverall() >= 0 ? 'green' : 'red';

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Investments" add={createInvestment} />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[myWhite]}
            progressBackgroundColor={myBlack}
            tintColor={myWhite}
          />
        }>
        {investments &&
          investments.map(investment =>
            investment ? (
              <InvestItem
                key={investment.key}
                investment={investment}
                deletion={openDeleteOrCancel}
                refresh={() => setRefresh(uuid.v4())}
                navigation={navigation}
                investments={investments}
                setInvestmentsStorage={setInvestmentsStorage}
                toggleOverallInvestmentChanged={toggleOverallInvestmentChanged}
                focus={focus}
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
      </ScrollView>
      <View style={styles.overallGainLossContainer}>
        <Text style={styles.fontSizeStyle}>Overall Gain/Loss</Text>
        <View style={styles.footer}>
          <Text
            style={[
              styles.fontSizeStyle,
              {
                color,
              },
            ]}>
            £{calculateOverall()}
          </Text>
          <Text
            style={[
              styles.fontSizeStyle,
              {
                color,
              },
            ]}>
            {'  '}
            {calculateOverallPercentage()}%
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: myBlack},
  fontSizeStyle: {
    fontSize: EStyleSheet.value('25rem'),
    color: myWhite,
    alignSelf: 'center',
  },
  overallGainLossContainer: {
    marginBottom: EStyleSheet.value('22rem'),
    padding: EStyleSheet.value('10rem'),
    alignSelf: 'center',
  },
  footer: {flexDirection: 'row'},
});

export default InvestView;
