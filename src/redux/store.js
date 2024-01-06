import {
  configureStore,
} from '@reduxjs/toolkit'
import {
  persistStore, persistReducer,
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
})

export const persistor = persistStore(store)
