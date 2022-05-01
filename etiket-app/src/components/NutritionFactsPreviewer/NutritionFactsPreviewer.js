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

const defaultNutritionFact = {report:'', vdr:''};

class NutritionFacts_Previewer extends Component{
    

  render(){
    let tamanioPorcion = this.props.etiqueta.tamanioPorcion;
    let tamanioPorcionUn = this.props.etiqueta.tamanioPorcionUn.value;
    let porcionPorEnvase = this.props.etiqueta.porcionPorEnvase;
    let porcionPorEnvaseUn = this.props.etiqueta.porcionPorEnvaseUn.value;
    let porcionPorEnvaseDisabled = this.props.etiqueta.porcionPorEnvaseDisabled;
    let grasaTotal = this.props.etiqueta.grasaTotal? this.props.etiqueta.grasaTotal: defaultNutritionFact;
    let grasaSaturada = this.props.etiqueta.grasaSaturada? this.props.etiqueta.grasaSaturada: defaultNutritionFact;
    let grasasTrans = this.props.etiqueta.grasasTrans? this.props.etiqueta.grasasTrans: defaultNutritionFact;
    let acidosMono = this.props.etiqueta.acidosMono? this.props.etiqueta.acidosMono: defaultNutritionFact;
    let acidosPoli = this.props.etiqueta.acidosPoli? this.props.etiqueta.acidosPoli: defaultNutritionFact;
    let colesterol = this.props.etiqueta.colesterol? this.props.etiqueta.colesterol: defaultNutritionFact;
    let sodio = this.props.etiqueta.sodio? this.props.etiqueta.sodio: defaultNutritionFact;
    let carbohidratos = this.props.etiqueta.carbohidratos? this.props.etiqueta.carbohidratos: defaultNutritionFact;
    let fibra = this.props.etiqueta.fibra? this.props.etiqueta.fibra: defaultNutritionFact;
    let azucares = this.props.etiqueta.azucares? this.props.etiqueta.azucares: defaultNutritionFact;
    let proteina = this.props.etiqueta.proteina? this.props.etiqueta.proteina: defaultNutritionFact;
     
    return (
        

            <section 
                className="performance-facts" 
                style= {{
                    overflow:'hidden',
                    height: this.props.height, 
                    width: this.props.width,
                    fontFamily: 'Local Helvetica'
                }}
            >
            {/* Seccion 1 - Titulo y totales */}
            <header className="performance-facts__header">
                <h1 
                    className="performance-facts__title"
                    style={{fontFamily: 'Local Helvetica-Bold'}}
                >
                    Información Nutricional
                </h1>


                <p>Tamaño de la porción: {tamanioPorcion} {tamanioPorcionUn}</p> 
                <p>
                    Porciones por envase: {porcionPorEnvase} {!porcionPorEnvaseDisabled? porcionPorEnvaseUn:''}
                </p>

            </header>

            {/* Seccion 2 - energia */}
            <table className="performance-facts__table">
                
                <thead className='separator-botton-1'>
                    <tr>
                        <th colspan="2" className="small-info">
                            Cantidad por porción
                        </th>
                        <td className="small-info">
                            <b> Valor Diario</b>
                        </td>
                    </tr>
                </thead>

                <tbody>

                <tr className='separator-botton-1'>
                    <th colspan="2">
                        <b>Energia (Calorias)</b>
                        <span className='fw-normal'> 168kJ (40 kcal) </span>
                    </th>
                    <td>
                        7
                    </td>
                </tr>

                <tr className='separator-botton-2'>
                    <th colspan="2">
                        <b>Energia de grasa (Calorias de grasa)</b> 
                        <span className='fw-normal'> 168kJ (40 kcal) </span>
                    </th>
                    <td>
                        7
                    </td>
                </tr>

                <tr className="separator-botton-1" >
                    <th colspan="2"></th>
                    <td  className="small-info">
                        <b> Valor Diario</b>
                    </td>
                </tr>

                {/* Grasa total */}
                <tr className="separator-botton-1" >
                    <th colspan="2">
                        <b>Grasa total</b>
                        <span className='fw-normal'> {grasaTotal.report} </span>
                    </th>
                    <td>
                        <b>{grasaTotal.vdr}</b>
                    </td>
                </tr>

                <AcidoTableRow 
                    label='Acidos grasos saturados'
                    mass = {grasaSaturada.report}
                    percentage = {grasaSaturada.vdr} 
                />
                <AcidoTableRow 
                    label= 'Acidos grasos trans'
                    mass = {grasasTrans.report}
                    percentage = {grasasTrans.vdr} 
                />

                {parseFloat(grasaTotal.report) > 3?
                <>
                    <AcidoTableRow 
                        label= 'Acidos grasos mono insaturados'
                        mass = {acidosMono.report}
                        percentage = {acidosMono.vdr} 
                    />
                    <AcidoTableRow 
                        label= 'Acidos grasos poli insaturados'
                        mass = {acidosPoli.report}
                        percentage = {acidosPoli.vdr} 
                    />
                </>
                :''}



                <tr className="separator-botton-1" >
                    <th colspan="2">
                        <b>Colesterol</b>
                        <span className='fw-normal'> {colesterol.report}</span>
                    </th>
                    
                    <td>
                        <b>{colesterol.vdr}</b>
                    </td>
                </tr>

                <tr className="separator-botton-1" >
                    <th colspan="2">
                        <b>Sodio</b>
                        <span className='fw-normal'> {sodio.report}</span>
                    </th>

                    <td>
                        <b>{sodio.vdr}</b>
                    </td>
                </tr>

                <tr className="separator-botton-1" >
                    <th colspan="2">
                        <b>Carbohidratos totales</b>
                        <span className='fw-normal'> {carbohidratos.report} </span>
                    </th>
                    <td>
                        <b>{carbohidratos.vdr}</b>
                    </td>
                </tr>

                <tr className="separator-botton-1" >
                    <td className="blank-cell">
                    </td>
                    <th>
                        <span className='fw-normal'>fibra {fibra.report}</span>
                    </th>
                    <td>
                        <b>{fibra.vdr}</b>
                    </td>
                </tr>

                <tr className="separator-botton-1" >
                    <td className="blank-cell">
                    </td>
                    <th>
                        <span className='fw-normal'>Azucares {azucares.report} </span>
                    </th>
                    <td>
                        <b>{azucares.vdr}</b>
                    </td>
                </tr>

                <tr className="thick-end">
                    <th colspan="2">
                        <b>Proteína</b>
                        <span className='fw-normal'> {proteina.report}</span>
                    </th>
                    <td>
                        <b>{proteina.vdr}</b>
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
                            {label:'Vitamina C', percentage: 3},
                            {label:'Vitamina D', percentage: 3},
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
                            <th className='fw-normal' > Calorías: </th>
                            <th className='fw-normal' >2,000 </th>
                            <th className='fw-normal' >2,500 </th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <th colspan="2" className='fw-normal'>
                                Grasa total
                            </th>
                            <td>Menos de</td>
                            <td>65g</td>
                            <td>80g</td>
                        </tr>

                        <tr>
                            <td className="blank-cell"></td>
                            <th className='fw-normal'>
                                Grasa saturada
                            </th>
                            <td>Menos de</td>
                            <td>20g</td>
                            <td>25g</td>
                        </tr>

                        <tr>
                            <th colspan="2" className='fw-normal'>
                                Colesterol
                            </th>
                            <td>Menos de</td>
                            <td>300mg</td>
                            <td>300 mg</td>
                        </tr>

                        <tr>
                            <th colspan="2" className='fw-normal'>
                                Sodio
                            </th>
                            <td>Menos de</td>
                            <td>2,400mg</td>
                            <td>2,400mg</td>
                        </tr>

                        <tr>
                            <th colspan="3" className='fw-normal'>
                                Carbohidratos totales
                            </th>
                            <td>300g</td>
                            <td>375g</td>
                        </tr>
                        
                        <tr>
                            <td className="blank-cell"></td>
                            <th colspan="2" className='fw-normal'>
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
                    <span className='fw-normal'>{element.label} {element.mass} </span>
                </th>
                <td>
                    <b>{element.percentage}</b>
                </td>
            </tr>
        )
    })

    return ( acidList ) 

}

function AcidoTableRow({label, mass, percentage}){
    return ( 
    <tr className="separator-botton-1" >
        <td className="blank-cell">
        </td>

        <th>
            <span className='fw-normal'>{label} {mass} </span>
        </th>
        <td>
            <b>{percentage}</b>
        </td>
    </tr> 
    );

}

function VitaminasSubTable(params){
    let vitaminasList=[]

    params.data.forEach(element => { 
        
        vitaminasList.push(
            <tr className="separator-botton-1" >
                <th>
                    <span className='fw-normal'> {element.label} </span>
                </th>
                <td>
                    {element.percentage}
                </td>
            </tr>
        )
    })

    return ( vitaminasList ) 

}