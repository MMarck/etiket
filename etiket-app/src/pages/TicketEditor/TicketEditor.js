import {  exportComponentAsPNG, exportComponentAsPDF } from 'react-component-export-image';
import { replace, erase } from '../../reducers/etiquetaSlice'
import { pathIcons } from '../../config/constants';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PrototypeFront from '../../components/PrototypeFront/PrototypeFront';
import PrototypeBack from '../../components/PrototypeBack/PrototypeBack';
import Sidebar from '../../components/Sidebar/Sidebar';
import React from 'react';
import './TicketEditor.css';


const mapStateToProps = state => ({
    etiqueta: state.etiqueta
  });
const mapDispatchToProps = () => ({ 
    replace,
    erase,
});
class TicketEditor extends  React.Component {

    constructor(props){
        super(props);
        this.componentRef = React.createRef();
        this.state = {
            zoom : 1,
        }
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);

    }


    /*
    * Función permite aumentar el zoom aplicado como propiedad css al contenedor de las etiquetas
    */
    zoomIn(){
        this.setState({'zoom':this.state.zoom + 0.1}, ()=>{ //actualizar la variable en el estado
            let visualizer = document.getElementById('Previewer');//obtener control del visualizador
            visualizer.style.transform = 'scale('+ this.state.zoom +')';//aplica el valor 

            if( this.state.zoom >= 1.2){
                visualizer.style.paddingTop = this.state.zoom * 7 + "vh";
                visualizer.style.paddingLeft = this.state.zoom * 7 + "vw";

            }
             if( this.state.zoom >= 1.4){
                visualizer.style.paddingTop = this.state.zoom * 12 + "vh";
                visualizer.style.paddingLeft = this.state.zoom * 14 + "vw";
            }

        }); 
    }

    /*
    * Función permite disminuir el zoom aplicado como propiedad css al contenedor de las etiquetas
    */
    zoomOut(){
        this.setState({'zoom':this.state.zoom - 0.1}, ()=>{ //actualizar la variable en el estado
            let visualizer = document.getElementById('Previewer');//obtener control del visualizador
            visualizer.style.transform = 'scale('+ this.state.zoom +')';//aplica el valor 


            if( this.state.zoom < 1.2){
                visualizer.style.paddingTop = "0vh";
                visualizer.style.paddingLeft = "0vw";

            }else if( this.state.zoom >= 1.2 && this.state.zoom < 1.4){
                visualizer.style.paddingTop = this.state.zoom * 7 + "vh";
                visualizer.style.paddingLeft = this.state.zoom * 7 + "vw";

            }else if( this.state.zoom >= 1.4){
                visualizer.style.paddingTop = this.state.zoom * 12 + "vh";
                visualizer.style.paddingLeft = this.state.zoom * 14 + "vw";
            }

        }); 
    }

    


    render(){
        return(

            <div id='masterContainer'>
                <Sidebar/>
                <div id='TicketEditorContainer' >
                    
                    <Link to={"/misEtiquetas"}>
                        <img src={pathIcons+"back.png"} alt="Regresar" className="backBtn "/>
                    </Link>

                    <div id='PreviewContainer'> 
                        <div id='Previewer' ref={this.componentRef}>
                            <PrototypeFront />
                            <PrototypeBack/>
                        </div>
                    </div>

                    <div className='d-flex flex-column justify-content-center align-items-center gap-2' >
                        <span className='p-2'  onClick={()=>this.props.erase()}  style={{cursor:"pointer"}} ><img src={pathIcons+'return.png'} alt='return ' width={'10px'}  />  BORRAR TODO</span>

                        <div className='d-flex gap-3'>

                        <button 
                            onClick={() => exportComponentAsPNG(this.componentRef)} 
                            className='darkButton-twhite'
                            type="button" 
                        >
                            GUARDAR CAMBIOS
                        </button> 

                        <button 
                            onClick={() => exportComponentAsPDF(this.componentRef)}
                            className='darkButton-twhite' 
                            type="button" 
                        > 
                            EXPORTAR EN PDF
                        </button>

                        <button 
                            onClick={() => exportComponentAsPNG(this.componentRef)} 
                            className='darkButton-twhite'
                            type="button" 
                        >
                            EXPORTAR EN PNG
                        </button>   

                        <button type="button" className='colored-button' onClick={this.zoomIn}> zoom in </button>    
                        <button type="button" className='colored-button' onClick={this.zoomOut}> zoom out</button>   
                        
                        </div>
                        
                        
                    </div>
                </div>
            </div>
      )
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(TicketEditor);

