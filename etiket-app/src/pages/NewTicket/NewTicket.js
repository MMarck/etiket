import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import replace from '../../reducers/NewTicketSlice'
import './NewTicket.css';


const mapStateToProps = state => ({
  newTicket: state.newTicket
});
const mapDispatchToProps = () => ({ 
  replace
});
const pathIcons = '../images/icons/';

/* const  navigate = useNavigate(); */
/*
* Vista para crear una nueva etiqueta, recibe el tipo de etiqueta y
* el pais, luego pide el nombre y adjunta al usuario para crear la etiqueta 
* en la base de datos, luego redirije a misEtiquetas
*/
class NewTicket extends Component{

  constructor(props){
    super(props);
    this.createNewTicket = this.createNewTicket.bind(this)
  } 

  createNewTicket = ()=>{
    //armar objeto Etiqueta
    let type = this.props.newTicket.type;
    let country = this.props.newTicket.country;
    let name = document.getElementById("ticketName").value
    
    //crear etiqueta en la base de datos

    //redirigir a /misEtiquetas
    /* lo mejor seria hacerlo de manera programatica pero,
    por el momenento hare que el boton que llama a esta funcion sea 
    un link */
    /* navigate("/success", { replace: true }); */
  }

  render(){
    return(
      <div className='w-100 h-100 margin-auto'>
        <Link to={"/misEtiquetas"}>
          <img src={pathIcons+"back.png"} alt="Regresar" className="backBtn"/>
        </Link>
        
        <ReactTooltip place="bottom" type="dark" effect="solid"  data-for='name'/>
        <input
          className="ligth-input m-4 fs-6 bg-transparent" 
          id="ticketName" 
          type="text" 
          name="name" 
          placeholder="Nombre del proyecto"
          data-tip='Escribe aquí el nombre de tu proyecto'
        />

        {/* Este boton debe verificar que el nombre no se repita para el usuario y luego mandar la 
        query para crear el esqueleto de etiqueta en la base de datos */}
        <Link to='/misEtiquetas'>
          <button className='btn-dark rounded fs-7' onClick={this.createNewTicket}>
            continuar
          </button>
        </Link>
      </div>
    );
  }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(NewTicket);