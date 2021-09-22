import React, { useState } from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';

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
    <Grid style={styles.container}>
      <Row style={styles.rowHeight}>
        <Text style={styles.styledText}>{stat}</Text>
      </Row>
      <Row>
        <TextInput
          style={styles.styledText}
          placeholder="Mult"
          placeholderTextColor={theme.font}
          onChangeText={text => handleUpdateMult(text)}
          onEndEditing={handleCharacterUpdate}
          value={updateMult}
        />
      </Row>
      <Row>
        <TextInput
          style={styles.statText}
          placeholder="stat"
          placeholderTextColor={theme.font}
          onChangeText={text => handleUpdateStat(text)}
          onEndEditing={handleCharacterUpdate}
          value={updateStat}
        />
      </Row>
    </Grid>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    backgroundColor: theme.secondary,
    marginVertical: 3,
    alignItems: 'center',
  },
  styledText: { color: theme.font },
  statText: {
    color: theme.font,
    paddingLeft: 6,
  },
  rowHeight: {
    height: 20,
  },
});

export default StatBox;
