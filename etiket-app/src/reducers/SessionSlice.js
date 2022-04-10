import { createSlice } from '@reduxjs/toolkit'

export const SessionSlice = createSlice({
  name: 'Session',
  initialState: false,
  reducers: {
    setUser: (state,value) => {
      state = value
    }
  },
})
export const { setUser } = SessionSlice.actions

export default SessionSlice.reducer

