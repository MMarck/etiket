import { unitTocm, getDataFontSize } from '../../tools/Casefunctions';
import { JSON_String } from '../../tools/Statefunctions';
import { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from '../../reducers/etiquetaSlice'
import SizeIndicator from '../SizeIndicator/SizeIndicator'
import Draggable from 'react-draggable'; 
import './PrototypeBack.css';

const mapStateToProps = state => ({
    etiqueta: state.etiqueta
  });
const mapDispatchToProps = () => ({ 
    replace
});


/*
 * Componente para dibujar la vista TRASERA de la etiqueta, las variables que utiliza estan mapeadas
 * en props mediante el metodo connect de react redux al objeto etiqueta del store global
*/
class PrototypeBack extends Component{
    
    render(){
        //Declaracion de variables 
        let ticketArea = unitTocm(this.props.etiqueta.altura, this.props.etiqueta.dimensionesUn.value ) * unitTocm(this.props.etiqueta.ancho, this.props.etiqueta.dimensionesUn.value );
        let dataFontSize = getDataFontSize( ticketArea );//area en cm2 (centimetros cuadrados)

        let metodoConservacion = this.props.etiqueta.metodoConservacion.value;
        let vidaUtil = this.props.etiqueta.vidaUtil;
        let direccion = this.props.etiqueta.direccion;
        let instrucciones = this.props.etiqueta.instrucciones;
        let fabricacion = this.props.etiqueta.fabricacion;
        let fabricacionUn = this.props.etiqueta.fabricacionUn.value;
        let caducacionUn = this.props.etiqueta.caducacionUn.value;
        let caducacion = this.props.etiqueta.caducacion;
        let ingredientes =  this.props.etiqueta.ingredientes;
        let alergenos = this.props.etiqueta.alergenos

        return(
            <div className='prototypeContainer'>
                <h5 className='paneTitle' style={{fontSize: dataFontSize}}>Panel de información</h5>
                <div  
                     style={{
                        backgroundColor:'white', 
                        position:'relative',
                        textAlign:'center',
                        height: this.props.etiqueta.altura + this.props.etiqueta.dimensionesUn.value, 
                        width: this.props.etiqueta.ancho + this.props.etiqueta.dimensionesUn.value,
                    }}
                >
                    { metodoConservacion || vidaUtil || direccion || instrucciones || fabricacionUn || caducacionUn?
                        <Draggable  bounds='parent'>
                            <div className='draggable-group-1 hover_colored_border'  >
                            
                                <span>  
                                    {metodoConservacion?
                                        "Metodo de conservacion: " + this.props.etiqueta.conservacionUn.value + ' '+this.props.etiqueta.metodoConservacion.label
                                    :''}
                                </span>

                                <span>  
                                    {vidaUtil?
                                        "Vida Util: " + this.props.etiqueta.vidaUtil + ' ' +this.props.etiqueta.vidaUtilUn.value
                                    :''}
                                </span>

                                <span>  
                                    {direccion?
                                        "Dirección: " + this.props.etiqueta.direccion
                                    :''}
                                </span>

                                <span>  
                                    {instrucciones?
                                        "Instrucciones: " + this.props.etiqueta.instrucciones
                                    :''}
                                </span>

                                <span>  
                                    {fabricacionUn?
                                        fabricacionUn+ ' ' + fabricacion
                                    :''}
                                </span>

                                <span>  
                                    {caducacionUn?
                                        caducacionUn + ' ' + caducacion
                                    :''}
                                </span>
                                
                            </div>
                        </Draggable>
                    :''}

                    { metodoConservacion || vidaUtil || direccion || instrucciones || fabricacionUn || caducacionUn?
                        <Draggable  bounds='parent' >
                            <div className='draggable-group-1 hover_colored_border' >
                                
                                <span>  
                                    {ingredientes?
                                        "Ingredientes: " + ingredientes
                                    :''}
                                </span>

                                <br/><br/>
                                
                                <span><b>
                                    {alergenos.length > 0?
                                        "CONTIENE: " + JSON_String( alergenos )
                                    :''}</b>
                                </span>
                            </div>
                        </Draggable>
                    :''}
    
                </div>
                
                <SizeIndicator visibilityProp={'hidden'}/>
    
            </div>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PrototypeBack);