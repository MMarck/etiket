

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

function enIncrementosde(value, increment){
    return parseFloat(value)
}
/***
 * 
 */
export function getReportFormat(type, value){
    switch(type){
        case 'grasaTotal': case 'grasaSaturada':
            if(value < 0.5) return 0;
            if(value < 3) return enIncrementosde(value);
            if(value >= 3 ) return parseInt(value);
            break;


        
    }
}