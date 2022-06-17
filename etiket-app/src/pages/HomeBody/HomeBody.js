import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import './HomeBody.css';

class HomeBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlanesVisible: false,
      isEmpresaVisible: false,
      isEmprendedorVisible: true
    };
  }

  togglePlanes() {
    this.setState({ isPlanesVisible: !this.state.isPlanesVisible });
  }

  toogleEmpresa() {
    if (!this.state.isEmpresaVisible) {
      this.setState({ isEmpresaVisible: !this.state.isEmpresaVisible });
      this.setState({ isEmprendedorVisible: !this.state.isEmprendedorVisible });
    }
  }

  toogleEmprendedor() {
    if (!this.state.isEmprendedorVisible) {
      this.setState({ isEmprendedorVisible: !this.state.isEmprendedorVisible });
      this.setState({ isEmpresaVisible: !this.state.isEmpresaVisible });
    }
  }

  changePlanes() {
    if (this.state.isEmprendedorVisible) {
      return (
        <div id="planesContainer">
          <div id="gratis" className="planesRect">
            <div className="planesHeader">
              <h2 className="planesTextHeader">Gratis, por siempre</h2>
              <div className="planesPrecio">
                <h1 className="precioNumber">$0</h1>
                <span className="precioPlazo">/mes</span>
              </div>
            </div>
            <div className="planesText">
              <span className="textSubHeader">Crea etiquetas para empaques o envases:</span>
              <ul style={{ listStyleImage: 'url(/images/icons/chequeSmall.png)' }}>
                <li className="isFeature">
                  De forma rectangular o cuadrada{' '}
                  <span className="featureEsp">(galletas, cereales, etc...)</span>
                </li>
                <li className="isNotFeature">
                  De forma circular <span className="featureEsp">(quesos, jamones, etc...)</span>
                </li>
                <li className="isNotFeature">
                  En botellas o latas <span className="featureEsp">(cerveza, yogurt, etc...)</span>
                </li>
                <li className="isNotFeature">
                  De forma irregular{' '}
                  <span className="featureEsp">(helados en forma de cono, sanduches, etc...)</span>
                </li>
              </ul>
              <span className="textSubHeader">Diseño y elaboración de:</span>
              <ul>
                <li className="isNotFeature">Tabla nutricional basado en CÓDEX</li>
                <li className="isNotFeature">Tabla nutricional basado en FDA</li>
                <li className="isNotFeature">Tabla nutricional basado en Unión Europea</li>
                <li className="isNotFeature">Tabla nutricional basado en México</li>
                <li className="isNotFeature">Tabla nutricional basado en Ecuador</li>
                <li className="isNotFeature">Tabla nutricional basado en Chile</li>
                <li className="isNotFeature">Tabla nutricional basado en Perú</li>
              </ul>
            </div>
            <button className="comprar">COMPRAR PLAN</button>
          </div>
          <div id="emprendedor" className="planesRect">
            <div className="planesHeader">
              <h2 className="planesTextHeader">Plan Emprendedor</h2>
              <div className="planesPrecio">
                <h1 className="precioNumber">$5</h1>
                <span className="precioPlazo">/mes</span>
              </div>
            </div>
            <div className="planesText">
              <span className="textSubHeader">Crea etiquetas para empaques o envases:</span>
              <ul style={{ listStyleImage: 'url(/images/icons/chequeSmall.png)' }}>
                <li className="isFeature">
                  De forma rectangular o cuadrada{' '}
                  <span className="featureEsp">(galletas, cereales, etc...)</span>
                </li>
                <li className="isFeature">
                  De forma circular <span className="featureEsp">(quesos, jamones, etc...)</span>
                </li>
                <li className="isFeature">
                  En botellas o latas <span className="featureEsp">(cerveza, yogurt, etc...)</span>
                </li>
                <li className="isFeature">
                  De forma irregular{' '}
                  <span className="featureEsp">(helados en forma de cono, sanduches, etc...)</span>
                </li>
              </ul>
              <span className="textSubHeader">Diseño y elaboración de:</span>
              <ul style={{ listStyleImage: 'url(/images/icons/chequeSmall.png)' }}>
                <li className="isFeature">Tabla nutricional basado en CÓDEX</li>
                <li className="isNotFeature">Tabla nutricional basado en FDA</li>
                <li className="isNotFeature">Tabla nutricional basado en Unión Europea</li>
                <li className="isNotFeature">Tabla nutricional basado en México</li>
                <li className="isNotFeature">Tabla nutricional basado en Ecuador</li>
                <li className="isNotFeature">Tabla nutricional basado en Chile</li>
                <li className="isNotFeature">Tabla nutricional basado en Perú</li>
              </ul>
            </div>
            <button className="comprar">COMPRAR PLAN</button>
          </div>
        </div>
      );
    } else {
      return (
        <div id="planesContainer">
          <div id="emprendedor" className="planesRect">
            <div className="planesHeader">
              <h2 className="planesTextHeader">Plan Emprendedor</h2>
              <div className="planesPrecio">
                <h1 className="precioNumber">$5</h1>
                <span className="precioPlazo">/mes</span>
              </div>
            </div>
            <div className="planesText">
              <span className="textSubHeader">Crea etiquetas para empaques o envases:</span>
              <ul style={{ listStyleImage: 'url(/images/icons/chequeSmall.png)' }}>
                <li className="isFeature">
                  De forma rectangular o cuadrada{' '}
                  <span className="featureEsp">(galletas, cereales, etc...)</span>
                </li>
                <li className="isFeature">
                  De forma circular <span className="featureEsp">(quesos, jamones, etc...)</span>
                </li>
                <li className="isFeature">
                  En botellas o latas <span className="featureEsp">(cerveza, yogurt, etc...)</span>
                </li>
                <li className="isFeature">
                  De forma irregular{' '}
                  <span className="featureEsp">(helados en forma de cono, sanduches, etc...)</span>
                </li>
              </ul>
              <span className="textSubHeader">Diseño y elaboración de:</span>
              <ul style={{ listStyleImage: 'url(/images/icons/chequeSmall.png)' }}>
                <li className="isFeature">Tabla nutricional basado en CÓDEX</li>
                <li className="isNotFeature">Tabla nutricional basado en FDA</li>
                <li className="isNotFeature">Tabla nutricional basado en Unión Europea</li>
                <li className="isNotFeature">Tabla nutricional basado en México</li>
                <li className="isNotFeature">Tabla nutricional basado en Ecuador</li>
                <li className="isNotFeature">Tabla nutricional basado en Chile</li>
                <li className="isNotFeature">Tabla nutricional basado en Perú</li>
              </ul>
            </div>
            <button className="comprar">COMPRAR PLAN</button>
          </div>
          <div id="empresa" className="planesRect">
            <div className="planesHeader">
              <h2 className="planesTextHeader">Plan Empresa</h2>
              <div className="planesPrecio">
                <h1 className="precioNumber">$12</h1>
                <span className="precioPlazo">/mes</span>
              </div>
            </div>
            <div className="planesText">
              <span className="textSubHeader">Crea etiquetas para empaques o envases:</span>
              <ul style={{ listStyleImage: 'url(/images/icons/chequeSmall.png)' }}>
                <li className="isFeature">
                  De forma rectangular o cuadrada{' '}
                  <span className="featureEsp">(galletas, cereales, etc...)</span>
                </li>
                <li className="isFeature">
                  De forma circular <span className="featureEsp">(quesos, jamones, etc...)</span>
                </li>
                <li className="isFeature">
                  En botellas o latas <span className="featureEsp">(cerveza, yogurt, etc...)</span>
                </li>
                <li className="isFeature">
                  De forma irregular{' '}
                  <span className="featureEsp">(helados en forma de cono, sanduches, etc...)</span>
                </li>
              </ul>
              <span className="textSubHeader">Diseño y elaboración de:</span>
              <ul style={{ listStyleImage: 'url(/images/icons/chequeSmall.png)' }}>
                <li className="isFeature">Tabla nutricional basado en CÓDEX</li>
                <li className="isFeature">Tabla nutricional basado en FDA</li>
                <li className="isFeature">Tabla nutricional basado en Unión Europea</li>
                <li className="isFeature">Tabla nutricional basado en México</li>
                <li className="isFeature">Tabla nutricional basado en Ecuador</li>
                <li className="isFeature">Tabla nutricional basado en Chile</li>
                <li className="isFeature">Tabla nutricional basado en Perú</li>
              </ul>
            </div>
            <button className="comprar">COMPRAR PLAN</button>
          </div>
        </div>
      );
    }
  }

  render() {
    const isPlanesVisible = this.state.isPlanesVisible;
    return (
      <div className="homebody">
        <div
          id="LeftForm"
          className="d-flex flex-column justify-content-center align-items-center flex-grow-1 flex-shrink-0 w-50 overflow-auto"
        >
          <img src="../images/solinalLogo.png" alt="logo de solinal" width={'200px'} />

          <Outlet />
        </div>

        <div className="info" style={{ backgroundImage: 'url(/images/fondo-web.png)' }}>
          {isPlanesVisible ? (
            <div id="planes" className={isPlanesVisible ? 'isShowing' : 'isNotShowing'}>
              <div id="verPlanes" onClick={() => this.togglePlanes()}>
                <img
                  src="/images/icons/flecha-hacia-abajo.png"
                  alt="abajo"
                  className="highImgIcon"
                  style={{ transform: 'rotate(180deg)' }}
                ></img>
                <h1 className="highText">VER INFORMACIÓN</h1>
              </div>
              <h1 className="headText" style={{ marginTop: '5%' }}>
                Planes Solinal Etiqueta
              </h1>
              <div id="rectSelectorContainer" style={{ marginTop: '5%' }}>
                <div
                  id="emprendedorSqr"
                  onClick={() => this.toogleEmprendedor()}
                  className={this.state.isEmprendedorVisible ? 'planSelected' : 'planNotSelected'}
                >
                  <span>Emprendedor</span>
                </div>
                <div
                  id="empresasSqr"
                  onClick={() => this.toogleEmpresa()}
                  className={this.state.isEmpresaVisible ? 'planSelected' : 'planNotSelected'}
                >
                  <span>Empresas</span>
                </div>
              </div>
              {this.changePlanes()}
            </div>
          ) : (
            <div id="exp" className={isPlanesVisible ? 'isNotShowing' : 'isShowing'}>
              <h1 className="headText" style={{ marginTop: '7%' }}>
                El generador de etiquetas para alimentos y bebidas
              </h1>
              <div style={{ marginTop: '5%' }}>
                <p className="text">
                  Los fabricantes de alimentos y bebidas necesitan diseñar, imprimir y gestionar
                  muchos tipos de etiquetas. Comprendemos que se puede volver tedioso revisar la
                  normativa de cada producto y crear una etiqueta, calcular los nutrientes y diseñar
                  una etiqueta nutricional acorde al país de comercialización para cumplir las
                  últimas tendencias del mercado y las exigencias legales.
                </p>
                <p className="text">
                  Es por tal motivo, que ofrecemos una solución amigable para ayudar a simplificar
                  todo el proceso de etiquetado, empezando con la creación del prototipo de una
                  etiqueta de alimentos que cumpla la normativa local o del paísal que desea
                  exportar.
                </p>
              </div>
              <div className="infoSquare">
                <img src="/images/icons/label.png" alt="etiqueta" className="imgInfoIcon"></img>
                <p className="squareText">
                  Cree e imprima fácilmente etiquetas para alimentos, suplementos, bebidas
                  alchólicas y no alcohólicas.
                </p>
              </div>
              <div className="infoSquare">
                <img src="/images/icons/gavel.png" alt="maso" className="imgInfoIcon"></img>
                <p className="squareText">
                  Diseñe etiquetas nutricionales espectaculares que cumplan con las normativas de la
                  UE y la FDA.
                </p>
              </div>
              <div className="infoSquare">
                <img src="/images/icons/wheat.png" alt="planta" className="imgInfoIcon"></img>
                <p className="squareText">
                  La función gestión de textos etiquetados destaca los alérgenos de manera
                  automática cuando aparecen en las listas de ingredientes
                </p>
              </div>
              <div id="verPlanes" onClick={() => this.togglePlanes()}>
                <h1 className="highText" style={{ marginTop: '40px' }}>
                  VER PLANES
                </h1>
                <img
                  src="/images/icons/flecha-hacia-abajo.png"
                  alt="flecha abajo"
                  className="highImgIcon"
                ></img>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default HomeBody;
