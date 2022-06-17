import { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { replace } from '../../reducers/etiquetaSlice';
import NutritionFactsForm from '../NutritionFactsForm/NutritionFactsForm';
import NutritionFactsPreviewer from '../NutritionFactsPreviewer/NutritionFactsPreviewer';
import './NutritionFactsModal.css';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';

class NutritionFacts_modal extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  render() {
    const handleClose = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
    const {valoresRecomendadosDisabled} = this.props.etiqueta;

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
          onClick={handleShow}
        >
          INGRESAR DATOS
        </button>

        <Modal
          id="NutritionFactsModal"
          show={this.state.show}
          onHide={handleClose}
          size="xl"
          centered
          style={{ fontSize: '0.8rem' }}
        >
          <Modal.Header closeButton id="Modal-header" />

          <Modal.Body id="Modal-body">
            {/* Este componebnte renderiza un fomrulario para modificar
                  los datos de la etiqueta nutricional */}
            <NutritionFactsForm />

            <div id="NutritionFactsPreviewer" className="semi-bordered-right">
              <p style={{ margin: '3em 2em 0em 2em' }}>
                <b>Este es un ejemplo de como va a quedar la tabla nutricional de tu producto </b>
              </p>

              {/* Este componente renderiza los datos procesados en una 
                    etiqueta d1e informacion nutricional */}
              <NutritionFactsPreviewer />

              <div
                onChange={() => {
                  this.handleStateChange(
                    'valoresRecomendadosDisabled',
                    !valoresRecomendadosDisabled
                  );
                }}
                style={{ marginBottom: '1vh' }}
              >
                <CustomCheckbox isChecked={valoresRecomendadosDisabled} />
                Ver valores diarios recomendados
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps())(NutritionFacts_modal);
