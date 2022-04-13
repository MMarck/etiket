import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { replace } from "../../reducers/NewTicketSlice";
import { setTickets } from "../../reducers/TicketListSlice";
import { connect } from 'react-redux';
import Select from 'react-select';
import './MyTickets.css';

//PENDIENTE PONER CONSTANTES EN UN SOLO ARCHIVO 
const ddNormalStyle={
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
const countries=[
  {
    value: "Ecuador",
    label: "Ecuador"
  },
  {
    value: "Mexico",
    label: "Mexico"
  }
]
const pathIcons = '../images/icons/';

const mapStateToProps = state => ({
  newTicket: state.newTicket,
  ticketList: state.ticketList
});
const mapDispatchToProps = () => ({ 
  replace,
  setTickets
});



class MyTickets extends Component{

  constructor(props){
    super(props);
    this.state = {
      showPackagesTypes : false
    }

    //carga inicial de las etiquetas
    this.getTickets = this.getTickets.bind(this);
    this.props.setTickets(this.getTickets());
  }

  render(){
    return(
      /* Contenedor divido en secciones para renderizar una determinada 
      vista dependiendo de las variables del estado */
      <div className='w-100 h-100'>
        <Link to={"/"}>
          <img src={pathIcons+"back.png"} alt="Regresar" className="backBtn"/>
        </Link>

        <div id='MisEtiquetasContainer' >

          <h2 className='mb-5'>Mis etiquetas</h2>

          {/* PENDIENTE HACER ESTA MISMA VERIFICACION EN LE BACKEND */}
          {/* Esta seccion muestra un mensaje de aviso cuando ya se ha 
            llegado al limite de creacion de etiquetas 
            cargar limite del usuario de acuerdo a su plan (2 por defecto)*/}
          {this.props.ticketList.length >= 2? 
            <div className='w-75 d-flex flex-column justify-content-center align-items-center gap-2'>
              <span className='text-danger text-center'>
                En tu cuenta gratuita solo puedes diseñar hasta 2 etiquetas.
                Sube de plan para que tengas acceso ilimitado.
              </span>

              <button className=' btn-secondary darkButton fw-bolder p-2 my-4'>
                CAMBIAR DE PLAN
              </button>
            </div>
            :'' 
          }


          <div id='ContenedorEtiquetas'>
            {/*creacion de los elementos TicketPreview por cada etiqueta 
            guardada en estado global (store), cada elemento redirige al componente
            TicketEditor el cual lee el id en la URL y carga los de dato de 
            dicha etiqueta para modificarlo*/
            this.props.ticketList.map((object, index) =>  
              <Link 
                to = {'/editarEtiqueta/'+ index}
                className='etiquetaContainer'
                key={index} //prop para evitar renderizar 2 veces el mismo elemento, PENDIENTE cambiar por el id de la etiqueta
              >
                <div className='previewEtiqueta'>
                  <img 
                  src={imagePath(object.packageType)}
                  alt={object.packageType}
                  width='60px'/>
                </div>
              
                <span className='flex-shrink-1 '>{object.name}</span>
              </Link>
            )
            }

            {(this.props.ticketList.length > 0 && this.props.ticketList.length < 2)?
              <button id='BotonMasNuevaEtiqueta' onClick={() => this.setState({showPackagesTypes:true})}>
                +
              </button>
              :'' 
            }

          </div>

          {this.props.ticketList.length === 0 ?
            <span className='opacity-50'>No tienes ninguna etiqueta diseñada. Te parece si empezamos ?</span>
            :'' 
          }

          { this.props.ticketList.length === 0 ?
            <button className='rounded fs-6 btn-dark' onClick={() => this.setState({showPackagesTypes:true})}>
              CREAR ETIQUETA
            </button>
            :'' 
          }

          

        </div>

        {/* Componente modal cuya visibilidad depende del valor de la variable showPackagesTypes 
        que se encuentra en el esta del componente */}
        <Modal show={this.state.showPackagesTypes} onHide={() =>{this.setState({showPackagesTypes:false})}} size="lg" centered>

          <Modal.Header closeButton className="border-0">
            <Modal.Title>Elige el tipo de envase o empaque</Modal.Title>          
          </Modal.Header>
          
          <Modal.Body>
            <div id='pesoNeto' className='my-4'>
              <label htmlFor="countryTicket" >Seleccione país</label>
              <Select
                id='countryTicket'
                className='ddMenu' 
                styles={ddNormalStyle} 
                options={countries} 
                defaultValue={countries[0]}
                onChange={(e)=>{this.props.replace(["country",e.value])}}
              />
            </div>

            <span className='fs-7'>
              Empieza a diseñar la etiqueta de tus alimentos eligiendo primero 
              el tipo de empaque o envase en la que pretendes comercializarlo.
            </span>

            <div className='d-flex gap-3'>
              
              <PackageOption  packageType="rectangular"
                title='Rectangulares o cuadrados' 
                description='Bebidas, cajas de pizza, galletas, empaques doypack' 
                imagePath= {imagePath('rectangular')}
                altImageText='Empaque Rectangular'
                setTypeTicket= {this.props.replace}
              /> 

              <PackageOption 
                packageType="botella"
                title='Botellas de vidrio, plástico, latas'
                description='Yogurt, cerveza, latas de atún, vino' 
                imagePath= {imagePath('botella')}
                altImageText='Empaque Botellas'
                setTypeTicket= {this.props.replace}
              />
              <PackageOption 
                packageType="irregular"
                title='Empaques con formas irregulares' 
                description='Conos de helados, sanduches preparados'
                imagePath= {imagePath('irregular')}
                altImageText='Empaque Irregular'
                setTypeTicket= {this.props.replace}
              />
              <PackageOption 
                packageType="circular"
                title='Empaques circulares'
                description='Jamones, quesos, masas, en empaques redondos'
                imagePath= {imagePath('circular')}
                altImageText='Empaque Circular'
                setTypeTicket= {this.props.replace}
              /> 
              
            </div>

          </Modal.Body>

        </Modal>

      </div>
    );
  }

  /*
  * Metodo para obtener las etiquetas desde la base de datos
  * retorna un listado con las etiquetas
  */
  getTickets() {
    return [{name:'etiqueta1',type:'rectangular'}]
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(MyTickets);

const imagePath = (type) => {

  switch (type) {
    case 'rectangular':
      return '../../images/empaque-rectangular.png';

    case 'botella':
      return '../../images/empaque-botellas.png';

    case 'irregular':
      return '../../images/empaque-irregular.png';   

    case 'circular':
      return '../../images/empaque-circular.png';

    default:
      return '../../images/empaque-rectangular.png';
  }
  
}

/*
* Componente para encapsular las opciones de envase en el menu de envase.
* title: titulo de la opcion
* description: descripcioon de la opcion
* imagePath: ruta de la imagen para la opcion
* altImageText: texto alternativo para la imagen 
* packageType: tipo de paquete para guardar en el estado global (store) newTicket
* setTypeTicket: funcion para escribir en el estado global (puntero de la funcion)
*/
const PackageOption = ({title, description, imagePath, altImageText,  packageType, setTypeTicket}) => {
  
  return (
    <Link 
      to='/nuevoProyecto'
      className = 'opcionEnvase'
      onClick = {()=>{ setTypeTicket(["type", packageType])}}//setear tipo de paquete en el store
    >
    <img src={imagePath} alt={altImageText} width='100px'/>
    <p>
      <dt style={{fontSize:'80%'}}> {title} </dt>
      <dd style={{fontSize:'70%'}}> {description} </dd>
    </p>
  </Link>
  )
}



