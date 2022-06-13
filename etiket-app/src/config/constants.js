/* Contantes de Javascript usadas en distintas funciones y 
componentes del sistema */

/**
 * Ruta raiz para los iconos
 */
export const pathIcons = '/images/icons/';

export const backendURL = 'http://localhost:3002/';

/**
 * Unidades para el tamanio de los prototipos
 */
export const unidades = [
  {
    value: 'mm',
    label: 'Milímetros'
  },
  {
    value: 'cm',
    label: 'Centímetros'
  }
];

/**
 * Unidades de masa para el contenido de neto en los prototipos
 */
export const unidadesMasa = [
  {
    value: 'ug',
    label: 'ug'
  },
  {
    value: 'mg',
    label: 'mg'
  },
  {
    value: 'g',
    label: 'g'
  },
  {
    value: 'kg',
    label: 'kg'
  },
  {
    value: 'ml',
    label: 'ml'
  },
  {
    value: 'l',
    label: 'l'
  },
  {
    value: 'L',
    label: 'L'
  },
  {
    value: 'cm³',
    label: <span>cm&#179;</span>
  }
];

/**
 * Unidades para las porciones en la tabla de informacion nutricional
 */
export const unidadesPorcion = [
  {
    value: 'g',
    label: 'g'
  },
  {
    value: 'mg',
    label: 'mg'
  },
  {
    value: 'g',
    label: 'g'
  },
  {
    value: 'kg',
    label: 'kg'
  },
  {
    value: 'ml',
    label: 'ml'
  },
  {
    value: 'l',
    label: 'l'
  },
  {
    value: 'L',
    label: 'L'
  },
  {
    value: 'und',
    label: 'und'
  },
  {
    value: 'unidad',
    label: 'unidad'
  },
  {
    value: 'unidades',
    label: 'unidades'
  },
  {
    value: 'cda',
    label: 'cda'
  },
  {
    value: 'cdas',
    label: 'cdas'
  },
  {
    value: 'cucharada',
    label: 'cucharada'
  },
  {
    value: 'cucharadas',
    label: 'cucharadas'
  },
  {
    value: 'cdta',
    label: 'cdta'
  },
  {
    value: 'cdtas',
    label: 'cdtas'
  },
  {
    value: 'cucharadita',
    label: 'cucharadita'
  },
  {
    value: 'cucharaditas',
    label: 'cucharaditas'
  },
  {
    value: 'pieza',
    label: 'pieza'
  },
  {
    value: 'piezas',
    label: 'piezas'
  },
  {
    value: 'porción',
    label: 'porción'
  },
  {
    value: 'porciones',
    label: 'porciones'
  },
  {
    value: 'tz',
    label: 'tz'
  },
  {
    value: 'taza',
    label: 'taza'
  },
  {
    value: 'tazas',
    label: 'tazas'
  },
  {
    value: 'gota',
    label: 'gota'
  },
  {
    value: 'gotas',
    label: 'gotas'
  },
  {
    value: 'rebanada',
    label: 'rebanada'
  },
  {
    value: 'rebanadas',
    label: 'rebanadas'
  }
];

/**
 * Unidades para las porciones en la tabla de informacion nutricional
 */
export const tiposTablas = [
  {
    value: 'Formato estándar',
    label: 'Formato estandar'
  },
  {
    value: 'Formato tabular',
    label: 'Formato tabular'
  },
  {
    value: 'Estándar vertical (lado a lado)',
    label: 'Estándar vertical'
  }
];

export const conservacionUn = [
  {
    value: 'Mantener',
    label: 'Mantener'
  },
  {
    value: 'Conservar',
    label: 'Conservar'
  }
];

export const conservacion = [
  {
    value: 'ambRefr',
    label: 'Al ambiente, una vez abierto, refrigerar'
  },
  {
    value: 'ambFresco',
    label: 'Al ambiente, fresco y seco'
  },
  {
    value: 'refr',
    label: 'En refrigeración'
  },
  {
    value: 'cong',
    label: 'En congelación'
  }
];

export const unidadesDias = [
  {
    value: 'Días',
    label: 'Días'
  },
  {
    value: 'Meses',
    label: 'Meses'
  },
  {
    value: 'Año',
    label: 'Año'
  },
  {
    value: 'Años',
    label: 'Años'
  }
];

