import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import ReactTooltip from "react-tooltip";
import './MisEtiquetas.css';


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

function MisEtiquetas(){

  const [listadoEtiquetas, setlistadoEtiquetas] = useState([]);

  const [newTicket, setNewTicket] = useState(new Etiqueta());
  const [newTicketName, setNewTicketName] = useState('');

  const [showTickets, setShowTickets] = useState(true);
  const [showPackagesTypes, setShowPackagesTypes] = useState(false);
  const [showNewTicketName, setShowNewTicketName] = useState(false);


  const selectPackageType = (type) =>{
    var tmp = new Etiqueta();
    tmp.setPackageType(type);
    setNewTicket(tmp);
    
    setShowTickets(false);
    setShowPackagesTypes(false);
    setShowNewTicketName(true);
  }

  const setNameNewTicket = () =>{
    var tmp = new Etiqueta();
    if(newTicketName!==''){
      tmp.setName(newTicketName);
      tmp.setPackageType(newTicket.packageType);

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



    const  updateNewTicketName = (event)=>{
        const {value} = event.target;
        setNewTicketName(value);
    }


  return(
    <div className='w-100 h-100'>

      {showTickets?
        <div id='MisEtiquetasContainer' >

          <h2 className='mb-5'>Mis etiquetas</h2>

          <div className='w-50 h-50 mw-50 d-flex justify-content-between gap-3 flex-wrap'>
            {/* el prop key es para que react evite renderizar innecesariamente al elemento cuando exista alguna actulizacion */}
            {listadoEtiquetas.map((object, index) =>  
              <div key={index} className='d-flex flex-column justify-content-center align-items-center gap-3  '>
              <img 
                className='border bg-white p-4'
                src={imagePath(object.packageType)}
                alt={object.packageType}
                width='120px'/>
              <span className='flex-shrink-1'>{object.name}</span>
            </div>
            )}
          </div>

          {listadoEtiquetas.length ===0 ?
            <span className='opacity-50'>No tienes ninguna etiqueta diseñada. Te parece si empezamos ?</span>
            :''
          }

          <button className='rounded fs-6 btn-dark' onClick={() => setShowPackagesTypes(true)}>
            CREAR ETIQUETA
          </button>

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
        <div className='w-100 h-100 margin-auto'>
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
            onClick={()=>{setNameNewTicket(newTicket);}}
            className='btn-dark rounded fs-7'>
            continuar
          </button>
        </div> 
      :''
      }
      

      

   
    </div>
  );
}

export default MisEtiquetas;


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