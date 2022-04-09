import ReactTooltip from "react-tooltip";
import './NewTicket.css'

/*
* Vista para colocar el nombre de una nueva etiqueta
*/
export default function SetTicketName(){
    return(
      <div className='w-100 h-100 margin-auto'>
        <ReactTooltip place="rigth" type="dark" effect="solid"  data-for='name'/>
        <input
          className="ligth-input m-4 fs-6 bg-transparent" 
          id="name" 
          type="text" 
          name="name" 
          placeholder="Nombre del proyecto"
          data-tip='Escribe aquí el nombre de tu proyecto'
        />
  
        <button className='btn-dark rounded fs-7'>continuar</button>
      </div>
    );
  }