export const fabricaciones = [
  {
    value: 'Fecha de elaboración',
    label: 'Fecha de elaboración'
  },
  {
    value: 'Fecha de fabricación',
    label: 'Fecha de fabricación'
  },
  {
    value: 'Fecha de envasado',
    label: 'Fecha de envasado'
  }
];

export const caducidades = [
  {
    value: 'Consumir antes del',
    label: 'Consumir antes del'
  },
  {
    value: 'Fecha de caducidad',
    label: 'Fecha de caducidad'
  },
  {
    value: 'Fecha de vencimiento',
    label: 'Fecha de vencimiento'
  },
  {
    value: 'Consumir preferentemente antes del',
    label: 'Consumir preferentemente antes del'
  },
  {
    value: 'Fecha de mejor calidad',
    label: 'Fecha de mejor calidad'
  },
  {
    value: 'Consumir antes del final de',
    label: 'Consumir antes del final de'
  },
  {
    value: 'Consumir preferentemente antes del final de',
    label: 'Consumir preferentemente antes del final de'
  },
  {
    value: 'Fecha de mejor calidad: antes del final de',
    label: 'Fecha de mejor calidad: antes del final de'
  },
  {
    value: 'Fecha de caducidad: final de',
    label: 'Fecha de caducidad: final de'
  },
  {
    value: 'Fecha de vencimiento: final de',
    label: 'Fecha de vencimiento: final de'
  }
];

export const pesosNetos = [
  {
    value: 'Contenido neto:',
    label: 'Contenido neto'
  },
  {
    value: 'Peso neto:',
    label: 'Peso neto'
  }
];

export const pesosDrenados = [
  {
    value: 'Peso drenado:',
    label: 'Peso drenado'
  },
  {
    value: 'Peso escurrido:',
    label: 'Peso escurrido'
  },
  {
    value: 'Masa drenada:',
    label: 'Masa drenada'
  },
  {
    value: 'Masa escurrida:',
    label: 'Masa escurrida'
  }
];

export const unidadesAlcohol = [
  {
    value: 'Alcohol __%(Vol.)',
    label: 'Alcohol __%(Vol.)'
  },
  {
    value: 'Alcohol __%(Volumen)',
    label: 'Alcohol __%(Volumen)'
  },
  {
    value: 'Alc. __%(Vol.)',
    label: 'Alc. __%(Vol.)'
  },
  {
    value: 'ALCOHOL __%(VOL.)',
    label: 'ALCOHOL __%(VOL.)'
  },
  {
    value: 'ALCOHOL __%(VOLUMEN)',
    label: 'ALCOHOL __%(VOLUMEN)'
  },
  {
    value: 'ALC. __% (VOL.)',
    label: 'ALC. __% (VOL.)'
  },
  {
    value: 'ALC. __% (VOLUMEN)',
    label: 'ALC. __% (VOLUMEN)'
  }
];

/**
 * Opciones para porciones por envase
 */
export const AproxOptions = [
  {
    value: 'aprox.',
    label: 'aprox.'
  },
  {
    value: 'aproximadamente',
    label: 'aproximadamente'
  }
];
export const alergenos = [
  { value: 'MANÍ', label: 'Maní' },
  { value: 'HUEVO', label: 'Huevo' },
  { value: 'LECHE', label: 'Leche' },
  { value: 'LACTOSA', label: 'Lactosa' },
  { value: 'GLÚTEN', label: 'Glúten' },
  { value: 'NUECES', label: 'Nueces' },
  { value: 'SOYA', label: 'Soya' },
  { value: 'PESCADO', label: 'Pescado' },
  { value: 'MARISCOS', label: 'Mariscos' },
  { value: 'CRUSTÁCEOS', label: 'Crustáceos' },
  { value: 'SEMILLAS DE SÉSAMO', label: 'Semillas de sésamo' },
  { value: 'MOLUSCOS', label: 'Moluscos' },
  { value: 'APIO', label: 'Apio' },
  { value: 'MOSTAZA', label: 'Mostaza' },
  { value: 'DIÓXIDO DE AZUFRE', label: 'Dióxido de azufre' },
  { value: 'SULFITOS', label: 'Sulfitos' },
  {
    value: 'CEREALES QUE CONTIENEN GLÚTEN',
    label: 'Cereales que contienen glúten'
  },
  { value: 'AJONJOLÍ', label: 'Altramuces' },
  { value: 'COCO', label: 'Coco' },
  { value: 'ALMENDRA', label: 'Almendra' },
  { value: 'AVELLANA', label: 'Avellana' },
  { value: 'MACADAMIA', label: 'Macadamia' }
];

