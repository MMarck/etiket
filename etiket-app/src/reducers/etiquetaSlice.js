/* eslint-disable no-use-before-define */
/* Este Documento continene el esqueleto del estado global para las etiquetas */

import { createSlice } from '@reduxjs/toolkit';
import { pesosDrenados, AproxOptions, tiposTablas, unidadesPorcion } from '../config/constants';

const InitialState = {
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
  lote: '',
  addInfo: [],
  direccion: {
    producer: {
      ddMenu: { value: 'Elaborado por', label: 'Elaborado por' },
      description: ''
    },
    importer: {
      state: false,
      ddMenu: { value: 'Importado por', label: 'Importado por' },
      description: ''
    },
    marketer: {
      state: false,
      ddMenu: { value: 'Comercializado por', label: 'Comercializado por' },
      description: ''
    }
  },
  instrucciones: '',
  pvp: '',
  /* Posiciones de los diferentes cuadros */
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
  initialState: InitialState,
  reducers: {
    /**
     * Esta función es para reemplazar un estado por el evento
     * Se pone stateName el estado a cambiar y action es el valor nuevo
     * Action tiene la forma de {nombreEstado: "", value: ""}
     * Se usaría para cosas como pesoNeto
     */
    replace: (state, action) => {
      const { stateName, value } = action.payload;
      const newState = { ...state };
      newState[stateName] = value;
      return newState;
      // state[action.payload.stateName] = action.payload.value;
    },
    erase: (state) => {
      const initialState = { ...InitialState };
      initialState.nombreProyecto = state.nombreProyecto;
      initialState.country = state.country;
      initialState.tipo = state.tipo;
      return initialState;
    },
    loadLabel: (state, action) => {
      const newState = { ...state };
      const instCopy = JSON.parse(JSON.stringify(action.payload.instrucciones));
      const instRes = instCopy.join('\n');
      newState.nombreProyecto = action.payload.nombreProyecto;
      newState.nombreProducto = action.payload.nombreEtiqueta;
      newState.country = action.payload.country;
      newState.tipo = action.payload.tipo;
      newState.marca = action.payload.marca;
      newState.ancho = action.payload.dimensiones.ancho;
      newState.altura = action.payload.dimensiones.altura;
      newState.dimensionesUn = action.payload.dimensiones.unidad;
      newState.sizeIndicatorVisibility = action.payload.dimensiones.sizeIndicatorVisibility;
      newState.pesoNetoLabel = action.payload.pesoNeto.label;
      newState.pesoNeto = action.payload.pesoNeto.valor;
      newState.pesoNetoUn = action.payload.pesoNeto.unidad;
      newState.pesoDrenadoDisabled = action.payload.pesoDrenado.isDisabled;
      newState.pesoDrenadoLabel = action.payload.pesoDrenado.label;
      newState.pesoDrenado = action.payload.pesoDrenado.valor;
      newState.pesoDrenadoUn = action.payload.pesoDrenado.unidad;
      newState.alcohol = action.payload.alcohol.valor;
      newState.alcoholUn = action.payload.alcohol.unidad;
      newState.ingredientes = action.payload.ingredientes;
      newState.alergenos = action.payload.alergenos;
      newState.conservacionUn = action.payload.conservacion.unidad;
      newState.metodoConservacion = action.payload.conservacion.metodo;
      newState.vidaUtil = action.payload.vidaUtil.valor;
      newState.vidaUtilUn = action.payload.vidaUtil.unidad;
      newState.fabricacion = action.payload.fabricacion.valor;
      newState.fabricacionUn = action.payload.fabricacion.unidad;
      newState.caducacion = action.payload.caducacion.valor;
      newState.caducacionUn = action.payload.caducacion.unidad;
      newState.lote = action.payload.lote;
      newState.addInfo = action.payload.addInfo;
      newState.direccion = action.payload.direccion;
      newState.instrucciones = instRes;
      newState.pvp = action.payload.pvp;
      newState.nombreProductoPos = action.payload.posicion.nombre;
      newState.marcaPos = action.payload.posicion.marca;
      newState.pesosPos = action.payload.posicion.pesos;
      newState.ingPos = action.payload.posicion.ingredientes;
      newState.infNutPos = action.payload.posicion.infNut;
      newState.algPos = action.payload.posicion.alergenos;
      newState.alcolPos = action.payload.posicion.alcohol;
      newState.tipoTabla = action.payload.TablaNutri.tipo;
      newState.tamanioPorcion = action.payload.TablaNutri.tamanioPorcion.valor;
      newState.tamanioPorcionUn = action.payload.TablaNutri.tamanioPorcion.unidad;
      newState.porcionPorEnvaseDisabled = action.payload.TablaNutri.porcionPorEnvase.isDisabled;
      newState.porcionPorEnvase = action.payload.TablaNutri.porcionPorEnvase.valor;
      newState.porcionPorEnvaseUn = action.payload.TablaNutri.porcionPorEnvase.unidad;
      newState.grasaTotal = action.payload.TablaNutri.grasas.total;
      newState.grasaSaturada = action.payload.TablaNutri.grasas.saturada;
      newState.grasasTrans = action.payload.TablaNutri.grasas.trans;
      newState.acidosMono = action.payload.TablaNutri.acidosMono;
      newState.acidosPoli = action.payload.TablaNutri.acidosPoli;
      newState.colesterol = action.payload.TablaNutri.colesterol;
      newState.azucares = action.payload.TablaNutri.azucares;
      newState.proteina = action.payload.TablaNutri.proteina;
      newState.fibra = action.payload.TablaNutri.fibra;
      newState.energiaTotalJulios = action.payload.TablaNutri.energiaTotal.julios;
      newState.energiaTotalCalorias = action.payload.TablaNutri.energiaTotal.calorias;
      return newState;
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

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;

  const date = `${dd}/${mm}/${yyyy}`;
  return date;
}
