/** 
 * 
*/
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

/**
 * Funcion para imprimir en forma de lista separada por comas
 * una lista de objetos JSON, de cada objeto se imprimira
 * el atributo value
 */
export const JSON_String  = (list,key) => {
  var string=''
  list.forEach(element => {
    string += element[key] +', '
  });
  string = string.substring(0, string.length-2)
  
  return string;
}

/**
 * 
 * @param {string, id del elemento que se desea la posicion} item 
 * @returns tupla (json) con las posiciones en px, ejemplo: {x: '100px', y: '100px'}
 */
 export const getPosition = (item) => {
  //obtener propiedad trasform, esto devuelve una cadena de la forma "translate(0px, 0px)"
  let transformProperty = document.getElementById(item).style.transform; 
  //se convierte a una lista con 2 elementos 
  let coords = transformProperty.replace("translate(",'').replace(")",'').split(',')
  let x = coords[0];
  let y = coords[1];
  
  return {x:x, y:y}
}

/**
 * 
 * @param {string, id del elemento a cambiar de posicion} item 
 * @param {tupla (json) con las clave x, y 
 * con las  * posiciones en pixeles, ejemplo: {x: '100px', y: '100px'
 * } } position 
 */
export const setPosition = (item, position ) => {
    position = position? position : {x:'0px',y:'0px'}
    document.getElementById(item).style.transform = 'translate('+ position.x +','+ position.y +')'
}