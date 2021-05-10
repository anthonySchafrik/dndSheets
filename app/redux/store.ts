import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import characterReducer from './reducers/characterReducer';

const rootReducer = combineReducers({
  character: characterReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

const store = configureStore();

export default store;
