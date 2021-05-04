import {actionTypes} from './../actions/characterActions';
import {CharacterState, UpdateCharacter} from '../reduxType';
import {Action} from 'redux';

const initialState: CharacterState = {
  name: 'TestName',
};

const characterReducer = (state = initialState, action: Action) => {
  const {type} = action;

  switch (type) {
    case actionTypes.UPDATE_CHARACTER: {
      const {key, value = undefined} = (action as UpdateCharacter).payload;

      return {...state, [key]: value};
    }

    default:
      return state;
  }
};

export default characterReducer;
