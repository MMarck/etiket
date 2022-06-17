/**
 * Funcion para convertir cualquier medida en cualquier
 * unidad a cm
 */
export function unitTocm(value, unit) {
  if (unit === 'mm') {
    return parseFloat(value) / 10;
  }
  if (unit === 'cm') {
    return parseFloat(value);
  }
  return value;
}

/**
 * Funcion para convertir cualquier masa en cualquier
 * unidad a g
 */
export function unitTog(value, unit) {
  if (unit === 'mg') {
    return parseFloat(value) * 1000;
  }

  return value;
}

/**
 * Funcion para obtener el tamanio de letra
 * en funcion de un area en cm2 (centimetro cuadrados)
 */
export function getDataFontSize(area) {
  if (area < 32) {
    return '1.6mm';
  }
  if (area >= 32 && area < 161) {
    return '3.2mm';
  }
  if (area >= 161 && area < 645) {
    return '4.8mm';
  }
  if (area >= 645 && area < 2581) {
    return '6.4mm';
  }
  if (area >= 2581) {
    return '12.7mm';
  }
  return '1em';
}

/**
 * Funcion para aplicar la regla de "declarar en incrementos de x valor"
 * @param {number} x
 * @param {number} corte
 * @returns
 */
function enIncrementosde(x, corte) {
  if (x === 0) return 0;
  if (x % corte === 0 || Number(parseInt(x / corte) * corte) === Number(x)) return x;
  if (x > parseInt(x / corte) * corte && x <= (parseInt(x / corte) + 1) * corte)
    return parseFloat((parseInt(x / corte) + 1) * corte);
}

/**
 * Funcion para obtener el peso de un nutriente en el formato provisto por
 * el ministerio. Cada caso debe ajustar los calculos a las unidades pertinentes
 * @param {string} type : tipo de nutriente
 * @param {int} value : peso del nutriente
 * @returns tupla de la forma  {result, report}, donde result es un entero con el peso del
 *          nutriente en el formato del ministerio y report es una cadena con el peso del
 *          nutriente con el formato del ministerio
 */
export function getReportFormat(type, value, unit) {
  var result, report;
  switch (type) {
    case 'grasaTotal':
    case 'grasaSaturada':
    case 'grasasTrans':
    case 'acidosMono':
    case 'acidosPoli':
      if (value < 0.5) {
        result = 0;
        report = '0' + unit;
      } else if (value < 3) {
        result = enIncrementosde(value, 0.5);
        report = result + unit;
      } else if (value >= 3) {
        result = Math.round(value);
        report = result + unit;
      }
      break;

    case 'colesterol':
      if (value < 2) {
        result = 0;
        report = '0' + unit;
      } else if (value >= 2 && value <= 5) {
        result = 5;
        report = '< 5' + unit;
      } else if (value >= 5) {
        result = Math.round(value);
        report = result + unit;
      }
      break;

    case 'sodio':
      if (value < 5) {
        result = 0;
        report = '0';
      } else if (value >= 5 && value <= 140) {
        result = enIncrementosde(value, 5);
        report = result + unit;
      } else if (value > 140) {
        result = enIncrementosde(value, 10);
        report = result + unit;
      }
      break;
    case 'fibra':
    case 'carbohidratos':
    case 'azucares':
    case 'proteina':
      if (value < 0.5) {
        result = 0;
        report = '0';
      } else if (value <= 1) {
        result = value;
        report = '< 1g';
      } else if (value >= 0.14) {
        /* numero de gramos mas cercano a la unidad */
        result = Math.round(value);
        report = result + unit;
      }
      break;

    default:
      break;
  }

  return { result, report };
}
