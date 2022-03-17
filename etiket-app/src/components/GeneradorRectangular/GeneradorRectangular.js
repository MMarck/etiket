import { Component } from 'react';
import './GeneradorRectangular.css';
import Navbar from '../Navbar/Navbar';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Select from 'react-select';
import Ingrediente from '../Ingrediente/Ingrediente';
import Draggable from 'react-draggable'; 


const unidades=[
    {
        value: "mm",
        label: "mm",
    },
    {
        value: "cm",
        label: "cm",
    },
    {
        value: "pulg",
        label: "pulg",
    }
];

const unidadesMasa=[
    {
        value: "g",
        label: "g",
    },
    {
        value: "kg",
        label: "kg",
    },
    {
        value: "ml",
        label: "ml",
    },
    {
        value: "l",
        label: "l"
    }
]

const conservacion=[
    {
        value: "ambRefr",
        label: "Al ambiente, una vez abierto, refrigerar",
    },
    {
        value: "ambFresco",
        label: "Al ambiente, fresco y seco",
    },
    {
        value: "refr",
        label: "En refrigeración",
    },
    {
        value: "cong",
        label: "En congelación",
    }
]

const unidadesDias=[
    {
        value: "Días",
        label: "Días",
    },
    {
        value: "Meses",
        label: "Meses",
    },
    {
        value: "Años",
        label: "Años"
    }
]

const alergenos=[
    { value: "tartrazina", label: "Tartrazina"},
    { value: "fenil", label: "Fenilcetronuricos: Fenilanina"},
    { value: "gluten", label: "Gluten"},
    { value: "crustaceos",label: "Crustáceos"},
    { value: "huevo", label: "Huevo"},
    { value: "pescado", label: "Pescado"},
    { value: "mani", label: "Maní"},
    { value: "soya", label: "Soya"},
    { value: "leche", label: "Leche"},
    { value: "lactosa", label: "Lactosa"},
    { value: "nueces", label: "Nueces"},
    { value: "almendras", label: "Almendras"},
    { value: "avellanas", label: "Avellanas"},
    { value: "anacardos", label: "Anacardos"},
    { value: "nuecesMacadamia", label: "Nueces Macadamia"},
    { value: "apio", label: "Apio"},
    { value: "mostaza",  label: "Mostaza"},
    { value: "altramuces", label: "Altramuces"},
    { value: "sesamo", label: "Sésamo"},
    { value: "regaliz", label: "Regaliz"}
]

const ddLargerStyle={
    option: (provided, state)=>({
        ...provided,
        backgroundColor: state.isSelected ? '#1ED796':state.isFocused && "#1dd79633",
        color: "#404040",
        cursor: "Pointer",
    }),
    menuList: (provided, state) =>({
        ...provided,
        border: "2px solid #1ED796",
        borderRadius: "8px",
    }),
    control: (provided, state) =>({
        border: "2px solid #1ED796",
        display: "flex",
        cursor: "Pointer",
        maxWidth: "30vw",
        borderRadius: "8px",
        
    }),
    dropdownIndicator: (provided, state)=>({
        ...provided,
        "&:hover":{
            color: "#1ED796"
        }
    }),
    menu: (provided, state)=>({
        ...provided,
        borderRadius: "8px",
    }),
}

const ddStyle={
    option: (provided, state)=>({
        ...provided,
        backgroundColor: state.isSelected ? '#1ED796':state.isFocused && "#1dd79633",
        color: "#404040",
        cursor: "Pointer",
    }),
    menuList: (provided, state) =>({
        ...provided,
        border: "2px solid #1ED796",
        borderRadius: "8px",
    }),
    control: (state) =>({
        border: "2px solid #1ED796",
        display: "flex",
        cursor: "Pointer",
        minWidth: "none",
        width: "100%",
        borderRadius: "8px",
    }),
    dropdownIndicator: (provided, state)=>({
        ...provided,
        "&:hover":{
            color: "#1ED796"
        }
    }),
    menu: (provided, state)=>({
        ...provided,
        borderRadius: "8px",
    })
}

class GeneradorRectangular extends Component{


    constructor(props){
        super(props);
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
        } else if(e.length==1) {
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
        this.setState({'zoom':this.state.zoom + 0.1}); //actualizar la variable en el estado
        let visualizer = document.getElementById('ticketContainer');//obtener control del visualizador
        visualizer.style.transform = 'scale('+ this.state.zoom +')';//aplica el valor 
    }

