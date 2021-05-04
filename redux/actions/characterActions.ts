import {UpdateCharacter, UpdateCharacterPayload} from '../reduxType';

export const actionTypes = {
  UPDATE_CHARACTER: 'UPDATE_CHARACTER',
};

export const updateCharacter = (
  payload: UpdateCharacterPayload,
): UpdateCharacter => {
  return {
    type: actionTypes.UPDATE_CHARACTER,
    payload,
  };
};
