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


  }

  constructor(props) {
    super(props);
    this.componentRef = createRef();
    this.state = {
      accessToken: Cookies.get('accessToken') || '',
      refreshToken: Cookies.get('refreshToken') || '',
      canvas: null
    };
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

  render() {
    //Variables inizialization
    var nombreProducto = (this.props.etiqueta.nombreProducto || '')
    
    let dimensionesUn = this.props.etiqueta.dimensionesUn.value;
    let altura = this.props.etiqueta.altura;

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

    let ancho = this.props.etiqueta.ancho;

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



    //Inicializacion del canvas
    var canvas = new fabric.Canvas('PreviewContainer');
        canvas.setDimensions(
          {
            width: '1300',
            height: '500'
          },
        );
        //canvas.setHeight(document.getElementById("PreviewContainer").clientHeight);
        //canvas.setWidth(document.getElementById("PreviewContainer").clientWidth);
        canvas.setBackgroundColor('#F5F6F8');
    
        var rect = new fabric.Rect({
          left: 300,
          top: 80,
          fill: "white",
          width: fabric.util.parseUnit(ancho + dimensionesUn),
          height: fabric.util.parseUnit(altura + dimensionesUn),  
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
        var circle = new fabric.Circle({
          radius: 20,
          fill: "green",
          left: 360,
          top: 120,
        });
        var textbox = new fabric.Textbox(nombreProducto, {
          left: 350,
          top: 250,
          fill: 'black',
          fontSize:30,
        });
        
        canvas.add( rect, circle ,textbox);
    
        canvas.on('mouse:wheel', function (opt) {
          var delta = opt.e.deltaY;
          var zoom = canvas.getZoom();
          zoom *= 1.005 ** delta;
          if (zoom > 10) zoom = 10;
          if (zoom < 0.1) zoom = 0.1;
          canvas.zoomToPoint(opt.absolutePointer, zoom);
          opt.e.preventDefault();
          opt.e.stopPropagation();
        });
    
        canvas.on('mouse:down', function (opt) {
          var evt = opt.e;
          if (evt.altKey === true) {
            this.isDragging = true;
            this.selection = false;
            this.lastPosX = evt.clientX;
            this.lastPosY = evt.clientY;
          }
        });
    
        canvas.on('mouse:move', function (opt) {
          if (this.isDragging) {
            var e = opt.e;
            var delta = new fabric.Point(e.movementX * 0.6, e.movementY * 0.6);
            canvas.relativePan(delta);
            this.lastPosX = e.clientX;
            this.lastPosY = e.clientY;
          }
        });
    
        canvas.on('mouse:up', function (opt) {
          // on mouse up we want to recalculate new interaction
          // for all objects, so we call setViewportTransform
          this.setViewportTransform(this.viewportTransform);
          this.isDragging = false;
          this.selection = true;
        });
    
      canvas.on('object:moving', function (e) {
          var obj = e.target;
          // if object is too big ignore
          if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
            return;
          } 
          
          var bounding = {
            top: rect.top - canvas.vptCoords.tl.y * 0.01,
            left: rect.left - canvas.vptCoords.tl.x * 0.01,
            right: rect.left + rect.width - canvas.vptCoords.tl.x * 0.01,
            bottom: rect.top + rect.height- canvas.vptCoords.tl.y * 0.01
          }
    
          obj.setCoords();
          
          var objectPosition = {
            top: obj.top,
            left: obj.left,
            right: obj.left + obj.width * obj.scaleX,
            bottom: obj.top + obj.height * obj.scaleY
          }
          
          //simple verification that object's position don't be outside bounding area
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
        canvas.renderAll();

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
