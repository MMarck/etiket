import { createSlice } from '@reduxjs/toolkit'

export const etiquetaSlice = createSlice({
  name: 'etiqueta',
  initialState: {
    isDisabled: false,
    ancho: "",
    altura: "",
    dimensionesUn: {label:"Centímetros",value:"cm"},
    nombreProducto: '',
    marca: "",
    pesoNeto: {label:"Contenido neto", value: "Contenido neto"},
    pesoNetoUn:{label:"g", value:"g"},
    pesoDrenadoDisabled:true,
    pesoDrenado: {},
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
    replace: (state,stateName,event) => {
      // Esta función es para reemplazar un estado por el evento
      // Se pone stateName el estado a cambiar y event es el valor nuevo
      // Se usaría para cosas como pesoNeto
      state[stateName] = event
    }
  },
})

// Action creators are generated for each case reducer function
export const { replace } = etiquetaSlice.actions

export default etiquetaSlice.reducer