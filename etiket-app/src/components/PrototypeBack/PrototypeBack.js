import { unitTocm, getDataFontSize } from '../../tools/Casefunctions';
import { setPosition, getPosition } from '../../tools/Statefunctions';
import { JSON_String } from '../../tools/Statefunctions';
import { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from '../../reducers/etiquetaSlice'
import SizeIndicator from '../SizeIndicator/SizeIndicator'
import Draggable from 'react-draggable'; 
import './PrototypeBack.css';
import NutritionFactsPreviewer from '../NutritionFactsPreviewer/NutritionFactsPreviewer';

const mapStateToProps = state => ({
    etiqueta: state.etiqueta,
    LabelEditor: state.LabelEditorSlice,
  });
const mapDispatchToProps = () => ({ 
    replace
});


/*
 * Componente para dibujar la vista TRASERA de la etiqueta, las variables que utiliza estan mapeadas
 * en props mediante el metodo connect de react redux al objeto etiqueta del store global
*/
class PrototypeBack extends Component{
    
    componentDidMount(){
        setPosition('ingPos', this.props.etiqueta.ingPos)
        setPosition('algPos', this.props.etiqueta.algPos)
    }

    handleStateChange(stateName,value){
        const payload={
            stateName: stateName,
            value: value
        }
        this.props.replace(payload);
    }

    render(){
        //Declaracion de variables 
        let ticketArea = unitTocm(this.props.etiqueta.altura, this.props.etiqueta.dimensionesUn.value ) * unitTocm(this.props.etiqueta.ancho, this.props.etiqueta.dimensionesUn.value );
        let dataFontSize = getDataFontSize( ticketArea );//area en cm2 (centimetros cuadrados)

        let altura = this.props.etiqueta.altura;
        let ancho = this.props.etiqueta.ancho;
        let dimensionesUn = this.props.etiqueta.dimensionesUn.value;
        let metodoConservacion = this.props.etiqueta.metodoConservacion.label;
        let conservacionUn = this.props.etiqueta.conservacionUn.value;
        let vidaUtil = this.props.etiqueta.vidaUtil;
        let vidaUtilUn = this.props.etiqueta.vidaUtilUn.value;
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
                    id='PrototypeBack'
                    style={{
                        height: altura + dimensionesUn, 
                        width: ancho + dimensionesUn,
                        fontSize: dataFontSize,
                    }}
                >

                    <div className='prototypeSection3'>
                        {this.props.LabelEditor.showNutritionFacts?
                            <Draggable  bounds='#PrototypeBack' scale={this.props.LabelEditor.zoom} >
                                <div>
                                    <NutritionFactsPreviewer width='50px' height='50px'/> 
                                </div>
                            </Draggable>
                        :''}
                        


                        { vidaUtil || fabricacionUn || caducacionUn || conservacionUn ||  direccion || instrucciones?
                            <Draggable  bounds='#PrototypeBack' scale={this.props.LabelEditor.zoom} >
                                <div 
                                    onMouseLeave={()=>{this.handleStateChange('ingPos', getPosition('ingPos'))}}
                                    className='draggable-group-1 draggable-container'    
                                    id='ingPos'
                                >
                                
                                    <span>  
                                        {this.props.etiqueta.metodoConservacion.value !==''  ?
                                            <>
                                                <b>Metodo de conservacion: </b> {conservacionUn} {metodoConservacion}
                                            </>
                                        :''}
                                    </span>

                                    <span>  
                                        {vidaUtil?
                                            <>
                                                <b>Vida Util: </b> {vidaUtil} {vidaUtilUn}
                                            </>
                                        :''}
                                    </span>

                                    <span>  
                                        {direccion?
                                            <>
                                                <b>Dirección: </b> {direccion} 
                                            </>
                                        :''}
                                    </span>

                                    <span>  
                                        {instrucciones?
                                            <>
                                                <b>Instrucciones: </b> {instrucciones} 
                                            </>
                                        :''}
                                    </span>

                                    <span>  
                                        {fabricacion!==""?
                                            <>
                                                <b>{fabricacionUn}: </b> {fabricacion} 
                                            </>
                                        :''}
                                    </span>

                                    <span>  
                                        {caducacion!==""?
                                            <>
                                                <b>{caducacionUn}: </b> {caducacion} 
                                            </>
                                        :''}
                                    </span>
                                    
                                </div>
                            </Draggable>
                        :''}
                    </div>

                    <div className='prototypeSection3'>
                        { ingredientes || alergenos?
                            <Draggable  bounds='#PrototypeBack' scale={this.props.LabelEditor.zoom} >
                                <div 
                                    onMouseLeave={()=>{this.handleStateChange('algPos', getPosition('algPos'))}}
                                    className='draggable-group-1 draggable-container'    
                                    id='algPos'
                                >
                                    
                                    <span>  
                                        {ingredientes.length > 0?
                                            "Ingredientes: " + JSON_String(ingredientes,"valor")
                                        :''}
                                    </span>
                                    
                                    <span><b>
                                        {alergenos.length > 0?
                                            "CONTIENE " + JSON_String( alergenos, "value" )
                                        :''}</b>
                                    </span>
                                </div>
                            </Draggable>
                        :''}

                        { instrucciones?
                            <Draggable  bounds='#PrototypeBack' scale={this.props.LabelEditor.zoom} >
                                <div 
                                    /* onMouseLeave={()=>{this.handleStateChange('ingPos', getPosition('ingPos'))}} */
                                    className='draggable-group-1 draggable-container'    
                                    /* id='ingPos' */
                                >
                                    <span>  
                                        {instrucciones?
                                            <>
                                                <b>Instrucciones: </b> {instrucciones} 
                                            </>
                                        :''}
                                    </span>

                                </div>
                            </Draggable>
                        :''}

                        { direccion?
                            <Draggable  bounds='#PrototypeBack' scale={this.props.LabelEditor.zoom} >
                                <div 
                                    /* onMouseLeave={()=>{this.handleStateChange('ingPos', getPosition('ingPos'))}} */
                                    className='draggable-group-1 draggable-container'    
                                    /* id='ingPos' */
                                >

                                    <span>  
                                        {direccion?
                                            <>
                                                <b>Dirección: </b> {direccion} 
                                            </>
                                        :''}
                                    </span>

                                </div>
                            </Draggable>
                        :''}


                    </div>

                    
                </div>
                
                <SizeIndicator visibilityProp={'hidden'}/>
    
            </div>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(PrototypeBack);