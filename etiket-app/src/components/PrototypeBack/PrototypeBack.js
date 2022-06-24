import { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { unitTocm, getDataFontSize } from '../../tools/Casefunctions';
import { setPosition, getPosition, JSONString } from '../../tools/Statefunctions';
import { replace } from '../../reducers/etiquetaSlice';
import SizeIndicator from '../SizeIndicator/SizeIndicator';
import './PrototypeBack.css';
import NutritionFactsPreviewer from '../NutritionFactsPreviewer/NutritionFactsPreviewer';

/**
 * Componente para dibujar el Panel de informacion de la etiqueta
 */
class PrototypeBack extends Component {
  /**
   * funcion propia del componente, lanza el codigo durante la
   * construccion del componente
   */
  componentDidMount() {
    setPosition('ingPos', this.props.etiqueta.ingPos);
    setPosition('algPos', this.props.etiqueta.algPos);
  }

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

  render() {
    // Declaracion de variables

    const dimensionesUn = this.props.etiqueta.dimensionesUn.value;
    let altura = '10';
    if (dimensionesUn === 'cm') {
      if (parseFloat(this.props.etiqueta.altura) >= 3.5) {
        altura = this.props.etiqueta.altura;
      } else {
        altura = '10';
      }
    } else if (dimensionesUn === 'mm') {
      if (parseFloat(this.props.etiqueta.altura) >= 35) {
        altura = this.props.etiqueta.altura;
      } else {
        altura = '100';
      }
    }

    let { ancho } = this.props.etiqueta;

    if (dimensionesUn === 'cm') {
      if (parseFloat(this.props.etiqueta.ancho) >= 3.5) {
        ancho = this.props.etiqueta.ancho;
      } else {
        ancho = '10';
      }
    } else if (dimensionesUn === 'mm') {
      if (parseFloat(this.props.etiqueta.ancho) >= 35) {
        ancho = this.props.etiqueta.ancho;
      } else {
        ancho = '100';
      }
    }

    const labelArea = unitTocm(altura, dimensionesUn) * unitTocm(ancho, dimensionesUn);
    const dataFontSize = getDataFontSize(labelArea); // area en cm2 (centimetros cuadrados)

    const metodoConservacion = this.props.etiqueta.metodoConservacion.label;
    const conservacionUn = this.props.etiqueta.conservacionUn.value;
    const { vidaUtil } = this.props.etiqueta;
    const vidaUtilUn = this.props.etiqueta.vidaUtilUn.value;
    const { direccion } = this.props.etiqueta;
    const { instrucciones } = this.props.etiqueta;
    const { fabricacion } = this.props.etiqueta;
    const fabricacionUn = this.props.etiqueta.fabricacionUn.value;
    const caducacionUn = this.props.etiqueta.caducacionUn.value;
    const { caducacion } = this.props.etiqueta;
    const { ingredientes } = this.props.etiqueta;
    const { alergenos } = this.props.etiqueta;

    return (
      <div className="prototypeContainer">
        <h5 className="paneTitle" style={{ fontSize: dataFontSize }}>
          Panel de información
        </h5>
        <div
          id="PrototypeBack"
          style={{
            height: altura + dimensionesUn,
            width: ancho + dimensionesUn,
            fontSize: dataFontSize
          }}>
          <div className="prototypeSection3">
            {this.props.LabelEditor.showNutritionFacts ? (
              <Draggable bounds="#PrototypeBack" scale={this.props.LabelEditor.zoom}>
                <div style={{ position: 'absolute', top: '1px' }}>
                  <NutritionFactsPreviewer width="50px" height="50px" />
                </div>
              </Draggable>
            ) : (
              ''
            )}

            {vidaUtil ||
            fabricacionUn ||
            caducacionUn ||
            conservacionUn ||
            direccion ||
            instrucciones ? (
              <Draggable bounds="#PrototypeBack" scale={this.props.LabelEditor.zoom}>
                <div
                  onMouseLeave={() => {
                    this.handleStateChange('ingPos', getPosition('ingPos'));
                  }}
                  className="draggable-group-2 draggable-container"
                  style={{ position: 'absolute', bottom: '1px' }}
                  id="ingPos">
                  <span>
                    {this.props.etiqueta.metodoConservacion.value !== '' ? (
                      <span style={{ whiteSpace: 'normal' }}>
                        <b>Metodo de conservacion: </b> {conservacionUn} {metodoConservacion}
                      </span>
                    ) : (
                      ''
                    )}
                  </span>

                  <span>
                    {vidaUtil ? (
                      <>
                        <b>Vida Util: </b> {vidaUtil} {vidaUtil === 'Ver Paquete' ? '' : vidaUtilUn}
                      </>
                    ) : (
                      ''
                    )}
                  </span>

                  <span>
                    {direccion ? (
                      <>
                        <b>Dirección: </b> {direccion}
                      </>
                    ) : (
                      ''
                    )}
                  </span>

                  <span>
                    {instrucciones ? (
                      <>
                        <b>Instrucciones: </b> {instrucciones}
                      </>
                    ) : (
                      ''
                    )}
                  </span>

                  <span>
                    {fabricacion !== '' ? (
                      <>
                        <b>{fabricacionUn}: </b> {fabricacion}
                      </>
                    ) : (
                      ''
                    )}
                  </span>

                  <span>
                    {caducacion !== '' ? (
                      <>
                        <b>{caducacionUn}: </b> {caducacion}
                      </>
                    ) : (
                      ''
                    )}
                  </span>
                </div>
              </Draggable>
            ) : (
              ''
            )}
          </div>

          <div className="prototypeSection3">
            {ingredientes || alergenos ? (
              <Draggable bounds="#PrototypeBack" scale={this.props.LabelEditor.zoom}>
                <div
                  onMouseLeave={() => {
                    this.handleStateChange('algPos', getPosition('algPos'));
                  }}
                  className="draggable-group-1 draggable-container"
                  id="algPos">
                  <span>
                    {ingredientes.length > 0
                      ? `Ingredientes: ${JSONString(ingredientes, 'ing')}`
                      : ''}
                  </span>

                  <span>
                    <b>
                      {alergenos.length > 0 ? `CONTIENE ${JSONString(alergenos, 'value')}` : ''}
                    </b>
                  </span>
                </div>
              </Draggable>
            ) : (
              ''
            )}

            {instrucciones ? (
              <Draggable bounds="#PrototypeBack" scale={this.props.LabelEditor.zoom}>
                <div
                  /* onMouseLeave={()=>{this.handleStateChange('ingPos', getPosition('ingPos'))}} */
                  className="draggable-group-1 draggable-container"
                  /* id='ingPos' */
                >
                  <span>
                    {instrucciones ? (
                      <>
                        <b>Instrucciones: </b> {instrucciones}
                      </>
                    ) : (
                      ''
                    )}
                  </span>
                </div>
              </Draggable>
            ) : (
              ''
            )}

            {direccion ? (
              <Draggable bounds="#PrototypeBack" scale={this.props.LabelEditor.zoom}>
                <div
                  /* onMouseLeave={()=>{this.handleStateChange('ingPos', getPosition('ingPos'))}} */
                  className="draggable-group-1 draggable-container"
                  /* id='ingPos' */
                >
                  <span>
                    {direccion ? (
                      <>
                        <b>Dirección: </b> {direccion}
                      </>
                    ) : (
                      ''
                    )}
                  </span>
                </div>
              </Draggable>
            ) : (
              ''
            )}
          </div>
        </div>

        <SizeIndicator visibilityProp="hidden" />
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
  LabelEditor: state.LabelEditorSlice
});

/**
 * Declaracion de metodos para modificar el estado global que se
 * usaran en este componente a traves de sus props
 * @returns null
 */
const mapDispatchToProps = () => ({
  replace
});

export default connect(mapStateToProps, mapDispatchToProps())(PrototypeBack);
