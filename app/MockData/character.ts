export default {
  name: 'Tester',
  class: 'Wizard',
  level: '1',
  exp: '0',
  treasure: 'Gold rings, red stone',
  equipment: {
    cp: '1',
    sp: '2',
    ep: '3',
    gp: '4',
    pp: '5',
    text: 'Staff, cloth robe, sleeping bag',
  },
  stats: {
    strength: { mult: '- 2', stat: '8' },
    dexterity: { mult: '+ 1', stat: '11' },
    constitution: { mult: '+ 0', stat: '12' },
    intelligence: { mult: '+ 3', stat: '18' },
    wisdom: { mult: '+ 4', stat: '11' },
    charisma: { mult: '+ 2', stat: '10' },
  },
  inspiration: '+ 1',
  'proficiency bonus': '+ 4',
  savingThrows: {
    strength: { mult: '+ 0', proficient: false },
    dexterity: { mult: '+ 2', proficient: false },
    constitution: { mult: '+ 1', proficient: false },
    intelligence: { mult: '+ 7', proficient: true },
    wisdom: { mult: '+ 5', proficient: true },
    charisma: { mult: '+ 2', proficient: false },
  },
  'armor class': '12',
  initiative: '+ 2',
  speed: '30 ft',
  'hit points maximum': '7',
  'hit dice': '1d6 per level',
  skills: {
    acrobatics: { mult: '+ 1', proficient: false },
    arcana: { mult: '+ 7', proficient: true },
    deception: { mult: '+ 1', proficient: false },
    insight: { mult: '+ 1', proficient: false },
    investigation: { mult: '+ 1', proficient: false },
    nature: { mult: '+ 1', proficient: false },
    performance: { mult: '+ 1', proficient: false },
    religion: { mult: '+ 1', proficient: false },
    stealth: { mult: '+ 5', proficient: true },
    'animal handling': { mult: '+ 4', proficient: true },
    athletics: { mult: '+ 1', proficient: false },
    history: { mult: '+ 1', proficient: false },
    intimidation: { mult: '+ 1', proficient: false },
    medicine: { mult: '+ 2', proficient: false },
    perception: { mult: '+ 1', proficient: false },
    persuasion: { mult: '+ 1', proficient: false },
    'sleight of hand': { mult: '+ 4', proficient: true },
    survival: { mult: '+ 1', proficient: false },
  },
  attacks: [
    {
      name: 'Bash',
      bonus: '+ 2',
      damage: '1 d6',
    },
    {
      name: 'Bashing',
      bonus: '+ 2',
      damage: '1 d6',
    },
    {
      name: 'Bashed',
      bonus: '+ 2',
      damage: '1 d6',
    },
  ],
  spells: [
    {
      spellClass: 'Acid',
      ability: 'Acid Splash',
      save: 'Dexterity',
      bonus: '1 d6',
      description:
        'You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.',
    },
  ],
};
