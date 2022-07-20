/**
 * Documento de configuracion del estado global Redux,
 * aca se declara un diccionario de "reducers" que la
 * libreria usa para inicializar el estado global y que
 * posteriormente puede ser usado con las claves declaradas
 * en este diccionario
 */

import { configureStore } from '@reduxjs/toolkit';
import etiquetaReducer from '../reducers/etiquetaSlice';
import LabelEditorSliceA from '../reducers/LabelEditorSlice';

export default configureStore({
  reducer: {
    etiqueta: etiquetaReducer,
    LabelEditorSlice: LabelEditorSliceA
  }
});
