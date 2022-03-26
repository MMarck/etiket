import './MiCuenta.css';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';



const userIcon = '../../images/icons/user.png';


function MiCuenta(){
    return(
      <div id='PaperWelcome' >
        <h1 className='mb-5 fw-bold'>Mi cuenta</h1>


        <div className="titled-box">
          <h4><b>Mi información</b></h4><br/>

          <div className="rounded-square">

            <div className='data-user-container' >
              <label htmlFor="usuario">Nombre</label>
              <input
               className="inputText ligth-input mb-4" 
               id="usuario" 
               type="text" 
               name="correo" 
               placeholder="Cargando usuario"
              />

              <label htmlFor="usuario">Email</label>
              <input 
                className="inputText ligth-input mb-4" 
                id="usuario" 
                type="text" 
                name="correo" 
                placeholder="Cargando correo"
              />
            </div>

            <div className="d-flex  justify-content-between align-items-center w-50">
              <img src={userIcon} width={'50px'}  height={'50px'}/> 
              
              <div className="d-flex  flex-column justify-content-start ms-2">
                <span class="opacity-50">Foto de perfil</span>
                <span >La foto debe tener al menos 300 px x 300px y no debe pesar mas de 2 MB.</span>
                <br/>

                <div className="d-flex justify-content-around">
                  <button 
                    className='btn-secondary darkButton border-0 text-white fw-bolder p-2'>
                    CARGAR FOTO
                  </button>
                  <button 
                    className='btn-danger bg-transparent border-0 text-danger fw-bolder'>
                    ELIMINAR FOTO
                  </button>
                </div>

              </div>
            </div>
          </div>

          <button 
            className=" btn-secondary darkButton fw-bolder p-2 my-4" 
            style={{width:'fit-content'}}> 
            GUARDAR CAMBIOS
          </button>

        </div>

        <div className="titled-box">
          <h4><b>Detalles de mi cuenta</b></h4><br/>

          <div className="rounded-square flex-column  px-4">

            <div className="d-flex flex-column justify-content-start mb-4">
              <span className="opacity-50">Plan</span>
              <div className="d-flex  justify-content-start align-items-center">
                <span className="m-2 me-5">GRATIS</span>
                <button 
                  className='btn-success green-button fw-bolder py-1 px-3'
                  style={{width:'fit-content', height:'fit-content'}}> 
                  CAMBIAR PLAN
                </button>
              </div>

            </div>


            <div className="d-flex justify-content-around">

              <CambiarCorreoModal/>

              <button 
                className='btn-dark darkButton border-0 text-white fw-bolder p-2' >
                RESETEAR CONTRASEÑA
              </button>

              <button 
                className='btn-danger border-0 bg-danger text-white fw-bolder p-2' >
                BORRAR CUENTA
              </button>

              

            </div>
          
          </div>

        </div>

      </div>
    );
  }

export default MiCuenta;


function CambiarCorreoModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <button 
        onClick={handleShow}
        className='btn-secondary bordered bg-white text-black fw-bolder p-2' >
        CAMBIAR CORREO
      </button>



      <Modal 
        show={show} 
        onHide={handleClose} 
        size="md" 
        centered 
        style={{fontSize:'0.8rem'}} 
      >

        <Modal.Header closeButton style={{border:'none', height:'10px'}}/> 

        <Modal.Body>
          <div className='ms-4'>
            <form className='data-user-container' >
              <label htmlFor="nuevo_correo">Nuevo correo</label>
              <input
              className="inputText  ligth-input mb-4" 
              id="nuevo_correo" 
              type="text" 
              name="correo" 
              placeholder="Ingrese nuevo correo"
              />
            </form>

            <ConfirmacionCorreoModal closeParent={handleClose}/>

            <br/>
            <span class="opacity-50 pt-3">Verifica tu nuevo correo</span>
          </div>

        </Modal.Body>

      </Modal>
    </>
  );
}


const ConfirmacionCorreoModal = ({closeParent}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  return (
    <>


      <button 
        className=" btn-secondary darkButton fw-bolder p-2 mb-4" 
        style={{width:'fit-content'}}
        onClick= {() => { 
          handleShow()
          /* closeParent() */
        }}
        > 
        GUARDAR CAMBIOS
      </button>



      <Modal 
        show={show} 
        onHide={handleClose} 
        size="md" 
        centered 
        style={{fontSize:'0.8rem'}} 
      >

        <Modal.Header closeButton style={{border:'none', height:'10px'}}/> 

        <Modal.Body style={{    padding: '2rem'}} >
          <div className='d-flex justify-content-center flex-column align-items-center gap-3 ms-4'>

            <h5><b>Correo electrónico de restablecimiento de contraseña enviado</b></h5>

            <small className='opacity-50'>Te hemos enviado un enlace para restablecer tu contraseña.¿No recibiste
               un correo electrónico? Revisa tu carpeta de correo no deseado o
               solicita otro enlace.
            </small>

            <a style={{color:'black'}}> Volver al restablecimiento de contraseña</a>
          </div>

        </Modal.Body>

      </Modal>
    </>
  );
}