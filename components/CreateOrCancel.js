import {Alert} from 'react-native';

const CreateOrCancel = ({action}) => {
  Alert.alert('Create item?', '', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Yes', onPress: () => action()},
  ]);
  return null;
};

export default CreateOrCancel;
