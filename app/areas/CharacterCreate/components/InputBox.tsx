import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { updateCharacter } from '../../../redux/actions/characterActions';
import { useAppDispatch } from '../../../redux/hooks';
import theme from '../../../theme';

interface Props {
  text: string;
  style: object;
}

const InputBox = ({ text, style }: Props) => {
  const dispatch = useAppDispatch();

  const [update, handleUpdate] = useState('');

  const handleCharacterUpdate = () =>
    dispatch(updateCharacter({ key: text.toLowerCase(), value: update }));

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <TextInput
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
              ...styles.styledTextInput,
              ...style,
              paddingLeft: update.length > 2 ? 10 : 0,
            },
          ]}
          placeholder="stat"
          placeholderTextColor={theme.font}
          onChangeText={text => handleUpdate(text)}
          onEndEditing={handleCharacterUpdate}
          value={update}
        />
      </View>
      <Text style={{ color: theme.font }}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  container: {
    height: 60,
    width: 78,
    backgroundColor: theme.secondary,
    marginVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  styledTextInput: {
    fontSize: 30,
    color: theme.font,
  },
});

export default InputBox;
