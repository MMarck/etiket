import { exportComponentAsPNG, exportComponentAsPDF } from 'react-component-export-image';
import { replace, erase, loadLabel } from '../../reducers/etiquetaSlice';
import { replaceLE } from '../../reducers/LabelEditorSlice';
import { pathIcons, zoom } from '../../config/constants';
import { connect } from 'react-redux';
import request from '../../tools/ApiSetup';
import { backendURL } from '../../config/constants.js';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Component, createRef } from 'react';
import './LabelEditor.css';
import { setPosition } from '../../tools/Statefunctions';
import { fabric } from 'fabric';
import { withRouter } from '../../tools/withRouter';

class LabelEditor extends Component {

  constructor(props) {
    super(props);
    this.counter = 0 
    console.log("times "+ this.counter)
    this.componentRef = createRef();

    this.state = {
      accessToken: Cookies.get('accessToken') || '',
      refreshToken: Cookies.get('refreshToken') || '',
      canvas : null
    };
  }

  componentDidMount() {
    const header = {
      Authorization: 'Bearer ' + this.state.accessToken
    };
    const jsonData = {
      labelId: this.props.params.id
    };
    request
      .post(backendURL + 'Labels/getLabelbyId', jsonData, {
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

    //Initializing canvas and save on component state
    this.setState({canvas: this.getInitialCanvas(this.props.etiqueta)});
  }




  getInitialCanvas(label){
    var cv = new fabric.Canvas('PreviewContainer');
    cv.setDimensions(
      {
        width: '1300',
        height: '500'
      },
    );
    

    // PAPER (SHAPE BACKGROUND)
    //cv.setHeight(document.getElementById("PreviewContainer").clientHeight);
    //cv.setWidth(document.getElementById("PreviewContainer").clientWidth);

    var mainViewPrototype = new fabric.Rect({
      left: 300,
      top: 80,
      fill: "white",
      width: fabric.util.parseUnit('10cm'),
      height: fabric.util.parseUnit('10cm'),  
      stroke: "gray",
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockRotation: true,
      hasControls: false,
      hasBorders: false,
    });

    // TEXT AND ELEMENTS    

    var productName = new fabric.Textbox(label.nombreProducto, {
      left: 450,
      top: 100,
      fill: 'black',
      fontSize:30,
    });

    var brand = new fabric.Textbox(label.marca, {
      left: 450,
      top: 200,
      fill: 'black',
      fontSize:30,
    });

    var netWeight  = new fabric.Textbox(label.pesoNetoLabel.value + ' ' + label.pesoNeto + ' ' + label.pesoNetoUn.value, {
      left: 450,
      top: 300,
      fill: 'black',
      fontSize:15,
    });

    var drenWeight = new fabric.Textbox(label.pesoDrenadoLabel.value + ' ' + label.pesoDrenado + ' ' + label.pesoDrenadoUn.value, {
      left: 450,
      top: 400,
      fill: 'black',
      fontSize:15,
    });
    
    // ZOOM AND PANNING
    //The term 'this' on each event listener means canvas (cv)
    cv.on('mouse:wheel', function (opt) {
      var delta = opt.e.deltaY;
      var zoom = this.getZoom();
      zoom *= 1.005 ** delta;
      if (zoom > 10) zoom = 10;
      if (zoom < 0.1) zoom = 0.1;
      this.zoomToPoint(opt.absolutePointer, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    cv.on('mouse:down', function (opt) {
      var evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });

    cv.on('mouse:move', function (opt) {
      if (this.isDragging) {
        var e = opt.e;
        var delta = new fabric.Point(e.movementX * 0.6, e.movementY * 0.6);
        this.relativePan(delta);
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });

    cv.on('mouse:up', function (opt) {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      this.setViewportTransform(this.viewportTransform);
      this.isDragging = false;
      this.selection = true;
    });

    cv.on('object:moving', function (e) {
      var obj = e.target;
      //If object is too big ignore
      if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
        return;
      } 
      
      var bounding = {
        top: mainViewPrototype.top - this.vptCoords.tl.y * 0.01,
        left: mainViewPrototype.left - this.vptCoords.tl.x * 0.01,
        right: mainViewPrototype.left + mainViewPrototype.width - this.vptCoords.tl.x * 0.01,
        bottom: mainViewPrototype.top + mainViewPrototype.height- this.vptCoords.tl.y * 0.01
      }

      obj.setCoords();
      
      var objectPosition = {
        top: obj.top,
        left: obj.left,
        right: obj.left + obj.width * obj.scaleX,
        bottom: obj.top + obj.height * obj.scaleY
      }
      
      //Simple verification that object's position don't be outside bounding area
      if(objectPosition.top < bounding.top){
        obj.top = bounding.top
      }
      if(objectPosition.left < bounding.left){
        obj.left = bounding.left
      }
      if(objectPosition.right > bounding.right){
        obj.left = bounding.right - obj.width * obj.scaleX
      }
      if( objectPosition.bottom > bounding.bottom){
        obj.top = bounding.bottom - obj.height * obj.scaleY
      }
    }); 


    // SET ELEMENTS AND RETURN
    cv.add(mainViewPrototype, productName, brand, netWeight, drenWeight);
    return cv
  }

  /*
   *   Función para guardar los cambios en la base de datos
   */
  saveLabel() {
    const header = {
      Authorization: 'Bearer ' + this.state.accessToken
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
      .put(backendURL + 'Labels/' + this.props.params.id, jsonData, {
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
   * Funcion wrapper para setZoomque permite aumentar/disminuir el zoom
   */
  zoomCenter(opt) {
    var canvas = this.state.canvas;
    var centerPoint = new fabric.Point(canvas.width * 0.5, canvas.height * 0.5);
    var factor = opt === 'IN' ? canvas.getZoom() * zoom : canvas.getZoom() / zoom;

    canvas.zoomToPoint(centerPoint, factor);
  }

  resetElementPosition() {
    setPosition('nombreProducto');
    setPosition('pesosContainer');
    setPosition('marca');
    setPosition('alcohol');
    setPosition('ingPos');
    setPosition('algPos');
  }

  /**
   * Build in function that will be call after constructor() and before render(), 
   * also will be call in every component update. the initial values are set width
   * "getInitialCanvas" method
   * @param {*} props 
   * @param {*} state 
   * @returns 
   */
  static getDerivedStateFromProps(props, state) {
    var label = props.etiqueta;

    if (state.canvas){
      state.canvas._objects[1].text = label.nombreProducto
      state.canvas._objects[2].text = label.marca
      state.canvas._objects[3].text = label.pesoNetoLabel.value + ' ' + label.pesoNeto + ' ' + label.pesoNetoUn.value
      state.canvas._objects[4].text = label.pesoDrenadoLabel.value + ' ' + label.pesoDrenado + ' ' + label.pesoDrenadoUn.value
      state.canvas.renderAll()
    }
    
    //return null for not update component state
    return null;
  }

  
  render() {

    return (
      <div id="masterContainer">
        <Sidebar />
        <div id="LabelEditorContainer">
          <Link to={'/misEtiquetas'} style={{ width: 'fit-content' }}>
            <img src={pathIcons + 'back.png'} alt="Regresar" className="backBtn " />
          </Link>
          
          <canvas id="PreviewContainer" ref={this.componentRef} />
          

          <div className="d-flex flex-column justify-content-center align-items-center gap-2 my-4">
            <span
              onClick={() => {
                this.props.erase();
                this.resetElementPosition();
              }}
              style={{ cursor: 'pointer' }}
              className="p-2"
            >
              <img src={pathIcons + 'return.png'} alt="return " width={'10px'} />
              BORRAR TODO
            </span>

            <div className="d-flex gap-3">
              <button onClick={() => this.saveLabel()} className="darkButton-twhite" type="button">
                GUARDAR CAMBIOS
              </button>

              <button
                onClick={() => exportComponentAsPDF(this.componentRef)}
                className="darkButton-twhite"
                type="button"
              >
                EXPORTAR EN PDF
              </button>

              <button
                onClick={() => exportComponentAsPNG(this.componentRef)}
                className="darkButton-twhite"
                type="button"
              >
                EXPORTAR EN PNG
              </button>

              <img
                src={pathIcons + 'zoomin.png'}
                alt="zoomIn"
                className="zoomButton"
                onClick={() => {
                  this.zoomCenter('IN');
                }}
              />
              <img
                src={pathIcons + 'zoomout.png'}
                alt="zoomOut"
                className="zoomButton"
                onClick={() => {
                  this.zoomCenter('OUT');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(LabelEditor));
