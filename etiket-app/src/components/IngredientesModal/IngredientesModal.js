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

  handleSubmitText(e) {
    const alertLines = [];
    e.preventDefault();
    const ing = this.state.ingTextForm;
    if (ing === '') {
      alert('¡Escriba algo primero!');
    } else {
      const lines = ing.split('\n');
      const ingFinal = [];
      for (let i = 0; i < lines.length; i++) {
        let e = lines[i];
        console.log(e);
        e = e.match(
          /(?<=")[^"]+?(?="(?:\s*?,|\s*?$))|(?<=(?:^|,)\s*?)(?:[^,"\s][^,"]*[^,"\s])|(?:[^,"\s])(?![^"]*?"(?:\s*?,|\s*?$))(?=\s*?(?:,|$))/g
        );
        console.log(e);
        if (e.length !== 2) {
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
        console.log(parseFloat(i.percentage));
        sum += parseFloat(i.percentage);
      });
      sum = parseFloat(sum.toFixed(2));
      if (sum !== 100) {
        console.log(sum);
        alert('Revise el documento, los porcentajes no suman 100');
      } else {
        this.handleStateChange('ingredientes', ingSorted);
      }
    }
  }

  render() {
    const handleClose = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });

    const handleTextArea = () => this.setState({ showTextArea: !this.state.showTextArea });
    const handleFileInput = () => this.setState({ showFileInput: !this.state.showTextArea });

    const handleOptions = () => this.setState({ showOptions: !this.state.showOptions });

    const handleIngText = (e) => this.setState({ ingTextForm: e });

    return (
      <>
        <button
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
              <img
                src={`${pathIcons}back.png`}
                alt="Regresar"
                className="backBtn backBtnIng"
                onClick={() => {
                  handleOptions();
                  handleTextArea();
                }}
              />
            )) ||
              (this.state.showFileInput && (
                <img
                  src={`${pathIcons}back.png`}
                  alt="Regresar"
                  className="backBtn backBtnIng"
                  onClick={() => {
                    handleOptions();
                    handleFileInput();
                  }}
                />
              ))}
          </Modal.Header>

          <Modal.Body id="Modal-body">
            {(this.state.showOptions && (
              <div id="ingOptions">
                <button
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
