import { Component } from 'react';
import './GeneradorRectangular.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import SidebarRect from '../SidebarRect';
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
                    
                    <form className="sidebarRect">
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
                            <div className='nContent'>
                                <label htmlFor="nombre" className="nLabel">Nombre producto</label>
                                <input name='nombreProducto' id="nInput" type="text" onChange={this.updateStateVariable} className="form-control" id="nombre"/>
                            </div>
                        }/>

                        <DropdownMenu title="Marca del alimento" content={
                            <>
                                <label htmlFor="marca" className="col-sm-2 col-form-label">Marca producto</label>
                                <input name='marca' type="text" onChange={this.updateStateVariable} className="form-control" id="marca"/>
                            </>
                        }/>
                        
                        <DropdownMenu title="Contenido neto" content={
                            <>
                                <label htmlFor="pesoNeto" className="col-sm-2 col-form-label">Peso Neso</label>
                                <input name='pesoNeto' type="text" onChange={this.updateStateVariable} className="form-control" id="pesoNeto"/>
                                <label htmlFor="presoDrenado" className="col-sm-2 col-form-label">Peso drenado</label>
                                <input name='presoDrenado' type="text" onChange={this.updateStateVariable} className="form-control" id="presoDrenado"/>
                            </>
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


                    <div className='container d-flex justify-content-center align-items-center m-0' style={{backgroundColor:'#404040', height: '90vh', overflow: 'auto', overflowY: 'scroll', maxHeight: '90vh'}} > 
                        <FrontRectangular 
                            productName={this.state.nombreProducto} 
                            brand={this.state.marca} 
                            netWeigth={this.state.pesoNeto} 
                            drenWeigth={this.state.presoDrenado} 
                        />

                        <BackRectangular 
                            ingredients={this.state.ingredientes}
                            allergens = {this.state.alergenos}
                            conservationMethod = {this.state.metodoConservacion}
                            life = {this.state.vidaUtil}
                            direction = {this.state.direccion}
                            instructions = {this.state.instrucciones}
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
function FrontRectangular ({productName, brand, netWeigth, drenWeigth}){
    productName = productName? productName:'Nombre del producto';
    brand = brand? brand:'Marca®';
    netWeigth = netWeigth? netWeigth:'-';
    drenWeigth = drenWeigth? drenWeigth:false;

    return(
        <div>
            <h5 className='m-4' style={{'border':'2px solid #1ED796', textAlign:'center', color:'#1ED796'}} >Cara frontal</h5>
            <div className='mx-4 p-4 d-flex flex-column justify-content-between align-items-center' 
            style={{backgroundColor:'white', height:'100mm', width:'100mm', textAlign:'center'}}
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
        </div>
    )
}


/*
 * Componente para dibujar la parte TRASERA de la etiqueta rectangular
*/
function BackRectangular ({ingredients, allergens, conservationMethod, life, direction, instructions}){
    ingredients= ingredients? ingredients: 'Harina de trigo, Azucar, Mantequilla, Huevo';
    allergens= allergens? allergens: 'Huevo';
    conservationMethod= conservationMethod? conservationMethod: 'En congelacion';
    life= life? life:'60';
    direction= direction? direction: ' Vía a la Costa Km. 6.5, Av. del Bombero, Guayaquil ';
    instructions= instructions? instructions: 'Abrir y consumir en el menor tiempo posible';

    return(
        <div>
            <h5 className='m-4' style={{'border':'2px solid #1ED796', textAlign:'center', color:'#1ED796'}} >Cara trasera</h5>
            <div className='row p-2' 
            style={{backgroundColor:'white', height:'100mm', width:'100mm', textAlign:'center'}}
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
        </div>
    )
}