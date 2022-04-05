import { configureStore } from '@reduxjs/toolkit'
import etiquetaReducer from "../features/etiqueta/etiquetaSlice"

export default configureStore({
  reducer: {
    etiqueta: etiquetaReducer,
  },
})