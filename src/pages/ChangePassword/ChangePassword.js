import { Link } from 'react-router-dom';
import './ChangePassword.css';

/*
 *   Vista para hacer el cambio de contraseña
 */
export default function ChangePassword() {
  return (
    <div className="columnContainer w-50">
      <h4>
        <b>Introduzca su nueva contraseña</b>
      </h4>
      <br />

      <div className="rounded-square mt-5 w-75" style={{ margin: '0px auto' }}>
        <form className="w-100">
          <label htmlFor="password">Nueva contraseña</label>
          <br />
          <input
            className="inputText ligth-input mb-4 w-100"
            id="password"
            type="password"
            name="password"
          />
        </form>
      </div>

      <Link to="/miCuenta">
        <button
          className=" btn-secondary darkButton fw-bolder p-2 my-4"
          style={{ width: 'fit-content' }}>
          ACTUALIZAR CONTRASEÑA
        </button>
      </Link>
    </div>
  );
}
