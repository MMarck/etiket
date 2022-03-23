import {Outlet} from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';



function Dashboard(){
    return(
      <div className='d-flex h-100 w-100'>
        <Sidebar/>

        <div id='Wallpaper' className='d-flex justify-content-around align-items-center flex-column flex-grow-1'>

            <img id='AbsoluteLogo' src="../images/solinalLogo.png" alt="logo de solinal" width={'100px'} /> 

            <Outlet/>{/*  Este componente pertenece a react-router-dom y 
                    permite alternar entre las rutas hijas declararas 
                    en un compontente Router */}

            <button id='FixedButton' type="button" className="btn-dark">Guía</button>
        </div>
        
      </div>  
    );
}

export default Dashboard;