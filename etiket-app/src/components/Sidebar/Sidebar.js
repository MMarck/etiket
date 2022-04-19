import { Component } from 'react';
import './Sidebar.css';
import ReactTooltip from "react-tooltip";
import SidebarItem from "../SidebarItem/SidebarItem";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import {Link} from 'react-router-dom';
import Select from 'react-select';
import { connect } from 'react-redux';
import {replace} from "../../reducers/etiquetaSlice";
import DatePicker from 'react-date-picker/dist/entry.nostyle';

/**
 * Importacion de datos constantes
 */
import { 
  pathIcons,
  unidades,
  unidadesMasa,
  conservacion,
  conservacionUn,
  unidadesDias,
  fabricaciones,
  caducidades,
  pesosNetos,
  pesosDrenados,
  unidadesAlcohol,
  alergenos
} from '../../config/constants';

/**
 * Importacion de estilos constantes
 */
import { 
  ddMultipleStyle,
  ddNormalStyle,
  ddLargeStyle,
  ddLargeStyleSmallFont,
  ddLargestStyle,
  ddSmallStyle
} from '../../config/constants';
import NutritionFactsModal from '../NutritionFactsModal/NutritionFactsModal';



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
    if (this.props.etiqueta.pesoDrenadoDisabled) {
      this.handleStateChange("pesoDrenadoDisabled",!this.props.etiqueta.pesoDrenadoDisabled);
    } else {
      this.handleStateChange("pesoDrenadoDisabled",!this.props.etiqueta.pesoDrenadoDisabled);
      this.handleStateChange("pesoDrenado","")
    }
    
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
    
    const isDisabled=this.props.isDisabled
    return (
      <div id='SidebarContainer' className='' >
        <div id="userIcon" className=''> 
          <img id="userImg" alt="User" src={pathIcons + 'user.png'} width={'50px'} data-tip data-for='userMenu' /> 


          <ReactTooltip event='click' id='userMenu' place='right' effect='solid' type="light" clickable={true} border={true} borderColor={"gray"} offset={{bottom: 50}}>
            <div id="userSubMenu">
              <Link to={'/miCuenta'} > 
                <button className='colored-button userSubBtn' > Mi cuenta</button>
              </Link>
              <br/>
              <Link to={'/misEtiquetas'} className='colored-button'>
                <button className='colored-button userSubBtn' > Mis etiquetas</button>
              </Link>
              <br/>
              <Link to={'/login'} > 
                <button className='colored-button userSubBtn' > Cerrar sesión</button>
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
                    <input name='ancho' value={this.props.etiqueta.ancho} type = "text" onChange={(e)=>{this.handleStateChange("ancho",e.target.value); this.handleStateChange("sizeIndicatorVisibility",'visible')}} className="gRInput numberInput" onKeyPress={this.numberFilter}/>
                  </div>
                  <div id='sbAltura'>
                    <label htmlFor="altura" className="sbLabel">Altura</label>
                    <input name='altura' value={this.props.etiqueta.altura} type = "text" onChange={(e)=>{this.handleStateChange("altura",e.target.value); this.handleStateChange("sizeIndicatorVisibility",'visible')}} className="gRInput numberInput" onKeyPress={this.numberFilter}/>
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
                  <CustomCheckbox isChecked={!this.props.etiqueta.pesoDrenadoDisabled}/>
                </div>
                
                <div id="pesos">
                  <div id='pesoNeto'>
                    <Select className='ddMenu' styles={ddNormalStyle} options={pesosNetos} defaultValue={this.props.etiqueta.pesoNetoLabel} onChange={(e)=> this.handleStateChange("pesoNetoLabel",e)}/>
                    <input name='pesoNeto' value={this.props.etiqueta.pesoNeto} type="text" onKeyPress={this.numberFilter} className=" gRInput numberInput" onChange={(e)=> this.handleStateChange("pesoNeto",e.target.value)}/>
                    <Select className='ddMenu' styles={ddSmallStyle} options={unidadesMasa} defaultValue={this.props.etiqueta.pesoNetoUn} onChange={(e)=> this.handleStateChange("pesoNetoUn",e)}/>
                  </div>
                  <div id='pesoDrenado'>
                    <Select className='ddMenu' styles={ddNormalStyle} options={pesosDrenados} defaultValue={this.props.etiqueta.pesoDrenadoLabel} onChange={(e)=> this.handleStateChange("pesoDrenadoLabel",e)} isDisabled={this.props.etiqueta.pesoDrenadoDisabled}/>
                    <input id="pesoDrenadoInput" value={this.props.etiqueta.pesoDrenado} name='pesoDrenado' type="text" onKeyPress={this.numberFilter} className=" gRInput numberInput" onChange={(e)=> this.handleStateChange("pesoDrenado",e.target.value)} disabled={this.props.etiqueta.pesoDrenadoDisabled}/>
                    <Select className='ddMenu' styles={ddSmallStyle} options={unidadesMasa} defaultValue={this.props.etiqueta.pesoDrenadoUn} onChange={(e)=> this.handleStateChange("pesoDrenadoUn",e)} isDisabled={this.props.etiqueta.pesoDrenadoDisabled}/>
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
                <Select isMulti={true} className='ddMenu' styles={ddMultipleStyle} options={alergenos} onChange={(e)=> this.handleStateChange("alergenos",e)} defaultValue={this.props.etiqueta.alergenos}/>
              </div>
            </div>
          } />

          <SidebarItem icon="nutritionfacts.png" alt="nutritionfacts" dataTip="Información nutricional" isDisabled={isDisabled} content={
            <div className='d-flex flex-column'>
              <div className='sidebarContHeader'>
                <p className='sidebarTitle'>Información Nutricional</p>
                <p className='sidebarSubTitle'>Para elaborar la tabla nutricional, hay que realizar algunos cálculos.</p>
              </div>
              
              {/* Esta estiqueta renderiza un boton con toda la logica para 
              mostrar/ocultar el modal (popUp) para crear la etiqueta
              de informacion nutricional */}
              <NutritionFactsModal/>
            </div>
          } />

          <SidebarItem icon="shelf-life-expired.png" alt="time life" dataTip="Tiempo de vida útil" isDisabled={isDisabled} content={
            <div id='vida'>
              <div className='sidebarContHeader'>
                <p className='sidebarTitle'>Tiempo de vida útil</p>
                <p className='sidebarSubTitle'>Es obligatorio definir el tiempo de consumo seguro, incluyendo la fecha de elaboración y fecha de caducidad</p>
              </div>
              <div id="vidaCont">
                <div id='dias' className='vidaSubCont'>
                  <input name='vidaUtil' type="text" onKeyPress={this.numberFilter} onChange={(e)=> this.handleStateChange("vidaUtil",e.target.value)} className="form-control gRInput numberInput" id="vidaUtil"/>
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
                <Select className='ddMenu' defaultValue={this.props.etiqueta.metodoConvervacion} styles={ddLargeStyleSmallFont} options={conservacion} onChange={(e)=> {this.handleStateChange("metodoConservacion",e)}} />
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