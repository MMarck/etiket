import { Component } from 'react';
import ReactTooltip from "react-tooltip";
import SidebarItem from "../SidebarItem/SidebarItem";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import {Link} from 'react-router-dom';
import Select from 'react-select';
import { connect } from 'react-redux';
import {replace} from "../../reducers/etiquetaSlice";
import './NutritionFacts_form.css';


/**
 * Importacion de datos constantes
 */
import { 
  pathIcons,
  unidades,
  unidadesMasa,
  pesosNetos,
  pesosDrenados,
} from '../../config/constants';

/**
 * Importacion de estilos constantes
 */
import { 
  ddNormalStyle,
  ddSmallStyle
} from '../../config/constants';



const mapStateToProps = state => ({
  etiqueta: state.etiqueta
});
const mapDispatchToProps = () => ({ 
  replace
});

class NutritionFacts_form extends Component{
    
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
      let max_width_information= '50%';
      let max_width_inputs= '50%';
    
    const isDisabled=this.props.isDisabled
    return (
      <div id='' style={{backgroundColor:'#e6e6e6', width:'50px', height:'100%', padding:'10px'}} > 
        <div className='d-flex gap-2 mb-4' > 
          <img  alt="nutritionfacts" src={pathIcons + 'nutritionfacts.png'} width={'25px'} /> 
          <p className='sidebarTitle'>Vamos a desarrollar la tabla nutricional de tu producto</p>
        </div>

        <div  className='d-flex flex-column gap-2'> {/* elementos */}

            {/* tipo de tabla */}
            <div  className='d-flex' >
                <div style={{maxWidth: max_width_information}}>
                    <p>Elige el tipo de tabla de acuerdo al tamaño de tu etiqueta</p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        onChange={(e)=> this.handleStateChange("tipoTabla",e.target.value)}
                    />
                </div>
            </div>

            {/* Tamaño de la porción */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Tamaño de la porción</p>
                </div>
                
                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        onChange={(e)=> this.handleStateChange("tamanioPorcion",e.target.value)}
                    />
                </div>
            </div>

            {/* Porciones por envase */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Porciones por envase</p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        onChange={(e)=> this.handleStateChange("porcionPorEnvase",e.target.value)}
                    />
                </div>
            </div>

            {/* LABEL */}
            <div  className='d-flex' >
                <div style={{maxWidth: max_width_information}}>
                    <p>Parámetro</p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <p>Resultado</p>
                </div>
            </div>

            {/* Grasa total (%) */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Grasa total (%)</p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        onChange={(e)=> this.handleStateChange("grasaTotal",e.target.value)}
                    />
                </div>
            </div>

            {/* Grasa saturada (%) */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Grasa saturada (%)</p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        onChange={(e)=> this.handleStateChange("grasaSaturada",e.target.value)}
                    />
                </div>
            </div>

            {/* Grasas trans (%) */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Grasas trans (%)</p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        onChange={(e)=> this.handleStateChange("grasasTrans",e.target.value)}
                    />
                </div>
            </div>

            {/* Ácidos grasos mono insaturados (%) */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Ácidos grasos mono insaturados (%)</p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        onChange={(e)=> this.handleStateChange("acidosMono",e.target.value)}
                    />
                </div>
            </div>

            {/* Ácidos grasos poli insaturados (%) */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Ácidos grasos poli insaturados (%)</p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        onChange={(e)=> this.handleStateChange("acidosPoli",e.target.value)}
                    />
                </div>
            </div>

            {/* Colesterol (mg/100 g) */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Colesterol (mg/100 g)</p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        onChange={(e)=> this.handleStateChange("colesterol",e.target.value)}
                    />
                </div>
            </div>

            {/* Sodio (mg/100 g)  */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Sodio (mg/100 g) </p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        onChange={(e)=> this.handleStateChange("sodio",e.target.value)}
                    />
                </div>
            </div>

            {/* Carbohidratos (%) */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Carbohidratos (%)</p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        onChange={(e)=> this.handleStateChange("carbohidratos",e.target.value)}
                    />
                </div>
            </div>

            {/* Azúcares totales (%) */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Azúcares totales (%)</p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        onChange={(e)=> this.handleStateChange("azucares",e.target.value)}
                    />
                </div>
            </div>

            {/* Proteína (%) */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Proteína (%)</p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        onChange={(e)=> this.handleStateChange("proteina",e.target.value)}
                    />
                </div>
            </div>

            {/* Fibra (%) */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Fibra (%)</p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        onChange={(e)=> this.handleStateChange("fibra",e.target.value)}
                    />
                </div>
            </div>

            {/* Energía total */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Energía total</p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <input 
                        type="text" 
                        placeholder='julios/porcion'
                        onChange={(e)=> this.handleStateChange("energiaTotalJulios",e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder='cal/porcion'
                        onChange={(e)=> this.handleStateChange("energiaTotalCalorias",e.target.value)}
                    />
                </div>
            </div>


        </div>
        
      </div>   
    );

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(NutritionFacts_form);

