import { Link } from 'react-router-dom';
import './ResetPassword.css';

function ResetPassword() {
  return (
    <div className="d-flex flex-column w-50 small">
      <span id="avisoDeIngreso">
        <b>Cambio de contraseña</b>
      </span>

      <p>
        Puedes recuperar tu contraseña ingresando tu usuario. Te llegará una notificación a tu
        correo electrónico registrado donde te compartiremos tu contraseña.
      </p>

      <form id="resetForm" className="w-100">
        <label htmlFor="usuario">Usuario</label>
        <br />
        <input
          className="inputText  mb-4"
          id="usuario"
          type="text"
          name="correo"
          placeholder="Ingrese su usuario"
        />

        <br />

        <div className="d-flex justify-content-center ">
          <Link to="/" className="w-50">
            <button className="btn-dark darkButton">Enviar</button>
          </Link>

          <Link to="/" className="w-50">
            <button className="btn-dark darkButton">Cancelar</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
