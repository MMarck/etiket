import { configureStore } from '@reduxjs/toolkit'
import etiquetaReducer from "../reducers/etiquetaSlice"
import TicketListReducer from '../reducers/TicketListSlice'
import SessionReducer from '../reducers/SessionSlice'
import LabelEditorSlice from '../reducers/LabelEditorSlice'

export default configureStore({
  reducer: {
    session: SessionReducer,
    etiqueta: etiquetaReducer,
    ticketList: TicketListReducer,
    LabelEditorSlice: LabelEditorSlice
  },
})