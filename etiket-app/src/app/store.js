import { configureStore } from '@reduxjs/toolkit'
import etiquetaReducer from "../reducers/etiquetaSlice"
import TicketSetReducer from '../reducers/TicketSetSlice'
import SessionReducer from '../reducers/SessionSlice'

export default configureStore({
  reducer: {
    session: SessionReducer,
    etiqueta: etiquetaReducer,
    TicketSet: TicketSetReducer
  },
})