import {createStore} from 'redux';
import {AsyncStorage} from 'react-native';
import {persistStore, persistCombineReducers} from 'redux-persist';
import * as reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

export const store = createStore(persistedReducer, {});

export const persistor = persistStore(store);
