import { Component } from 'react';
import './Sidebar.css';
import ReactTooltip from "react-tooltip";
import SidebarItem from "../SidebarItem/SidebarItem";
import {Link} from 'react-router-dom';
import Select from 'react-select';

const pathIcons = '../images/icons/';

const unidades=[
  {
      value: "mm",
      label: "Milímetros",
  },
  {
      value: "cm",
      label: "Centímetros",
  },
  {
      value: "pulg",
      label: "Púlgadas",
  }
];

const unidadesMasa=[
  {
    value: "ug",
    label: "ug",
  },
  {
    value: "mg",
    label: "mg",
  },
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
    label: "l",
  },
  {
    value: "L",
    label: "L",
  },
  {
    value: "cm",
    label: <span>cm&#179;</span>
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
    backgroundColor: state.isSelected ? '#1ED796':state.isFocused ? "#1dd79633":"#404040",
    color: "white",
    cursor: "Pointer",
  }),
  menuList: (provided, state) =>({
    ...provided,
    border: "2px solid #404040",
    backgroundColor: "#404040",
    borderRadius: "5px",
  }),
  control: (provided, state) =>({
    border: "2px solid #404040",
    backgroundColor: "#404040",
    display: "flex",
    cursor: "Pointer",
    maxWidth: "30vw",
    borderRadius: "8px",
      
  }),
  input: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  placeholder: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  singleValue: (provided,state)=>({
    ...provided,
    color: "white"
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
    backgroundColor: state.isSelected ? '#1ED796':state.isFocused ? "#1dd79633":"#404040",
    color: "white",
    cursor: "Pointer",
  }),
  menuList: (provided, state) =>({
    ...provided,
    border: "2px solid #404040",
    backgroundColor: "#404040",
    borderRadius: "5px",
  }),
  control: (state) =>({
    border: "2px solid #404040",
    backgroundColor: "#404040",
    display: "flex",
    cursor: "Pointer",
    minWidth: "none",
    width: "100%",
    borderRadius: "8px",
  }),
  input: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  placeholder: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  singleValue: (provided,state)=>({
    ...provided,
    color: "white"
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

class Sidebar extends Component{
    
  constructor(props){
    super(props)
    this.state={
      isDisabled: false,
      labelAncho:"",
      labelAltura:"",
      ancho: "",
      altura: "",
      dimensionesUn: {label:"Centímetros",value:"cm"},
      nombreProducto: '',
      marca: "",
      pesoNeto: {label:"Contenido neto", value: "Contenido neto"},
      pesoNetoUn:{label:"g", value:"g"},
      pesoDrenado: {label:"Peso drenado", value: "Peso drenado"},
      pesoDrenadoUn:{label:"g", value:"g"},
      ingredientes: '',
      alergenos: '',
      metodoConservacion: '',
      vidaUtil:'',
      direccion: '',
      instrucciones: ''
    }
    this.updateStateVariable = this.updateStateVariable.bind(this);
  }

  updateStateVariable(event){
    const { value, name } = event.target;
    this.setState({
        [name]: value
    })
  }

  numberFilter(event) {
    var value = event.target.value + event.key;
    if (!/^\d{0,3}(\.\d{0,2})?$/.test(value)){
       event.preventDefault();
    }
  }

  handleChangeValoresDimensiones(e,estado,labelEstado){
    this.setState({[estado]:parseFloat(e)+this.state["dimensionesUn"]["value"], [labelEstado]:e})
  }

  handleChangeUnidadesDimensiones(e){
    this.setState({ ancho: parseFloat(this.state["ancho"])+e.value , altura: parseFloat(this.state["altura"])+e.value, dimensionesUn:e});
  }

  handleChangeDropdown(e,estado){
    this.setState({[estado]:e})
  }

  render(){
    const isDisabled=this.state.isDisabled
    return (
      <div id='SidebarContainer' className='' >
        <div id="userIcon" className=''> 
          <img id="userImg" alt="User" src={pathIcons + 'user.png'} width={'50px'} data-tip data-for='userMenu' /> 


          <ReactTooltip event='click' id='userMenu' place='right' effect='solid' type="light" clickable={true} border={true} borderColor={"gray"} offset={{bottom: 30}}>
            <div id="userSubMenu">
              <Link to={'/dashboard/miCuenta'} > 
                <button className='colored-button userSubBtn' > Mi cuenta</button>
              </Link>
              <br/>
              <Link to={'/dashboard/misEtiquetas'} className='colored-button'>
                <button className='colored-button userSubBtn' > Mis etiquetas</button>
              </Link>
            </div>
          </ReactTooltip>
          
        </div>

        <div id='SidebarOptions' className=''>
        
          <ReactTooltip place="right" type="dark" effect="solid"/> {/* Componente para poner el tooltip hover con informacion a cada elemento */}

          <SidebarItem icon="dimensions.png" alt="dimensiones" dataTip="Dimensiones del empaque" isDisabled={isDisabled} content={
            <div id='dimensiones' className='sidebarItem'>
              <div className='sidebarContHeader'>
                <p className='sidebarTitle'>Dimensiones del empaque</p>
                <p className='sidebarSubTitle'>Empieza clasificando las dimensiones a tu etiqueta</p>
              </div>
              <div id='dimensionesCont'>
                <div id="dimensionesInput">
                  <div id='sbAncho'>
                    <label htmlFor="ancho" className="sbLabel">Ancho</label>
                    <input name='ancho' value={this.state.labelAncho} type = "text" onChange={(e)=>this.handleChangeValoresDimensiones(e.target.value,"ancho","labelAncho")} className="gRInput numberInput" onKeyPress={this.numberFilter}/>
                  </div>
                  <div id='sbAltura'>
                    <label htmlFor="altura" className="sbLabel">Altura</label>
                    <input name='altura' value={this.state.labelAltura} type = "text" onChange={(e)=>this.handleChangeValoresDimensiones(e.target.value,"altura","labelAltura")} className="gRInput numberInput" onKeyPress={this.numberFilter}/>
                  </div>
                </div>
                <div id="sbUnidades">
                <Select className='ddMenu' styles={ddLargerStyle} options={unidades} defaultValue={this.state.dimensionesUn} onChange={(e)=> this.handleChangeUnidadesDimensiones(e)}/>
                </div>
              </div>
            </div>
          }/>
          
          <SidebarItem icon="jam-jar-with-label.png" alt="jam-jar-with-label" dataTip="Identidad del alimento" isDisabled={isDisabled} content={
            <div id='identidad' className='sidebarItem'>
              <div className='sidebarContHeader'>
                <p className='sidebarTitle'>Identidad del alimento</p>
                <p className='sidebarSubTitle'>Ingresa el nombre de tu alimento. Recuerda que el nombre debe indicar su verdadera naturaleza y debe ser específico y no genérico.</p>
              </div>
              <div id='identidadCont'>
                <input name='nombreProducto' placeholder='Escriba aquí...' value={this.state.nombreProducto} type="text" onChange={this.updateStateVariable} className="gRInput"/>
              </div>
            </div>
          }/>

          <SidebarItem icon="marca-comercial.png" alt="marca-comercial" dataTip="Marca comercial" isDisabled={isDisabled} content={
            <div id='marca' className='sidebarItem'>
              <div className='sidebarContHeader'>
                <p className='sidebarTitle'>Nombre fantasía o marca comercial</p>
                <p className='sidebarSubTitle'>Se podrá emplear un nombre "acuñado", de "fantasía" o "de fábrica",
                 o una "marca registrada", siempre que vaya acompañado de la identidad del alimento.</p>
              </div>
              <div id='marcaCont'>
                <input name='marca' placeholder='Escriba aquí...' value={this.state.marca} type="text" onChange={this.updateStateVariable} className="gRInput"/>
              </div>
            </div>
          }/>

          <SidebarItem icon="peso.png" alt="peso" dataTip="Contenido neto" isDisabled={isDisabled} content={
            <>
              <Select className='ddMenu' styles={ddLargerStyle} options={unidadesMasa} defaultValue={this.state.pesoNetoUn} onChange={(e)=> this.handleChangeDropdown(e,"pesoNetoUn")}/>
            </>
          } />

          <SidebarItem icon="alcohol-content.png" alt="alcohol-content" dataTip="Grado alcohólico" isDisabled={isDisabled} content={
            <></>
          } />

          <SidebarItem icon="ingredientes.png" alt="ingredientes" dataTip="Ingredientes" isDisabled={isDisabled} content={
            <></>
          } />

          <SidebarItem icon="alergenos.png" alt="alergenos" dataTip="Alérgenos" isDisabled={isDisabled} content={
            <></>
          } />

          <SidebarItem icon="nutritionfacts.png" alt="nutritionfacts" dataTip="Informacion nutricional" isDisabled={isDisabled} content={
            <></>
          } />

          <SidebarItem icon="shelf-life-expired.png" alt="nutritionfacts" dataTip="Informacion nutricional" isDisabled={isDisabled} content={
            <></>
          } />

          <SidebarItem icon="celsius.png" alt="celsius" dataTip="Forma de conservación" isDisabled={isDisabled} content={
            <></>
          } />

          <SidebarItem icon="lote.png" alt="lote" dataTip="Identificación del lote" isDisabled={isDisabled} content={
            <></>
          } />

          <SidebarItem icon="info.png" alt="info" dataTip="Información adicional" isDisabled={isDisabled} content={
            <></>
          } />

          <SidebarItem icon="pin.png" alt="pin" dataTip="Dirección del fabricante" isDisabled={isDisabled} content={
            <></>
          } />

          <SidebarItem icon="instructions.png" alt="instructions" dataTip="Instrucciones de uso" isDisabled={isDisabled} content={
            <></>
          } />

          <SidebarItem icon="mensajes-declarados.png" alt="mensajes-declarados" dataTip="Declaraciones" isDisabled={isDisabled} content={
            <></>
          } />
          
        </div>
        
      </div>   
    );

  };
}

export default Sidebar;