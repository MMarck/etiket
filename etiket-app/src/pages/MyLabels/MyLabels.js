import { Component } from 'react';
import { connect, useDispatch } from 'react-redux';

import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Select from 'react-select';
import { backendURL, countries, pathIcons } from '../../config/constants.js';
import request from '../../tools/ApiSetup';
import { replace } from '../../reducers/etiquetaSlice';
import { ddNormalStyle } from '../../tools/Statefunctions';
import './MyLabels.css';

const mapStateToProps = (state) => ({
  etiqueta: state.etiqueta
});
const mapDispatchToProps = () => ({
  replace
});

class MyLabels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaid: true,
      accessToken: Cookies.get('accessToken') || '',
      refreshToken: Cookies.get('refreshToken') || '',
      showPackagesTypes: false,
      labels: []
    };
  }

  componentDidMount() {
    const header = {
      Authorization: `Bearer ${this.state.accessToken}`
    };
    const jsonData = { user: jwt_decode(this.state.accessToken).id };
    request
      .post(`${backendURL}Labels/getLabels`, jsonData, {
        headers: header
      })
      .then((res) => {
        this.setState({ labels: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }

  handleStateChange(stateName, value) {
    const payload = {
      stateName,
      value
    };

    this.props.replace(payload);
  }

  eliminarEtiqueta(id, index) {
    const header = {
      Authorization: `Bearer ${this.state.accessToken}`
    };
    request
      .delete(`${backendURL}Labels/${id}`, {
        headers: header
      })
      .then((res) => {
        const newArray = Array.from(this.state.labels);
        newArray.splice(index, 1);
        this.setState({ labels: newArray });
        alert('Se ha eliminado la etiqueta con éxito');
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error.message);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error);
        }
      });
  }

  render() {
    return (
      /* Contenedor divido en secciones para renderizar una determinada 
      vista dependiendo de las variables del estado */
      <div className="w-100 h-100">
        <Link to="/">
          <img src={`${pathIcons}back.png`} alt="Regresar" className="backBtn" />
        </Link>

        <div id="MisEtiquetasContainer">
          <h2 className="mb-5">Mis etiquetas</h2>

          {/* PENDIENTE HACER ESTA MISMA VERIFICACION EN LE BACKEND */}
          {/* Esta seccion muestra un mensaje de aviso cuando ya se ha 
            llegado al limite de creacion de etiquetas 
            cargar limite del usuario de acuerdo a su plan (2 por defecto) */}
          {this.state.labels.length >= 2 ? (
            <div className="w-75 d-flex flex-column justify-content-center align-items-center gap-2">
              <span className="text-danger text-center">
                En tu cuenta gratuita solo puedes diseñar hasta 2 etiquetas. Sube de plan para que
                tengas acceso ilimitado.
              </span>

              <button type="button" className=" btn-secondary darkButton fw-bolder p-2 my-4">
                CAMBIAR DE PLAN
              </button>
            </div>
          ) : (
            ''
          )}

          <div id="ContenedorEtiquetas">
            {
              /* creacion de los elementos LabelPreview por cada etiqueta 
            guardada en estado global (store), cada elemento redirige al componente
            LabelEditor el cual lee el id en la URL y carga los de dato de 
            dicha etiqueta para modificarlo */

              this.state.labels.map((label, index) => (
                <div style={{ display: 'flex' }}>
                  <Link
                    to={`/editarEtiqueta/${label.id}`}
                    title= {label.nombreProyecto}  
                    className="etiquetaContainer"
                    key={label.id} // prop para evitar renderizar 2 veces el mismo elemento, PENDIENTE cambiar por el id de la etiqueta
                  >
                    <div className="previewEtiqueta">
                      <img src={imagePath(label.tipo)} alt={label.tipo} width="60px" />
                    </div>

                    <span className="flex-shrink-1 ">{
                      label.nombreProyecto.length <= 20 ?
                        label.nombreProyecto
                        :
                        label.nombreProyecto.substring(0,20) +  '...' 
                      }</span>
                  </Link>

                  {true ? ( // PENDIENTE SOLO LOS USUARIOS PREMIUM PUEDEN ELIMINAR ETIQUETAS
                    <button
                      type="button"
                      className="btn-close bg-danger "
                      aria-label="Close"
                      onClick={() => this.eliminarEtiqueta(label.id, index)}
                    />
                  ) : (
                    ''
                  )}
                </div>
              ))
            }

            {this.state.labels.length > 0 ? (
              <button
                id="BotonMasNuevaEtiqueta"
                onClick={() => this.setState({ showPackagesTypes: true })}>
                +
              </button>
            ) : (
              ''
            )}
          </div>

          {this.state.labels.length === 0 ? (
            <span className="opacity-50">
              No tienes ninguna etiqueta diseñada. Te parece si empezamos ?
            </span>
          ) : (
            ''
          )}

          {this.state.labels.length === 0 ? (
            <button
              className="rounded fs-6 btn-dark"
              onClick={() => this.setState({ showPackagesTypes: true })}>
              CREAR ETIQUETA
            </button>
          ) : (
            ''
          )}
        </div>

        {/* Componente modal cuya visibilidad depende del valor de la variable showPackagesTypes 
        que se encuentra en el esta del componente */}
        <Modal
          id="packegaOptionMenu"
          show={this.state.showPackagesTypes}
          onHide={() => {
            this.setState({ showPackagesTypes: false });
          }}
          size="lg"
          centered>
          <Modal.Header closeButton className="newLabelModal-header">
            <Modal.Title>
              <h4>
                <b>Elige el país</b>
              </h4>
              <h5 className="h5-subtitle">
                Cada país tiene su propio estándar para el etiquetado de alimentos. Elige el país
                donde vas a comercializar tu producto.
              </h5>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div style={{ width: 'fit-content', marginBottom: '1em' }}>
              <Select
                id="countryLabel"
                className="ddMenu"
                styles={ddNormalStyle}
                options={countries}
                defaultValue={countries[0]}
                onChange={(e) => {
                  this.handleStateChange('country', e.value);
                }}
              />
            </div>

            <h4>
              <b>Elige el tipo de envase o empaque</b>
            </h4>
            <h5 className="h5-subtitle">
              Empieza a diseñar la etiqueta de tus alimentos eligiendo primero el tipo de empaque o
              envase en la que pretendes comercializarlo.
            </h5>

            <div className="d-flex gap-3">
              <PackageOption
                packageType="rectangular"
                title="Rectangulares o cuadrados"
                description="Bebidas, cajas de pizza, galletas, empaques doypack"
                imagePath={imagePath('rectangular')}
                altImageText="Empaque Rectangular"
              />

              <PackageOption
                packageType="botella"
                title="Botellas de vidrio, plástico, latas"
                description="Yogurt, cerveza, latas de atún, vino"
                imagePath={imagePath('botella')}
                altImageText="Empaque Botellas"
              />
              <PackageOption
                packageType="irregular"
                title="Empaques con formas irregulares"
                description="Conos de helados, sanduches preparados"
                imagePath={imagePath('irregular')}
                altImageText="Empaque Irregular"
              />
              <PackageOption
                packageType="circular"
                title="Empaques circulares"
                description="Jamones, quesos, masas, en empaques redondos"
                imagePath={imagePath('circular')}
                altImageText="Empaque Circular"
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  /*
   * Metodo para obtener las etiquetas desde la base de datos
   * retorna un listado con las etiquetas
   * PENDIENTE CARGAR LAS ETIQUETAS Y VERIFICAR CUENTA DEL USUARIO
   */
  getLabels() {
    return [{ name: 'etiqueta1', type: 'rectangular' }];
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(MyLabels);

const imagePath = (type) => {
  switch (type) {
    case 'rectangular':
      return '/images/empaque-rectangular.png';

    case 'botella':
      return '/images/empaque-botellas.png';

    case 'irregular':
      return '/images/empaque-irregular.png';

    case 'circular':
      return '/images/empaque-circular.png';

    default:
      return '/images/empaque-rectangular.png';
  }
};

/*
 * Componente para encapsular las opciones de envase en el menu de envase.
 * title: titulo de la opcion
 * description: descripcioon de la opcion
 * imagePath: ruta de la imagen para la opcion
 * altImageText: texto alternativo para la imagen
 * packageType: tipo de paquete para guardar en el estado global (store) newLabel
 * setTypeLabel: funcion para escribir en el estado global (puntero de la funcion)
 */
function PackageOption({
  title,
  description,
  imagePath,
  altImageText,
  packageType,
  setPackageType
}) {
  const dispatch = useDispatch();

  // Aclaracion: la clase "modal-dialog" y "modal-content" es agregada automaticamente por la libreria react-bootstrap
  return (
    <Link
      to="/nuevoProyecto"
      className="packageOption"
      onClick={() =>
        dispatch(
          replace({
            stateName: 'tipo',
            value: packageType
          })
        )
      } // setear tipo de paquete en el store
    >
      <div className="packageOption-image">
        <img src={imagePath} alt={altImageText} />
      </div>
      <p className="packageOption-description">
        <dt className="packageOption-title"> {title} </dt>
        <dd className="packageOption-subtitle"> {description} </dd>
      </p>
    </Link>
  );
}
