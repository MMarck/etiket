import { unitTocm, getDataFontSize } from "../../tools/Casefunctions";
import { replace } from "../../reducers/etiquetaSlice";
import { connect } from "react-redux";
import { Component } from "react";
import { fabric } from "fabric";
import SizeIndicator from "../SizeIndicator/SizeIndicator";
import "./PrototypeFront.css";

/**
 * Componente para dibujar la vista DELANTERA de la etiqueta, las variables que utiliza estan mapeadas
 * en props mediante el metodo connect de react redux al objeto etiqueta del store global
 */
class PrototypeFront extends Component {
  render() {
    let dimensionesUn = this.props.etiqueta.dimensionesUn.value;
    let altura = this.props.etiqueta.altura;

    if (dimensionesUn === "cm") {
      if (parseFloat(this.props.etiqueta.altura) >= 3.5) {
        altura = this.props.etiqueta.altura;
      } else {
        altura = "10";
      }
    } else if (dimensionesUn === "mm") {
      if (parseFloat(this.props.etiqueta.altura) >= 35) {
        altura = this.props.etiqueta.altura;
      } else {
        altura = "100";
      }
    }

    let ancho = this.props.etiqueta.ancho;

    if (dimensionesUn === "cm") {
      if (parseFloat(this.props.etiqueta.ancho) >= 3.5) {
        ancho = this.props.etiqueta.ancho;
      } else {
        ancho = "10";
      }
    } else if (dimensionesUn === "mm") {
      if (parseFloat(this.props.etiqueta.ancho) >= 35) {
        ancho = this.props.etiqueta.ancho;
      } else {
        ancho = "100";
      }
    }

    let labelArea =
      unitTocm(altura, dimensionesUn) * unitTocm(ancho, dimensionesUn);
    //let HeigthContainerPesosNetos = labelArea > 10 ? "30%" : "100%"; //10 cm2 (centimetros cuadrados)
    let dataFontSize = getDataFontSize(labelArea); //area en cm2 (centimetros cuadrados)

    let sizeIndicatorVisibility = this.props.etiqueta.sizeIndicatorVisibility;

    //Inicializacion del canvas
    new fabric.Canvas("canvasFront", {});

    return (
      <div className="mx-4 d-flex  ">
        <div style={{ overflow: "hidden", width: "30px" }}>
          {/* Copia invisible del titulo */}
          <h5
            className="paneTitle"
            style={{ fontSize: dataFontSize, visibility: "hidden" }}
          >
            .
          </h5>
          <SizeIndicator
            orientation={"vertical"}
            length={altura + dimensionesUn}
            visibilityProp={sizeIndicatorVisibility}
            fontSize={dataFontSize}
          />
          {/* Copia invisible del indicador horizontal  */}
          <SizeIndicator
            length={ancho + dimensionesUn}
            visibilityProp={"hidden"}
          />
          {/* Aclaracion: estas copias son para que el indicador 
                    vertical pueda estar a la misma altura que el 
                    prototipo frontal */}
        </div>

        <div className="prototypeContainer">
          <h5 className="paneTitle" style={{ fontSize: dataFontSize }}>
            Panel de visualización principal
          </h5>

          <canvas
            id="myCanvas"
            style={{
              height: altura + dimensionesUn,
              width: ancho + dimensionesUn,
              backgroundColor: "white",
              border: "1px solid #d3d3d3",
            }}
          />

          <SizeIndicator
            length={ancho + dimensionesUn}
            visibilityProp={sizeIndicatorVisibility}
            fontSize={dataFontSize}
          />
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
  LabelEditor: state.LabelEditorSlice,
});

/**
 * Declaracion de metodos para modificar el estado global que se
 * usaran en este componente a traves de sus props
 * @returns null
 */
const mapDispatchToProps = () => ({
  replace,
});

export default connect(mapStateToProps, mapDispatchToProps())(PrototypeFront);
