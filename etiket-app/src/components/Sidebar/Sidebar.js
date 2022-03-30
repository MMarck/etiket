import { Component } from 'react';
import './Sidebar.css';
import ReactTooltip from "react-tooltip";
import {Link} from 'react-router-dom';

const pathIcons = '../images/icons/';

class Sidebar extends Component{
    
  constructor(props){
    super(props)
    this.state={
      isDisabled: false
    }
  }


  render(){
    const isDisabled=this.state.isDisabled
    return (
      <div id='SidebarContainer' className='' >
        <div id="userIcon" className=''> 
          <img id="userImg" alt="User" src={pathIcons + 'user.png'} width={'50px'} data-tip data-for='userMenu' /> 


          <ReactTooltip event='click' id='userMenu' place='right' effect='solid' type="light" clickable={true} border={true} borderColor={"gray"} offset={{bottom: 30}}>
            <div id="userSubMenu">
              <Link to={'/dashboard/miCuenta'} > 
                <button className='colored-button userSubBtn' > Mi cuenta</button>
              </Link>
              <br/>
              <Link to={'/dashboard/misEtiquetas'} className='colored-button'>
                <button className='colored-button userSubBtn' > Mis etiquetas</button>
              </Link>
            </div>
          </ReactTooltip>
          
        </div>

        <div id='SidebarOptions' className=''>
        
          <ReactTooltip place="right" type="dark" effect="solid"/> {/* Componente para poner el tooltip hover con informacion a cada elemento */}

          <img src={pathIcons + 'dimensions.png'}          alt='dimensions' data-tip='Dimensiones del empaque' className={isDisabled ? "iconEnabled":"iconDisabled"}/>
          <img src={pathIcons + 'jam-jar-with-label.png'}  alt='jam-jar-with-label' data-tip='Identidad del alimento' className={isDisabled ? "iconEnabled":"iconDisabled"} />
          <img src={pathIcons + 'marca-comercial.png'}     alt='marca-comercial' data-tip='Marca comercial' className={isDisabled ? "iconEnabled":"iconDisabled"} />
          <img src={pathIcons + 'peso.png'}                alt='peso' data-tip='Contenido neto' className={isDisabled ? "iconEnabled":"iconDisabled"} />
          <img src={pathIcons + 'alcohol-content.png'}     alt='alcohol-content' data-tip='Grado alcohólico' className={isDisabled ? "iconEnabled":"iconDisabled"} />
          <img src={pathIcons + 'ingredientes.png'}        alt='ingredientes' data-tip='Ingredientes' className={isDisabled ? "iconEnabled":"iconDisabled"} />
          <img src={pathIcons + 'alergenos.png'}           alt='alergenos' data-tip='Alérgenos' className={isDisabled ? "iconEnabled":"iconDisabled"} />
          <img src={pathIcons + 'nutritionfacts.png'}      alt='nutritionfacts' data-tip='Informacion nutricional' className={isDisabled ? "iconEnabled":"iconDisabled"} />
          <img src={pathIcons + 'shelf-life-expired.png'}  alt='shelf-life-expired' data-tip='Tiempo de vida útil' className={isDisabled ? "iconEnabled":"iconDisabled"} />
          <img src={pathIcons + 'celsius.png'}             alt='celsius' data-tip='Forma de conservación' className={isDisabled ? "iconEnabled":"iconDisabled"} />
          <img src={pathIcons + 'lote.png'}                alt='lote' data-tip='Identificación del lote' className={isDisabled ? "iconEnabled":"iconDisabled"} />
          <img src={pathIcons + 'info.png'}                alt='info' data-tip='información adicional' className={isDisabled ? "iconEnabled":"iconDisabled"} />
          <img src={pathIcons + 'pin.png'}                 alt='pin' data-tip='dirección del fabricante' className={isDisabled ? "iconEnabled":"iconDisabled"} />
          <img src={pathIcons + 'instructions.png'}        alt='instructions' data-tip='Instrucciones de uso' className={isDisabled ? "iconEnabled":"iconDisabled"} />
          <img src={pathIcons + 'mensajes-declarados.png'} alt='mensajes-declarados' data-tip='Declaraciones' className={isDisabled ? "iconEnabled":"iconDisabled"} />
          
        </div>
        
      </div>   
    );

  };
}

export default Sidebar;