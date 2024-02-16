import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import playReducer from '../reducer/playReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['playReducer'],
};
const rootReducer = combineReducers({
  play: playReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);
export {persistor, store};
export type RootState = ReturnType<typeof rootReducer>;
