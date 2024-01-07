import {
  configureStore, getDefaultMiddleware,
} from '@reduxjs/toolkit'
import {
  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE,
  PERSIST, PURGE, REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loaderReducer from './loaderSlice'
import userReducer from './userSlice'

const loaderPersistConfig = { key: 'loader', storage }
const loaderPersistReducer = persistReducer(loaderPersistConfig, loaderReducer)

const userPersistConfig = { key: 'user', storage }
const userPersistReducer = persistReducer(userPersistConfig, userReducer)

export const store = configureStore({
  reducer: {
    loader: loaderPersistReducer,
    user: userPersistReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store)
