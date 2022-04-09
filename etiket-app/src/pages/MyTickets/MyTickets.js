import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import ReactTooltip from "react-tooltip";
import TicketEditor from '../../components/TicketEditor/TicketEditor';
import './MyTickets.css';


function MyTickets(){

  const [listadoEtiquetas, setlistadoEtiquetas] = useState([]);

  const [currentTicket, setCurrentTicket] = useState(new Etiqueta());
  const [newTicketName, setCurrentTicketName] = useState('');

  const [showTickets, setShowTickets] = useState(true);
  const [showPackagesTypes, setShowPackagesTypes] = useState(false);
  const [showNewTicketName, setShowNewTicketName] = useState(false);
  const [showTicketEdit, setShowTicketEdit] = useState(false);


  const selectPackageType = (type) =>{
    var tmp = new Etiqueta();
    tmp.setPackageType(type);
    setCurrentTicket(tmp);
    
    setShowTickets(false);
    setShowPackagesTypes(false);
    setShowNewTicketName(true);
  }

  const setNameNewTicket = () =>{
    var tmp = new Etiqueta();
    if(newTicketName!==''){
      tmp.setName(newTicketName);
      tmp.setPackageType(currentTicket.packageType);

      var buffer = listadoEtiquetas.map((x) => x);
      buffer.push(tmp);
      setlistadoEtiquetas(buffer);

      
      setShowTickets(true);
      setShowPackagesTypes(false);
      setShowNewTicketName(false);
    }
    else{
      alert("Escribir nombre");
    }
  }

  const editCurrentTicket = (ticketIndex) =>{

    listadoEtiquetas.map( (ticket, i)=>{
      if(i ===ticketIndex){
        setCurrentTicket(ticket);
      }
    });

    setShowTickets(false);
    setShowPackagesTypes(false);
    setShowNewTicketName(false);
    setShowTicketEdit(true);
  }

    const  updateNewTicketName = (event)=>{
        const {value} = event.target;
        setCurrentTicketName(value);
    }


  return(
    /* Contenedor divido en secciones para renderizar una determinada 
    vista dependiendo de las variables del estado */
    <div className='w-100 h-100'>


      {showTickets?
        <div id='MisEtiquetasContainer' >

          <h2 className='mb-5'>Mis etiquetas</h2>

          {listadoEtiquetas.length >= 2?
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
            {/* el prop key es para que react evite renderizar innecesariamente al elemento cuando exista alguna actulizacion */}
            {listadoEtiquetas.map((object, index) =>  
              <div 
                key={index} 
                className='etiquetaContainer'
                onClick={()=>{editCurrentTicket(index)}}
              >
                <div className='previewEtiqueta'>
                  <img 
                  src={imagePath(object.packageType)}
                  alt={object.packageType}
                  width='60px'/>
                </div>
              
                <span className='flex-shrink-1'>{object.name}</span>
              </div>
            )}

            {(listadoEtiquetas.length > 0 && listadoEtiquetas.length < 2)?
              <button id='BotonMasNuevaEtiqueta' onClick={() => setShowPackagesTypes(true)}>
                +
              </button>
              :''
            }

          </div>

          {listadoEtiquetas.length === 0 ?
            <span className='opacity-50'>No tienes ninguna etiqueta diseñada. Te parece si empezamos ?</span>
            :''
          }

          {listadoEtiquetas.length === 0 ?
            <button className='rounded fs-6 btn-dark' onClick={() => setShowPackagesTypes(true)}>
              CREAR ETIQUETA
            </button>
            :''
          }

          

        </div>
      :''
      }

      <Modal show={showPackagesTypes} onHide={() =>{setShowPackagesTypes(false)}} size="lg" centered>

        <Modal.Header closeButton className="border-0">
          <Modal.Title>Elige el tipo de envase o empaque</Modal.Title>          
        </Modal.Header>
        
        <Modal.Body>
          <span className='fs-7'>Empieza a diseñar la etiqueta de tus alimentos eligiendo primero el tipo de empaque o envase en la que pretendes comercializarlo.</span>
          <div className='d-flex'>
            
            <OpcionEnvase 
              saveTicket={selectPackageType}
              packageType="rectangular"
              title='Rectangulares o cuadrados' 
              description='Bebidas, cajas de pizza, galletas, empaques doypack' 
              imagePath= {imagePath('rectangular')}
              altImageText='Empaque Rectangular'
            />
            <OpcionEnvase 
              saveTicket={selectPackageType}
              packageType="botella"
              title='Botellas de vidrio, plástico, latas'
              description='Yogurt, cerveza, latas de atún, vino' 
              imagePath= {imagePath('botella')}
              altImageText='Empaque Botellas'
            />
            <OpcionEnvase 
              saveTicket={selectPackageType}
              packageType="irregular"
              title='Empaques con formas irregulares' 
              description='Conos de helados, sanduches preparados'
              imagePath= {imagePath('irregular')}
              altImageText='Empaque Irregular'
            />
            <OpcionEnvase 
              saveTicket={selectPackageType}
              packageType="circular"
              title='Empaques circulares'
              description='Jamones, quesos, masas, en empaques redondos'
              imagePath= {imagePath('circular')}
              altImageText='Empaque Circular'
            />
            
          </div>

        </Modal.Body>

      </Modal>
      


      {showNewTicketName?
        <div className='w-100 h-100'>
          <ReactTooltip place="bottom" type="dark" effect="solid"  data-for='name'/>
          <input
            className="ligth-input m-4 fs-6 bg-transparent" 
            id="name" 
            type="text" 
            name="name" 
            placeholder="Nombre del proyecto"
            data-tip='Escribe aquí el nombre de tu proyecto'
            onChange={updateNewTicketName}
          />

          <button 
            onClick={()=>{setNameNewTicket(currentTicket);}}
            className='btn-dark rounded fs-7'>
            continuar
          </button>
        </div> 
      :''
      }
      
      {showTicketEdit?
        
        <TicketEditor />
        
      :''
      }

   
    </div>
  );
}

export default MyTickets;

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

const OpcionEnvase = ({title, description, imagePath, altImageText, saveTicket, packageType}) => {
  return (
    <div 
      className = 'opcionEnvase'
      onClick = {() => saveTicket(packageType)} 
    >
      <img src={imagePath} alt={altImageText} width='100px'/>
      <p>
        <dt style={{fontSize:'80%'}}> {title} </dt>
        <dd style={{fontSize:'70%'}}> {description} </dd>
      </p>
    </div>
  )
}



class Etiqueta{

  constructor (name) {
    this.name = name;
    this.packageType = '';

  }

  setName(name){
    this.name = name;
  }

  setPackageType(packageType){
    this.packageType = packageType;
  }
} 