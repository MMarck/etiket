import { createSlice } from '@reduxjs/toolkit'

export const NewTicketSlice = createSlice({
  name: 'NewTicket',
  initialState: {
      country:'Ecuador',
      type:'',
      name:'',
      user:null
  },
  reducers: {
    replace: (state,action) => {
        /* Esta función es para reemplazar una clave en espefico 
        del estado, el parametro action es transformado a un diccionario 
        con la forma {type: 'NewTicket/replace', payload: [parametro_ingresado_en_replace]}
        por lo que para acceder a la carga util se debe usar la clave payload */
        state[action.payload[0]] = action.payload[1]
      }
  },
})
export const { replace } = NewTicketSlice.actions

export default NewTicketSlice.reducer

