import { Component } from 'react';
import './Sidebar.css';
import ReactTooltip from "react-tooltip";
import {Link} from 'react-router-dom';

const pathIcons = '../images/icons/';

class Sidebar extends Component{
    

    render(){
      return (
        <div id='SidebarContainer' className='d-flex flex-column justify-content-between' >
          <div className='d-flex justify-content-center mt-2 mb-4'> 
            <img src={pathIcons + 'user.png'} width={'50px'} data-tip data-for='userMenu' /> 


            <ReactTooltip id='userMenu' place='right' effect='solid' type="light" delayHide={1000} clickable={true}>
              <Link to={'/dashboard/MiCuenta'} > 
                <button className='colored-button' > Mi cuenta</button>
              </Link>
              <br/>
              <Link to={'/dashboard/MisEtiquetas'} className='colored-button'>
                <button className='colored-button' > Mis etiquetas</button>
              </Link>
            </ReactTooltip>
            
          </div>

          <div id='SidebarOptions' className='d-flex flex-column align-items-center pt-1 pb-4    opacity-25  '>
          
            <ReactTooltip place="right" type="dark" effect="solid"/> {/* Componente para poner el tooltip hover con informacion a cada elemento */}

            <img src={pathIcons + 'dimensions.png'}          data-tip='Dimesiones del empaque' />
            <img src={pathIcons + 'jam-jar-with-label.png'}  data-tip='Identidad del alimento'  />
            <img src={pathIcons + 'marca-comercial.png'}     data-tip='Marca comercial'/>
            <img src={pathIcons + 'peso.png'}                data-tip='Contenido neto' />
            <img src={pathIcons + 'alcohol-content.png'}     data-tip='Grado alcohólico' />
            <img src={pathIcons + 'ingredientes.png'}        data-tip='Ingredientes' />
            <img src={pathIcons + 'alergenos.png'}           data-tip='Alérgenos' />
            <img src={pathIcons + 'nutritionfacts.png'}      data-tip='Informacion nutricional' />
            <img src={pathIcons + 'shelf-life-expired.png'}  data-tip='Tiempo de vida útil' />
            <img src={pathIcons + 'celsius.png'}             data-tip='Forma de conservación' />
            <img src={pathIcons + 'lote.png'}                data-tip='Identificación del lote' />
            <img src={pathIcons + 'info.png'}                data-tip='información adicional' />
            <img src={pathIcons + 'pin.png'}                 data-tip='dirección del fabricante' />
            <img src={pathIcons + 'instructions.png'}        data-tip='Instrucciones de uso' />
            <img src={pathIcons + 'mensajes-declarados.png'} data-tip='Declaraciones' />
            
          </div>
          
        </div>   
      );

    };
}

export default Sidebar;