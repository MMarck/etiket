import Draggable from 'react-draggable'; 
import SizeIndicator from '../SizeIndicator/SizeIndicator'
import { connect } from 'react-redux';
import { replace } from '../etiqueta/etiquetaSlice'
import { Component } from 'react';

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
class TicketViewerFront extends Component{

    constructor(props){
        super(props)
        this.state = {
            ticketArea : parseInt(this.props.etiqueta.altura) * parseInt(this.props.etiqueta.ancho), // ajustar unidades
            weigthBound : (parseInt(this.props.etiqueta.altura) * parseInt(this.props.etiqueta.ancho) > 10000)? (0.3 * parseInt(this.props.etiqueta.altura)) + "mm" : this.props.etiqueta.altura,//10.000 mm2 

        }
    }
    
    render(){
        return(
            <div>
                <div className='mx-4 d-flex align-items-center '>
                    
                    <SizeIndicator orientation={'vertical'} length={this.props.etiqueta.altura + this.props.etiqueta.dimensionesUn.value}/>
                    <div  style={{display:'inline-grid'}}>
                        <h5 className='text-center fw-bold text-dark m-4 ' >Panel de visualización principal</h5>
                        <div className='d-flex flex-column justify-content-between align-items-center' 
                        style={{backgroundColor:'white',
                                height: this.props.etiqueta.altura + this.props.etiqueta.dimensionesUn.value,
                                width: this.props.etiqueta.ancho + this.props.etiqueta.dimensionesUn.value, 
                                textAlign:'center', 
                                position:'relative'}}
                        >

                            
                                <Draggable bounds='parent' ><span className='hover_colored_border'> {this.props.etiqueta.nombreProducto} </span></Draggable> 
                                <Draggable bounds='parent' ><span className='hover_colored_border'> {this.props.etiqueta.marca} </span></Draggable> 
                            
                            
                            <div className='d-flex flex-column justify-content-between align-items-center '
                            style={{height: this.state.weigthBound, width:'-webkit-fill-available', textAlign:'center', position:'relative'}}
                            >
                                <Draggable bounds='parent' >
                                    <span className='hover_colored_border'> 
                                        {this.props.etiqueta.pesoNeto? 
                                            this.props.etiqueta.pesoNetoLabel.value +" "+this.props.etiqueta.pesoNeto +' '+ this.props.etiqueta.pesoNetoUn.value
                                        : ''}
                                    </span>
                                </Draggable> 

                                {true?
                                    <Draggable bounds='parent' >
                                        <span className='hover_colored_border'> 
                                            {this.props.etiqueta.pesoDrenado?  
                                                this.props.etiqueta.pesoDrenadoLabel.value +" "+this.props.etiqueta.pesoDrenado +' '+ this.props.etiqueta.pesoDrenadoUn.value
                                                : ''}
                                        </span>
                                    </Draggable>
                                    
                                    
                                    :''                    
                                }
                            </div>
                            

                        </div>
                        <SizeIndicator length={this.props.etiqueta.altura + this.props.etiqueta.dimensionesUn.value}/>
                    </div>
                    
                </div>
                
            </div>
        )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TicketViewerFront);