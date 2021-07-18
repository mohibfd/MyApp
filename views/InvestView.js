import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import uuid from 'react-native-uuid';

import styles from '../stylesheets/stylesheet.js';
import Header from '../components/Header';
import InvestItem from '../components/InvestItem';
import DeleteOrCancel from '../components/DeleteOrCancel.js';

const InvestView = () => {
  const [investmentsStorage, setInvestmentsStorage] =
    useStorage('investmentss');

  const [investments, setInvestments] = useState(
    investmentsStorage ? investmentsStorage : [],
  );

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteInvestment, setDeleteInvestment] = useState(null);

  useEffect(() => {
    setInvestmentsStorage(investments);
    // console.log(investments);
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
          timeInterval: null,
          notificationId: null,
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

  return (
    <SafeAreaView style={styles.welcome}>
      <Header title="My Investments" add={createInvestment} />

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
    </SafeAreaView>
  );
  // return (
  //   <SafeAreaView style={styles.welcome}>
  //     <Header title={'InvestView'} />
  //   </SafeAreaView>
  // );
};

export default InvestView;
