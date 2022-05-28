import { configureStore } from '@reduxjs/toolkit'
import etiquetaReducer from "../reducers/etiquetaSlice"
import LabelEditorSlice from '../reducers/LabelEditorSlice'

export default configureStore({
  reducer: {
    etiqueta: etiquetaReducer,
    LabelEditorSlice: LabelEditorSlice
  },
})