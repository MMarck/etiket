import { Component } from 'react';
import { connect } from 'react-redux';
import {replace} from "../../reducers/etiquetaSlice";
import './NutritionFactsPreviewer.css';





const mapStateToProps = state => ({
  etiqueta: state.etiqueta
});
const mapDispatchToProps = () => ({ 
  replace
});

class NutritionFacts_Previewer extends Component{
    
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
  }

  render(){
    let tamanioPorcion = this.props.etiqueta.tamanioPorcion;
    let porcionPorEnvase = this.props.etiqueta.porcionPorEnvase;
    let grasaTotal = this.props.etiqueta.grasaTotal;
    let grasaSaturada = this.props.etiqueta.grasaSaturada;
    let grasasTrans = this.props.etiqueta.grasasTrans;
    let acidosMono = this.props.etiqueta.acidosMono;
    let acidosPoli = this.props.etiqueta.acidosPoli;
    let colesterol = this.props.etiqueta.colesterol;
    let sodio = this.props.etiqueta.sodio;
    let carbohidratos = this.props.etiqueta.carbohidratos;
    let fibra = this.props.etiqueta.fibra;
    let azucares = this.props.etiqueta.azucares;
    let proteina = this.props.etiqueta.proteina;
     
    return (
        <div id='NutritionFactsPreviewer' className='semi-bordered-right'>

            <p style={{ margin:'3em 2em 0em 2em'}}> 
                <b>Este es un ejemplo de como va a quedar la tabla nutricional de tu producto </b>
            </p>

            <section className="performance-facts" style={{overflow:'auto', height:'100%'}}>
                
            {/* Seccion 1 - Titulo y totales */}
            <header className="performance-facts__header">
                <h1 className="performance-facts__title">Información Nutricional</h1>
                <p>Tamaño de la porción: {tamanioPorcion} g</p> {/* //PENDIENTE AÑADIR UNIDAD */}
                <p>Porciones por envase: {porcionPorEnvase}</p>
            </header>

            {/* Seccion 2 - energia */}
            <table className="performance-facts__table">
                
                <thead className='separator-botton-1'>
                    <tr>
                        <th colspan="2" className="small-info">
                            Cantidad por porción
                        </th>
                        <td className="small-info">
                            <b>% Valor Diario</b>
                        </td>
                    </tr>
                </thead>

                <tbody>

                <tr className='separator-botton-1'>
                    <th colspan="2">
                        <b>Energia (Calorias)</b>
                        <span className='fw-light'> 168kJ (40 kcal) </span>
                    </th>
                    <td>
                        7%
                    </td>
                </tr>

                <tr className='separator-botton-2'>
                    <th colspan="2">
                        <b>Energia de grasa (Calorias de grasa)</b> 
                        <span className='fw-light'> 168kJ (40 kcal) </span>
                    </th>
                    <td>
                        7%
                    </td>
                </tr>

                <tr className="separator-botton-1" >
                    <th colspan="2"></th>
                    <td  className="small-info">
                        <b>% Valor Diario</b>
                    </td>
                </tr>

                {/* Grasa total */}
                <tr className="separator-botton-1" >
                    <th colspan="2">
                        Grasa total
                        <span className='fw-light'> 4g </span>
                    </th>
                    <td>
                        <b>{grasaTotal}%</b>
                    </td>
                </tr>

               <AcidosSubTable 
                    data={[
                        {label:'Acidos grasos saturados',        magnitude:4, unit:'g', percentage: grasaSaturada},
                        {label:'Acidos grasos trans',            magnitude:0, unit:'g', percentage: grasasTrans},
                        {label:'Acidos grasos mono insaturados', magnitude:4, unit:'g', percentage: acidosMono},
                        {label:'Acidos grasos poli insaturados', magnitude:4, unit:'g', percentage: acidosPoli},
                    ]} 
               />

                <tr className="separator-botton-1" >
                    <th colspan="2">
                        <b>Colesterol</b>
                        <span className='fw-light'> 4g </span>
                    </th>
                    
                    <td>
                        <b>{colesterol}%</b>
                    </td>
                </tr>

                <tr className="separator-botton-1" >
                    <th colspan="2">
                        <b>Sodio</b>
                        <span className='fw-light'> 200g </span>
                    </th>

                    <td>
                        <b>{sodio}%</b>
                    </td>
                </tr>

                <tr className="separator-botton-1" >
                    <th colspan="2">
                        <b>Carbohidratos totales</b>
                        <span className='fw-light'> 200g </span>
                    </th>
                    <td>
                        <b>{carbohidratos}%</b>
                    </td>
                </tr>

                <tr className="separator-botton-1" >
                    <td className="blank-cell">
                    </td>
                    <th>
                        fibra
                        <span className='fw-light'> 1g </span>
                    </th>
                    <td>
                        <b>{fibra}%</b>
                    </td>
                </tr>

                <tr className="separator-botton-1" >
                    <td className="blank-cell">
                    </td>
                    <th>
                        Azucares
                        <span className='fw-light'> 20g </span>
                    </th>
                    <td>
                        <b>{azucares}%</b>
                    </td>
                </tr>

                <tr className="thick-end">
                    <th colspan="2">
                        <b>Proteína</b>
                        <span className='fw-light'> 2g </span>
                    </th>
                    <td>
                        <b>{proteina}%</b>
                    </td>
                </tr>

                </tbody>

            </table>

            {/* Seccion 3 - Vitaminas */}
            <table className="performance-facts__table">
                <tbody>

                    <VitaminasSubTable 
                        data={[
                            {label:'Vitamina A', percentage: 10},
                            {label:'Vitamina B', percentage: 2},
                            {label:'Vitamina C', percentage: 3},
                            {label:'Vitamina D', percentage: 3},
                        ]} 
                    />

                </tbody>
            </table>

            <p className="small-info mt-4">
                * Los porcentajes de los valores diarios estan basados en una dieta de
                8380 kJ (2000 kcal)
            </p>



            {/* Seccion 4 - Inforacion adicional */}
            {true?
                <table className="performance-facts__table small-info">
                    <thead>
                        <tr style={{textAlign:"end"}} className="separator-botton-1">
                            <td colspan="2"></td>
                            <th className='fw-light' > Calorías: </th>
                            <th className='fw-light' >2,000 </th>
                            <th className='fw-light' >2,500 </th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <th colspan="2" className='fw-light'>
                                Grasa total
                            </th>
                            <td>Menos de</td>
                            <td>65g</td>
                            <td>80g</td>
                        </tr>

                        <tr>
                            <td className="blank-cell"></td>
                            <th className='fw-light'>
                                Grasa saturada
                            </th>
                            <td>Menos de</td>
                            <td>20g</td>
                            <td>25g</td>
                        </tr>

                        <tr>
                            <th colspan="2" className='fw-light'>
                                Colesterol
                            </th>
                            <td>Menos de</td>
                            <td>300mg</td>
                            <td>300 mg</td>
                        </tr>

                        <tr>
                            <th colspan="2" className='fw-light'>
                                Sodio
                            </th>
                            <td>Menos de</td>
                            <td>2,400mg</td>
                            <td>2,400mg</td>
                        </tr>

                        <tr>
                            <th colspan="3" className='fw-light'>
                                Carbohidratos totales
                            </th>
                            <td>300g</td>
                            <td>375g</td>
                        </tr>
                        
                        <tr>
                            <td className="blank-cell"></td>
                            <th colspan="2" className='fw-light'>
                                Fibra dietetica
                            </th>
                            <td>25g</td>
                            <td>30g</td>
                        </tr>

                    </tbody>
                </table>
            :
            ''}

            </section>
        </div>
    );

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(NutritionFacts_Previewer);

function AcidosSubTable(params){
    let acidList=[]

    params.data.forEach(element => { 
        
        acidList.push(
            <tr className="separator-botton-1" >
                <td className="blank-cell">
                </td>

                <th>
                    {element.label}
                    <span className='fw-light'> {element.magnitude} {element.unit} </span>
                </th>
                <td>
                    <b>{element.percentage}%</b>
                </td>
            </tr>
        )
    })

    return ( acidList ) 

}

function VitaminasSubTable(params){
    let vitaminasList=[]

    params.data.forEach(element => { 
        
        vitaminasList.push(
            <tr className="separator-botton-1" >
                <th>
                    <span className='fw-light'> {element.label} </span>
                </th>
                <td>
                    {element.percentage}%
                </td>
            </tr>
        )
    })

    return ( vitaminasList ) 

}