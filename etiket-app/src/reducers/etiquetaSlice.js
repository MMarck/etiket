import { createSlice } from '@reduxjs/toolkit'




export const etiquetaSlice = createSlice({
  name: 'etiqueta',
  initialState: {
    isDisabled: false,
    ancho: "10",
    altura: "10",
    sizeIndicatorVisibility: 'hidden',
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
    conservacionUn: {label:"Mantener", value:"Mantener"},
    metodoConservacion: {label:"En refrigeración", value:""},
    vidaUtil:'',
    vidaUtilUn: {label: "Días", value: "Días"},
    fabricacion:handleDateChange(new Date()),
    fabricacionUn:{label: "Fecha de elaboración", value: ""},
    caducacion:handleDateChange(new Date()),
    caducacionUn:{label: "Fecha de caducación", value: ""},
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
    }
  },
})

// Action creators are generated for each case reducer function
export const { replace } = etiquetaSlice.actions

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