import * as React from 'react';

import {StyleSheet, View, Text, Button} from 'react-native';
import {
  createConversationOptions,
  setUser,
  resetUser,
  init,
} from 'react-native-freshchat-sdk';
import {Input} from '../component';

export default function App() {
  const [userInfo, setUserInfo] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneCountryCode: '',
    phone: '',
  });
  const options = createConversationOptions({
    tags: ['tag1', 'tag2'],
    filteredViewTitle: 'Filtered Conversations',
  });
  const freshchatConfig = {
    appId: 'b83514a7-06e9-4fef-b14c-64417ac8b56e',
    appKey: '859a6771-da93-49de-a8e0-32102bfbc342',
  };

  React.useEffect(() => {
    init(freshchatConfig);
  }, []);
  function submitUser() {
    setUser(userInfo);
  }

  function setUserField(field: string, value: string) {
    setUserInfo(prevState => ({
      ...prevState,
      [field]: value,
    }));
  }

  function resetUsers() {
    resetUser();
    setUserInfo({
      email: '',
      firstName: '',
      lastName: '',
      phoneCountryCode: '',
      phone: '',
    });
  }

  return (
    <View style={styles.container}>
      <Input
        title="Email"
        text={userInfo.email}
        onChangeText={value => setUserField('email', value)}
      />
      <Input
        title="First Name"
        text={userInfo.firstName}
        onChangeText={value => setUserField('firstName', value)}
      />
      <Input
        title="Last Name"
        text={userInfo.lastName}
        onChangeText={value => setUserField('lastName', value)}
      />
      <Input
        title="Phone Country Code"
        text={userInfo.phoneCountryCode}
        onChangeText={value => setUserField('phoneCountryCode', value)}
      />
      <Input
        title="phone"
        text={userInfo.phone}
        onChangeText={value => setUserField('phone', value)}
      />
      <Button title="submit" onPress={() => setUser(userInfo)}></Button>
      <Button title="reset" onPress={() => resetUsers()}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
