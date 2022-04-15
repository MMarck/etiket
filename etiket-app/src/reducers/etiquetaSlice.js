import { createSlice } from '@reduxjs/toolkit'




export const etiquetaSlice = createSlice({
  name: 'etiqueta',
  initialState: {
    nombre:'',
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
    pesoDrenadoLabel: {label:"Peso drenado", value: "Peso drenado"},
    pesoDrenado: "",
    pesoDrenadoUn:{},
    alcohol:"",
    alcoholUn:{value:"Alcohol __% (Vol.)", label:"Alcohol __% (Vol.)"},
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
      state[action.payload.stateName] = action.payload.value;
    },
    erase: (state) => {
      state.isDisabled= false;
      state.ancho= "10";
      state.altura= "10";
      state.dimensionesUn={label:"Centímetros",value:"cm"};
      state.nombreProducto= '';
      state.marca= "";
      state.pesoNetoLabel= {label:"Contenido neto", value: "Contenido neto"};
      state.pesoNeto= "";
      state.pesoNetoUn={label:"g", value:"g"};
      state.pesoDrenadoDisabled=true;
      state.pesoDrenadoLabel= {};
      state.pesoDrenado= "";
      state.pesoDrenadoUn={};
      state.alcohol="";
      state.alcoholUn={value:"Alcohol __% (Vol.)", label:"Alcohol __% (Vol.)"};
      state.ingredientes= '';
      state.alergenos= '';
      state.conservacionUn= {label:"Mantener", value:"Mantener"};
      state.metodoConservacion= {label:"En refrigeración", value:""};
      state.vidaUtil='';
      state.vidaUtilUn= {label: "Días", value: "Días"};
      state.fabricacion=handleDateChange(new Date());
      state.fabricacionUn={label: "Fecha de elaboración", value: ""};
      state.caducacion=handleDateChange(new Date());
      state.caducacionUn={label: "Fecha de caducación", value: ""};
      state.direccion= '';
      state.instrucciones= '';
      state.pesosPos= {x:0,y:0};
      state.nombrePos= {x:0,y:0};
      state.marcaPos= {x:0, y:0};
      state.ingPos= {x:0, y:0};
      state.algPos= {x:0, y:0};
      state.infNutPos={x:0, y:0};
    },
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

const initial={
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
  alcoholUn:{value:"Alcohol __% (Vol.)", label:"Alcohol __% (Vol.)"},
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
}