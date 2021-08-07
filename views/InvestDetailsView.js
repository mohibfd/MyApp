import React from 'react';
import {SafeAreaView} from 'react-native';

import Header from '../components/Header';

const DeveloperDetailsView = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: myBlack}}>
      <Header title="My Details" />
    </SafeAreaView>
  );
};

export default DeveloperDetailsView;
