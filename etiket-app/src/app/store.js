import { configureStore } from '@reduxjs/toolkit'
import etiquetaReducer from "../components/etiqueta/etiquetaSlice"

export default configureStore({
  reducer: {
    etiqueta: etiquetaReducer,
  },
})