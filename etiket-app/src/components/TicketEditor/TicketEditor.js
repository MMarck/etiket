import { Component } from 'react';
import './TicketEditor.css';
import Draggable from 'react-draggable'; 

const returnImage = '../../images/icons/return.png'

class TicketEditor extends Component{

    constructor(props, ticket){
        
        super(props);
        console.log(this.props.ticket);
        this.state = {
            selectedAlturaUn: 'cm',
            selectedAnchoUn: 'cm',
            altura: '',
            ancho: '',
            nombreProducto: '',
            marca: '',
            selectedNetoUn:'g',
            selectedDrenadoUn: 'g',
            pesoNeto: '',
            pesoDrenado: '',
            ingredientes: '',
            alergenos: '',
            metodoConservacion: '',
            selectedUtilUn: '',
            vidaUtil:'',
            direccion: '',
            instrucciones: '',
            disabled: true,
            zoom: 1
        };
        this.updateStateVariable = this.updateStateVariable.bind(this);
        this.clearVariables = this.clearVariables.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.numberFilter=this.numberFilter.bind(this);
    }

    /* 
    * Para que este metodo funcione bien se debe declarar
    * la variable A en el estado y el input debe tener el 
    * prop 'name' con el nombre A 
    */
    updateStateVariable(event){
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
    }

    clearVariables(){
        //borrar estado
        this.setState({
            altura: '',
            ancho: '',
            nombreProducto: '',
            marca: '',
            pesoNeto: '',
            presoDrenado: '',
            ingredientes: '',
            alergenos: '',
            metodoConservacion: '',
            vidaUtil:'',
            direccion: '',
            instrucciones: ''
        })
        //borrar formulario

    }

    numberFilter(event) {
        var value = event.target.value + event.key;
        if (!/^\d{0,3}(\.\d{0,2})?$/.test(value)){
           event.preventDefault();
        }
    }

    handleChangeUnidades(e,unidad,estado){
        this.setState({ [unidad]: e.value }, ()=> {
            this.setState({[estado]: parseFloat(this.state[estado])+this.state[unidad]})
        });
        
    }

    handleChangeValores(e,estado,unidad){
        this.setState({[estado]:e+this.state[unidad]})
    }

    handleChangeMultiples(e,estado){
        var res="";
        if (e.length>1) {
            e.forEach(element => {
                res=res+","+element.label;
            });
            res=res.slice(1);
        } else if(e.length===1) {
            res=e[0].label
        }
        this.setState({[estado]:res})
    }

    handleChangeSingle(e,estado){
        this.setState({[estado]:e.label})
    }

    /*
    * Función para habilitar/desabilitar el peso denrado
    */
    changeDisabled(){
        const isDisabled=document.getElementById("pesoDrenado").disabled;
            if (isDisabled) {
                document.getElementById("pesoDrenado").disabled=false;
            } else {
                document.getElementById("pesoDrenado").disabled=true;
                document.getElementById("pesoDrenado").value="";
                this.setState({"pesoDrenado": ""})
            }
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
                        <TicketRectangularFront
                            productName={this.state.nombreProducto} 
                            brand={this.state.marca} 
                            netWeigth={this.state.pesoNeto} 
                            drenWeigth={this.state.pesoDrenado} 
                            ticketWidth={this.state.ancho}
                            ticketheight={this.state.altura}
                        />

                        <TicketRectangularBack 
                            ingredients={this.state.ingredientes}
                            allergens = {this.state.alergenos}
                            conservationMethod = {this.state.metodoConservacion}
                            life = {this.state.vidaUtil}
                            direction = {this.state.direccion}
                            instructions = {this.state.instrucciones}
                            ticketWidth={this.state.ancho}
                            ticketheight={this.state.altura}
                        />
                    </div>
                </div>

                <div className='d-flex flex-column justify-content-center align-items-center gap-2' >
                    <span className='p-2'><img src={returnImage} alt='return ' width={'10px'}  />  BORRAR TODO</span>

                    <div className='d-flex gap-3'>
                        <button type="button" className='darkButton-twhite' > EXPORTAR EN PDF</button>    
                        <button type="button" className='darkButton-twhite' > EXPORTAR EN PNG</button>   
                        <button type="button" className='colored-button' onClick={this.zoomIn}> zoom in </button>    
                    <button type="button" className='colored-button' onClick={this.zoomOut}> zoom out</button>   
                    </div>
                    
                     
                </div>
            </div>
      )
    };
}

export default TicketEditor;




/*
 * Componente para dibujar la parte DELANTERA de la etiqueta rectangular
*/
function TicketRectangularFront ({productName, brand, netWeigth, drenWeigth, verticalSizeIndicator, horizontalSizeIndicator, ticketheight: ticketHeight, ticketWidth}){
    productName = productName? productName:'Nombre del producto';
    brand = brand? brand:'Marca®';
    netWeigth = netWeigth? netWeigth:'-';
    drenWeigth = drenWeigth? drenWeigth:false;
    verticalSizeIndicator = verticalSizeIndicator? verticalSizeIndicator:false;
    horizontalSizeIndicator = horizontalSizeIndicator? horizontalSizeIndicator:false;
    ticketHeight = ticketHeight? ticketHeight:'100mm';
    ticketWidth = ticketWidth? ticketWidth:'100mm';

    var ticketArea = parseInt(ticketHeight) * parseInt(ticketWidth); // ajustar unidades

    var weigthBound = ( ticketArea > 10000)? (0.3 * parseInt(ticketHeight)) + "mm" : ticketHeight;
    //10.000 mm2 




    return(
        <div>
            
            <div className='mx-4 d-flex align-items-center '>
                
                <SizeIndicator orientation={'vertical'} length={ticketHeight}/>
                <div  style={{display:'inline-grid'}}>
                    <h5 className='text-center fw-bold text-dark m-4 ' >Panel de visualización principal</h5>
                    <div className='d-flex flex-column justify-content-between align-items-center' 
                    style={{backgroundColor:'white', height:ticketHeight, width:ticketWidth, textAlign:'center', position:'relative'}}
                    >

                        
                            <Draggable bounds='parent' ><span className='hover_colored_border'> {productName} </span></Draggable> 
                            <Draggable bounds='parent' ><span className='hover_colored_border'> {brand} </span></Draggable> 
                        
                        
                        <div className='d-flex flex-column justify-content-between align-items-center '
                        style={{height:weigthBound, width:'-webkit-fill-available', textAlign:'center', position:'static'}}
                         >
                            <Draggable bounds='parent' ><span className='hover_colored_border'> Contenido Neto {netWeigth}</span></Draggable> 

                            {drenWeigth?
                                <Draggable bounds='parent' ><span className='hover_colored_border'> Contenido drenado {drenWeigth} </span></Draggable>
                                :''                    
                            }

                        </div>
                        

                    </div>
                    <SizeIndicator length={ticketWidth}/>
                </div>
                
            </div>
            
        </div>
    )
}


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