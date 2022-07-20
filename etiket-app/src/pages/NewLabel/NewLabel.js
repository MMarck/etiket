/* eslint-disable no-console */
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Cookies from 'js-cookie';
import { replace } from '../../reducers/etiquetaSlice';
import request from '../../tools/ApiSetup';
import { backendURL } from '../../config/constants';
import withRouter from '../../tools/withRouter';
import './NewLabel.css';

const mapStateToProps = (state) => ({
  etiqueta: state.etiqueta
});
const mapDispatchToProps = () => ({
  replace
});
const pathIcons = '../images/icons/';

/* const  navigate = useNavigate(); */
/*
 * Vista para crear una nueva etiqueta, recibe el tipo de etiqueta y
 * el pais, luego pide el nombre y adjunta al usuario para crear la etiqueta
 * en la base de datos, luego redirije a misEtiquetas
 */
class NewLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: Cookies.get('accessToken') || ''
    };
  }

  createNewLabel() {
    const header = {
      Authorization: `Bearer ${this.state.accessToken}`
    };
    const nombreProyecto = document.getElementById('labelName').value;

    if (nombreProyecto === '') {
      alert('¡Debe poner un nombre!');
    } else {
      const jsonData = {
        country: this.props.etiqueta.country,
        tipo: this.props.etiqueta.tipo,
        nombreProyecto
      };
      // crear etiqueta en la base de datos
      request
        .post(`${backendURL}Labels`, jsonData, {
          headers: header
        })
        .then((res) => {
          // redirigir a /misEtiquetas
          alert(res.data.message);
          this.props.navigate('/misEtiquetas');
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });
    }
  }

  render() {
    return (
      <div className="w-100 h-100 margin-auto">
        <Link to="/misEtiquetas">
          <img src={`${pathIcons}back.png`} alt="Regresar" className="backBtn" />
        </Link>

        <ReactTooltip place="bottom" type="dark" effect="solid" data-for="name" />
        <input
          className="ligth-input m-4 fs-6 bg-transparent"
          id="labelName"
          type="text"
          name="name"
          placeholder="Nombre del proyecto"
          data-tip="Escribe aquí el nombre de tu proyecto"
        />

        {/* Este boton debe verificar que el nombre no se repita para el usuario y luego mandar la 
        query para crear el esqueleto de etiqueta en la base de datos */}
        <button
          type="button"
          className="btn-dark rounded fs-7"
          onClick={(e) => {
            this.createNewLabel(e);
          }}>
          continuar
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(NewLabel));
