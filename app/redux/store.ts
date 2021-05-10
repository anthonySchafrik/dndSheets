import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import characterReducer from './reducers/character';
import characterListReducer from './reducers/characterList';

const rootReducer = combineReducers({
  character: characterReducer,
  characterList: characterListReducer,
});

const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

const store = configureStore();

// dont know if i need this
// export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