    /*
    * Función permite disminuir el zoom aplicado como propiedad css al contenedor de las etiquetas
    */
    zoomOut(){
        this.setState({'zoom':this.state.zoom - 0.1}); //actualizar la variable en el estado
        let visualizer = document.getElementById('ticketContainer');//obtener control del visualizador
        visualizer.style.transform = 'scale('+ this.state.zoom +')';//aplica el valor
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
                                        <input name='altura' type = "text" onInput={this.maxLengthCheck} onChange={(e)=>this.handleChangeValores(e.target.value,"altura","selectedAlturaUn")} className="form-control gRInput numberInput" onKeyPress={this.numberFilter} />
                                        <Select className='ddMenu' styles={ddStyle} options={unidades} defaultValue={{ label: "cm", value: "cm" }} onChange={(e)=> this.handleChangeUnidades(e,"selectedAlturaUn", "altura")}/>
                                        
                                    </div>
                                    
                                </div>
                                
                                <div className='dAncho'>
                                    <label htmlFor="ancho" className="col-sm-2 col-form-label">Ancho</label>
                                    <div className='duInput'>
                                        <input name='ancho' type = "text" onChange={(e)=>this.handleChangeValores(e.target.value,"ancho","selectedAnchoUn")} className="form-control gRInput numberInput" onKeyPress={this.numberFilter}/>
                                        <Select className='ddMenu' styles={ddStyle} options={unidades} defaultValue={{ label: "cm", value: "cm" }} onChange={(e)=> this.handleChangeUnidades(e,"selectedAnchoUn", "ancho")}/>
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
                                
                                <div className='duInput cnInput'>
                                    <label htmlFor="pesoNeto" className="gRLabel">Peso Neto</label>
                                    <div className='subgRContent'>
                                        <input name='pesoNeto' type="text" onKeyPress={this.numberFilter} onChange={(e)=> this.handleChangeValores(e.target.value,"pesoNeto","selectedNetoUn")} className=" gRInput numberInput" id="pesoNeto"/>
                                        <Select className='ddMenu' styles={ddStyle} options={unidadesMasa} defaultValue={{ label: "g", value: "g" }} onChange={(e)=>this.handleChangeUnidades(e,"selectedNetoUn","pesoNeto")} />
                                    </div>
                                </div>
                                
                                <div className='duInput cnInput'>
                                    
                                    <label class="container gRLabel"> Peso drenado
                                        <input type="checkbox" onClick={()=> {
                                            this.setState({disabled:!this.state.disabled});
                                            this.changeDisabled();
                                        }}></input>
                                        <span class="checkmark"></span>
                                    </label>
                                    
                                    <div className='subgRContent'>
                                        <input name='pesoDrenado' type="text" onKeyPress={this.numberFilter} onChange={(e)=> this.handleChangeValores(e.target.value,"pesoDrenado","selectedDrenadoUn")} className=" gRInput numberInput" id="pesoDrenado" disabled />
                                        <Select className='ddMenu' styles={ddStyle} options={unidadesMasa} defaultValue={{ label: "g", value: "g" }} isDisabled={this.state.disabled} onChange={(e)=>this.handleChangeUnidades(e,"selectedDrenadoUn","pesoDrenado")}/>
                                    </div>
                                </div>
                            </div>
                        }/>

                        <DropdownMenu title="Ingredientes" content={
                            <Ingrediente/>
                        }/>
                        
                        <DropdownMenu title="Alérgenos y Sensitivos" content={
                            <div className='gRContent'>
                                <label htmlFor="alergenos" className="col-sm-2 col-form-label">Alérgenos</label>
                                <Select isMulti className='ddMenu' styles={ddLargerStyle} options={alergenos} onChange={(e)=>this.handleChangeMultiples(e,"alergenos")} />
                            </div>
                        }/>
                        
                        <DropdownMenu title="Especificaciones e indicaciones" content={
                            <div className='gRContent'>
                                <div>
                                    <label htmlFor="metodoConservacion" className="col-sm-2 col-form-label">Metodo conservacion</label>
                                    <Select className='ddMenu' styles={ddLargerStyle} options={conservacion} onChange={(e)=>this.handleChangeSingle(e,"metodoConservacion")}/>
                                </div>
                                
                                
                                <div className='subgRContent'>
                                    <label htmlFor="vidaUtil" className="col-form-label">Vida Util</label>
                                    <div className='duInput'>
                                        <input name='vidaUtil' type="text" onKeyPress={this.numberFilter} onChange={(e)=> this.handleChangeValores(e.target.value,"vidaUtil","selectedUtilUn")} className="form-control gRInput numberInput" id="vidaUtil"/>
                                        <Select className='ddMenu' styles={ddStyle} options={unidadesDias} onChange={(e)=>this.handleChangeUnidades(e,"selectedUtilUn","vidaUtil")} />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="direccion" className="col-sm-2 col-form-label">Direccion</label>
                                    <input name='direccion' type="text" onChange={this.updateStateVariable} className="form-control gRInput" id="direccion"/>
                                </div>

                                <div>
                                    <label htmlFor="instrucciones" className="col-sm-2 col-form-label">Instrucciones</label>
                                    <input name='instrucciones' type="text" onChange={this.updateStateVariable} className="form-control gRInput" id="instrucciones"/>
                                </div>
                            </div>
                        }/>  
                        
                    </form>

                    <div className='d-flex flex-column'  style={{backgroundColor:'#404040', height: '100vh', width:'-webkit-fill-available', overflow: 'auto', overflowY: 'scroll', maxHeight: '90vh'}}>
                        <div id='ticketContainer' className='container d-flex justify-content-center align-items-center m-0' > 
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
                        <div className='d-flex justify-content-around'>
                            <button type="button" className='colored-button' onClick={this.clearVariables} > Borrar todo</button>
                            <button type="button" className='colored-button' > Exportar a PDF</button>    
                            <button type="button" className='colored-button' onClick={this.zoomIn}> zoom in </button>    
                            <button type="button" className='colored-button' onClick={this.zoomOut}> zoom out</button>    
                        </div>
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
                    <h5 className='m-4' style={{'border':'2px solid #1ED796', textAlign:'center', color:'#1ED796'}} >Cara frontal</h5>
                    <div className='d-flex flex-column justify-content-between align-items-center' 
                    style={{backgroundColor:'white', height:ticketHeight, width:ticketWidth, textAlign:'center', position:'relative'}}
                    >

                        
                            <Draggable bounds='parent' ><span className='hover_colored_border'> {productName} </span></Draggable> 
                            <Draggable bounds='parent' ><span className='hover_colored_border'> {brand} </span></Draggable> 
                        
                        
                        <div className='d-flex flex-column justify-content-between align-items-center '
                        style={{height:weigthBound, width:'-webkit-fill-available', textAlign:'center', position:'relative'}}
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
            <h5 className='m-4' style={{'border':'2px solid #1ED796', textAlign:'center', color:'#1ED796'}} >Cara trasera</h5>
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