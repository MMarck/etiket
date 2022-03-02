import { Component } from 'react';
import './GeneradorRectangular.css';
import Navbar from '../Navbar/Navbar';
import DropdownMenu from '../DropdownMenu';
import DropdownSelector from '../DropdownSelector';
import {FaTimes} from "react-icons/fa"

const unidades=[
    {
        id: "mm",
        value: "mm",
    },
    {
        id: "cm",
        value: "cm",
    },
    {
        id: "pulg",
        value: "pulg",
    }
];

const unidadesMasa=[
    {
        id: "g",
        value: "Gramos",
    },
    {
        id: "kg",
        value: "Kilogramos",
    },
    {
        id: "ml",
        value: "Mililitros",
    },
    {
        id: "l",
        value: "Litros"
    }
]

const conservacion=[
    {
        id: "ambRefr",
        value: "Al ambiente, una vex abierto, refrigerar",
    },
    {
        id: "ambFresco",
        value: "Al ambiente, fresco y seco",
    },
    {
        id: "refr",
        value: "En refrigeración",
    },
    {
        id: "cong",
        value: "En congelación",
    }
]

const unidadesDias=[
    {
        id: "dias",
        value: "Días",
    },
    {
        id: "meses",
        value: "Meses",
    },
    {
        id: "anos",
        value: "Años"
    }
]

class GeneradorRectangular extends Component{



