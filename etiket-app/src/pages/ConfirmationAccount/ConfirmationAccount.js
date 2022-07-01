import { Link } from 'react-router-dom';
import './ConfirmationAccount.css';

/*
 *   Vista para hacer el cambio de contraseña
 */
export default function ConfirmationAccount() {
  return (
    <div>
      <div>
        <div id="WallpaperConfirmation">
          <div className="columnContainer w-200">
          <img src="/images/icons/check.png" alt="verification" width="100px" /><br />
            <h5><b>¡Su cuenta se ha verificado!</b></h5><br />
            <Link to="/login">
            <button
            className=" btn-secondary darkButton fw-bolder p-2 my-4" 
                style={{ width: 'fit-content' }}>
                    Iniciar Sesión
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
