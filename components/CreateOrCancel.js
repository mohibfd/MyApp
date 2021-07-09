import {Alert} from 'react-native';

const CreateOrCancel = ({icon, action}) => {
  Alert.alert('Create item?', 'Do you want to create <' + icon + '> icon?', [
    {
      text: 'Cancel',
      style: 'destructive',
    },
    {text: 'Yes', onPress: () => action(), style: 'default'},
  ]);
  return null;
};

export default CreateOrCancel;
