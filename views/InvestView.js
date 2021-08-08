import React, {useEffect, useState, useCallback, useRef} from 'react';
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
import {getAssetsData} from '../services/AssetsData';
import EStyleSheet from 'react-native-extended-stylesheet';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const InvestView = ({navigation}) => {
  const [investmentsStorage, setInvestmentsStorage] =
    useStorage('investmentss');

  const [investments, setInvestments] = useState(
    investmentsStorage ? investmentsStorage : [],
  );

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteInvestment, setDeleteInvestment] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  //this state will allow us to refresh only once
  const [refresh, setRefresh] = useState('');

  const isMountedRef = useRef(null);

  const onRefresh = useCallback(() => {
    //giving it a random id so it always calls on a new state
    setRefresh(uuid.v4());
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  // const calculateInterest = interest => {
  //   console.log('again');
  // setInterval(function () {
  //   console.log(interest);
  // }, 3000);
  // };

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      const fetchExactPrices = async () => {
        return await getAssetsData();
      };
      if (isMountedRef.current) {
        fetchExactPrices().then(prices => {
          if (!prices) {
            // console.log('called api too many times');
            setTimeout(function () {
              console.log('called api too many times');
            }, 3000);
            return;
          }
          investments.map(investment => {
            let currentAmount = 0;
            let newAssets = [];
            investment.assets.map(asset => {
              let oldCurrentAmount = currentAmount;
              // calculateInterest(asset.interest);
              // console.log(asset);
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

              asset.totalValue = newAmount.toFixed(2);
            });

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
                  currentAmount,
                  assets: investment.assets,
                },
              ];
            });
          });
        });
      }
    }

    return () => {
      isMountedRef.current = false; // (4) set it to false if we leave the page
    };
  }, [refresh]);

  let overallOriginalInvestment = 0;
  let overallCurrentAmount = 0;

  for (let i of investments) {
    overallOriginalInvestment += i.originalInvestment;
    overallCurrentAmount += i.currentAmount;
  }

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef) {
      setInvestmentsStorage(investments);
    }
    return (isMountedRef.current = false);
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
                setInvestments={setInvestments}
                refresh={() => setRefresh(uuid.v4())}
                navigation={navigation}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fontSizeStyle: {
    fontSize: EStyleSheet.value('20rem'),
    color: myWhite,
  },
  overallGainLossContainer: {
    marginBottom: EStyleSheet.value('22rem'),
    padding: EStyleSheet.value('10rem'),
    alignSelf: 'center',
  },
});

export default InvestView;
