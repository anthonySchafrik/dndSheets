// Character types
export interface CharacterState {
  name?: string;
}
export interface CharacterAction {
  type: string;
  payload: CharacterState;
}

export interface UpdateCharacterPayload {
  key: string;
  value?: string;
}

export interface UpdateCharacter {
  type: string;
  payload: UpdateCharacterPayload;
}

// CharacterList
export type CharacterListState = string[];
export interface SetSavedCharacters {
  type: string;
  payload: string[];
}
