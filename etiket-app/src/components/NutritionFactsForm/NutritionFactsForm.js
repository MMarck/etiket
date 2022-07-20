/**
 * Formulario para el ingreso de datos de "nutrition facts"
 * o "informacion nutricional", este componente renderiza
 * las entradas de texto necesarias para que el usuario ingrese
 * informacion sobre su producto y aplica las nomas del ARCSA
 * para el reporte de dicha informacion.
 *
 * La logica del reporte de informacion se encuentra en el
 * documento src/tools/CaseFunctions.js
 */

import { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getReportFormat } from '../../tools/Casefunctions';
import { replaceLE } from '../../reducers/LabelEditorSlice';
import { replace } from '../../reducers/etiquetaSlice';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import './NutritionFactsForm.css';

import {
  ddNormalStyle,
  ddSmallStyle,
  pathIcons,
  tiposTablas,
  unidadesPorcion,
  AproxOptions,
  Nutrientes
} from '../../config/constants';

const numberFilter = (event) => {
  const value = event.target.value + event.key;
  if (!/^\d{0,3}(\.\d{0,2})?$/.test(value)) {
    event.preventDefault();
  }
};
class NutritionFactsForm extends Component {
  /**
   * Abstracion del modificador de estado global (o reducer)
   * llamado "replace"
   * @param {String} stateName
   * @param {*} value
   */
  handleStateChange(stateName, value) {
    const payload = {
      stateName,
      value
    };

    this.props.replace(payload);
  }

  /**
   * Esta funcion toma los datos ingresados por el usuario y aplica las normas del ARCSA
   * para reporte de informacion nutricional, para luego guardar los resultados en el
   * estado global
   *
   * @param {String} type : tipo de macronutriente, este valor se usa para el calculo del valor diario recomendado
   * @param {number} value : magnitud ingresada por el usuario
   * @param {String} unit : unidad asociada a la magnitud y se usa tambien para reportar el resultado
   */
  setNutritionsFacts(type, value, unit) {
    // aplicar redondedo
    const { result, report } = getReportFormat(type, value, unit);

    // obtener VDR (valor diario recomendado)
    let vdr = '';
    const nutriente = Object.keys(Nutrientes).find((e) => e === type);

    vdr = nutriente ? `${Math.round((result / Nutrientes[type]) * 100)}%` : '';

    // guarda el valor del calulo y un string con formato correcto para reportar el valor
    this.handleStateChange(type, { report, vdr });
  }

