import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import theme from '../../../../theme';

interface Props {
  stat: string;
  score: string;
  multiplier: string;
  save: string;
  statsDispatch: React.Dispatch<any>;
}

const StatOval = ({ stat, score, multiplier, save, statsDispatch }: Props) => {
  const title = stat.charAt(0).toUpperCase() + stat.slice(1);

  const handleStatsReducer = (type: string, key: string) => (text: string) => {
    statsDispatch({
      type,
      payload: { key, value: text },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.styledText}>{title}</Text>
      <View style={styles.statRow}>
        <View style={styles.center}>
          <Text>Score</Text>
          <TextInput
            onChangeText={handleStatsReducer('stat', stat)}
            value={score}
          />
        </View>

        <View style={styles.center}>
          <Text>Multiplier</Text>
          <TextInput
            onChangeText={handleStatsReducer('statMult', stat)}
            value={multiplier}
          />
        </View>

        <View style={styles.center}>
          <Text>Save</Text>
          <TextInput
            onChangeText={handleStatsReducer('saving', stat)}
            value={save}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primary,
    alignItems: 'center',
    width: 170,
    borderRadius: 40,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 70,
    alignItems: 'center',
  },
  styledText: {
    marginTop: 2,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StatOval;
