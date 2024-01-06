/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    ecsRequests: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.ecsRequests = action.payload?.ecsRequests
    },
    setECSRequests: (state, action) => {
      state.ecsRequests = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setUser, setECSRequests,
} = userSlice.actions

export default userSlice.reducer
