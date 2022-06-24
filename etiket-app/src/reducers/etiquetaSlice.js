/* Este Documento continene el esqueleto del estado global para las etiquetas */

import { createSlice } from '@reduxjs/toolkit';
import { pesosDrenados, AproxOptions, tiposTablas, unidadesPorcion } from '../config/constants';

const Initial_State = {
  nombreProyecto: '',
  nombreProducto: '',
  country: 'Ecuador',
  tipo: 'rectangular',
  marca: '',
  ancho: '10',
  altura: '10',
  dimensionesUn: { label: 'Centímetros', value: 'cm' },
  sizeIndicatorVisibility: 'hidden',
  pesoNetoLabel: { label: 'Contenido neto', value: 'Contenido neto' },
  pesoNeto: '',
  pesoNetoUn: { label: 'g', value: 'g' },
  pesoDrenadoDisabled: true,
  pesoDrenadoLabel: pesosDrenados[0],
  pesoDrenado: '',
  pesoDrenadoUn: { label: 'g', value: '' },
  alcohol: '',
  alcoholUn: { value: 'Alcohol __% (Vol.)', label: 'Alcohol __% (Vol.)' },
  ingredientes: [],
  alergenos: [],
  conservacionUn: { label: 'Mantener', value: 'Mantener' },
  metodoConservacion: { label: 'En refrigeración', value: '' },
  vidaUtil: '',
  vidaUtilUn: { label: 'Días', value: 'Días' },
  fabricacion: handleDateChange(new Date()),
  fabricacionUn: { label: 'Fecha de elaboración', value: '' },
  caducacion: handleDateChange(new Date()),
  caducacionUn: { label: 'Fecha de caducación', value: '' },
  direccion: '',
  instrucciones: '',
  nombreProductoPos: { x: '', y: '' },
  marcaPos: { x: '', y: '' },
  pesosPos: { x: '', y: '' },
  ingPos: { x: '', y: '' },
  infNutPos: { x: '', y: '' },
  algPos: { x: '', y: '' },
  alcolPos: { x: '', y: '' },
  /* valores de la tabla nutricional */
  valoresRecomendadosDisabled: false,
  tipoTabla: tiposTablas[0],
  tamanioPorcion: 0,
  tamanioPorcionUn: unidadesPorcion[0],
  porcionPorEnvaseDisabled: true,
  porcionPorEnvase: 0,
  porcionPorEnvaseUn: AproxOptions[0],
  grasaTotal: { report: '', vdr: '' },
  grasaSaturada: { report: '', vdr: '' },
  grasasTrans: { report: '', vdr: '' },
  acidosMono: { report: '', vdr: '' },
  acidosPoli: { report: '', vdr: '' },
  colesterol: { report: '', vdr: '' },
  sodio: { report: '', vdr: '' },
  carbohidratos: { report: '', vdr: '' },
  azucares: { report: '', vdr: '' },
  proteina: { report: '', vdr: '' },
  fibra: { report: '', vdr: '' },
  energiaTotalJulios: 0,
  energiaTotalCalorias: 0
};

