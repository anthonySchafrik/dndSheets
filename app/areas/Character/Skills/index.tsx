import React, { useEffect, useReducer } from 'react';
import { View, StyleSheet } from 'react-native';

import { skillConfig, initialSkillsState, SkillScreenState } from './utils';
import { AppState } from '../../../redux/store';
import { Skills } from '../../../redux/reduxType';
import {
  // useAppDispatch,
  useAppSelector,
} from '../../../redux/hooks';
import theme from '../../../theme';
import SkillRows from './component/SkillRows';

const remapSkills = (skills: Skills) => {
  const remappedSkills: SkillScreenState = {};

  for (const key in skills) {
    const skillGroupName = skillConfig[key];

    if (!remappedSkills[skillGroupName]) {
      remappedSkills[skillGroupName] = { [key]: skills[key] };
    } else {
      remappedSkills[skillGroupName] = {
        ...remappedSkills[skillGroupName],
        [key]: skills[key],
      };
    }
  }

  return remappedSkills;
};

const skillsReducer = (state: any, action: any) => {
  const { type, payload } = action;
  const { value } = payload;

  switch (type) {
    // case 'update':
    //   return {
    //     ...state,
    //     [key]: value,
    //   };

    case 'set':
      return value;

    default:
      throw new Error();
  }
};

const SkillsScreen = () => {
  // const dispatch = useAppDispatch();

  const { skills, savingThrows } = useAppSelector(
    (state: AppState) => state.character,
  );

  const [updatedSkills, skillsDispatch] = useReducer(
    skillsReducer,
    initialSkillsState,
  );

  useEffect(() => {
    skillsDispatch({
      type: 'set',
      payload: { key: '', value: remapSkills(skills) },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buildSkillsBlocks = () => {
    const keys = Object.keys(updatedSkills);

    return keys.map((stat, index) => (
      <View style={styles.rowItem} key={`${stat}${index}`}>
        <SkillRows
          mainStat={stat}
          skills={updatedSkills[stat]}
          mult={savingThrows[stat].mult}
        />
      </View>
    ));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>{buildSkillsBlocks()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  rowItem: { marginVertical: 5 },
});

export default SkillsScreen;
