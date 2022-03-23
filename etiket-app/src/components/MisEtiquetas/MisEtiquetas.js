import { Link} from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

function MisEtiquetas(){
    return(
      <>
        <h2>Mis etiquetas</h2>

        <span>No tienes ninguna etiqueta diseñada. Te parece si empezamos ?</span>

        <PopupModel/>

      </>
    );
  }

export default MisEtiquetas;


function PopupModel() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <Button className='btn-dark' onClick={handleShow}>
        CREAR ETIQUETA
      </Button>


      <Modal show={show} onHide={handleClose} size="lg" centered>

        <Modal.Header closeButton className="border-0">
          <Modal.Title>Elige el tipo de envase o empaque</Modal.Title>          
        </Modal.Header>
        
        <Modal.Body>
          <span className='fs-7'>Empieza a diseñar la etiqueta de tus alimentos eligiendo primero el tipo de empaque o envase en la que pretendes comercializarlo.</span>
          <div className='d-flex'>
            <OpcionEnvase 
              toDirection='/rectangular'
              title='Rectangulares o cuadrados' 
              description='Bebidas, cajas de pizza, galletas, empaques doypack' 
              imagePath='../../images/empaque-rectangular.png' 
              altImageText='Empaque Rectangular'
            />
            <OpcionEnvase 
              toDirection='/rectangular'
              title='Botellas de vidrio, plástico, latas'
              description='Yogurt, cerveza, latas de atún, vino' 
              imagePath='../../images/empaque-botellas.png' 
              altImageText='Empaque Botellas'
            />
            <OpcionEnvase 
              toDirection='/rectangular'
              title='Empaques con formas irregulares' 
              description='Conos de helados, sanduches preparados'
              imagePath='../../images/empaque-irregular.png'
              altImageText='Empaque Irregular'
            />
            <OpcionEnvase 
              toDirection='/rectangular'
              title='Empaques circulares'
              description='Jamones, quesos, masas, en empaques redondos'
              imagePath='../../images/empaque-circular.png'
              altImageText='Empaque Circular'
            />
            
          </div>

        </Modal.Body>

      </Modal>
    </>
  );
}



const OpcionEnvase = ({toDirection, title, description, imagePath, altImageText}) => {
  return (
    <Link className='d-flex flex-column justify-content-center align-items-center text-center rounded border pt-4 text-decoration-none text-reset '
        to={toDirection}
    >
      <img src={imagePath} alt={altImageText} width='100px'/>
      <p>
        <dt style={{fontSize:'80%'}}> {title} </dt>
        <dd style={{fontSize:'70%'}}> {description} </dd>
      </p>
    </Link>
  )
}