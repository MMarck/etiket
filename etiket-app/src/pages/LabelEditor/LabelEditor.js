import { exportComponentAsPNG, exportComponentAsPDF } from 'react-component-export-image';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import React from 'react';
import { replace, erase, loadLabel } from '../../reducers/etiquetaSlice';
import { replaceLE } from '../../reducers/LabelEditorSlice';
import { pathIcons, backendURL } from '../../config/constants';
import { withRouter } from '../../tools/withRouter';
import request from '../../tools/ApiSetup';
import PrototypeFront from '../../components/PrototypeFront/PrototypeFront';
import PrototypeBack from '../../components/PrototypeBack/PrototypeBack';
import Sidebar from '../../components/Sidebar/Sidebar';
import './LabelEditor.css';
import { setPosition } from '../../tools/Statefunctions';

const mapStateToProps = (state) => ({
  etiqueta: state.etiqueta,
  LabelEditor: state.LabelEditorSlice
});
const mapDispatchToProps = () => ({
  replace,
  erase,
  loadLabel,
  replaceLE
});
class LabelEditor extends React.Component {
  componentDidMount() {
    const header = {
      Authorization: `Bearer ${this.state.accessToken}`
    };
    const jsonData = {
      labelId: this.props.params.id
    };
    request
      .post(`${backendURL}Labels/getLabelbyId`, jsonData, {
        headers: header
      })
      .then((res) => {
        const label = res.data;
        this.props.loadLabel(label);
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error.message);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
  }

  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
    this.state = {
      accessToken: Cookies.get('accessToken') || '',
      refreshToken: Cookies.get('refreshToken') || '',
      zoom: 1
    };
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  /*
   *   Función para guardar los cambios en la base de datos
   */

  saveLabel() {
    const header = {
      Authorization: `Bearer ${this.state.accessToken}`
    };
    const jsonData = {
      nombreProyecto: this.props.etiqueta.nombreProyecto,
      tipo: this.props.etiqueta.tipo,
      nombreEtiqueta: this.props.etiqueta.nombreProducto,
      marca: this.props.etiqueta.marca,
      dimensiones: {
        ancho: this.props.etiqueta.ancho,
        altura: this.props.etiqueta.altura,
        unidad: this.props.etiqueta.dimensionesUn,
        sizeIndicatorVisibility: this.props.etiqueta.sizeIndicatorVisibility
      },
      pesoNeto: {
        valor: this.props.etiqueta.pesoNeto,
        label: this.props.etiqueta.pesoNetoLabel,
        unidad: this.props.etiqueta.pesoNetoUn
      },
      pesoDrenado: {
        valor: this.props.etiqueta.pesoDrenado,
        label: this.props.etiqueta.pesoDrenadoLabel,
        unidad: this.props.etiqueta.pesoDrenadoUn,
        isDisabled: this.props.etiqueta.pesoDrenadoDisabled
      },
      alcohol: {
        valor: this.props.etiqueta.alcohol,
        unidad: this.props.etiqueta.alcoholUn
      },
      ingredientes: this.props.etiqueta.ingredientes,
      alergenos: this.props.etiqueta.alergenos,
      conservacion: {
        metodo: this.props.etiqueta.metodoConservacion,
        unidad: this.props.etiqueta.conservacionUn
      },
      vidaUtil: {
        valor: this.props.etiqueta.vidaUtil,
        unidad: this.props.etiqueta.vidaUtilUn
      },
      fabricacion: {
        valor: this.props.etiqueta.fabricacion,
        unidad: this.props.etiqueta.fabricacionUn
      },
      caducacion: {
        valor: this.props.etiqueta.caducacion,
        unidad: this.props.etiqueta.caducacionUn
      },
      direccion: this.props.etiqueta.direccion,
      instrucciones: this.props.etiqueta.instrucciones,
      posicion: {
        pesos: this.props.etiqueta.pesosPos,
        marca: this.props.etiqueta.marcaPos,
        nombre: this.props.etiqueta.nombreProductoPos,
        ingredientes: this.props.etiqueta.ingPos,
        alergenos: this.props.etiqueta.algPos,
        infNut: this.props.etiqueta.infNutPos,
        alcohol: this.props.etiqueta.alcolPos
      },
      TablaNutri: {
        tipo: this.props.etiqueta.tipoTabla,
        tamanioPorcion: {
          valor: this.props.etiqueta.tamanioPorcion,
          unidad: this.props.etiqueta.tamanioPorcionUn
        },
        porcionPorEnvase: {
          valor: this.props.etiqueta.porcionPorEnvase,
          unidad: this.props.etiqueta.porcionPorEnvaseUn,
          porcionPorEnvaseDisabled: this.props.etiqueta.porcionPorEnvaseDisabled
        },
        grasas: {
          total: this.props.etiqueta.grasaTotal,
          saturada: this.props.etiqueta.grasaSaturada,
          trans: this.props.etiqueta.grasaTrans
        },
        acidosMono: this.props.etiqueta.acidosMono,
        acidosPoli: this.props.etiqueta.acidosPoli,
        colesterol: this.props.etiqueta.colesterol,
        sodio: this.props.etiqueta.sodio,
        carbohidratos: this.props.etiqueta.carbohidratos,
        azucares: this.props.etiqueta.azucares,
        proteina: this.props.etiqueta.proteina,
        fibra: this.props.etiqueta.fibra,
        energiaTotal: {
          julios: this.props.etiqueta.energiaTotalJulios,
          calorias: this.props.etiqueta.energiaTotalCalorias
        }
      }
    };

    request
      .put(`${backendURL}Labels/${this.props.params.id}`, jsonData, {
        headers: header
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error.message);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
  }

  /**
   * Función permite aumentar el zoom aplicado como propiedad css al contenedor de las etiquetas
   */
  zoomIn() {
    const zoom = this.props.LabelEditor.zoom + 0.1;

    this.props.replaceLE(['zoom', zoom]); // actualizar la variable en el estado
    const visualizer = document.getElementById('Previewer'); // obtener control del visualizador
    visualizer.style.transform = `scale(${zoom})`; // aplica el valor

    if (zoom >= 1.2) {
      visualizer.style.paddingTop = `${zoom * 7}vh`;
      visualizer.style.paddingLeft = `${zoom * 7}vw`;
    }
    if (zoom >= 1.4) {
      visualizer.style.paddingTop = `${zoom * 12}vh`;
      visualizer.style.paddingLeft = `${zoom * 14}vw`;
    }
  }

  /**
   * Función permite disminuir el zoom aplicado como propiedad css al contenedor de las etiquetas
   */
  zoomOut() {
    const zoom = this.props.LabelEditor.zoom - 0.1;

    this.props.replaceLE(['zoom', zoom]); // actualizar la variable en el estado
    const visualizer = document.getElementById('Previewer'); // obtener control del visualizador
    visualizer.style.transform = `scale(${zoom})`; // aplica el valor

    if (zoom < 1.2) {
      visualizer.style.paddingTop = '0vh';
      visualizer.style.paddingLeft = '0vw';
    } else if (zoom >= 1.2 && zoom < 1.4) {
      visualizer.style.paddingTop = `${zoom * 7}vh`;
      visualizer.style.paddingLeft = `${zoom * 7}vw`;
    } else if (zoom >= 1.4) {
      visualizer.style.paddingTop = `${zoom * 12}vh`;
      visualizer.style.paddingLeft = `${zoom * 14}vw`;
    }
  }

  resetElementPosition() {
    setPosition('nombreProducto');
    setPosition('pesosContainer');
    setPosition('marca');
    setPosition('alcohol');
    setPosition('ingPos');
    setPosition('algPos');
  }

  render() {
    return (
      <div id="masterContainer">
        <Sidebar />
        <div id="LabelEditorContainer">
          <Link to="/misEtiquetas" style={{ width: 'fit-content' }}>
            <img src={`${pathIcons}back.png`} alt="Regresar" className="backBtn " />
          </Link>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="paneTitleProject">{this.props.etiqueta.nombreProyecto}</h5>
          </div>

          <div id="PreviewContainer">
            <div id="Previewer" ref={this.componentRef}>
              <PrototypeFront />
              <PrototypeBack />
            </div>
          </div>

          <div className="d-flex flex-column justify-content-center align-items-center gap-2">
            <span
              onClick={() => {
                this.props.erase();
                this.resetElementPosition();
              }}
              style={{ cursor: 'pointer' }}
              className="p-2">
              <img src={`${pathIcons}return.png`} alt="return " width="10px" />
              BORRAR TODO
            </span>

            <div className="d-flex gap-3">
              <button onClick={() => this.saveLabel()} className="darkButton-twhite" type="button">
                GUARDAR CAMBIOS
              </button>

              <button
                onClick={() => exportComponentAsPDF(this.componentRef)}
                className="darkButton-twhite"
                type="button">
                EXPORTAR EN PDF
              </button>

              <button
                onClick={() => exportComponentAsPNG(this.componentRef)}
                className="darkButton-twhite"
                type="button">
                EXPORTAR EN PNG
              </button>

              <button type="button" className="colored-button" onClick={this.zoomIn}>
                {' '}
                zoom in{' '}
              </button>
              <button type="button" className="colored-button" onClick={this.zoomOut}>
                {' '}
                zoom out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(LabelEditor));
