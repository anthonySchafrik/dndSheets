import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { updateCharacter } from '../redux/actions/characterActions';
import { useAppDispatch } from '../redux/hooks';
import theme from '../theme';

interface Props {
  text: string;
}

const InputComponent = ({ text }: Props) => {
  const dispatch = useAppDispatch();
  const [update, handleUpdate] = useState('');

  const handleCharacterUpdate = () =>
    dispatch(updateCharacter({ key: text.toLowerCase(), value: update }));

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.font }}>{text}</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => handleUpdate(text)}
        onEndEditing={handleCharacterUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    borderBottomColor: theme.secondary,
    borderBottomWidth: 1,
    color: theme.font,
    width: '45%',
    textAlign: 'center',
  },
});

export default InputComponent;
