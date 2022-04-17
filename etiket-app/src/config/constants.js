/**
 * Ruta raiz para los iconos
 */
export const pathIcons = '/images/icons/';

export const backendURL="http://localhost:3000/";

/**
 * Unidades para el tamanio de los prototipos
 */
export const unidades=[
  {
    value: "mm",
    label: "Milímetros",
  },
  {
    value: "cm",
    label: "Centímetros",
  }
];

/**
 * Unidades de masa para el contenido de neto en los prototipos
 */
export const unidadesMasa=[
  {
    value: "ug",
    label: "ug",
  },
  {
    value: "mg",
    label: "mg",
  },
  {
      value: "g",
      label: "g",
  },
  {
      value: "kg",
      label: "kg",
  },
  {
      value: "ml",
      label: "ml",
  },
  {
    value: "l",
    label: "l",
  },
  {
    value: "L",
    label: "L",
  },
  {
    value: 'cm³',
    label: <span>cm&#179;</span>
  }
]

export const conservacionUn=[
  {
    value: "Mantener",
    label: "Mantener"
  },
  {
    value: "Conservar",
    label: "Conservar"
  }
]

export const conservacion=[
  {
      value: "ambRefr",
      label: "Al ambiente, una vez abierto, refrigerar",
  },
  {
      value: "ambFresco",
      label: "Al ambiente, fresco y seco",
  },
  {
      value: "refr",
      label: "En refrigeración",
  },
  {
      value: "cong",
      label: "En congelación",
  }
]

export const unidadesDias=[
  {
      value: "Días",
      label: "Días",
  },
  {
      value: "Meses",
      label: "Meses",
  },
  {
    value: "Año",
    label: "Año"
  },
  {
      value: "Años",
      label: "Años"
  }
]

export const fabricaciones=[
  {
    value: "Fecha de elaboración",
    label: "Fecha de elaboración",
  },
  {
      value: "Fecha de fabricación",
      label: "Fecha de fabricación",
  },
  {
    value: "Fecha de envasado",
    label: "Fecha de envasado"
  }
]

export const caducidades=[
  {
    value: "Consumir antes del",
    label: "Consumir antes del",
  },
  {
      value: "Fecha de caducidad",
      label: "Fecha de caducidad",
  },
  {
    value: "Fecha de vencimiento",
    label: "Fecha de vencimiento"
  },
  {
      value: "Consumir preferentemente antes del",
      label: "Consumir preferentemente antes del",
  },
  {
    value: "Fecha de mejor calidad",
    label: "Fecha de mejor calidad"
  },
  {
    value: "Consumir antes del final de",
    label: "Consumir antes del final de",
  },
  {
    value: "Consumir preferentemente antes del final de",
    label: "Consumir preferentemente antes del final de"
  },
  {
    value: "Fecha de mejor calidad: antes del final de",
    label: "Fecha de mejor calidad: antes del final de"
  },
  {
      value: "Fecha de caducidad: final de",
      label: "Fecha de caducidad: final de",
  },
  {
    value: "Fecha de vencimiento: final de",
    label: "Fecha de vencimiento: final de"
  }
]

export const pesosNetos=[
  {
    value: "Contenido neto",
    label: "Contenido neto"
  },
  {
    value: "Peso neto",
    label: "Peso neto"
  }
]

export const pesosDrenados=[
  {
    value: "Peso drenado",
    label: "Peso drenado"
  },
  {
    value: "Peso escurrido",
    label: "Peso escurrido"
  },
  {
    value: "Masa drenada",
    label: "Masa drenada"
  },
  {
    value: "Masa escurrida",
    label: "Masa escurrida"
  }
]

export const unidadesAlcohol=[
  {
    value:"Alcohol __%(Vol.)",
    label: "Alcohol __%(Vol.)"
  },
  {
    value:"Alcohol __%(Volumen)",
    label: "Alcohol __%(Volumen)"
  },
  {
    value:"Alc. __%(Vol.)",
    label: "Alc. __%(Vol.)"
  },
  {
    value:"ALCOHOL __%(VOL.)",
    label: "ALCOHOL __%(VOL.)"
  },
  {
    value:"ALCOHOL __%(VOLUMEN)",
    label: "ALCOHOL __%(VOLUMEN)"
  },
  {
    value:"ALC. __% (VOL.)",
    label:"ALC. __% (VOL.)"
  },
  {
    value:"ALC. __% (VOLUMEN)",
    label:"ALC. __% (VOLUMEN)"
  }
]

