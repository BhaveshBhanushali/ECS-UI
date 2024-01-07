/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoaderVisible: false,
    loadingText: 'Loading...',
  },
  reducers: {
    setLoaderVisibility: (state, action) => {
      state.isLoaderVisible = action.payload
    },
    setLoadingText: (state, action) => {
      state.loadingText = action.payload
    },
  },
})

export const {
  setLoaderVisibility, setLoadingText,
} = loaderSlice.actions

export default loaderSlice.reducer
