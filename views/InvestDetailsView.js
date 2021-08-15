import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  LogBox,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';

import DeleteOrCancel from '../components/DeleteOrCancel';
import Header from '../components/Header';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const DeveloperDetailsView = ({route}) => {
  const {investment, investments} = route.params;

  const {assets} = investment;

  //sorting by value
  assets.sort((a, b) => (a.totalValue < b.totalValue ? 1 : -1));

  const refreshMainPage = route.params.refresh;

  const [refresh, setRefresh] = useState();

  const [isDeleteOrCancelOpen, setIsDeleteOrCancelOpen] = useState(false);

  const [assetToDelete, setAssetToDelete] = useState();

  const [isDeletingInterest, setIsDeletingInterest] = useState(false);

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancelOpen(!isDeleteOrCancelOpen);
  };

  const openDeleteOrCancel = (asset, isInterest) => {
    toggleDeleteOrCancel();
    if (isInterest) {
      setIsDeletingInterest(true);
    } else {
      setIsDeletingInterest(false);
    }
    setAssetToDelete(asset);
  };

  const deleteAsset = () => {
    toggleDeleteOrCancel();

    const filteredAssets = assets.filter(
      asset => asset.key != assetToDelete.key,
    );

    investments.forEach(i => {
      if (i.key == investment.key) {
        if (isDeletingInterest) {
          let asset = assets.filter(asset => asset.key == assetToDelete.key)[0];
          i.assets.forEach(j => {
            if (j.key == asset.key) {
              delete j.interest;
            }
          });
        } else {
          i.assets = filteredAssets;
        }
      }
    });

    setRefresh(!refresh);
    refreshMainPage();
  };

  const renderItem = ({item, index}) => {
    const asset = item;
    let firstTopBorder = false;
    let lastBottomBorder = false;
    if (index == 0) {
      firstTopBorder = true;
    }

    if (index == assets.length - 1) {
      lastBottomBorder = true;
    }

    const {name, imageSource, quantity, totalValue, interest} = asset;
    let earnedInterest, interval, percentage;
    if (interest) {
      earnedInterest = interest.earnedInterest;
      interval = interest.interval;
      percentage = interest.percentage;
    }

    const bordercolour = () => {
      if (lastBottomBorder) {
        return myWhite;
      } else {
        return 'gold';
      }
    };

    const topBorder = () => {
      if (firstTopBorder) {
        return myWhite;
      } else {
        return 'gold';
      }
    };

    const bottomBorder = () => {
      if (interest) {
        return 0;
      } else {
        if (lastBottomBorder) {
          return 2;
        } else {
          return 1;
        }
      }
    };
    const interestBottomBorder = () => {
      if (lastBottomBorder) {
        return 2;
      } else {
        return 1;
      }
    };

    return (
      <>
        <View
          style={[
            styles.listContainer,
            {
              borderBottomWidth: bottomBorder(),
              borderBottomColor: bordercolour(),
              borderTopColor: topBorder(),
            },
          ]}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={imageSource} />
          </View>
          <Text style={[styles.text, styles.nameText]}>{name}</Text>
          <Text style={[styles.text, styles.quantityText]}>
            {quantity.toFixed(4)}
          </Text>
          <Text style={[styles.text, styles.valueText]}>
            £{totalValue.toFixed(2)}
          </Text>
          <Icon
            style={{marginRight: '1%'}}
            name="remove"
            size={EStyleSheet.value('30rem')}
            color="#800000"
            onPress={() => openDeleteOrCancel(asset, false)}
          />
        </View>
        {interest != undefined && (
          <View
            style={[
              styles.listContainer,
              {
                borderBottomWidth: interestBottomBorder(),
                borderBottomColor: bordercolour(),
                borderTopWidth: EStyleSheet.hairlineWidth,
              },
            ]}>
            <Text style={styles.interestText}>Interest: </Text>
            <Text style={[styles.interestText, styles.nameText]}>
              {interval}
            </Text>
            <Text style={[styles.text, styles.quantityText]}>
              {earnedInterest.toFixed(2)}
            </Text>
            <Text style={[styles.text, styles.valueText]}>%{percentage}</Text>
            <Icon
              style={{marginRight: '1%'}}
              name="remove"
              size={EStyleSheet.value('25rem')}
              color="#800000"
              onPress={() => openDeleteOrCancel(asset, true)}
            />
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={investment.name} />

      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.textHeader}>Name</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.textHeader}>Amount</Text>
          </View>
        </View>
        <View style={[styles.textContainer, styles.valueContainer]}>
          <View style={styles.nameContainer}>
            <Text style={styles.textHeader}>Value</Text>
          </View>
        </View>
      </View>

      <FlatList data={assets} renderItem={renderItem} numColumns={1} />
      {isDeleteOrCancelOpen && (
        <DeleteOrCancel
          name={assetToDelete.name}
          extraName={isDeletingInterest ? `'s interest` : ''}
          deletion={deleteAsset}
          closeOverlay={toggleDeleteOrCancel}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myBlack,
  },
  listContainer: {
    borderWidth: 2,
    borderBottomColor: 'gold',
    borderColor: myWhite,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    width: '10%',
    height: '100%',
    padding: EStyleSheet.value('30rem'),
  },
  headerContainer: {
    height: '7%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '1%',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  valueContainer: {
    paddingRight: EStyleSheet.value('15rem'),
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    borderLeftWidth: 2,
    borderColor: myWhite,
    paddingHorizontal: EStyleSheet.value('5rem'),
  },
  textHeader: {
    color: myWhite,
    fontSize: EStyleSheet.value('18rem'),
  },
  text: {
    color: myWhite,
    marginLeft: EStyleSheet.value('7rem'),
    fontSize: EStyleSheet.value('16rem'),
    flex: 1,
  },
  interestText: {
    color: myWhite,
    marginLeft: EStyleSheet.value('5rem'),
    fontSize: EStyleSheet.value('15rem'),
  },
  nameText: {
    flex: 1.3,
  },
  intervalText: {
    marginLeft: EStyleSheet.value('0rem'),
  },
  quantityText: {
    textAlign: 'center',
    marginRight: '5%',
  },
  valueText: {
    textAlign: 'center',
  },
});

DeveloperDetailsView.propTypes = {
  route: PropTypes.object.isRequired,
};

export default DeveloperDetailsView;
