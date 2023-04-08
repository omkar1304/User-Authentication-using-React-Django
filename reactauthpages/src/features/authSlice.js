import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth_token',
  initialState: {
    accessToken: null,
  },
  reducers: {
   setUserToken : (state, action) => {
    state.accessToken  = action.payload
   },
   unSetUserToken : (state) => {
    state.accessToken = null
   }
  },
})

export const {setUserToken, unSetUserToken} = authSlice.actions

export default authSlice.reducer