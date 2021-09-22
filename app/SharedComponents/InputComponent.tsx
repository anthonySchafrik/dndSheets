import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

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
      <TextInput
        style={styles.input}
        onChangeText={text => handleUpdate(text)}
        onEndEditing={handleCharacterUpdate}
        placeholder={text}
        placeholderTextColor={theme.font}
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
    color: theme.font,
  },
});

export default InputComponent;
