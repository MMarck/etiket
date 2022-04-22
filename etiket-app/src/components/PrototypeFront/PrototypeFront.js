import { unitTocm, getDataFontSize } from '../../tools/Casefunctions';
import { setPosition, getPosition } from '../../tools/Statefunctions';
import { replace } from '../../reducers/etiquetaSlice'
import { connect } from 'react-redux';
import { Component } from 'react';
import SizeIndicator from '../SizeIndicator/SizeIndicator'
import Draggable from 'react-draggable'; 
import './PrototypeFront.css'


const mapStateToProps = state => ({
    etiqueta: state.etiqueta
    });
const mapDispatchToProps = () => ({ 
    replace
});






/*
* Componente para dibujar la vista DELANTERA de la etiqueta, las variables que utiliza estan mapeadas
* en props mediante el metodo connect de react redux al objeto etiqueta del store global
*/
class PrototypeFront extends Component{

    
    componentDidMount(){
        setPosition('nombreProducto', this.props.etiqueta.nombreProductoPos)
        setPosition('pesosContainer', this.props.etiqueta.pesosPos)
        setPosition('marca', this.props.etiqueta.marcaPos)
        setPosition('alcohol', this.props.etiqueta.alcolPos)
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
        let HeigthContainerPesosNetos = ticketArea > 10? '30%': '100%';//10 cm2 (centimetros cuadrados)
        let dataFontSize = getDataFontSize( ticketArea );//area en cm2 (centimetros cuadrados)

        //Variables para accortar el texto
        let altura = this.props.etiqueta.altura;
        let ancho = this.props.etiqueta.ancho
        let pesoNeto = this.props.etiqueta.pesoNeto;
        let pesoNetoLabel = this.props.etiqueta.pesoNetoLabel.value;
        let pesoNetoUn = this.props.etiqueta.pesoNetoUn.value;
        let pesoDrenado = this.props.etiqueta.pesoDrenado;
        let pesoDrenadoUn = this.props.etiqueta.pesoDrenadoUn.value;
        let pesoDrenadoLabel = this.props.etiqueta.pesoDrenadoLabel.value;
        let dimensionesUn = this.props.etiqueta.dimensionesUn.value;
        let sizeIndicatorVisibility =  this.props.etiqueta.sizeIndicatorVisibility;
        let nombreProducto = this.props.etiqueta.nombreProducto;
        let marca = this.props.etiqueta.marca;
        let alcohol = this.props.etiqueta.alcohol;
        let alcoholUn = this.props.etiqueta.alcoholUn.value;

        
        
        //Condicionales para evitar valores nulos
        pesoDrenadoLabel = pesoDrenadoLabel? pesoDrenadoLabel:'';
        pesoDrenadoUn = pesoDrenadoUn? pesoDrenadoUn:'';
        pesoDrenadoLabel = pesoDrenadoLabel? pesoDrenadoLabel:'';
        pesoNetoUn = pesoNetoUn? pesoNetoUn:'';

        return(
            <div className='mx-4 d-flex  '>

                <div style={{overflow: 'hidden', width:'30px'}}>
                    {/* Copia invisible del titulo */}
                    <h5 className='paneTitle' style={{fontSize: dataFontSize, visibility:'hidden'}}>.</h5>
                    <SizeIndicator 
                    orientation={'vertical'}
                    length={ altura + dimensionesUn }
                    visibilityProp={sizeIndicatorVisibility}
                    fontSize = {dataFontSize}
                    />
                    {/* Copia invisible del indicador horizontal  */}
                    <SizeIndicator length={ancho + dimensionesUn} visibilityProp={'hidden'}/>
                    {/* Aclaracion: estas copias son para que el indicador 
                    vertical pueda estar a la misma altura que el 
                    prototipo frontal */}
                </div>
                
                <div className='prototypeContainer'>

                    <h5 className='paneTitle' style={{fontSize: dataFontSize}}>
                        Panel de visualización principal
                    </h5>
                    
                    <div 
                        style={{
                            border: '1px #F3F3F3 solid',
                            backgroundColor:'white',
                            position:'relative',
                            textAlign:'center', 
                            height: altura + dimensionesUn,
                            width: ancho + dimensionesUn, 
                            fontSize: dataFontSize,
                            zIndex:1,
                            border: '1px lightgray solid',
                            overflow:'hidden'
                        }}
                    >

                        <Draggable  bounds='parent'  >
                            <div 
                                onMouseLeave={()=>{this.handleStateChange('nombreProductoPos', getPosition('nombreProducto'))}}
                                className='draggable-container' 
                                id='nombreProducto' 
                            >
                                <b>{nombreProducto}</b>
                            </div>
                        </Draggable>

                        <Draggable bounds='parent' >
                            <div 
                                onMouseLeave={()=>{this.handleStateChange('marcaPos', getPosition('marca'))}}
                                className='draggable-container' 
                                id='marca' 
                            >
                                <b>{marca}</b>
                            </div>
                        </Draggable>                        
                        
                        <div 
                            style={{
                                height: HeigthContainerPesosNetos, 
                                width:'100%', 
                                textAlign:'center', 
                                position:'absolute',
                                bottom: '0px',
                                zIndex:-1
                            }}

                        >
                            <Draggable bounds='parent' >
                                <div 
                                    onMouseLeave={()=>{this.handleStateChange('pesosPos', getPosition('pesosContainer'))}}
                                    className='draggable-container' 
                                    id='pesosContainer'
                                > 
                                    {pesoNeto? 
                                        <>
                                            <b>{pesoNetoLabel +" "+pesoNeto +' '+ pesoNetoUn}</b>
                                            <br/>
                                        </>
                                    : ''}


                                    {!this.props.etiqueta.pesoDrenadoDisabled?  
                                        <>
                                            <b>{pesoDrenadoLabel +" "+ pesoDrenado +' '+ pesoDrenadoUn}</b>
                                            <br/>
                                        </>
                                    : ''}

                                    

                                </div>
                            </Draggable> 

                            <Draggable bounds='parent' >
                                <div 
                                    onMouseLeave={()=>{this.handleStateChange('alcolPos', getPosition('alcohol'))}}
                                    className='draggable-container' 
                                    id='alcohol' 
                                >
                                    <b>{alcohol? alcoholUn.replace("__", alcohol) : ''}</b>
                                </div>
                            </Draggable>  


                        </div>
                        

                    </div>
                    <SizeIndicator length={ancho + dimensionesUn} visibilityProp={sizeIndicatorVisibility}  fontSize = {dataFontSize}/>


                </div>
                
            </div>
                
        )
    };

};

export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(PrototypeFront);


