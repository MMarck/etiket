/**
 * Este reducer declara un estado global que es usado para guardar datos
 * del editor de etiquetas, por ejemplo el zoom o la visibilidad de los
 * indicadores de tamaño de etiqueta
 */

import { createSlice } from '@reduxjs/toolkit';

export const LabelEditorSlice = createSlice({
  name: 'LabelEditorSlice',
  initialState: {
    showNutritionFacts: false,
    zoom: 1
  },
  reducers: {
    replaceLE: (state, action) => {
      /* Esta función es para reemplazar una clave en espefico 
        del estado, el parametro action es transformado a un diccionario 
        con la forma {type: 'NewLabel/replace', payload: [parametro_ingresado_en_replace]}
        por lo que para acceder a la carga util se debe usar la clave payload 
        
        ejemplo de seteo de datos : replaceLE(['showNutritionFacts', true])
        
        */

      // state[action.payload[0]] = action.payload[1]; no estaba cambiando de estado el reducer. Aplicado reglas eslint
      const [payload0, payload1] = action.payload;

      const newState = { ...state };
      newState[payload0] = payload1;
      return newState;
    }
  }
});
export const { replaceLE } = LabelEditorSlice.actions;

export default LabelEditorSlice.reducer;
