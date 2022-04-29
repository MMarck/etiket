import { replaceLE } from "../../reducers/LabelEditorSlice";
import { Component } from 'react';
import { replace } from "../../reducers/etiquetaSlice";
import { connect } from 'react-redux';
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import Select from 'react-select';
import './NutritionFactsForm.css';

/**
 * Importacion de datos constantes
 */
import { 
    ddNormalStyle, 
    ddSmallStyle, 
    pathIcons, 
    tiposTablas, 
    unidadesPorcion,
    AproxOptions,
    Nutrientes
 } from '../../config/constants';
import { getReportFormat } from "../../tools/Casefunctions";



const mapStateToProps = state => ({
  etiqueta: state.etiqueta,
  LabelEditorSlice: state.LabelEditorSlice
});
const mapDispatchToProps = () => ({ 
  replace,
  replaceLE
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

  setNutritionsFacts(type, value, unit){

    //aplicar redondedo
    let {result, report} = getReportFormat(type, value, unit);

    //obtener VDR (valor diario recomendado)
    let vdr = ''
    let nutriente =   Object.keys(Nutrientes).find( e => e === type)
    
    vdr = nutriente?  Math.round( result / Nutrientes[type] * 100 )+'%' : '';

    this.handleStateChange(type,{report: report, vdr:vdr})
  }


  render(){
    let max_width_information= '50%';
    let max_width_inputs= '50%';

    let tamanioPorcion = this.props.etiqueta.tamanioPorcion;
    let tamanioPorcionUn = this.props.etiqueta.tamanioPorcionUn;
    let tipoTabla = this.props.etiqueta.tipoTabla;
    let porcionPorEnvase = this.props.etiqueta.porcionPorEnvase;
    let porcionPorEnvaseUn = this.props.etiqueta.porcionPorEnvaseUn;
    let porcionPorEnvaseDisabled = this.props.etiqueta.porcionPorEnvaseDisabled;
    
    return (
      <div id='' className='semi-bordered-left' style={{backgroundColor:'#e6e6e6', padding:'10px'}} > 
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
                    <Select
                        onChange={(e)=> this.handleStateChange("tipoTabla",e)}
                        defaultValue={ tipoTabla }
                        styles={ddNormalStyle}
                        options={tiposTablas}
                        className='ddMenu'
                    />
                </div>
            </div>

            {/* Tamaño de la porción */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Tamaño de la porción</p>
                </div>
                
                <div style={{maxWidth: max_width_inputs, display:'flex'}}>
                    <input 
                        onChange={(e)=> this.handleStateChange("tamanioPorcion",e.target.value)}
                        className=" gRInput numberInput"
                        style={{marginRight:'10px'}}
                        type="text"
                        value={tamanioPorcion}
                    />
                    <Select
                        onChange={(e)=> this.handleStateChange("tamanioPorcionUn",e)}
                        defaultValue={ tamanioPorcionUn }
                        styles={ddSmallStyle}
                        options={unidadesPorcion}
                        className='ddMenu'
                    />

                </div>
            </div>

            {/* Porciones por envase */}
            <div  className='d-flex' >

                <div style={{maxWidth: max_width_information}}>
                    <p>Porciones por envase</p>
                </div>

                <div className='d-flex justify-content-center' style={{maxWidth: max_width_inputs}}>
                    

                    <div 
                        onChange={()=>{this.handleStateChange('porcionPorEnvaseDisabled', !porcionPorEnvaseDisabled)}}
                        style={{alignSelf:'flex-end', marginBottom:"1vh"}} 
                        id='pesosCheckbox'
                    >
                        <CustomCheckbox isChecked={!porcionPorEnvaseDisabled}/>

                    </div>

                    <Select
                        onChange={(e)=> this.handleStateChange("porcionPorEnvaseUn",e)}
                        className='ddMenu'
                        styles={ddSmallStyle}
                        options={AproxOptions}
                        defaultValue={porcionPorEnvaseUn}
                        isDisabled={porcionPorEnvaseDisabled}
                    />
                    <input
                        onChange={(e)=> this.handleStateChange("porcionPorEnvase",e.target.value)}
                        value={porcionPorEnvase}
                        className=" gRInput numberInput"
                        name='porcionPorEnvase'
                        type="text"
                        onKeyPress={this.numberFilter}
                    />
                </div>
            </div>

            {/* LABEL */}
            <div  className='d-flex' >
                <div style={{maxWidth: max_width_information}}>
                    <p><b>Parámetro</b></p>
                </div>

                <div style={{maxWidth: max_width_inputs}}>
                    <p><b>Resultado</b></p>
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
                        onChange={(e)=> this.setNutritionsFacts("grasaTotal",e.target.value, 'g')} 
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
                        onChange={(e)=> this.setNutritionsFacts("grasaSaturada",e.target.value, 'g')}
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
                        onChange={(e)=> this.setNutritionsFacts("grasasTrans",e.target.value,'g')}
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
                        onChange={(e)=> this.setNutritionsFacts("acidosMono",e.target.value,'g')}
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
                        onChange={(e)=> this.setNutritionsFacts("acidosPoli",e.target.value,'g')}
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
                        onChange={(e)=> this.setNutritionsFacts("colesterol",e.target.value,'mg')}
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
                        onChange={(e)=> this.setNutritionsFacts("sodio",e.target.value,'g')}
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
                        onChange={(e)=> this.setNutritionsFacts("carbohidratos",e.target.value,'g')}
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
                        onChange={(e)=> this.setNutritionsFacts("azucares",e.target.value,'g')}
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
                        onChange={(e)=> this.setNutritionsFacts("proteina",e.target.value,'g')}
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
                        onChange={(e)=> this.setNutritionsFacts("fibra",e.target.value, 'g')}
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


            <button onClick={()=>{this.props.replaceLE(['showNutritionFacts', true]) }}
                className=' btn-secondary darkButton fw-bolder p-2 my-4'
            >
                GUARDAR CAMBIOS
            </button>

        </div>
        
      </div>   
    );

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(NutritionFacts_form);

