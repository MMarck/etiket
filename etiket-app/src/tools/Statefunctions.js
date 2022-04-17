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
export const JSON_String  = (list) => {
  var string=''
   list.map(element => {
    string += element.value +', '
  }); 
  string = string.substring(0, string.length-2)
  //console.log(su)
  return string;
}