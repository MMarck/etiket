
const userIcon = '../../images/icons/user.png';

function MiCuenta(){
    return(
      <div id='PaperWelcome' className='d-flex justify-content-center align-items-center flex-column flex-grow-1'>
        <h1>Mi cuenta</h1>


        <div className="d-flex flex-column justify-content-start">
          <h4><b>Mi información</b></h4><br/>

          <div className="d-flex justify-content-start rounded border bg-white p-4">

            <div className="d-flex flex-column justify-content-center me-4" >
              <label htmlFor="usuario">Nombre</label><br/>
              <input className="inputText  mb-4" id="usuario" type="text" name="correo" placeholder="Ingrese su usuario"/>

              <label htmlFor="usuario">Email</label><br/>
              <input className="inputText  mb-4" id="usuario" type="text" name="correo" placeholder="Ingrese su usuario"/>
            </div>

            <div className="d-flex  justify-content-center align-items-center">
              <img src={userIcon} width={'50px'}  height={'50px'}/> 
              <div className="d-flex  flex-column justify-content-start ms-2">
                <span class="opacity-50">Foto de perfil</span>
                <span className="w-50">La foto debe tener al menos 300 px x 300 <br/>px y no debe pesar mas de 2 MB.</span>

                <div className="d-flex justify-content-center">
                  <button >CARGAR FOTO</button>
                  <button >ELIMINAR FOTO</button>
                </div>

              </div>
            </div>
          </div>

          <button className="btn-dark darkButton my-4" style={{width:'fit-content'}}> GUARDAR CAMBIOS</button>
        </div>

        <div className="d-flex flex-column justify-content-start">
          <h4><b>Detalles de mi cuenta</b></h4><br/>

          <div className="d-flex flex-column justify-content-start rounded border bg-white p-4">

            <div className="d-flex flex-column justify-content-start mb-4">
              <span className="opacity-50">Plan</span>
              <div className="d-flex  justify-content-start align-items-center">
                <span className="m-2">GRATIS</span>
                <button style={{width:'fit-content', height:'fit-content'}}> CAMBIAR PLAN</button>
              </div>

            </div>


            <div className="d-flex justify-content-around">
              <button >CAMBIAR CORREO</button>
              <button >RESETEAR CONTRASEÑA</button>
              <button >BORRAR CUENTA</button>
            </div>
          
          </div>

          <button className="btn-dark darkButton my-4" style={{width:'fit-content'}}> GUARDAR CAMBIOS</button>
        </div>

      </div>
    );
  }

export default MiCuenta;