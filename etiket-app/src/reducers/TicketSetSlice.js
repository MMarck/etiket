import { createSlice } from '@reduxjs/toolkit'

export const TicketSetSlice = createSlice({
  name: 'ticketSet',
  initialState: {
    set: ''
  },
  reducers: {
    add: (state,value) => {
      state['set'] = value
    }
  },
})
export const { add } = TicketSetSlice.actions

export default TicketSetSlice.reducer

