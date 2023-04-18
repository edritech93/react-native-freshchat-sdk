import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';

const Input = (props: any) => {
  const {title, text, onChangeText} = props;

  return (
    <SafeAreaView>
      <Text>{title}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
});

export default Input;
