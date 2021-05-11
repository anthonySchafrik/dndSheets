import { Action } from 'redux';

import { actionTypes } from '../../actions/characterActions';
import { CharacterListState, SetSavedCharacters } from '../../reduxType';

const initialState: CharacterListState = [];

const characterReducer = (state = initialState, action: Action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.SET_SAVED_CHARACTERS:
      return (action as SetSavedCharacters).payload;

    default:
      return state;
  }
};

export default characterReducer;
