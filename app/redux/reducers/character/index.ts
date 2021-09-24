import { Action } from 'redux';

import { actionTypes } from '../../actions/characterActions';
import {
  CharacterState,
  SetSelectedCharacters,
  UpdateCharacter,
} from '../../reduxType';

//pulled in when needed to add a new character in
import mockCharacter from '../../../MockData/character';

const initialState: CharacterState = {
  name: '',
  class: '',
  level: '',
  exp: '',
  treasure: '',
  equipment: {
    cp: '',
    sp: '',
    ep: '',
    gp: '',
    pp: '',
    text: '',
  },
  stats: {
    strength: { mult: '', stat: '' },
    dexterity: { mult: '', stat: '' },
    constitution: { mult: '', stat: '' },
    intelligence: { mult: '', stat: '' },
    wisdom: { mult: '', stat: '' },
    charisma: { mult: '', stat: '' },
  },
  inspiration: '',
  'proficiency bonus': '',
  savingThrows: {
    strength: { mult: '', proficient: false },
    dexterity: { mult: '', proficient: false },
    constitution: { mult: '', proficient: false },
    intelligence: { mult: '', proficient: false },
    wisdom: { mult: '', proficient: false },
    charisma: { mult: '', proficient: false },
  },
  'armor class': '',
  initiative: '',
  speed: '',
  'hit points maximum': '',
  'hit dice': '',
  skills: {
    acrobatics: { mult: '', proficient: false },
    arcana: { mult: '', proficient: false },
    deception: { mult: '', proficient: false },
    insight: { mult: '', proficient: false },
    investigation: { mult: '', proficient: false },
    nature: { mult: '', proficient: false },
    performance: { mult: '', proficient: false },
    religion: { mult: '', proficient: false },
    stealth: { mult: '', proficient: false },
    'animal handling': { mult: '', proficient: false },
    athletics: { mult: '', proficient: false },
    history: { mult: '', proficient: false },
    intimidation: { mult: '', proficient: false },
    medicine: { mult: '', proficient: false },
    perception: { mult: '', proficient: false },
    persuasion: { mult: '', proficient: false },
    'sleight of hand': { mult: '', proficient: false },
    survival: { mult: '', proficient: false },
  },
  attacks: [],
  spells: [],
};

const characterReducer = (state = initialState, action: Action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.UPDATE_CHARACTER: {
      const { key, value = undefined } = (action as UpdateCharacter).payload;

      return { ...state, [key]: value };
    }

    case actionTypes.SET_SELECTED_CHARACTER:
      return (action as SetSelectedCharacters).payload;

    default:
      return state;
  }
};

export default characterReducer;
