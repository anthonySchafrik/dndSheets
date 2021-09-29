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

export interface Proficient {
  [key: string]: any;
  mult: string;
  proficient: boolean;
}

export interface StatMult {
  [key: string]: string;
  mult: string;
  stat: string;
}
export interface Stats {
  [key: string]: any;
  strength: StatMult;
  dexterity: StatMult;
  constitution: StatMult;
  intelligence: StatMult;
  wisdom: StatMult;
  charisma: StatMult;
}

export interface SavingThrows {
  [key: string]: any;
  strength: Proficient;
  dexterity: Proficient;
  constitution: Proficient;
  intelligence: Proficient;
  wisdom: Proficient;
  charisma: Proficient;
}

export interface Skills {
  [key: string]: any;
  acrobatics: Proficient;
  arcana: Proficient;
  deception: Proficient;
  insight: Proficient;
  investigation: Proficient;
  nature: Proficient;
  performance: Proficient;
  religion: Proficient;
  stealth: Proficient;
  'animal handling': Proficient;
  athletics: Proficient;
  history: Proficient;
  intimidation: Proficient;
  medicine: Proficient;
  perception: Proficient;
  persuasion: Proficient;
  'sleight of hand': Proficient;
  survival: Proficient;
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
