import { Component } from 'react';
import './Sidebar.css';
import ReactTooltip from "react-tooltip";
import SidebarItem from "../SidebarItem/SidebarItem";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import {Link} from 'react-router-dom';
import Select from 'react-select';
import { connect } from 'react-redux';
import {replace} from "../etiqueta/etiquetaSlice";
import { getFormControlUnstyledUtilityClasses } from '@mui/base';
import DatePicker from 'react-date-picker/dist/entry.nostyle';

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

const conservacionUn=[
  {
    value: "Mantener",
    label: "Mantener"
  },
  {
    value: "Conservar",
    label: "Conservar"
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
    value: "Año",
    label: "Año"
  },
  {
      value: "Años",
      label: "Años"
  }
]

const fabricaciones=[
  {
    value: "Fecha de elaboración",
    label: "Fecha de elaboración",
  },
  {
      value: "Fecha de fabricación",
      label: "Fecha de fabricación",
  },
  {
    value: "Fecha de envasado",
    label: "Fecha de envasado"
  }
]

const caducidades=[
  {
    value: "Consumir antes del",
    label: "Consumir antes del",
  },
  {
      value: "Fecha de caducidad",
      label: "Fecha de caducidad",
  },
  {
    value: "Fecha de vencimiento",
    label: "Fecha de vencimiento"
  },
  {
    value: "Fecha de elaboración",
    label: "Fecha de elaboración",
  },
  {
      value: "Consumir preferentemente antes del",
      label: "Consumir preferentemente antes del",
  },
  {
    value: "Fecha de mejor calidad",
    label: "Fecha de mejor calidad"
  },
  {
    value: "Consumir antes del final de",
    label: "Consumir antes del final de",
  },
  {
    value: "Consumir preferentemente antes del final de",
    label: "Consumir preferentemente antes del final de"
  },
  {
    value: "Fecha de mejor calidad: antes del final de",
    label: "Fecha de mejor calidad: antes del final de"
  },
  {
      value: "Fecha de caducidad: final de",
      label: "Fecha de caducidad: final de",
  },
  {
    value: "Fecha de vencimiento: final de",
    label: "Fecha de vencimiento: final de"
  }
]

const pesosNetos=[
  {
    value: "Contenido neto",
    label: "Contenido neto"
  },
  {
    value: "Peso neto",
    label: "Peso neto"
  }
]

const pesosDrenados=[
  {
    value: "Peso drenado",
    label: "Peso drenado"
  },
  {
    value: "Peso escurrido",
    label: "Peso escurrido"
  },
  {
    value: "Masa drenada",
    label: "Masa drenada"
  },
  {
    value: "Masa escurrida",
    label: "Masa escurrida"
  }
]

