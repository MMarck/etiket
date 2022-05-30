import { backendURL } from '../../config/constants.js'
import { withRouter } from "../../tools/withRouter";
import { Component } from 'react';
import { connect } from 'react-redux';
import {replace} from "../../reducers/etiquetaSlice";
import {Link} from 'react-router-dom';
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import IngredientesModal from '../IngredientesModal/IngredientesModal.js';
import ReactTooltip from "react-tooltip";
import SidebarItem from "../SidebarItem/SidebarItem";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import Cookies from 'js-cookie';
import Select from 'react-select';
import axios from "axios";
import './Sidebar.css';

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

/**
 * Componente para renderizar la barra lateral para el ingreso de datos 
 * que modifican una etiqueta en el editor de etiquetas 
 */
class Sidebar extends Component{
    
  constructor(props){
    super(props)
    this.state={
      accessToken:Cookies.get("accessToken") || "",
      refreshToken: Cookies.get("refreshToken") || ""
    }
  }

  numberFilter(event) {
    var value = event.target.value + event.key;
    if (!/^\d{0,3}(\.\d{0,2})?$/.test(value)){
       event.preventDefault();
    }
  }

  handlePesoDrenadoDisable(){
    if (this.props.etiqueta.pesoDrenadoDisabled) {
      this.handleStateChange("pesoDrenadoDisabled",!this.props.etiqueta.pesoDrenadoDisabled);
    } else {
      this.handleStateChange("pesoDrenadoDisabled",!this.props.etiqueta.pesoDrenadoDisabled);
      this.handleStateChange("pesoDrenado","")
    }
    
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
    if (value==="") {
      return ""
    } else {
      value=value.split("/")
      const date=new Date(parseInt(value[2]),parseInt(value[1]) -1,parseInt(value[0]))
      return date
    }
    
  }

  logout(){
    const header={
      "Authorization":"Bearer "+this.state.accessToken
    }
    const jsonData={
      "refreshToken":this.state.refreshToken
    }
    axios.post(backendURL+"UsersDB/logout",jsonData,{
      headers:header
    })
    .then((res)=>{
      this.props.navigate("/login")
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  render(){
    const ingredientes=this.props.etiqueta.ingredientes
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
              <button className='colored-button userSubBtn' onClick={()=>this.logout()}> Cerrar sesión</button>
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
            <div id='ingredientes'>
              <div className='sidebarContHeader'>
                <p className='sidebarTitle'>Ingredientes</p>
                <p className='sidebarSubTitle'>Deben declararse todos los ingredientes por orden decreciente de proporciones. Copie y pegue su lista desde un archivo csv o escríbalos directamente.</p>
              </div>
              <div id="ingCont">
                <table className="ingTable">
                  <thead>
                    <tr>
                      <th>Ingrediente</th>
                      <th>Porcentaje</th>
                    </tr>
                  </thead>
                  <tbody style={{textAlign:"center"}}>
                  {
                      ingredientes.map((ing,index)=>
                      <tr>
                        <td>{ing.valor}</td>
                        <td>{ing.porcentaje}</td>
                      </tr>
                      )
                    }
                  </tbody>
                  
                </table>
                <IngredientesModal/>
              </div>
            </div>
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



/**
 * Declaracion de las variables del estado global que se usaran 
 * en este componente a traves de sus props
 * 
 * @param {*} state: Se llena automaticamente
 * @returns null
 */
 const mapStateToProps = state => ({
  etiqueta: state.etiqueta
});

/**
 * Declaracion de metodos para modificar el estado global que se
 * usaran en este componente a traves de sus props
 * @returns null
 */
const mapDispatchToProps = () => ({ 
  replace
});



export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(withRouter(Sidebar));