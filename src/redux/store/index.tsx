import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import playReducer from '../reducer/play';
import gameReducer from '../reducer/game';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['playReducer'],
};
const rootReducer = combineReducers({
  play: playReducer,
  game: gameReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);
export {persistor, store};
export type RootState = ReturnType<typeof rootReducer>;
