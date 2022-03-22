
import { Link } from "react-router-dom";
import "./CreateAccount.css";

const CreateAccount = () => {
  return (
    <div className="d-flex flex-column w-50 small">
        
        <span id="avisoDeIngreso"><b>Creación de usuario</b> </span>
        <p><b>Únete, es gratis</b></p>
        
        <form id="LoginForm" className="w-100">
            <label htmlFor="usuario">Usuario</label><br/>
            <input className="inputText  mb-4" id="usuario" type="text" name="correo" placeholder="Ingrese su usuario"/>

            <label htmlFor="password">Contraseña</label><br/>
            <input className="inputText mb-4" type="password" id="password" name="password" placeholder="Ingrese su contraseña"/>

            <label htmlFor="usuario">Usuario</label><br/>
            <input className="inputText  mb-4" id="usuario" type="text" name="correo" placeholder="Ingrese su usuario"/>

            <div className="d-flex justify-content-center ">
                <div className="d-flex flex-column">
                    <label htmlFor="usuario">Usuario</label>
                    <input className="inputText  mb-4" id="usuario" type="text" name="correo" placeholder="Ingrese su usuario"/>
                </div>

                <div className="d-flex flex-column ">
                    <label htmlFor="usuario">Usuario</label>
                    <input className="inputText  mb-4" id="usuario" type="text" name="correo" placeholder="Ingrese su usuario"/>
                </div>
            </div>

            <br/>
            <Link to="/" className="w-100">
                <button className="ligthButton w-100">Crear Usuario</button>
                </Link>

        </form>



        <hr/>

        

        <div className='signupButton google mx-auto mt-2 small'>
          <span className="icon"></span>
          <span>Inicia sesion con Google</span>
        </div> 

        <div className='signupButton facebook mx-auto mt-2 small'>
          <span className="icon"></span>
          <span>Inicia sesion con Facebook</span>
        </div>

        <hr/>

        <small>© Copyright Solinal 2021</small>

    </div>
  )
}

export default CreateAccount