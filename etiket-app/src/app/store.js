import { configureStore } from '@reduxjs/toolkit'
import etiquetaReducer from "../reducers/etiquetaSlice"
import TicketSetReducer from '../reducers/TicketSetSlice'

export default configureStore({
  reducer: {
    etiqueta: etiquetaReducer,
    TicketSet: TicketSetReducer
  },
})