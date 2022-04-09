import {Link} from 'react-router-dom';
import './WallpaperWelcome.css';

/*
 *Este componente se renderiza frente a otros componentes y ocupa todo su contenedor
 *muestra un saludo para el usuario y lo invita a crear una etiqueta
*/
export default function WallPaperWelcome(){
    return(
        <div id='WallPaperWelcome'>
            <span>
                <br/><br/><br/>Bienvenido !<br/>
                Estás a punto de vender tus productos<br/>
                con una etiqueta en conformidad con la norma !
                <br/><br/>Empecemos !<br/><br/><br/>
            </span>
        
            <Link  to='/misEtiquetas'>
                <button className='btn btn-dark'>CREAR ETIQUETA</button>
            </Link>
            
            <img alt="Edificios" src='images/figura1.png' width='300px' ></img>
        </div>  
    );
}
