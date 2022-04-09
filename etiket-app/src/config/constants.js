const pathIcons = '../images/icons/';

const unidades=[
  {
      value: "mm",
      label: "Milímetros",
  },
  {
      value: "cm",
      label: "Centímetros",
  },
  {
      value: "pulg",
      label: "Púlgadas",
  }
];

const unidadesMasa=[
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
    value: "cm",
    label: <span>cm&#179;</span>
  }
]

const conservacion=[
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

const unidadesDias=[
  {
      value: "Días",
      label: "Días",
  },
  {
      value: "Meses",
      label: "Meses",
  },
  {
      value: "Años",
      label: "Años"
  }
]

const pesosNetos=[
  {
    value: "Contenido neto",
    label: "Contenido neto"
  },
  {
    value: "Peso neto",
    label: "Peso neto"
  }
]

const pesosDrenados=[
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

const unidadesAlcohol=[
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

const alergenos=[
  { value: "tartrazina", label: "Tartrazina"},
  { value: "fenil", label: "Fenilcetronuricos: Fenilanina"},
  { value: "gluten", label: "Gluten"},
  { value: "crustaceos",label: "Crustáceos"},
  { value: "huevo", label: "Huevo"},
  { value: "pescado", label: "Pescado"},
  { value: "mani", label: "Maní"},
  { value: "soya", label: "Soya"},
  { value: "leche", label: "Leche"},
  { value: "lactosa", label: "Lactosa"},
  { value: "nueces", label: "Nueces"},
  { value: "almendras", label: "Almendras"},
  { value: "avellanas", label: "Avellanas"},
  { value: "anacardos", label: "Anacardos"},
  { value: "nuecesMacadamia", label: "Nueces Macadamia"},
  { value: "apio", label: "Apio"},
  { value: "mostaza",  label: "Mostaza"},
  { value: "altramuces", label: "Altramuces"},
  { value: "sesamo", label: "Sésamo"},
  { value: "regaliz", label: "Regaliz"}
]

const ddMultipleStyle={
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

const ddLargerStyle={
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

const ddLargestStyle={
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

const ddSmallStyle={
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