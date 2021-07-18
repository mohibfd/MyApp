import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
import {View, Text} from 'react-native';
import uuid from 'react-native-uuid';
import CurrencyInput from 'react-native-currency-input';

import {ActionSheet} from './online_components/ActionSheet';
import styles from '../stylesheets/stylesheet';
// import TimeInterval from './TimeInterval';
import PushNotification from 'react-native-push-notification';

const InvestItem = ({investment, deletion, setInvestments}) => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const [timeIntervalAction, setTimeIntervalAction] = useState(false);

  const [showTimeInterval, setShowTimeInterval] = useState(false);

  const [value, setValue] = React.useState(2310.458); // can also be null

  const toggleShowTimeInterval = () => {
    setShowTimeInterval(!showTimeInterval);
  };

  const actions = [
    {
      title: 'Delete investment',
      action: () => {
        deletion(investment);
      },
    },
    {
      title: 'Add amount invested',
      action: () => {
        deletion(investment);
      },
    },
  ];

  // if (!investment.timeInterval) {
  //   actions.push({
  //     title: 'Set reminder',
  //     action: () => (toggleShowTimeInterval(), setTimeIntervalAction('add')),
  //   });
  // } else {
  //   // actions.push({
  //   //   title: 'Edit time interval',
  //   //   action: () => (toggleShowTimeInterval(), setTimeIntervalAction('edit')),
  //   // });

  //   actions.push({
  //     title: 'Delete reminder',
  //     action: () => (toggleShowTimeInterval(), setTimeIntervalAction('delete')),
  //   });
  // }

  const createTimeInterval = (timeInterval, notificationId) => {
    //deleting item then recreating it to make it easier to modify one of its parameters
    setInvestments(prevItems => {
      return prevItems.filter(item => item.key != investment.key);
    });

    setInvestments(prevItems => {
      return [
        {name: investment.name, key: uuid.v4(), timeInterval, notificationId},
        ...prevItems,
      ];
    });
  };

  const deleteTimeInterval = () => {
    [...Array(globalRepeatNotifications)].map((e, i) => {
      if (i != 0) {
        const id = investment.notificationId + i;
        PushNotification.cancelLocalNotifications({id});
      }
    });

    //delete all notifications
    // PushNotification.cancelAllLocalNotifications();

    //deleting item then recreating it to make it easier to modify one of its parameters
    setInvestments(prevItems => {
      return prevItems.filter(item => item.key != investment.key);
    });

    setInvestments(prevItems => {
      return [
        {
          name: investment.name,
          key: uuid.v4(),
          timeInterval: null,
          notificationId: null,
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
        <ListItem.Content style={styles.listItemContainer}>
          <ListItem.Title style={styles.listItemText}>
            {investment.name}
          </ListItem.Title>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, marginTop: 1}}>
                Original investment:{' '}
              </Text>
              <CurrencyInput
                style={{fontSize: 18}}
                value={value}
                onChangeValue={setValue}
                prefix="£"
                delimiter=","
                separator="."
                precision={2}
                onChangeText={formattedValue => {
                  console.log(formattedValue); // $2,310.46
                }}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, marginTop: 1}}>Current amount: </Text>
              <CurrencyInput
                style={{fontSize: 18}}
                value={value}
                onChangeValue={setValue}
                prefix="£"
                delimiter=","
                separator="."
                precision={2}
                onChangeText={formattedValue => {
                  console.log(formattedValue); // $2,310.46
                }}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, marginTop: 1}}>Gain/loss: </Text>
              <CurrencyInput
                style={{fontSize: 18}}
                value={value}
                onChangeValue={setValue}
                prefix="£"
                delimiter=","
                separator="."
                precision={2}
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
