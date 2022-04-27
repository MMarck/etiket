

/** 
 * Funcion para convertir cualquier medida en cualquier
 * unidad a cm
 */
export function unitTocm(value, unit) {
    if(unit === "mm"){
        return parseFloat(value) / 10;
    }
    if(unit === "cm"){
        return parseFloat(value);
    }
} 

/**
 * Funcion para obtener el tamanio de letra
 * en funcion de un area en cm2 (centimetro cuadrados)
 */
export function getDataFontSize(area) {
    if(area < 32){
        return '1.6mm';
    }
    if(area >= 32 && area < 161){
        return '3.2mm';
    }
    if(area >= 161 && area < 645){
        return '4.8mm';
    }
    if(area >= 645 && area < 2581){
        return '6.4mm';
    }
    if(area >= 2581){
        return '12.7mm';
    }
    return '1em'
} 

/* function enIncrementosde(value, increment){
    return parseFloat(value)
}
 */
function enIncrementosde(x, corte) {
    if (x === 0) 
        return 0;
    if (x % corte === 0) 
        return x;
    if(x > parseInt(x/corte) * corte && x <= (parseInt(x/corte)+1) * corte) 
        return (parseInt(x/corte)+1) * corte
        //pendiente: si se deseara cortes de valores no divisibles para 5, 
        //se debera cambiar este return por el valor mas cercano a (10 * corte)
        // escalon(0.7, 0.6) => 1.2
}

/**
 * Funcion para obtener el peso de un nutriente en el formato provisto por
 * el ministerio.
 * @param {string} type : tipo de nutriente
 * @param {int} value : peso del nutriente
 * @returns tupla de la forma  {result, report}, donde result es un entero con el peso del 
 *          nutriente en el formato del ministerio y report es una cadena con el peso del 
 *          nutriente con el formato del ministerio
 */
export function getReportFormat(type, value){
    var result, report;
    switch(type){
        case 'grasaTotal': case 'grasaSaturada': case 'grasasTrans': case 'acidosMono': case 'acidosPoli': case 'carbohidratos': case 'azucares': case 'proteina':
            if(value < 0.5){
                result = 0; 
                report='cero';
            }
            if(value < 3){
                result = enIncrementosde(value, 0.5);
                report =  result.toString()
            } 
            if(value >= 3 ){
                result = parseInt(value);
                report = result.toString();
            }
            break;

        case 'colesterol':
            if(value < 0.002){
                result = 0; 
                report='cero';
            }
            if(value >= 0.002 && value <= 0.005){
                result = 0.005;
                report =  'menos de 5mg'
            } 
            if(value >= 0.005 ){
                result = parseInt(value);
                report = result.toString();
            }
            break;

        case 'sodio':
            if(value < 0.005){
                result = 0; 
                report='cero';
            }
            if(value >= 0.005 && value <= 140){
                result = value;
                report = enIncrementosde(value, 0.5).toString()
            } 
            if(value >= 0.005 ){
                result = enIncrementosde(value, 0.5);
                report = enIncrementosde(value, 0.5).toString();
            }
            break;
        default:
            break;
    }

    return {result, report};
}