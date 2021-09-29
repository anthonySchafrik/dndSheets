import React, { useEffect, useReducer } from 'react';
import { View, Text } from 'react-native';

import skillConfig from './utils/skillConfig';
import { AppState } from '../../../redux/store';
import { Skills } from '../../../redux/reduxType';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const initialState = {
  strength: {
    athletics: { mult: '', stat: '' },
  },
  dexterity: {
    acrobatics: { mult: '', stat: '' },
    'sleight of hand': { mult: '', stat: '' },
    stealth: { mult: '', stat: '' },
  },
  intelligence: {
    arcana: { mult: '', stat: '' },
    investigation: { mult: '', stat: '' },
    nature: { mult: '', stat: '' },
    religion: { mult: '', stat: '' },
    history: { mult: '', stat: '' },
  },
  wisdom: {
    'animal handling': { mult: '', stat: '' },
    insight: { mult: '', stat: '' },
    medicine: { mult: '', stat: '' },
    perception: { mult: '', stat: '' },
    survival: { mult: '', stat: '' },
  },
  charisma: {
    deception: { mult: '', stat: '' },
    performance: { mult: '', stat: '' },
    intimidation: { mult: '', stat: '' },
    persuasion: { mult: '', stat: '' },
  },
};

const remapSkills = (skills: Skills) => {
  const remappedSkills = {};
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
  const { key, value } = payload;

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
  const dispatch = useAppDispatch();

  const { skills } = useAppSelector((state: AppState) => state.character);

  const [updatedSkills, skillsDispatch] = useReducer(
    skillsReducer,
    initialState,
  );

  useEffect(() => {
    skillsDispatch({
      type: 'set',
      payload: { key: '', value: remapSkills(skills) },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Text>Saving Throwing Screen</Text>
    </View>
  );
};

export default SkillsScreen;
