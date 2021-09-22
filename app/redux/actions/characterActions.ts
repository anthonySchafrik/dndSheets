import {
  UpdateCharacter,
  UpdateCharacterPayload,
  SetSavedCharacters,
  CharacterState,
  SetSelectedCharacters,
} from '../reduxType';

export const actionTypes = {
  UPDATE_CHARACTER: 'UPDATE_CHARACTER',
  SET_SAVED_CHARACTERS: 'SET_SAVED_CHARACTERS',
  SET_SELECTED_CHARACTER: 'SET_SELECTED_CHARACTER',
};

export const updateCharacter = (
  payload: UpdateCharacterPayload,
): UpdateCharacter => {
  return {
    type: actionTypes.UPDATE_CHARACTER,
    payload,
  };
};

export const setSavedCharacters = (payload: string[]): SetSavedCharacters => {
  return {
    type: actionTypes.SET_SAVED_CHARACTERS,
    payload,
  };
};

export const setSelectedCharacter = (
  payload: CharacterState,
): SetSelectedCharacters => {
  return {
    type: actionTypes.SET_SELECTED_CHARACTER,
    payload,
  };
};
