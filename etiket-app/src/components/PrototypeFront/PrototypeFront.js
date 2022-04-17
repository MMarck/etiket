import { unitTocm, getDataFontSize } from '../../tools/Casefunctions';
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
    
    constructor(props){
        super(props)
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
                            backgroundColor:'white',
                            textAlign:'center', 
                            position:'relative',
                            height: altura + dimensionesUn,
                            width: ancho + dimensionesUn, 
                            fontSize: dataFontSize
                        }}
                    >

                        <Draggable bounds='parent' >
                            <span className='hover_colored_border'> {nombreProducto} </span>
                        </Draggable> 

                        <Draggable bounds='parent' >
                            <span className='hover_colored_border'> {marca} </span>
                        </Draggable> 

                        <Draggable bounds='parent' >
                            <span className='hover_colored_border'> 
                                {alcohol? alcoholUn.replace("__", alcohol) : ''}
                            </span>
                        </Draggable> 
                        
                        
                        <div 
                            style={{height: HeigthContainerPesosNetos, width:'100%', textAlign:'center', position:'relative'}}
                        >
                            <Draggable bounds='parent' >
                                <span className='hover_colored_border'> 
                                    {pesoNeto? 
                                        <>
                                            {pesoNetoLabel +" "+pesoNeto +' '+ pesoNetoUn}
                                            <br/>
                                        </>
                                    : ''}


                                    {!this.props.etiqueta.pesoDrenadoDisabled?  
                                        pesoDrenadoLabel +" "+ pesoDrenado +' '+ pesoDrenadoUn
                                    : ''}

                                </span>
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
    mapDispatchToProps
  )(PrototypeFront);


