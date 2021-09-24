// Character types
export interface Equipment {
  [key: string]: string;
  cp: string;
  sp: string;
  ep: string;
  gp: string;
  pp: string;
  text: string;
}
export interface Stats {
  [key: string]: any;
  strength: { mult: string; stat: string };
  dexterity: { mult: string; stat: string };
  constitution: { mult: string; stat: string };
  intelligence: { mult: string; stat: string };
  wisdom: { mult: string; stat: string };
  charisma: { mult: string; stat: string };
}

export interface SavingThrows {
  [key: string]: any;
  strength: { mult: string; proficient: boolean };
  dexterity: { mult: string; proficient: boolean };
  constitution: { mult: string; proficient: boolean };
  intelligence: { mult: string; proficient: boolean };
  wisdom: { mult: string; proficient: boolean };
  charisma: { mult: string; proficient: boolean };
}

export interface Skills {
  acrobatics: { mult: string; proficient: boolean };
  arcana: { mult: string; proficient: boolean };
  deception: { mult: string; proficient: boolean };
  insight: { mult: string; proficient: boolean };
  investigation: { mult: string; proficient: boolean };
  nature: { mult: string; proficient: boolean };
  performance: { mult: string; proficient: boolean };
  religion: { mult: string; proficient: boolean };
  stealth: { mult: string; proficient: boolean };
  'animal handling': { mult: string; proficient: boolean };
  athletics: { mult: string; proficient: boolean };
  history: { mult: string; proficient: boolean };
  intimidation: { mult: string; proficient: boolean };
  medicine: { mult: string; proficient: boolean };
  perception: { mult: string; proficient: boolean };
  persuasion: { mult: string; proficient: boolean };
  'sleight of hand': { mult: string; proficient: boolean };
  survival: { mult: string; proficient: boolean };
}

export interface CharacterAttacks {
  name: string;
  bonus: string;
  damage: string;
}

export interface CharacterSpells {
  spellClass: string;
  ability: string;
  save: string;
  bonus: string;
  description: string;
}
export interface CharacterState {
  name: string;
  class: string;
  level: string;
  exp: string;
  treasure: string;
  equipment: Equipment;
  stats: Stats;
  inspiration: string;
  'proficiency bonus': string;
  savingThrows: SavingThrows;
  'armor class': string;
  initiative: string;
  speed: string;
  'hit points maximum': string;
  'hit dice': string;
  skills: Skills;
  attacks: CharacterAttacks[];
  spells: CharacterSpells[];
}

export interface CombatSkills {
  proficiency: string;
  armorClass: string;
  initiative: string;
  speed: string;
  hp: string;
  hd: string;
  name: string;
  level: string;
  exp: string;
}

// actions
export interface CharacterAction {
  type: string;
  payload: CharacterState;
}

export interface UpdateCharacterPayload {
  key: string;
  value?:
    | string
    | Equipment
    | Stats
    | SavingThrows
    | Skills
    | CharacterAttacks[]
    | CharacterSpells[];
}

export interface UpdateCharacter {
  type: string;
  payload: UpdateCharacterPayload;
}

export interface SetSavedCharacters {
  type: string;
  payload: string[];
}

export interface SetSelectedCharacters {
  type: string;
  payload: CharacterState;
}

// CharacterList
export type CharacterListState = string[];