export const ddMultipleStyle = {
  clearIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#1ED796' : 'white'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#1ED796' : state.isFocused ? '#1dd79633' : '#404040',
    color: 'white',
    cursor: 'Pointer'
  }),
  menuList: (provided, state) => ({
    ...provided,
    border: '2px solid #404040',
    backgroundColor: '#404040',
    borderRadius: '5px'
  }),
  control: (provided, state) => ({
    border: state.isDisabled ? '2px solid #00000048' : '2px solid #404040',
    backgroundColor: state.isDisabled ? '#00000048' : '#404040',
    display: 'flex',
    cursor: 'Pointer',
    borderRadius: '8px'
  }),
  input: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    '&:hover': {
      color: '#1ED796'
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: '8px'
  })
};

export const ddNormalStyle = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#1ED796' : state.isFocused ? '#1dd79633' : '#404040',
    color: 'white',
    cursor: 'Pointer'
  }),
  menuList: (provided, state) => ({
    ...provided,
    border: '2px solid #404040',
    backgroundColor: '#404040',
    borderRadius: '5px'
  }),
  control: (provided, state) => ({
    border: state.isDisabled ? '2px solid #00000048' : '2px solid #404040',
    backgroundColor: state.isDisabled ? '#00000048' : '#404040',
    display: 'flex',
    cursor: 'Pointer',
    width: '10vw',
    maxWidth: '30vw',
    borderRadius: '8px'
  }),
  input: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    '&:hover': {
      color: '#1ED796'
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: '8px'
  })
};

export const ddLargeStyle = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#1ED796' : state.isFocused ? '#1dd79633' : '#404040',
    color: 'white',
    cursor: 'Pointer'
  }),
  menuList: (provided, state) => ({
    ...provided,
    border: '2px solid #404040',
    backgroundColor: '#404040',
    borderRadius: '5px'
  }),
  control: (provided, state) => ({
    border: state.isDisabled ? '2px solid #00000048' : '2px solid #404040',
    backgroundColor: state.isDisabled ? '#00000048' : '#404040',
    display: 'flex',
    cursor: 'Pointer',
    width: '14vw',
    maxWidth: '30vw',
    borderRadius: '8px'
  }),
  input: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    '&:hover': {
      color: '#1ED796'
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: '8px'
  })
};

export const ddLargeStyleSmallFont = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#1ED796' : state.isFocused ? '#1dd79633' : '#404040',
    color: 'white',
    cursor: 'Pointer'
  }),
  menuList: (provided, state) => ({
    ...provided,
    border: '2px solid #404040',
    backgroundColor: '#404040',
    borderRadius: '5px'
  }),
  control: (provided, state) => ({
    border: state.isDisabled ? '2px solid #00000048' : '2px solid #404040',
    backgroundColor: state.isDisabled ? '#00000048' : '#404040',
    display: 'flex',
    cursor: 'Pointer',
    width: '14vw',
    maxWidth: '30vw',
    borderRadius: '8px'
  }),
  input: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'white',
    fontSize: '0.65em'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    '&:hover': {
      color: '#1ED796'
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: '8px'
  })
};

export const ddLargestStyle = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#1ED796' : state.isFocused ? '#1dd79633' : '#404040',
    color: 'white',
    cursor: 'Pointer'
  }),
  menuList: (provided, state) => ({
    ...provided,
    border: '2px solid #404040',
    backgroundColor: '#404040',
    borderRadius: '5px'
  }),
  control: (provided, state) => ({
    border: state.isDisabled ? '2px solid #00000048' : '2px solid #404040',
    backgroundColor: state.isDisabled ? '#00000048' : '#404040',
    display: 'flex',
    cursor: 'Pointer',
    width: '15.41vw',
    maxWidth: '30vw',
    borderRadius: '8px'
  }),
  input: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: 'white',
    fontSize: '1em'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'white',
    fontSize: '0.65em'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    '&:hover': {
      color: '#1ED796'
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: '8px'
  })
};

