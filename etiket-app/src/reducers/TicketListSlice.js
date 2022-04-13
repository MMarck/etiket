import { createSlice } from '@reduxjs/toolkit'

export const TicketListSlice = createSlice({
  name: 'ticketSet',
  initialState: [],
  reducers: {
    setTickets: (state,action) => {
      /* El parametro action es trasformado a un diccionario con la forma
      {type: 'NewTicket/replace', payload: [parametro_ingresado_en_add]}
      este reducer reemplaza completamente el estado con el valor en el 
      payload*/
      return action.payload
    }
  },
})
export const { setTickets } = TicketListSlice.actions

export default TicketListSlice.reducer

