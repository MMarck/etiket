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
    //let tamanioPorcion = this.props.etiqueta.tamanioPorcion;
    //let tamanioPorcion = this.props.etiqueta.tamanioPorcion;
    //let tamanioPorcion = this.props.etiqueta.tamanioPorcion;
    //let tamanioPorcion = this.props.etiqueta.tamanioPorcion;
     
    return (
        <div id='Previewer' className='semi-bordered-right' style={{backgroundColor:'white', width:'50px', height:'100%', display:'flex', flexDirection:'column'}}>

            <p style={{ margin:'3em 2em 0em 2em'}}> 
                <b>Este es un ejemplo de como va a quedar la tabla nutricional de tu producto </b>
            </p>
            
            <section class="performance-facts" style={{overflow:'auto', height:'100%'}}>
            <header class="performance-facts__header">
                <h1 class="performance-facts__title">Información Nutricional</h1>
                <p>Tamaño de la porción: {tamanioPorcion} g</p> {/* //PENDIENTE AÑADIR UNIDAD */}
                <p>Porciones por envase: {porcionPorEnvase}</p>
            </header>
            <table class="performance-facts__table">
                <thead>
                    <tr>
                        <th colspan="3" class="small-info">
                        Cantidad por porción %VDR
                        </th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <th colspan="2">
                    <b>Energia (Calorias) 545kJ (130 kcal)</b>
                    7%
                    </th>
                    <td>
                    Energia de grasa (Calorias de grasa)
                    168kJ (40 kcal)
                    </td>
                </tr>
                <tr class="thick-row">
                    <td colspan="3" class="small-info">
                    <b>%VDR</b>
                    </td>
                </tr>
                <tr>
                    <th colspan="2">
                    <b>Grasa total</b>
                    4g
                    </th>
                    <td>
                    <b>{grasaTotal}%</b>
                    </td>
                </tr>
                <tr>
                    <td class="blank-cell">
                    </td>
                    <th>
                    Acidos grasos saturados
                    4g
                    </th>
                    <td>
                    <b>{grasaSaturada}%</b>
                    </td>
                </tr>
                <tr>
                    <td class="blank-cell">
                    </td>
                    <th>
                    Acidos grasos trans
                    0g
                    </th>
                    <td>
                        <b>{grasasTrans}%</b>
                    </td>
                </tr>
                <tr>
                    <td class="blank-cell">
                    </td>
                    <th>
                    Acidos grasos mono insaturados 
                    0g
                    </th>
                    <td>
                        <b>{acidosMono}%</b>
                    </td>
                </tr><tr>
                    <td class="blank-cell">
                    </td>
                    <th>
                    Acidos grasos poli insaturados
                    0g
                    </th>
                    <td>
                        <b>{acidosPoli}%</b>
                    </td>
                </tr>
                <tr>
                    <th colspan="2">
                    <b>Colesterol</b>
                    0mg
                    </th>
                    <td>
                    <b>{colesterol}%</b>
                    </td>
                </tr>
                <tr>
                    <th colspan="2">
                    <b>Sodio</b>
                    200mg
                    </th>
                    <td>
                    <b>{sodio}%</b>
                    </td>
                </tr>
                <tr>
                    <th colspan="2">
                    <b>Carbohidratos totales</b>
                    20g
                    </th>
                    <td>
                    <b>{carbohidratos}%</b>
                    </td>
                </tr>
                <tr>
                    <td class="blank-cell">
                    </td>
                    <th>
                    fibra
                    1g
                    </th>
                    <td>
                    <b>{fibra}%</b>
                    </td>
                </tr>
                <tr>
                    <td class="blank-cell">
                    </td>
                    <th>
                    Azucares
                    10g
                    </th>
                    <td>
                    <b>{azucares}%</b>
                    </td>
                </tr>
                <tr class="thick-end">
                    <th colspan="2">
                    <b>Proteina</b>
                    2g
                    </th>
                    <td>
                        <b>{proteina}%</b>
                    </td>
                </tr>
                </tbody>
            </table>

            <table class="performance-facts__table--grid">
                <tbody>
                <tr>
                    <td colspan="2">
                    Vitamin A
                    10%
                    </td>
                    <td>
                    Vitamin C
                    0%
                    </td>
                </tr>
                <tr class="thin-end">
                    <td colspan="2">
                    Calcium
                    10%
                    </td>
                    <td>
                    Iron
                    6%
                    </td>
                </tr>
                </tbody>
            </table>

            <p class="small-info">* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs:</p>

            <table class="performance-facts__table--small small-info">
                <thead>
                <tr>
                    <td colspan="2"></td>
                    <th>Calories:</th>
                    <th>2,000</th>
                    <th>2,500</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th colspan="2">Total Fat</th>
                    <td>Less than</td>
                    <td>65g</td>
                    <td>80g</td>
                </tr>
                <tr>
                    <td class="blank-cell"></td>
                    <th>Saturated Fat</th>
                    <td>Less than</td>
                    <td>20g</td>
                    <td>25g</td>
                </tr>
                <tr>
                    <th colspan="2">Cholesterol</th>
                    <td>Less than</td>
                    <td>300mg</td>
                    <td>300 mg</td>
                </tr>
                <tr>
                    <th colspan="2">Sodium</th>
                    <td>Less than</td>
                    <td>2,400mg</td>
                    <td>2,400mg</td>
                </tr>
                <tr>
                    <th colspan="3">Total Carbohydrate</th>
                    <td>300g</td>
                    <td>375g</td>
                </tr>
                <tr>
                    <td class="blank-cell"></td>
                    <th colspan="2">Dietary Fiber</th>
                    <td>25g</td>
                    <td>30g</td>
                </tr>
                </tbody>
            </table>

            <p class="small-info">
                Calories per gram:
            </p>
            <p class="small-info text-center">
                Fat 9
                &bull;
                Carbohydrate 4
                &bull;
                Protein 4
            </p>

            </section>
        </div>
    );

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(NutritionFacts_Previewer);

