import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { updateCharacter } from '../../../redux/actions/characterActions';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { AppState } from '../../../redux/store';
import theme from '../../../theme';

interface Props {
  stat: string;
}

const StatBox = ({ stat }: Props) => {
  const dispatch = useAppDispatch();

  const { stats } = useAppSelector((state: AppState) => state.character);

  const [updateMult, handleUpdateMult] = useState('');
  const [updateStat, handleUpdateStat] = useState('');

  const handleCharacterUpdate = () => {
    const key = stat.toLowerCase();

    dispatch(
      updateCharacter({
        key: 'stats',
        value: { ...stats, [key]: { mult: updateMult, stat: updateStat } },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.styledText}>{stat}</Text>
      <TextInput
        style={styles.styledText}
        placeholder="Mult"
        placeholderTextColor={theme.font}
        onChangeText={text => handleUpdateMult(text)}
        onEndEditing={handleCharacterUpdate}
        value={updateMult}
      />
      <View style={styles.circleOutLine}>
        <TextInput
          style={styles.statText}
          placeholder="stat"
          placeholderTextColor={theme.font}
          onChangeText={text => handleUpdateStat(text)}
          onEndEditing={handleCharacterUpdate}
          value={updateStat}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 80,
    backgroundColor: theme.secondary,
    marginVertical: 5,
    alignItems: 'center',
  },
  styledText: { color: theme.font },
  circleOutLine: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.primary,
    borderWidth: 1,
    borderRadius: 25,
    width: 40,
    height: 30,
  },
  statText: {
    color: theme.font,
    paddingLeft: 5,
  },
});

export default StatBox;
