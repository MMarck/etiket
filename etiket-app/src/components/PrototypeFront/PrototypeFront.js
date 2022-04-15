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

function unitTocm(value, unit) {
    if(unit === "mm"){
        return parseFloat(value) / 10;
    }
    if(unit === "cm"){
        return parseFloat(value);
    }
} 
/*
 * Componente para dibujar la vista DELANTERA de la etiqueta, las variables que utiliza estan mapeadas
 * en props mediante el metodo connect de react redux al objeto etiqueta del store global
*/
class PrototypeFront extends Component{

    constructor(props){
        super(props)
        this.state = {
            ticketArea : this.props.etiqueta.altura, // ajustar unidades
            HeigthContainerPesosNetos: unitTocm(this.props.etiqueta.altura, this.props.etiqueta.dimensionesUn.value ) * unitTocm(this.props.etiqueta.ancho, this.props.etiqueta.dimensionesUn.value ) > 100? '30%': '100%',//10 cm2 (centimetros cuadrados)
            sizeIndicatorVisibility: this.props.etiqueta.sizeIndicatorVisibility
        }
    }


    

    render(){

        let pesoNeto = this.props.etiqueta.pesoNeto;
        let pesoNetoLabel = this.props.etiqueta.pesoNetoLabel.value;
        let pesoDrenado = this.props.etiqueta.pesoDrenado;
        let pesoDrenadoUn = this.props.etiqueta.pesoDrenadoUn.value;
        let pesoDrenadoLabel = this.props.etiqueta.pesoDrenadoLabel.value;
        let dimensionesUn = this.props.etiqueta.dimensionesUn.value;
        
        pesoDrenadoLabel = pesoDrenadoLabel? pesoDrenadoLabel:'';
        pesoDrenadoUn = pesoDrenadoUn? pesoDrenadoUn:'';
        pesoDrenadoLabel = pesoDrenadoLabel? pesoDrenadoLabel:'';

        return(
            <div>
                <div className='mx-4 d-flex align-items-center '>
                    <button onClick={()=>{
                        console.log(
                            "altura: " + unitTocm(this.props.etiqueta.altura , dimensionesUn) +
                            "\n ancho: " + unitTocm(this.props.etiqueta.ancho , dimensionesUn)+
                            "\nAREA: "+ this.state.ticketArea
                        )}}> 
                        ver AREA 
                    </button>
                    <SizeIndicator 
                        orientation={'vertical'}
                        length={this.props.etiqueta.altura + dimensionesUn}
                        visibilityProp={this.props.etiqueta.sizeIndicatorVisibility}
                    />
                    <div  style={{display:'inline-grid'}}>
                        <h5 className='text-center fw-bold text-dark m-4 ' >Panel de visualización principal</h5>
                        <div className='d-flex flex-column justify-content-between align-items-center' 
                        style={{backgroundColor:'white',
                                height: this.props.etiqueta.altura + dimensionesUn,
                                width: this.props.etiqueta.ancho + dimensionesUn, 
                                textAlign:'center', 
                                position:'relative'}}
                        >

                            
                            <Draggable bounds='parent' ><span className='hover_colored_border'> {this.props.etiqueta.nombreProducto} </span></Draggable> 
                            <Draggable bounds='parent' ><span className='hover_colored_border'> {this.props.etiqueta.marca} </span></Draggable> 
                            <Draggable bounds='parent' >
                                <span className='hover_colored_border'> 
                                    {this.props.etiqueta.alcohol? 
                                        this.props.etiqueta.alcoholUn.value.replace("__",this.props.etiqueta.alcohol)
                                    : ''}
                                </span>
                            </Draggable> 
                            
                            
                            <div className='d-flex flex-column justify-content-between align-items-center '
                            style={{height: this.state.HeigthContainerPesosNetos, width:'100%', textAlign:'center', position:'relative'}}
                            >
                                <Draggable bounds='parent' >
                                    <span className='hover_colored_border'> 
                                        {pesoNeto? 
                                            <>
                                                {pesoNetoLabel +" "+pesoNeto +' '+ pesoDrenadoUn}
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
                        <SizeIndicator
                            length={this.props.etiqueta.ancho + dimensionesUn}
                            visibilityProp={this.props.etiqueta.sizeIndicatorVisibility}
                        />
                    </div>
                    
                </div>
                
            </div>
        )
    };


};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PrototypeFront);