import Draggable from 'react-draggable'; 
import SizeIndicator from '../SizeIndicator/SizeIndicator'
import { connect } from 'react-redux';
import { replace } from '../../reducers/etiquetaSlice'
import { Component } from 'react';

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
        return(
            <div>
                <h5 className='text-center fw-bold text-dark m-4 ' >Panel de información</h5>
                <div className='row' 
                     style={{
                        backgroundColor:'white', 
                        height: this.props.etiqueta.altura + this.props.etiqueta.dimensionesUn.value, 
                        width: this.props.etiqueta.ancho + this.props.etiqueta.dimensionesUn.value,
                        textAlign:'center', 
                        position:'relative'}}
                >
                        <Draggable  bounds='parent'>
                            <div className='col-12 my-2 p-2 hover_colored_border' style={{ height: '50%', width:'40%' ,fontSize:'0.5em', textAlign:'left', backgroundColor:'white', position:'none'}} >
                            
                                <span>  
                                    {this.props.etiqueta.metodoConservacion.value?
                                        "Metodo de conservacion: " + this.props.etiqueta.conservacionUn.value + ' '+this.props.etiqueta.metodoConservacion.label
                                    :''}
                                </span>

                                <br/><br/>

                                <span>  
                                    {this.props.etiqueta.vidaUtil?
                                        "Vida Util: " + this.props.etiqueta.vidaUtil + ' ' +this.props.etiqueta.vidaUtilUn.value
                                    :''}
                                </span>
                                

                                <br/><br/>

                                <span>  
                                    {this.props.etiqueta.direccion?
                                        "Dirección: " + this.props.etiqueta.direccion
                                    :''}
                                </span>

                                <br/><br/>

                                <span>  
                                    {this.props.etiqueta.direccion?
                                        "Instrucciones: " + this.props.etiqueta.instrucciones
                                    :''}
                                </span>

                                <br/><br/>

                                <span>  
                                    {this.props.etiqueta.fabricacionUn.value?
                                        this.props.etiqueta.fabricacionUn.value + ' ' +this.props.etiqueta.fabricacion
                                    :''}
                                </span>
                                <br/><br/>

                                <span>  
                                    {this.props.etiqueta.caducacionUn.value?
                                        this.props.etiqueta.caducacionUn.value + ' ' +this.props.etiqueta.caducacion
                                    :''}
                                </span>
                                
                            </div>
                        </Draggable>
    
                        <Draggable  bounds='parent' >
                            <div className='col-12 my-2 p-2 hover_colored_border' style={{ height: '50%', width:'40%', fontSize:'0.7em',  textAlign:'left', backgroundColor:'white'}} >
                                
                                <span>  
                                    {this.props.etiqueta.ingredientes?
                                        "Ingredientes: " + this.props.etiqueta.ingredientes
                                    :''}
                                </span>

                                <br/><br/>

                                <span><b>
                                    {this.props.etiqueta.alergenos?
                                        "CONTIENE: " + this.props.etiqueta.alergenos
                                    :''}</b>
                                </span>
                            </div>
                        </Draggable>
                    
    
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