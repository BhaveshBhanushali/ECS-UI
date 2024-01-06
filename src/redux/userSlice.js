/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userCSRFToken: '',
    userId: 'test',
    firstName: '',
    lastName: '',
    emailId: '',
    groupIds: ['test'],
    nickName: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload?.userId
      state.firstName = action.payload?.firstName
      state.lastName = action.payload?.lastName
      state.emailId = action.payload?.emailId
      state.groupIds = action.payload?.groupIds
    },
    setUserId: (state, action) => {
      state.userId = action.payload?.userId
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload?.firstName
    },
    setLastName: (state, action) => {
      state.lastName = action.payload?.lastName
    },
    setEmailId: (state, action) => {
      state.emailId = action.payload?.emailId
    },
    setUserCSRFToken: (state, action) => {
      state.userCSRFToken = action.payload?.userCSRFToken
    },
    setNickName: (state, action) => {
      state.nickName = action.payload?.nickName
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setUser, setUserId, setFirstName, setLastName, setEmailId, setUserCSRFToken, setNickName,
} = userSlice.actions

export default userSlice.reducer