    constructor(props){
        super(props);
        this.state = {
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
        };
        this.updateStateVariable = this.updateStateVariable.bind(this);
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

    


    render(){
        return(
            <div>
                <Navbar setBackButton={true} information={'Segundo paso: Rellenar información'} />
                <div className='d-flex'>
                    
                    <form className="sidebarRect dark-mode">
                        <DropdownMenu title="Dimensiones" content={
                            <div className='dContent'>
                                <div className='dAltura'>
                                    <label htmlFor="altura" className="col-sm-2 col-form-label">Altura</label>
                                    <div className='duInput'>
                                        <input name='altura' type="text" onChange={this.updateStateVariable} className="form-control" id="altura"/>
                                        <DropdownSelector title="Escoje una unidad" items={unidades} />
                                    </div>
                                </div>
                                <FaTimes className='multIcon' />
                                <div className='dAncho'>
                                    <label htmlFor="ancho" className="col-sm-2 col-form-label">Ancho</label>
                                    <div className='duInput'>
                                        <input name='ancho' type="text" onChange={this.updateStateVariable} className="form-control" id="ancho"/>
                                        <DropdownSelector title="Escoje una unidad" items={unidades} />
                                    </div>
                                </div>
                            </div>
                        }/>

                        <DropdownMenu title="Declaración de identidad del alimento" content={
                            <div className='gRContent'>
                                <label htmlFor="nombre" className="gRLabel">Nombre producto</label>
                                <input name='nombreProducto' type="text" onChange={this.updateStateVariable} className="form-control gRInput"/>
                            </div>
                        }/>

                        <DropdownMenu title="Marca del alimento" content={
                            <div className='gRContent'>
                                <label htmlFor="marca" className="gRLabel">Marca producto</label>
                                <input name='marca' type="text" onChange={this.updateStateVariable} className="form-control gRInput" id="marca"/>
                            </div>
                        }/>
                        
                        <DropdownMenu title="Contenido neto" content={
                            <div className='gRContent'>
                                <label htmlFor="pesoNeto" className="gRLabel">Peso Neso</label>
                                <input name='pesoNeto' type="text" onChange={this.updateStateVariable} className="form-control gRInput" id="pesoNeto"/>
                                <label htmlFor="presoDrenado" className="gRLabel">Peso drenado</label>
                                <input name='presoDrenado' type="text" onChange={this.updateStateVariable} className="form-control gRInput" id="presoDrenado"/>
                            </div>
                        }/>

                        <DropdownMenu title="Ingredientes" content={
                            <>
                                <label htmlFor="ingredientes" className="col-sm-2 col-form-label">Ingredientes</label>
                                <input name='ingredientes' type="text" onChange={this.updateStateVariable} className="form-control" id="ingredientes"/>
                            </>
                        }/>
                        
                        <DropdownMenu title="Alérgenos y Sensitivos" content={
                            <>
                                <label htmlFor="alergenos" className="col-sm-2 col-form-label">Alergenos</label>
                                <input name='alergenos' type="text" onChange={this.updateStateVariable} className="form-control" id="alergenos"/>
                            </>
                        }/>
                        
                        <DropdownMenu title="Especificaciones e indicaciones" content={
                            <>
                                <label htmlFor="metodoConservacion" className="col-sm-2 col-form-label">Metodo conservacion</label>
                                <input name='metodoConservacion' type="text" onChange={this.updateStateVariable} className="form-control" id="metodoConservacion"/>
                                
                                <label htmlFor="vidaUtil" className="col-sm-2 col-form-label">Vida Util</label>
                                <input name='vidaUtil' type="text" onChange={this.updateStateVariable} className="form-control" id="vidaUtil"/>

                                <label htmlFor="direccion" className="col-sm-2 col-form-label">Direccion</label>
                                <input name='direccion' type="text" onChange={this.updateStateVariable} className="form-control" id="direccion"/>
                                
                                <label htmlFor="instrucciones" className="col-sm-2 col-form-label">Instrucciones</label>
                                <input name='instrucciones' type="text" onChange={this.updateStateVariable} className="form-control" id="instrucciones"/>
                            </>
                        }/>  
                        
                    </form>


                    <div className='container d-flex justify-content-center align-items-center m-0' style={{backgroundColor:'#dcdcdc', height: '90vh', overflow: 'auto', overflowY: 'scroll', maxHeight: '90vh'}} > 
                        <TicketRectangularFront
                            productName={this.state.nombreProducto} 
                            brand={this.state.marca} 
                            netWeigth={this.state.pesoNeto} 
                            drenWeigth={this.state.presoDrenado} 
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
            </div>
      )
    };
}

export default GeneradorRectangular;


/*
 * Componente para dibujar la parte DELANTERA de la etiqueta rectangular
*/
function TicketRectangularFront ({productName, brand, netWeigth, drenWeigth, verticalSizeIndicator, horizontalSizeIndicator, ticketheight, ticketWidth}){
    productName = productName? productName:'Nombre del producto';
    brand = brand? brand:'Marca®';
    netWeigth = netWeigth? netWeigth:'-';
    drenWeigth = drenWeigth? drenWeigth:false;
    verticalSizeIndicator = verticalSizeIndicator? verticalSizeIndicator:false;
    horizontalSizeIndicator = horizontalSizeIndicator? horizontalSizeIndicator:false;
    ticketheight = ticketheight? ticketheight:'100mm';
    ticketWidth = ticketWidth? ticketWidth:'100mm';


    return(
        <div>
            
            <div className='mx-4 d-flex align-items-center '>
                
                <SizeIndicator orientation={'vertical'} length={ticketheight}/>
                <div  style={{display:'inline-grid'}}>
                    <h5 className='m-4' style={{'border':'2px solid #1ED796', textAlign:'center', color:'#1ED796', backgroundColor:'#404040'}} >Cara frontal</h5>
                    <div className=' p-4 d-flex flex-column justify-content-between align-items-center' 
                    style={{backgroundColor:'white', height:ticketheight, width:ticketWidth, textAlign:'center'}}
                    >

                        <div className='d-flex flex-column justify-content-between align-items-center' >
                            <span> {productName} </span>
                            <span> {brand} </span>
                        </div>
                        
                        <div className='d-flex flex-column justify-content-between align-items-center' >
                            <span> Contenido Neto {netWeigth}g </span>

                            {drenWeigth?
                                <span> Contenido drenado {drenWeigth}g </span>
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
    ingredients= ingredients? ingredients: 'Harina de trigo, Azucar, Mantequilla, Huevo';
    allergens= allergens? allergens: 'Huevo';
    conservationMethod= conservationMethod? conservationMethod: 'En congelacion';
    life= life? life:'60';
    direction= direction? direction: ' Vía a la Costa Km. 6.5, Av. del Bombero, Guayaquil ';
    instructions= instructions? instructions: 'Abrir y consumir en el menor tiempo posible';
    ticketheight = ticketheight? ticketheight:'100mm';
    ticketWidth = ticketWidth? ticketWidth:'100mm';

    return(
        <div>
            <h5 className='m-4' style={{'border':'2px solid #1ED796', textAlign:'center', color:'#1ED796', backgroundColor:'#404040'}} >Cara trasera</h5>
            <div className='row p-2' 
            style={{backgroundColor:'white', height: ticketheight, width: ticketWidth, textAlign:'center'}}
            >

                <div className='col-6 my-2 pt-2'  style={{ height: '90%'}}  >

                    <div className='col-12 my-2 p-2' style={{border: '2px solid #3a3a3a', height: '50%', fontSize:'0.5em', textAlign:'left'}} >
                    
                        <span> <strong>Metodo de conservacion:</strong> {conservationMethod}</span>
                        <br/><br/>
                        <span> <strong>Vida Util:</strong> {life} dias</span>
                        <br/><br/>
                        <span> <strong>Direccion:</strong>{direction}</span>
                        <br/><br/>
                        <span> <strong>Instrucciones:</strong> {instructions}</span>
                        <br/><br/>
                        
                    </div>

                    <div className='col-12 my-2 p-2' style={{border: '2px solid #3a3a3a', height: '50%', fontSize:'0.7em',  textAlign:'left'}} >
                        <span> <strong>Ingredientes:</strong> {ingredients}</span>
                        <br/><br/>
                        <span> <strong>Alergenos:</strong> {allergens}</span>
                    </div>

                </div>
                
                <div className='col-6 my-4 p-2' style={{border: '2px solid #3a3a3a', height: '90%'}} >
                </div>
                

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
                <div className='px-2' style={{display: 'inline-block', position: 'relative', zIndex: '2', color: 'white', border: '2px solid #1ED796', backgroundColor: '#404040'}} >{length}</div>
                <div className='line' style={{position: 'relative', top: '-16px', width: length, height: '3px', backgroundColor: '#1ED796'}}/>
            </div>
        )
    }

    if(orientation === 'vertical'){
        return(
            <div  className='d-flex align-items-center justify-content-center' 
            style={{width: '3px', height: length, margin:'0px 18px', backgroundColor: '#1ED796', transform: 'translateY(12px)'}}>
                <div className='px-2' style={{ position: 'relative', border: '2px solid #1ED796', zIndex: '2', color: 'white', backgroundColor: '#404040', transform: 'rotate(-90deg)'}} >
                    {length}
                </div>
            </div>

            
        )
    }


}