export const ddSmallStyle = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#1ED796' : state.isFocused ? '#1dd79633' : '#404040',
    color: 'white',
    cursor: 'Pointer'
  }),
  menuList: (provided, state) => ({
    ...provided,
    border: '2px solid #404040',
    backgroundColor: '#404040',
    borderRadius: '5px'
  }),
  control: (provided, state) => ({
    border: state.isDisabled ? '2px solid #00000048' : '2px solid #404040',
    backgroundColor: state.isDisabled ? '#00000048' : '#404040',
    display: 'flex',
    cursor: 'Pointer',
    minWidth: 'none',
    width: '5vw',
    borderRadius: '8px'
  }),
  input: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    '&:hover': {
      color: '#1ED796'
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: '8px'
  })
};

/*
 * PAISES
 */
export const countries = [
  {
    value: 'Ecuador',
    label: 'Ecuador'
  },
  {
    value: 'Estados Unidos',
    label: 'Estados Unidos'
  },
  {
    value: 'Chile',
    label: 'Chile'
  },
  {
    value: 'Peru',
    label: 'Peru'
  },
  {
    value: 'Bolivia',
    label: 'Bolivia'
  }
];

/**
 * Nutrientes a declararse en la informacion nutricional
 */
export const Nutrientes = {
  grasaTotal: 65,
  grasaSaturada: 20,
  colesterol: 300,
  sodio: 2400,
  carbohidratos: 300,
  proteina: 50
};

/*
 * Nueva etiqueta por defecto
 */

export const newLabelDefault = (id, nombre, tipo) => {
  const res = {
    user: id,
    nombreProyecto: nombre,
    tipo,
    nombreEtiqueta: '',
    marca: '',
    dimensiones: {
      ancho: '10',
      altura: '10',
      unidad: { label: 'Centímetros', value: 'cm' },
      sizeIndicatorVisibility: 'hidden'
    },
    pesoNeto: {
      valor: '',
      label: { label: 'Contenido neto', value: 'Contenido neto' },
      unidad: { label: 'g', value: 'g' }
    },
    pesoDrenado: {
      valor: '',
      label: { label: 'Contenido drenado', value: 'Contenido drenado' },
      unidad: { label: 'g', value: 'g' },
      isDisabled: 'true'
    },
    alcohol: {
      valor: '',
      unidad: { value: 'Alcohol __% (Vol.)', label: 'Alcohol __% (Vol.)' }
    },
    ingredientes: [],
    alergenos: [],
    conservacion: {
      metodo: { label: 'En refrigeración', value: 'En refrigeración' },
      unidad: { label: 'Mantener', value: 'Mantener' }
    },
    vidaUtil: {
      valor: '',
      unidad: { label: 'Días', value: 'Días' }
    },
    fabricacion: {
      valor: handleDateChange(new Date()),
      unidad: { label: 'Fecha de elaboración', value: 'Fecha de elaboración' }
    },
    caducacion: {
      valor: handleDateChange(new Date()),
      unidad: { label: 'Fecha de caducacion', value: 'Fecha de caducacion' }
    },
    direccion: '',
    instrucciones: '',
    posicion: {
      pesos: {
        x: 0,
        y: 0
      },
      nombre: {
        x: 0,
        y: 0
      },
      ingredientes: {
        x: 0,
        y: 0
      },
      alergenos: {
        x: 0,
        y: 0
      },
      infNut: {
        x: 0,
        y: 0
      }
    },
    TablaNutri: {
      tipo: { label: 'Formato estándar', value: 'Formato estándar' },
      tamanioPorcion: {
        valor: 0,
        unidad: { label: 'mg', value: 'mg' }
      },
      porcionPorEnvase: {
        valor: 0,
        unidad: { label: 'aprox.', value: 'aprox.' },
        porcionPorEnvaseDisabled: 'true'
      },
      grasas: {
        total: 0,
        saturada: 0,
        trans: 0
      },
      acidosPoli: 0,
      colesterol: 0,
      sodio: 0,
      carbohidratos: 0,
      azucares: 0,
      proteinas: 0,
      fibra: 0,
      energiaTotal: 0
    }
  };
  return res;
};

function handleDateChange(value) {
  const yyyy = value.getFullYear();
  let mm = value.getMonth() + 1;
  let dd = value.getDate();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;

  const date = `${dd}/${mm}/${yyyy}`;
  return date;
}
