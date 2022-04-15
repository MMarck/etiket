

/*
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

/*
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
    return '8mm'
} 
