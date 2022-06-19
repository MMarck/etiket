import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Dashboard.css';

/**
 *  Componente que se ajusta a su contendor y se usa para
 * encapsular a otras vistas
 *
 */
function Dashboard() {
  return (
    <div className="d-flex h-100 w-100">
      <Sidebar isDisabled={true} />

      <div id="Wallpaper">
        <img
          id="AbsoluteLogo"
          src="/images/solinalLogo.png"
          alt="logo de solinal"
          width={'100px'}
        />

        <Outlet />
        {/*  Este componente pertenece a react-router-dom y 
                    permite alternar entre las rutas hijas declararas 
                    en un compontente Router en App.js */}
      </div>
    </div>
  );
}

export default Dashboard;