export const alergenos=[
  { value: "MANÍ", label: "Maní"},
  { value: "HUEVO", label: "Huevo"},
  { value: "LECHE", label: "Leche"},
  { value: "LACTOSA",label: "Lactosa"},
  { value: "GLÚTEN", label: "Glúten"},
  { value: "NUECES", label: "Nueces"},
  { value: "SOYA", label: "Soya"},
  { value: "PESCADO", label: "Pescado"},
  { value: "MARISCOS", label: "Mariscos"},
  { value: "CRUSTÁCEOS", label: "Crustáceos"},
  { value: "SEMILLAS DE SÉSAMO", label: "Semillas de sésamo"},
  { value: "MOLUSCOS", label: "Moluscos"},
  { value: "APIO", label: "Apio"},
  { value: "MOSTAZA", label: "Mostaza"},
  { value: "DIÓXIDO DE AZUFRE", label: "Dióxido de azufre"},
  { value: "SULFITOS", label: "Sulfitos"},
  { value: "CEREALES QUE CONTIENEN GLÚTEN",  label: "Cereales que contienen glúten"},
  { value: "AJONJOLÍ", label: "Altramuces"},
  { value: "COCO", label: "Coco"},
  { value: "ALMENDRA", label: "Almendra"},
  { value: "AVELLANA", label: "Avellana"},
  { value: "MACADAMIA", label: "Macadamia"},
]

export const ddMultipleStyle={
  clearIndicator: (provided, state)=>({
    ...provided,
    color: state.isFocused ? "#1ED796":"white"
  }),
  option: (provided, state)=>({
    ...provided,
    backgroundColor: state.isSelected ? '#1ED796':state.isFocused ? "#1dd79633":"#404040",
    color: "white",
    cursor: "Pointer",
  }),
  menuList: (provided, state) =>({
    ...provided,
    border: "2px solid #404040",
    backgroundColor: "#404040",
    borderRadius: "5px",
  }),
  control: (provided, state) =>({
    border: state.isDisabled ? "2px solid #00000048":"2px solid #404040",
    backgroundColor: state.isDisabled ? "#00000048":"#404040",
    display: "flex",
    cursor: "Pointer",
    borderRadius: "8px",
      
  }),
  input: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  placeholder: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  singleValue: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  dropdownIndicator: (provided, state)=>({
    ...provided,
    "&:hover":{
        color: "#1ED796"
    }
  }),
  menu: (provided, state)=>({
    ...provided,
    borderRadius: "8px",
  }),
}

export const ddNormalStyle={
  option: (provided, state)=>({
    ...provided,
    backgroundColor: state.isSelected ? '#1ED796':state.isFocused ? "#1dd79633":"#404040",
    color: "white",
    cursor: "Pointer",
  }),
  menuList: (provided, state) =>({
    ...provided,
    border: "2px solid #404040",
    backgroundColor: "#404040",
    borderRadius: "5px",
  }),
  control: (provided, state) =>({
    border: state.isDisabled ? "2px solid #00000048":"2px solid #404040",
    backgroundColor: state.isDisabled ? "#00000048":"#404040",
    display: "flex",
    cursor: "Pointer",
    width:"10vw",
    maxWidth: "30vw",
    borderRadius: "8px",
      
  }),
  input: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  placeholder: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  singleValue: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  dropdownIndicator: (provided, state)=>({
    ...provided,
    "&:hover":{
        color: "#1ED796"
    }
  }),
  menu: (provided, state)=>({
    ...provided,
    borderRadius: "8px",
  }),
}

export const ddLargeStyle={
  option: (provided, state)=>({
    ...provided,
    backgroundColor: state.isSelected ? '#1ED796':state.isFocused ? "#1dd79633":"#404040",
    color: "white",
    cursor: "Pointer",
  }),
  menuList: (provided, state) =>({
    ...provided,
    border: "2px solid #404040",
    backgroundColor: "#404040",
    borderRadius: "5px",
  }),
  control: (provided, state) =>({
    border: state.isDisabled ? "2px solid #00000048":"2px solid #404040",
    backgroundColor: state.isDisabled ? "#00000048":"#404040",
    display: "flex",
    cursor: "Pointer",
    width:"14vw",
    maxWidth: "30vw",
    borderRadius: "8px",
      
  }),
  input: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  placeholder: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  singleValue: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  dropdownIndicator: (provided, state)=>({
    ...provided,
    "&:hover":{
        color: "#1ED796"
    }
  }),
  menu: (provided, state)=>({
    ...provided,
    borderRadius: "8px",
  }),
}

