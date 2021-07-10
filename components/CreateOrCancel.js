import {Alert} from 'react-native';

const CreateOrCancel = ({name, action, deletion}) => {
  if (deletion) {
    Alert.alert(
      'Delete item?',
      'Are you sure you want to delete <' + name + '> icon?',
      [
        {
          text: 'Cancel',
          style: 'default',
        },
        {text: 'Yes', onPress: () => action(), style: 'destructive'},
      ],
    );
  } else if (name) {
    Alert.alert('Create item?', 'Do you want to create <' + name + '> icon?', [
      {
        text: 'Cancel',
        style: 'destructive',
      },
      {text: 'Yes', onPress: () => action(), style: 'default'},
    ]);
  }
  return null;
};

export default CreateOrCancel;