export const etiquetaSlice = createSlice({
  name: 'etiqueta',
  initialState: Initial_State,
  reducers: {
    /**
     * Esta función es para reemplazar un estado por el evento
     * Se pone stateName el estado a cambiar y action es el valor nuevo
     * Action tiene la forma de {nombreEstado: "", value: ""}
     * Se usaría para cosas como pesoNeto
     */
    replace: (state, action) => {
      state[action.payload.stateName] = action.payload.value;
    },
    erase: (state) => {
      let initial_State = { ...Initial_State };
      initial_State.nombreProyecto = state.nombreProyecto;
      initial_State.country = state.country;
      initial_State.tipo = state.tipo;
      return initial_State;
    },
    loadLabel: (state, action) => {
      state['nombreProyecto'] = action.payload.nombreProyecto;
      state['nombreProducto'] = action.payload.nombreEtiqueta;
      state['country'] = action.payload.country;
      state['tipo'] = action.payload.tipo;
      state['marca'] = action.payload.marca;
      state['ancho'] = action.payload.dimensiones.ancho;
      state['altura'] = action.payload.dimensiones.altura;
      state['dimensionesUn'] = action.payload.dimensiones.unidad;
      state['sizeIndicatorVisibility'] = action.payload.dimensiones.sizeIndicatorVisibility;
      state['pesoNetoLabel'] = action.payload.pesoNeto.label;
      state['pesoNeto'] = action.payload.pesoNeto.valor;
      state['pesoNetoUn'] = action.payload.pesoNeto.unidad;
      state['pesoDrenadoDisabled'] = action.payload.pesoDrenado.isDisabled;
      state['pesoDrenadoLabel'] = action.payload.pesoDrenado.label;
      state['pesoDrenado'] = action.payload.pesoDrenado.valor;
      state['pesoDrenadoUn'] = action.payload.pesoDrenado.unidad;
      state['alcohol'] = action.payload.alcohol.valor;
      state['alcoholUn'] = action.payload.alcohol.unidad;
      state['ingredientes'] = action.payload.ingredientes;
      state['alergenos'] = action.payload.alergenos;
      state['conservacionUn'] = action.payload.conservacion.unidad;
      state['metodoConservacion'] = action.payload.conservacion.metodo;
      state['vidaUtil'] = action.payload.vidaUtil.valor;
      state['vidaUtilUn'] = action.payload.vidaUtil.unidad;
      state['fabricacion'] = action.payload.fabricacion.valor;
      state['fabricacionUn'] = action.payload.fabricacion.unidad;
      state['caducacion'] = action.payload.caducacion.valor;
      state['caducacionUn'] = action.payload.caducacion.unidad;
      state['direccion'] = action.payload.direccion;
      state['instrucciones'] = action.payload.instrucciones;
      state['nombreProductoPos'] = action.payload.posicion.nombre;
      state['marcaPos'] = action.payload.posicion.marca;
      state['pesosPos'] = action.payload.posicion.pesos;
      state['ingPos'] = action.payload.posicion.ingredientes;
      state['infNutPos'] = action.payload.posicion.infNut;
      state['algPos'] = action.payload.posicion.alergenos;
      state['alcolPos'] = action.payload.posicion.alcohol;
      state['tipoTabla'] = action.payload.TablaNutri.tipo;
      state['tamanioPorcion'] = action.payload.TablaNutri.tamanioPorcion.valor;
      state['tamanioPorcionUn'] = action.payload.TablaNutri.tamanioPorcion.unidad;
      state['porcionPorEnvaseDisabled'] = action.payload.TablaNutri.porcionPorEnvase.isDisabled;
      state['porcionPorEnvase'] = action.payload.TablaNutri.porcionPorEnvase.valor;
      state['porcionPorEnvaseUn'] = action.payload.TablaNutri.porcionPorEnvase.unidad;
      state['grasaTotal'] = action.payload.TablaNutri.grasas.total;
      state['grasaSaturada'] = action.payload.TablaNutri.grasas.saturada;
      state['grasasTrans'] = action.payload.TablaNutri.grasas.trans;
      state['acidosMono'] = action.payload.TablaNutri.acidosMono;
      state['acidosPoli'] = action.payload.TablaNutri.acidosPoli;
      state['colesterol'] = action.payload.TablaNutri.colesterol;
      state['azucares'] = action.payload.TablaNutri.azucares;
      state['proteina'] = action.payload.TablaNutri.proteina;
      state['fibra'] = action.payload.TablaNutri.fibra;
      state['energiaTotalJulios'] = action.payload.TablaNutri.energiaTotal.julios;
      state['energiaTotalCalorias'] = action.payload.TablaNutri.energiaTotal.calorias;
    }
  }
});

// Action creators are generated for each case reducer function
export const { replace, erase, loadLabel } = etiquetaSlice.actions;

export default etiquetaSlice.reducer;

function handleDateChange(value) {
  const yyyy = value.getFullYear();
  let mm = value.getMonth() + 1;
  let dd = value.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const date = dd + '/' + mm + '/' + yyyy;
  return date;
}