const unidadesAlcohol=[
  {
    value:"Alcohol __%(Vol.)",
    label: "Alcohol __%(Vol.)"
  },
  {
    value:"Alcohol __%(Volumen)",
    label: "Alcohol __%(Volumen)"
  },
  {
    value:"Alc. __%(Vol.)",
    label: "Alc. __%(Vol.)"
  },
  {
    value:"ALCOHOL __%(VOL.)",
    label: "ALCOHOL __%(VOL.)"
  },
  {
    value:"ALCOHOL __%(VOLUMEN)",
    label: "ALCOHOL __%(VOLUMEN)"
  },
  {
    value:"ALC. __% (VOL.)",
    label:"ALC. __% (VOL.)"
  },
  {
    value:"ALC. __% (VOLUMEN)",
    label:"ALC. __% (VOLUMEN)"
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

const ddMultipleStyle={
  clearIndicator: (provided, state)=>({
    ...provided,
    color: state.isFocused ? "#1ED796":"white"
  }),
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
    border: state.isDisabled ? "2px solid #00000048":"2px solid #404040",
    backgroundColor: state.isDisabled ? "#00000048":"#404040",
    display: "flex",
    cursor: "Pointer",
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

const ddNormalStyle={
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
    border: state.isDisabled ? "2px solid #00000048":"2px solid #404040",
    backgroundColor: state.isDisabled ? "#00000048":"#404040",
    display: "flex",
    cursor: "Pointer",
    width:"10vw",
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

const ddLargeStyle={
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
    border: state.isDisabled ? "2px solid #00000048":"2px solid #404040",
    backgroundColor: state.isDisabled ? "#00000048":"#404040",
    display: "flex",
    cursor: "Pointer",
    width:"14vw",
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

const ddLargeStyleSmallFont={
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
    border: state.isDisabled ? "2px solid #00000048":"2px solid #404040",
    backgroundColor: state.isDisabled ? "#00000048":"#404040",
    display: "flex",
    cursor: "Pointer",
    width:"14vw",
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
    color: "white",
    fontSize: "0.65em"
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

const ddLargestStyle={
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
    border: state.isDisabled ? "2px solid #00000048":"2px solid #404040",
    backgroundColor: state.isDisabled ? "#00000048":"#404040",
    display: "flex",
    cursor: "Pointer",
    width:"15.41vw",
    maxWidth: "30vw",
    borderRadius: "8px",
      
  }),
  input: (provided,state)=>({
    ...provided,
    color: "white"
  }),
  placeholder: (provided,state)=>({
    ...provided,
    color: "white",
    fontSize: "1em"
  }),
  singleValue: (provided,state)=>({
    ...provided,
    color: "white",
    fontSize: "0.65em"
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

const ddSmallStyle={
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
  control: (provided,state) =>({
    border: state.isDisabled ? "2px solid #00000048":"2px solid #404040",
    backgroundColor: state.isDisabled ? "#00000048":"#404040",
    display: "flex",
    cursor: "Pointer",
    minWidth: "none",
    width: "5vw",
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

const mapStateToProps = state => ({
  etiqueta: state.etiqueta
});
const mapDispatchToProps = () => ({ 
  replace
});

class Sidebar extends Component{
    
  constructor(props){
    super(props)
    this.state={
      isDisabled: false,
      date: new Date(),
      pesoDrenadoDisabled:true,
      pesoDrenado: {},
      pesoDrenadoUn:{},
      alcohol:"",
      alcoholUn:{},
      ingredientes: '',
      alergenos: '',
      metodoConservacion: '',
      vidaUtil:'',
      direccion: '',
      instrucciones: ''
    }
    this.updateStateVariable = this.updateStateVariable.bind(this);
  }

  setNewDate(date){
    this.setState({
      date: date
    })
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

  handlePesoDrenadoDisable(){
    this.setState({pesoDrenadoDisabled: !this.state.pesoDrenadoDisabled}, ()=>{
      if (!this.state.pesoDrenadoDisabled) {
        //document.getElementById("pesoDrenadoInput").value="";
        this.handleStateChange("pesoDrenado","")
        this.handleStateChange("pesoDrenadoUn",{})
      }
    })
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
  
  handleStateChange(stateName,value){
    const payload={
      stateName: stateName,
      value: value
    }

    this.props.replace(payload);
  }

  handleDateChange(stateName,value){

    const yyyy = value.getFullYear();
    let mm = value.getMonth() + 1; 
    let dd = value.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const date = dd + '/' + mm + '/' + yyyy

    const payload={
      stateName: stateName,
      value: date
    }

    this.props.replace(payload)
  }

  getDateObject(value){
    value=value.split("/")
    const date=new Date(parseInt(value[2]),parseInt(value[1]) -1,parseInt(value[0]))
    return date
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
                    <input name='ancho' value={this.props.etiqueta.ancho} type = "text" onChange={(e)=>this.handleStateChange("ancho",e.target.value)} className="gRInput numberInput" onKeyPress={this.numberFilter}/>
                  </div>
                  <div id='sbAltura'>
                    <label htmlFor="altura" className="sbLabel">Altura</label>
                    <input name='altura' value={this.props.etiqueta.altura} type = "text" onChange={(e)=>this.handleStateChange("altura",e.target.value)} className="gRInput numberInput" onKeyPress={this.numberFilter}/>
                  </div>
                </div>
                <div id="sbUnidades">
                <Select className='ddMenu' styles={ddNormalStyle} options={unidades} defaultValue={this.props.etiqueta.dimensionesUn} onChange={(e)=> this.handleStateChange("dimensionesUn",e)}/>
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
                <input name='nombreProducto' placeholder='Escriba aquí...' value={this.props.etiqueta.nombreProducto} type="text" onChange={(e)=> this.handleStateChange("nombreProducto",e.target.value)} className="gRInput"/>
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
                <input name='marca' placeholder='Escriba aquí...' value={this.props.etiqueta.marca} type="text" onChange={(e)=> this.handleStateChange("marca",e.target.value)} className="gRInput"/>
              </div>
            </div>
          }/>

          <SidebarItem icon="peso.png" alt="peso" dataTip="Contenido neto" isDisabled={isDisabled} content={
            <div id='peso' className='sidebarItem'>
              <div className='sidebarContHeader'>
                <p className='sidebarTitle'>Contenido neto y masa escurrida (peso escurrido)</p>
                <p className='sidebarSubTitle'>La declaración del contenido neto representa la cantidad en el momento
                del empacado. El contenido neto debe declararse </p>
              </div>
              <div id="pesoCont">
                <div id='pesosCheckbox' style={{alignSelf:'flex-end', marginBottom:"1vh"}} onChange={()=>{this.handlePesoDrenadoDisable()}}>
                  <CustomCheckbox/>
                </div>
                
                <div id="pesos">
                  <div id='pesoNeto'>
                    <Select className='ddMenu' styles={ddNormalStyle} options={pesosNetos} defaultValue={this.props.etiqueta.pesoNetoLabel} onChange={(e)=> this.handleStateChange("pesoNetoLabel",e)}/>
                    <input name='pesoNeto' value={this.props.etiqueta.pesoNeto} type="text" onKeyPress={this.numberFilter} className=" gRInput numberInput" onChange={(e)=> this.handleStateChange("pesoNeto",e.target.value)}/>
                    <Select className='ddMenu' styles={ddSmallStyle} options={unidadesMasa} defaultValue={this.props.etiqueta.pesoNetoUn} onChange={(e)=> this.handleStateChange("pesoNetoUn",e)}/>
                  </div>
                  <div id='pesoDrenado'>
                    <Select className='ddMenu' styles={ddNormalStyle} options={pesosDrenados} defaultValue={this.props.etiqueta.pesoDrenadoLabel} onChange={(e)=> this.handleStateChange("pesoDrenadoLabel",e)} isDisabled={this.state.pesoDrenadoDisabled}/>
                    <input id="pesoDrenadoInput" value={this.props.etiqueta.pesoDrenado} name='pesoDrenado' type="text" onKeyPress={this.numberFilter} className=" gRInput numberInput" onChange={(e)=> this.handleStateChange("pesoDrenado",e.target.value)} disabled={this.state.pesoDrenadoDisabled}/>
                    <Select className='ddMenu' styles={ddSmallStyle} options={unidadesMasa} defaultValue={this.props.etiqueta.pesoDrenadoUn} onChange={(e)=> this.handleChangeDropdown(e,"pesoNetoUn")} isDisabled={this.state.pesoDrenadoDisabled}/>
                  </div>
                </div>
              </div>
            </div>
          } />

          <SidebarItem icon="alcohol-content.png" alt="alcohol-content" dataTip="Grado alcohólico" isDisabled={isDisabled} content={
            <div id="alcohol">
              <div className='sidebarContHeader'>
                <p className='sidebarTitle'>Contenido alcohólico</p>
                <p className='sidebarSubTitle'>En el caso de necesitar, se debe declarar un porcentaje del contenido alcohólico.</p>
              </div>
              <div id="alcoholCont">
                <input id="alcoholInput" name='alcohol' type="text" onKeyPress={this.numberFilter} className=" gRInput numberInput" onChange={(e)=> this.handleStateChange("alcohol",e.target.value)}></input>
                <Select className='ddMenu' styles={ddLargeStyle} options={unidadesAlcohol} defaultValue={{value:"Alcohol __% (Vol.)", label:"Alcohol __% (Vol.)"}} onChange={(e)=> this.handleStateChange("alcoholUn",e)}/>
              </div>
            </div>
          } />

          <SidebarItem icon="ingredientes.png" alt="ingredientes" dataTip="Ingredientes" isDisabled={isDisabled} content={
            <></>
          } />

          <SidebarItem icon="alergenos.png" alt="alergenos" dataTip="Alérgenos" isDisabled={isDisabled} content={
            <div id='alergenos'>
              <div className='sidebarContHeader'>
                <p className='sidebarTitle'>Alérgenos</p>
                <p className='sidebarSubTitle'>En el caso de necesitar, se debe declarar los tipos de alérgenos que contiene el producto.</p>
              </div>
              <div id='alergenosCont'>
                <Select isMulti={true} className='ddMenu' styles={ddMultipleStyle} options={alergenos} onChange={(e)=> this.handleStateChange("alergenos",e.map((item) => " " + item.value))} />
              </div>
            </div>
          } />

          <SidebarItem icon="nutritionfacts.png" alt="nutritionfacts" dataTip="Informacion nutricional" isDisabled={isDisabled} content={
            <></>
          } />

          <SidebarItem icon="shelf-life-expired.png" alt="nutritionfacts" dataTip="Informacion nutricional" isDisabled={isDisabled} content={
            <div id='vida'>
              <div className='sidebarContHeader'>
                <p className='sidebarTitle'>Tiempo de vida útil</p>
                <p className='sidebarSubTitle'>Es obligatorio definir el tiempo de consumo seguro, incluyendo la fecha de elaboración y fecha de caducidad</p>
              </div>
              <div id="vidaCont">
                <div id='dias' className='vidaSubCont'>
                  <input name='vidaUtil' type="text" onKeyPress={this.numberFilter} onChange={(e)=> this.handleStateChange("vidaUtil",e)} className="form-control gRInput numberInput" id="vidaUtil"/>
                  <Select className='ddMenu' styles={ddNormalStyle} options={unidadesDias} onChange={(e)=> this.handleStateChange("vidaUtilUn",e)} />
                </div>
                <div id='elab' className='vidaSubCont'>
                  <Select className='ddMenu' styles={ddLargestStyle} options={fabricaciones} onChange={(e)=> this.handleStateChange("fabricacionUn",e)} />
                  <DatePicker format='d/M/yyyy' onChange={(e)=>this.handleDateChange("fabricacion",e)} value={this.getDateObject(this.props.etiqueta.fabricacion)}/>
                </div>
                <div id='cadu' className='vidaSubCont'>
                  <Select className='ddMenu' styles={ddLargestStyle} options={caducidades} onChange={(e)=> this.handleStateChange("caducacionUn",e)} />
                  <DatePicker format='d/M/yyyy' onChange={(e)=>this.handleDateChange("caducacion",e)} value={this.getDateObject(this.props.etiqueta.caducacion)}/>
                </div>
              </div>
            </div>
          } />

          <SidebarItem icon="celsius.png" alt="celsius" dataTip="Forma de conservación" isDisabled={isDisabled} content={
            <div id='conservacion'>
              <div className='sidebarContHeader'>
                <p className='sidebarTitle'>Forma de conservacion</p>
                <p className='sidebarSubTitle'>Se debe especificar la forma de conservacion correcta de su producto.</p>
              </div>
              <div id='conservacionCont'>
                <Select className='ddMenu' defaultValue={this.props.etiqueta.conservacionUn} styles={ddNormalStyle} options={conservacionUn} onChange={(e)=> this.handleStateChange("conservacionUn",e)} />
                <Select className='ddMenu' defaultValue={this.props.etiqueta.metodoConvervacion} styles={ddLargeStyleSmallFont} options={conservacion} onChange={(e)=> this.handleStateChange("metodoConvervacion",e)} />
              </div>
            </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(Sidebar);