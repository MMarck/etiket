import { createSlice } from '@reduxjs/toolkit'
import { 
  pesosDrenados,
  AproxOptions, 
  tiposTablas, 
  unidadesPorcion 
} from '../config/constants';

const Initial_State={
  nombreProyecto:"",
  country: "Ecuador",
  tipo: "rectangular",
  ancho: "10",
  altura: "10",
  dimensionesUn: {label:"Centímetros",value:"cm"},
  sizeIndicatorVisibility: 'hidden',
  nombreProducto: '',
  marca: "",
  pesoNetoLabel: {label:"Contenido neto", value: "Contenido neto"},
  pesoNeto: "",
  pesoNetoUn:{label:"g", value:"g"},
  pesoDrenadoDisabled:true,
  pesoDrenadoLabel: pesosDrenados[0],
  pesoDrenado: "",
  pesoDrenadoUn:{},
  alcohol:"",
  alcoholUn:{value:"Alcohol __% (Vol.)", label:"Alcohol __% (Vol.)"},
  ingredientes: '',
  alergenos: [],
  conservacionUn: {label:"Mantener", value:"Mantener"},
  metodoConservacion: {label:"En refrigeración", value:""},
  vidaUtil:'',
  vidaUtilUn: {label: "Días", value: "Días"},
  fabricacion: handleDateChange(new Date()),
  fabricacionUn:{label: "Fecha de elaboración", value: ""},
  caducacion: handleDateChange(new Date()),
  caducacionUn:{label: "Fecha de caducación", value: ""},
  direccion: '',
  instrucciones: '',
  nombreProductoPos: {x:'3.5cm',y:"1cm"},
  marcaPos: {x:'3.5cm',y:"1.5cm"},
  pesosPos: {x:'3.5cm',y:"0cm"},
  ingPos: {x:0, y:0},
  infNutPos: {x:0, y:0},
  algPos: {x:0, y:0},
  alcolPos:{x:'4cm',y:"0cm"},
  /* valores de la tabla nutricional */
  tipoTabla: tiposTablas[0],
  tamanioPorcion: 0,
  tamanioPorcionUn: unidadesPorcion[0],
  porcionPorEnvaseDisabled:true,
  porcionPorEnvase: 0,
  porcionPorEnvaseUn: AproxOptions[0],
  grasaTotal: {report:'', vdr:''},
  grasaSaturada: {report:'', vdr:''},
  grasasTrans: {report:'', vdr:''},
  acidosMono: {report:'', vdr:''},
  acidosPoli: {report:'', vdr:''},
  colesterol: {report:'', vdr:''},
  sodio: {report:'', vdr:''},
  carbohidratos: {report:'', vdr:''},
  azucares: {report:'', vdr:''},
  proteina: {report:'', vdr:''},
  fibra: {report:'', vdr:''},
  energiaTotalJulios: 0,
  energiaTotalCalorias: 0,
}

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
    replace: (state,action) => {
      state[action.payload.stateName] = action.payload.value;
    },
    erase: (state) => Initial_State,
  },
})

// Action creators are generated for each case reducer function
export const { replace, erase } = etiquetaSlice.actions

export default etiquetaSlice.reducer


function handleDateChange(value){

  const yyyy = value.getFullYear();
  let mm = value.getMonth() + 1; 
  let dd = value.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const date = dd + '/' + mm + '/' + yyyy
  return date
}

