import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import uuid from 'react-native-uuid';

import styles from '../stylesheets/stylesheet.js';
import Header from '../components/Header';
import PlantItem from '../components/PlantItem';
import DeleteOrCancel from '../components/DeleteOrCancel.js';

const InvestView = () => {
  return (
    <SafeAreaView style={styles.welcome}>
      <Header title={'InvestView'} />
    </SafeAreaView>
  );
};

export default InvestView;
