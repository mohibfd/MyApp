import {Alert} from 'react-native';

const CreateOrCancel = ({action}) => {
  Alert.alert('Alert Title', 'My Alert Msg', [
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