  render() {
    const maxWidthInformation = '50%';
    const maxWidthInputs = '50%';

    const { tamanioPorcion } = this.props.etiqueta;
    const { tamanioPorcionUn } = this.props.etiqueta;
    const { tipoTabla } = this.props.etiqueta;
    const { porcionPorEnvase } = this.props.etiqueta;
    const { porcionPorEnvaseUn } = this.props.etiqueta;
    const { porcionPorEnvaseDisabled } = this.props.etiqueta;

    return (
      <div
        id=""
        className="semi-bordered-left"
        style={{ backgroundColor: '#e6e6e6', padding: '10px' }}>
        <div className="d-flex gap-2 mb-4">
          <img alt="nutritionfacts" src={`${pathIcons}nutritionfacts.png`} width="25px" />
          <p className="sidebarTitle">Vamos a desarrollar la tabla nutricional de tu producto</p>
        </div>

        <div className="d-flex flex-column gap-2">
          {' '}
          {/* elementos */}
          {/* tipo de tabla */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Elige el tipo de tabla de acuerdo al tamaño de tu etiqueta</p>
            </div>

            <div style={{ maxWidth: maxWidthInputs }}>
              <Select
                onChange={(e) => this.handleStateChange('tipoTabla', e)}
                defaultValue={tipoTabla}
                styles={ddNormalStyle}
                options={tiposTablas}
                className="ddMenu"
              />
            </div>
          </div>
          {/* Tamaño de la porción */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Tamaño de la porción</p>
            </div>

            <div style={{ maxWidth: maxWidthInputs, display: 'flex' }}>
              <input
                onChange={(e) => this.handleStateChange('tamanioPorcion', e.target.value)}
                className=" gRInput numberInput"
                style={{ marginRight: '10px' }}
                type="text"
                value={tamanioPorcion}
              />
              <Select
                onChange={(e) => this.handleStateChange('tamanioPorcionUn', e)}
                defaultValue={tamanioPorcionUn}
                styles={ddSmallStyle}
                options={unidadesPorcion}
                className="ddMenu"
              />
            </div>
          </div>
          {/* Porciones por envase */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Porciones por envase</p>
            </div>

            <div className="d-flex justify-content-center" style={{ maxWidth: maxWidthInputs }}>
              <div
                onChange={() => {
                  this.handleStateChange('porcionPorEnvaseDisabled', !porcionPorEnvaseDisabled);
                }}
                style={{ alignSelf: 'flex-end', marginBottom: '1vh' }}>
                <CustomCheckbox isChecked={!porcionPorEnvaseDisabled} />
              </div>

              <Select
                onChange={(e) => this.handleStateChange('porcionPorEnvaseUn', e)}
                className="ddMenu"
                styles={ddSmallStyle}
                options={AproxOptions}
                defaultValue={porcionPorEnvaseUn}
                isDisabled={porcionPorEnvaseDisabled}
              />
              <input
                onChange={(e) => this.handleStateChange('porcionPorEnvase', e.target.value)}
                value={porcionPorEnvase}
                className=" gRInput numberInput"
                name="porcionPorEnvase"
                type="text"
                onKeyPress={numberFilter}
              />
            </div>
          </div>
          {/* LABEL */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>
                <b>Parámetro</b>
              </p>
            </div>

            <div style={{ maxWidth: maxWidthInputs }}>
              <p>
                <b>Resultado</b>
              </p>
            </div>
          </div>
          {/* Grasa total (%) */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Grasa total (%)</p>
            </div>

            <div style={{ maxWidth: maxWidthInputs }}>
              <input
                type="text"
                onChange={(e) => this.setNutritionsFacts('grasaTotal', e.target.value, 'g')}
              />
            </div>
          </div>
          {/* Grasa saturada (%) */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Grasa saturada (%)</p>
            </div>

            <div style={{ maxWidth: maxWidthInputs }}>
              <input
                type="text"
                onChange={(e) => this.setNutritionsFacts('grasaSaturada', e.target.value, 'g')}
              />
            </div>
          </div>
          {/* Grasas trans (%) */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Grasas trans (%)</p>
            </div>

            <div style={{ maxWidth: maxWidthInputs }}>
              <input
                type="text"
                onChange={(e) => this.setNutritionsFacts('grasasTrans', e.target.value, 'g')}
              />
            </div>
          </div>
          {/* Ácidos grasos mono insaturados (%) */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Ácidos grasos mono insaturados (%)</p>
            </div>

            <div style={{ maxWidth: maxWidthInputs }}>
              <input
                type="text"
                onChange={(e) => this.setNutritionsFacts('acidosMono', e.target.value, 'g')}
              />
            </div>
          </div>
          {/* Ácidos grasos poli insaturados (%) */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Ácidos grasos poli insaturados (%)</p>
            </div>

            <div style={{ maxWidth: maxWidthInputs }}>
              <input
                type="text"
                onChange={(e) => this.setNutritionsFacts('acidosPoli', e.target.value, 'g')}
              />
            </div>
          </div>
          {/* Colesterol (mg/100 g) */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Colesterol (mg/100 g)</p>
            </div>

            <div style={{ maxWidth: maxWidthInputs }}>
              <input
                type="text"
                onChange={(e) => this.setNutritionsFacts('colesterol', e.target.value, 'mg')}
              />
            </div>
          </div>
          {/* Sodio (mg/100 g)  */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Sodio (mg/100 g) </p>
            </div>

            <div style={{ maxWidth: maxWidthInputs }}>
              <input
                type="text"
                onChange={(e) => this.setNutritionsFacts('sodio', e.target.value, 'g')}
              />
            </div>
          </div>
          {/* Carbohidratos (%) */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Carbohidratos (%)</p>
            </div>

            <div style={{ maxWidth: maxWidthInputs }}>
              <input
                type="text"
                onChange={(e) => this.setNutritionsFacts('carbohidratos', e.target.value, 'g')}
              />
            </div>
          </div>
          {/* Azúcares totales (%) */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Azúcares totales (%)</p>
            </div>

            <div style={{ maxWidth: maxWidthInputs }}>
              <input
                type="text"
                onChange={(e) => this.setNutritionsFacts('azucares', e.target.value, 'g')}
              />
            </div>
          </div>
          {/* Proteína (%) */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Proteína (%)</p>
            </div>

            <div style={{ maxWidth: maxWidthInputs }}>
              <input
                type="text"
                onChange={(e) => this.setNutritionsFacts('proteina', e.target.value, 'g')}
              />
            </div>
          </div>
          {/* Fibra (%) */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Fibra (%)</p>
            </div>

            <div style={{ maxWidth: maxWidthInputs }}>
              <input
                type="text"
                onChange={(e) => this.setNutritionsFacts('fibra', e.target.value, 'g')}
              />
            </div>
          </div>
          {/* Energía total */}
          <div className="d-flex">
            <div style={{ maxWidth: maxWidthInformation }}>
              <p>Energía total</p>
            </div>

            <div style={{ maxWidth: maxWidthInputs }}>
              <input
                type="text"
                placeholder="julios/porcion"
                onChange={(e) => this.handleStateChange('energiaTotalJulios', e.target.value)}
              />
              <input
                type="text"
                placeholder="cal/porcion"
                onChange={(e) => this.handleStateChange('energiaTotalCalorias', e.target.value)}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              this.props.replaceLE(['showNutritionFacts', true]);
            }}
            className=" btn-secondary darkButton fw-bolder p-2 my-4">
            GUARDAR CAMBIOS
          </button>
        </div>
      </div>
    );
  }
}

/**
 * Declaracion de las variables del estado global que se usaran
 * en este componente a traves de sus props
 *
 * @param {*} state: Se llena automaticamente
 * @returns null
 */
const mapStateToProps = (state) => ({
  etiqueta: state.etiqueta,
  LabelEditorSlice: state.LabelEditorSlice
});

/**
 * Declaracion de metodos para modificar el estado global que se
 * usaran en este componente a traves de sus props
 * @returns null
 */
const mapDispatchToProps = () => ({
  replace,
  replaceLE
});

export default connect(mapStateToProps, mapDispatchToProps())(NutritionFactsForm);
