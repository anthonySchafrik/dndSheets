import { StatMult } from '../../../redux/reduxType';

export interface SkillConfig {
  [key: string]: any;
  athletics: string;
  acrobatics: string;
  'sleight of hand': string;
  stealth: string;
  arcana: string;
  investigation: string;
  nature: string;
  religion: string;
  history: string;
  'animal handling': string;
  insight: string;
  medicine: string;
  perception: string;
  survival: string;
  deception: string;
  performance: string;
  intimidation: string;
  persuasion: string;
}

export interface SkillScreenState {
  [key: string]: any;
  strength?: {
    athletics: StatMult;
  };
  dexterity?: {
    acrobatics: StatMult;
    'sleight of hand': StatMult;
    stealth: StatMult;
  };
  intelligence?: {
    arcana: StatMult;
    investigation: StatMult;
    nature: StatMult;
    religion: StatMult;
    history: StatMult;
  };
  wisdom?: {
    'animal handling': StatMult;
    insight: StatMult;
    medicine: StatMult;
    perception: StatMult;
    survival: StatMult;
  };
  charisma?: {
    deception: StatMult;
    performance: StatMult;
    intimidation: StatMult;
    persuasion: StatMult;
  };
}

export const skillConfig: SkillConfig = {
  athletics: 'strength',
  acrobatics: 'dexterity',
  'sleight of hand': 'dexterity',
  stealth: 'dexterity',
  arcana: 'intelligence',
  investigation: 'intelligence',
  nature: 'intelligence',
  religion: 'intelligence',
  history: 'intelligence',
  'animal handling': 'wisdom',
  insight: 'wisdom',
  medicine: 'wisdom',
  perception: 'wisdom',
  survival: 'wisdom',
  deception: 'charisma',
  performance: 'charisma',
  intimidation: 'charisma',
  persuasion: 'charisma',
};

export const initialSkillsState: SkillScreenState = {
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