export const ddLargeStyleSmallFont={
  option: (provided, state)=>({
    ...provided,
    backgroundColor: state.isSelected ? '#1ED796':state.isFocused ? "#1dd79633":"#404040",
    color: "white",
    cursor: "Pointer",
  }),
  menuList: (provided, state) =>({
    ...provided,
    border: "2px solid #404040",
    backgroundColor: "#404040",
    borderRadius: "5px",
  }),
  control: (provided, state) =>({
    border: state.isDisabled ? "2px solid #00000048":"2px solid #404040",
    backgroundColor: state.isDisabled ? "#00000048":"#404040",
    display: "flex",
    cursor: "Pointer",
    width:"14vw",
    maxWidth: "30vw",
    borderRadius: "8px",
      
  }),
  input: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  placeholder: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  singleValue: (provided,state)=>({
    ...provided,
    color: "white",
    fontSize: "0.65em"
  }),
  dropdownIndicator: (provided, state)=>({
    ...provided,
    "&:hover":{
        color: "#1ED796"
    }
  }),
  menu: (provided, state)=>({
    ...provided,
    borderRadius: "8px",
  }),
}

export const ddLargestStyle={
  option: (provided, state)=>({
    ...provided,
    backgroundColor: state.isSelected ? '#1ED796':state.isFocused ? "#1dd79633":"#404040",
    color: "white",
    cursor: "Pointer",
  }),
  menuList: (provided, state) =>({
    ...provided,
    border: "2px solid #404040",
    backgroundColor: "#404040",
    borderRadius: "5px",
  }),
  control: (provided, state) =>({
    border: state.isDisabled ? "2px solid #00000048":"2px solid #404040",
    backgroundColor: state.isDisabled ? "#00000048":"#404040",
    display: "flex",
    cursor: "Pointer",
    width:"15.41vw",
    maxWidth: "30vw",
    borderRadius: "8px",
      
  }),
  input: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  placeholder: (provided,state)=>({
    ...provided,
    color: "white",
    fontSize: "1em"
  }),
  singleValue: (provided,state)=>({
    ...provided,
    color: "white",
    fontSize: "0.65em"
  }),
  dropdownIndicator: (provided, state)=>({
    ...provided,
    "&:hover":{
        color: "#1ED796"
    }
  }),
  menu: (provided, state)=>({
    ...provided,
    borderRadius: "8px",
  }),
}

export const ddSmallStyle={
  option: (provided, state)=>({
    ...provided,
    backgroundColor: state.isSelected ? '#1ED796':state.isFocused ? "#1dd79633":"#404040",
    color: "white",
    cursor: "Pointer",
  }),
  menuList: (provided, state) =>({
    ...provided,
    border: "2px solid #404040",
    backgroundColor: "#404040",
    borderRadius: "5px",
  }),
  control: (provided,state) =>({
    border: state.isDisabled ? "2px solid #00000048":"2px solid #404040",
    backgroundColor: state.isDisabled ? "#00000048":"#404040",
    display: "flex",
    cursor: "Pointer",
    minWidth: "none",
    width: "5vw",
    borderRadius: "8px",
  }),
  input: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  placeholder: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  singleValue: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  dropdownIndicator: (provided, state)=>({
    ...provided,
    "&:hover":{
        color: "#1ED796"
    }
  }),
  menu: (provided, state)=>({
    ...provided,
    borderRadius: "8px",
  })
}


/*
 * PAISES 
*/
export const countries=[
  {
    value: "Ecuador",
    label: "Ecuador"
  },
  {
    value: "Estados Unidos",
    label: "Estados Unidos"
  },
  {
    value: "Chile",
    label: "Chile"
  },
  {
    value: "Peru",
    label: "Peru"
  },
  {
    value: "Bolivia",
    label: "Bolivia"
  }
]