/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Skills } from '../../../../redux/reduxType';
import theme from '../../../../theme';

interface Props {
  mainStat: string;
  skills: Skills;
  mult: string;
}

const SkillRows = ({ mainStat, skills, mult }: Props) => {
  const buildSkillRows = () => {
    const keys = Object.keys(skills);

    return keys.map((stat, index) => (
      <View
        key={`${index}${stat}`}
        style={{
          ...styles.rowItem,
          backgroundColor: skills[stat].proficient
            ? theme.primary
            : theme.secondary,
        }}>
        <Text
          style={{
            color: skills[stat].proficient ? 'black' : theme.font,
          }}>
          {stat}
        </Text>
        <Text
          style={{
            color: skills[stat].proficient ? 'black' : theme.font,
          }}>
          {skills[stat].mult}
        </Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {mainStat} {mult}
      </Text>
      <View style={styles.rowContainer}>{buildSkillRows()}</View>
    </View>
  );
};

export default SkillRows;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    borderWidth: 2,
    backgroundColor: theme.secondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
    padding: 5,
  },
  header: {
    alignSelf: 'center',
    color: theme.font,
  },
  rowContainer: { marginTop: 2, paddingHorizontal: 5 },
  rowItem: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    marginVertical: 3,
    width: 140,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
  },
  fontColor: {
    color: theme.font,
  },
});
