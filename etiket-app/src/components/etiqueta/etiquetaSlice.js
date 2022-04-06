import { createSlice } from '@reduxjs/toolkit'

export const etiquetaSlice = createSlice({
  name: 'etiqueta',
  initialState: {
    isDisabled: false,
    ancho: "10",
    altura: "10",
    dimensionesUn: {label:"Centímetros",value:"cm"},
    nombreProducto: '',
    marca: "",
    pesoNetoLabel: {label:"Contenido neto", value: "Contenido neto"},
    pesoNeto: "",
    pesoNetoUn:{label:"g", value:"g"},
    pesoDrenadoDisabled:true,
    pesoDrenadoLabel: {},
    pesoDrenado: "",
    pesoDrenadoUn:{},
    alcohol:"",
    alcoholUn:{},
    ingredientes: '',
    alergenos: '',
    metodoConservacion: '',
    vidaUtil:'',
    direccion: '',
    instrucciones: '',
    pesosPos: {x:0,y:0},
    nombrePos: {x:0,y:0},
    marcaPos: {x:0, y:0},
    ingPos: {x:0, y:0},
    algPos: {x:0, y:0},
    infNutPos: {x:0, y:0}
  },
  reducers: {
    replace: (state,action) => {
      // Esta función es para reemplazar un estado por el evento
      // Se pone stateName el estado a cambiar y action es el valor nuevo
      // Action tiene la forma de {nombreEstado: "", value: ""}
      // Se usaría para cosas como pesoNeto
      state[action.payload.stateName] = action.payload.value
      console.log(state[action.payload.stateName])
    }
  },
})

// Action creators are generated for each case reducer function
export const { replace } = etiquetaSlice.actions

export default etiquetaSlice.reducer