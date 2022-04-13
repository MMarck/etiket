import { Component } from 'react';
import './TicketEditor.css';
import Draggable from 'react-draggable'; 
import { connect } from 'react-redux';
import { replace, erase } from '../../reducers/etiquetaSlice'
import TicketViewerFront from '../TicketViewerFrontRectangular/TicketViewerFrontRectangular';
import TicketViewerBack from '../TicketViewerBackRectangular/TicketViewerBackRectangular';

const returnImage = '../../images/icons/return.png'

const mapStateToProps = state => ({
    etiqueta: state.etiqueta
  });
const mapDispatchToProps = () => ({ 
    replace,
    erase,
});
class TicketEditor extends Component{

    constructor(props){
        super(props);
        this.state = {
            zoom : 1
        }
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
    }


    /*
    * Función permite aumentar el zoom aplicado como propiedad css al contenedor de las etiquetas
    */
    zoomIn(){
        this.setState({'zoom':this.state.zoom + 0.1}, ()=>{ //actualizar la variable en el estado
            let visualizer = document.getElementById('ticketContainer');//obtener control del visualizador
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
            let visualizer = document.getElementById('ticketContainer');//obtener control del visualizador
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

            <div id='TicketEditorContainer' >
                <div id='PreviewContainer'> 
                    <div id='ticketContainer' className='d-flex justify-content-center align-items-center m-0' style={{ zIndex:0}}>
                        <TicketViewerFront/>

                        <TicketViewerBack 
                            ingredients={this.props.etiqueta.ingredientes}
                            allergens = {this.props.etiqueta.alergenos}
                            conservationMethod = {this.props.etiqueta.metodoConservacion}
                            life = {this.props.etiqueta.vidaUtil}
                            direction = {this.props.etiqueta.direccion}
                            instructions = {this.props.etiqueta.instrucciones}
                            ticketWidth={this.props.etiqueta.ancho}
                            ticketheight={this.props.etiqueta.altura}
                        />
                    </div>
                </div>

                <div className='d-flex flex-column justify-content-center align-items-center gap-2' >
                    <span className='p-2'  onClick={()=>this.props.erase()}  style={{cursor:"pointer"}} ><img src={returnImage} alt='return ' width={'10px'}  />  BORRAR TODO</span>

                    <div className='d-flex gap-3'>
                        <button type="button" className='darkButton-twhite'> EXPORTAR EN PDF</button>    
                        <button type="button" className='darkButton-twhite' > EXPORTAR EN PNG</button>   
                        <button type="button" className='colored-button' onClick={this.zoomIn}> zoom in </button>    
                    <button type="button" className='colored-button' onClick={this.zoomOut}> zoom out</button>   
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


/*
 * Componente para dibujar la parte TRASERA de la etiqueta rectangular
*/
function TicketRectangularBack ({ingredients, allergens, conservationMethod, life, direction, instructions, ticketheight, ticketWidth}){
    ingredients= ingredients? ingredients: '';
    allergens= allergens? allergens: '';
    conservationMethod= conservationMethod? conservationMethod: '';
    life= life? life:'';
    direction= direction? direction: '';
    instructions= instructions? instructions: '';
    ticketheight = ticketheight? ticketheight:'100mm';
    ticketWidth = ticketWidth? ticketWidth:'100mm';

    return(
        <div>
            <h5 className='text-center fw-bold text-dark m-4 ' >Panel de información</h5>
            <div className='row' 
            style={{backgroundColor:'white', height: ticketheight, width: ticketWidth, textAlign:'center', position:'relative'}}
            >

                

                    <Draggable  bounds='parent'>
                        <div className='col-12 my-2 p-2 hover_colored_border' style={{ height: '50%', width:'40%' ,fontSize:'0.5em', textAlign:'left', backgroundColor:'white', position:'none'}} >
                        
                            <span> <strong>Metodo de conservacion:</strong> {conservationMethod}</span>
                            <br/><br/>
                            <span> <strong>Vida Util:</strong> {life} </span>
                            <br/><br/>
                            <span> <strong>Direccion:</strong>{direction}</span>
                            <br/><br/>
                            <span> <strong>Instrucciones:</strong> {instructions}</span>
                            <br/><br/>
                            
                        </div>
                    </Draggable>

                    <Draggable  bounds='parent' >
                        <div className='col-12 my-2 p-2 hover_colored_border' style={{ height: '50%', width:'40%', fontSize:'0.7em',  textAlign:'left', backgroundColor:'white'}} >
                            <span> <strong>Ingredientes:</strong> {ingredients}</span>
                            <br/><br/>
                            <span> <strong>CONTIENE:</strong> {allergens}</span>
                        </div>
                    </Draggable>

                
                
                {/* <Draggable  bounds='parent' >
                    <div className='col-6 my-4 p-2 hover_colored_border' style={{ height: '90%', backgroundColor:'white'}} >
                    </div>
                </Draggable> */}
                

            </div>
            <SizeIndicator visibilityProp={'hidden'}/>

        </div>
    )
}


/*
 * Componente para dibujar la parte DELANTERA de la etiqueta rectangular
*/
function SizeIndicator ({length, orientation, visibilityProp}){
    length = length? length:'100mm';
    orientation = orientation? orientation:'horizontal';
    visibilityProp = visibilityProp? visibilityProp:'visible';

    if(orientation === 'horizontal'){
        return(
            <div  className=' d-inline-block text-center my-2' style={{visibility:visibilityProp}}>
                <div className='px-2' style={{display: 'inline-block', position: 'relative', zIndex: '2', color: 'gray',}} >{length}</div>
                <div className='line' style={{position: 'relative', top: '-20px', width: length, height: '2px', backgroundColor: 'gray'}}/>
            </div>
        )
    }

    if(orientation === 'vertical'){
        return(
            <div  className='d-flex align-items-center justify-content-center' 
            style={{width: '2px', height: length, margin:'0px 18px', backgroundColor: 'gray', transform: 'translateY(12px)'}}>
                <div className='px-2' style={{ position: 'relative',right:'10px',  zIndex: '2', color: 'gray', transform: 'rotate(-90deg)'}} >
                    {length}
                </div>
            </div>

            
        )
    }


}