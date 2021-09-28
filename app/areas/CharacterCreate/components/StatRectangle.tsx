import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { updateCharacter } from '../../../redux/actions/characterActions';
import { useAppDispatch } from '../../../redux/hooks';
import theme from '../../../theme';

interface Props {
  text: string;
}

const StatRectangle = ({ text }: Props) => {
  const dispatch = useAppDispatch();

  const [update, handleUpdate] = useState('');

  const handleCharacterUpdate = () =>
    dispatch(updateCharacter({ key: text.toLowerCase(), value: update }));

  const handlingUpdate = () => (text: string) => handleUpdate(text);

  return (
    <View style={styles.container}>
      <TextInput
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ paddingLeft: update.length > 0 ? 6 : 0, color: theme.font }}
        placeholder="Mult"
        value={update}
        placeholderTextColor={theme.font}
        onChangeText={handlingUpdate()}
        onEndEditing={handleCharacterUpdate}
      />
      <Text style={{ color: theme.font }}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 260,
    backgroundColor: theme.secondary,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  circle: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.primary,
    borderWidth: 1,
    borderRadius: 25,
  },
  box: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.primary,
    borderWidth: 1,
  },
});

export default StatRectangle;
