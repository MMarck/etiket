import { createSlice } from '@reduxjs/toolkit'

export const LabelEditorSlice = createSlice({
  name: 'LabelEditorSlice',
  initialState: {
    showNutritionFacts: false
  },
  reducers: {
    replaceLE: (state,action) => {
        /* Esta función es para reemplazar una clave en espefico 
        del estado, el parametro action es transformado a un diccionario 
        con la forma {type: 'NewTicket/replace', payload: [parametro_ingresado_en_replace]}
        por lo que para acceder a la carga util se debe usar la clave payload 
        
        ejemplo de seteo de datos : replaceLE(['showNutritionFacts', true])
        
        */
       console.log(action.payload)
        state[action.payload[0]] = action.payload[1]
      }
  },
})
export const { replaceLE } = LabelEditorSlice.actions

export default LabelEditorSlice.reducer

