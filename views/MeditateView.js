import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import uuid from 'react-native-uuid';

import Header from '../components/Header';

const MeditateView = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: myBlack}}>
      <Header title="My Meditation" />
    </SafeAreaView>
  );
};

export default MeditateView;
