import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, Overlay} from 'react-native-elements';

import generalStyles from '../../stylesheets/generalStylesheet';

// Action sheet contains a list of actions. Each action should have a `title`
// string and `action` function property. A "Cancel" action is automatically
// added to the end of your list of actions. You must also provide the
// closeOverlay function that this component will call to request that the
// action sheet be closed.
export function ActionSheet({actions, visible, closeOverlay}) {
  const cancelAction = {
    title: 'Cancel',
    action: closeOverlay,
  };
  return (
    <Overlay
      overlayStyle={generalStyles.borderContainer}
      isVisible={visible}
      onBackdropPress={closeOverlay}>
      <>
        {[...actions, cancelAction].map(({title, action}) => (
          <ListItem
            containerStyle={{backgroundColor: myBlack}}
            key={title}
            onPress={() => {
              closeOverlay();
              action();
            }}
            bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={{color: myWhite}}>{title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </>
    </Overlay>
  );
}

const styles = StyleSheet.create({});
