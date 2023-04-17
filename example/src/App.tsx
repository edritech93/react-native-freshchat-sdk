import * as React from 'react';

import {StyleSheet, View, Text, Button} from 'react-native';
// import {tes} from '../../components/freshchatNotificationConfig';

export default function App() {
  const [isTimeAuto, setIsTimeAuto] = React.useState<string>('');
  // const priority = FreshchatNotificationConfig.getNotificationPriority();
  // console.log(tes); // should log 1
  return (
    <View style={styles.container}>
      <Text>Time Auto: {isTimeAuto.toString()}</Text>
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
