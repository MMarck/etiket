/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import Papa from 'papaparse';
import { replace } from '../../reducers/etiquetaSlice';
import { pathIcons } from '../../config/constants';
import './IngredientesModal.css';

class IngredientesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showTextArea: false,
      showFileInput: false,
      showOptions: true,
      ingTextForm: '',
      ing: []
    };
  }

  handleStateChange(stateName, value) {
    const payload = {
      stateName,
      value
    };

    this.props.replace(payload);
  }

  handleSubmitText(event) {
    const alertLines = [];
    event.preventDefault();
    const ing = this.state.ingTextForm;
    if (ing === '') {
      alert('¡Escriba algo primero!');
    } else {
      const lines = ing.split('\n');
      const ingFinal = [];
      for (let i = 0; i < lines.length; i++) {
        let e = lines[i];
        e = e.match(
          /(?<=")[^"]+?(?="(?:\s*?,|\s*?$))|(?<=(?:^|,)\s*?)(?:[^,"\s][^,"]*[^,"\s])|(?:[^,"\s])(?![^"]*?"(?:\s*?,|\s*?$))(?=\s*?(?:,|$))/g
        );
        if (e.length !== 2) {
          alertLines.push(i + 1);
        } else if (this.isNumeric(e[1]) === false) {
          alertLines.push(i + 1);
        } else if (parseFloat(e[1]) < 0.01) {
          alertLines.push(i + 1);
        } else {
          ingFinal.push({ ing: e[0], percentage: e[1] });
        }
      }
      if (alertLines.length !== 0) {
        alert(`Hay errores en las lineas:${alertLines.join(',')}`);
      } else {
        const ingSorted = ingFinal.sort((a, b) => {
          return parseFloat(b.percentage) - parseFloat(a.percentage);
        });
        let sum = 0;
        ingSorted.forEach((i) => {
          sum += parseFloat(i.percentage);
        });
        if (sum !== 100) {
          alert('Revise el documento, los porcentajes no suman 100');
        } else {
          this.handleStateChange('ingredientes', ingSorted);
        }
      }
    }
  }

  handleFile(e) {
    const ingFinal = [];
    Papa.parse(e.target.files[0], {
      header: false,
      skipEmptyLines: true,
      complete(results) {
        const ingArray = results.data;
        ingArray.forEach((i) => {
          const element = { ing: i[0], percentage: i[1] };
          ingFinal.push(element);
        });
      }
    });
    this.setState({ ing: ingFinal });
  }

  submitFile() {
    if (this.state.ing.length === 0) {
      alert('¡No ha subido nada!');
    } else {
      const ingSorted = this.state.ing.sort((a, b) => {
        return parseFloat(b.percentage) - parseFloat(a.percentage);
      });
      let sum = 0;
      ingSorted.forEach((i) => {
        sum += parseFloat(i.percentage);
      });
      sum = parseFloat(sum.toFixed(2));
      if (sum !== 100) {
        alert('Revise el documento, los porcentajes no suman 100');
      } else {
        this.handleStateChange('ingredientes', ingSorted);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isNumeric(str) {
    if (typeof str !== 'string') {
      return false; // we only process strings!
    }

    return (
      !Number.isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !Number.isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  }

  render() {
    const handleClose = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });

    const handleTextArea = () => this.setState((prevState) => ({ showTextArea: !prevState.value }));
    const handleFileInput = () =>
      this.setState((prevState) => ({ showFileInput: !prevState.value }));

    const handleOptions = () => this.setState((prevState) => ({ showOptions: !prevState.value }));

    const handleIngText = (e) => this.setState({ ingTextForm: e });

    return (
      <>
        <button
          type="button"
          className="darkButton-twhite"
          style={{
            width: 'fit-content',
            height: 'fit-content',
            fontSize: '0.8em',
            margin: 'auto'
          }}
          onClick={handleShow}>
          INGRESAR DATOS
        </button>

        <Modal
          id="IngredientesModal"
          show={this.state.show}
          onHide={handleClose}
          size="l"
          centered
          style={{ fontSize: '0.8rem' }}>
          <Modal.Header closeButton id="Modal-header">
            {(this.state.showTextArea && (
              <div
                tabIndex={0}
                role="button"
                onClick={() => {
                  handleOptions();
                  handleTextArea();
                }}>
                <img src={`${pathIcons}back.png`} alt="Regresar" className="backBtn backBtnIng" />
              </div>
            )) ||
              (this.state.showFileInput && (
                <div
                  tabIndex={0}
                  role="button"
                  onClick={() => {
                    handleOptions();
                    handleTextArea();
                  }}>
                  <img src={`${pathIcons}back.png`} alt="Regresar" className="backBtn backBtnIng" />
                </div>
              ))}
          </Modal.Header>

          <Modal.Body id="Modal-body">
            {(this.state.showOptions && (
              <div id="ingOptions">
                <button
                  type="button"
                  className="darkButton-twhite"
                  style={{
                    width: 'fit-content',
                    height: 'fit-content',
                    fontSize: '0.8em',
                    margin: 'auto'
                  }}
                  onClick={() => {
                    handleOptions();
                    handleTextArea();
                  }}>
                  INGRESAR DATOS POR TEXTO
                </button>
                <button
                  type="button"
                  className="darkButton-twhite"
                  style={{
                    width: 'fit-content',
                    height: 'fit-content',
                    fontSize: '0.8em',
                    margin: 'auto'
                  }}
                  onClick={() => {
                    handleOptions();
                    handleFileInput();
                  }}>
                  INGRESAR DATOS POR ARCHIVO CSV
                </button>
              </div>
            )) ||
              (this.state.showTextArea && (
                <div>
                  <form id="ingText" onSubmit={(e) => this.handleSubmitText(e)}>
                    <p>
                      Escriba los ingredientes separados por sus porcentajes, cada ingrediente por
                      cada línea. En el caso de poner ingredientes con sub-ingredientes, por favor,
                      enciérrelo en comillas dobles.
                    </p>
                    <textarea
                      id="ingTextArea"
                      onChange={(e) => handleIngText(e.target.value)}
                      rows="4"
                      cols="50"
                      placeholder="Ingredientes, Porcentaje"
                    />
                    <button
                      type="submit"
                      className="darkButton-twhite"
                      style={{
                        width: 'fit-content',
                        height: 'fit-content',
                        fontSize: '0.8em',
                        margin: 'auto'
                      }}
                      onClick={handleShow}>
                      PROCESAR TEXTO
                    </button>
                  </form>
                </div>
              )) ||
              (this.state.showFileInput && (
                <div>
                  <p>
                    Suba un archivo .csv donde la primera columna sean los ingredientes y la segunda
                    sea los porcentajes, asegurese de eliminar la fila de encabezado en caso de
                    tenerla.
                  </p>
                  <br />
                  <input
                    id="csvInput"
                    name="file"
                    type="File"
                    accept=".csv"
                    onChange={(e) => {
                      this.handleFile(e);
                    }}
                  />
                  <button
                    type="button"
                    className="darkButton-twhite"
                    style={{
                      width: 'fit-content',
                      height: 'fit-content',
                      fontSize: '0.8em',
                      margin: 'auto'
                    }}
                    onClick={() => this.submitFile()}>
                    PROCESAR ARCHIVO
                  </button>
                </div>
              ))}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  etiqueta: state.etiqueta
});
const mapDispatchToProps = () => ({
  replace
});

export default connect(mapStateToProps, mapDispatchToProps())(IngredientesModal);
