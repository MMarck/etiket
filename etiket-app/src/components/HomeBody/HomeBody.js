import LoginForm from "../LoginForm/LoginForm";
import { Component} from "react";
import './HomeBody.css';
import {Link, Outlet} from 'react-router-dom';


class HomeBody extends Component {

  render(){
    return (
      <div className='homebody'>
        <div id='LeftForm' className="d-flex flex-column justify-content-center align-items-center flex-grow-1 flex-shrink-0 w-50 overflow-auto">
          
          <img src="./images/solinalLogo.png" alt="logo de solinal" width={'200px'} />

          <Outlet/>
          
        </div>

        <div className="info" style={{backgroundImage:'url(/images/fondo-web.png)'}} >
          <h1 className="headText">El generador de etiquetas para alimentos y bebidas</h1>
          <div style={{marginTop: "50px"}}>
            <p className="text">
              Los fabricantes de alimentos y bebidas necesitan diseñar, imprimir y gestionar muchos tipos de etiquetas.
              Comprendemos que se puede volver tedioso revisar la normativa de cada producto y crear una etiqueta,
              calcular los nutrientes y diseñar una etiqueta nutricional acorde al país de comercialización para cumplir las
              últimas tendencias del mercado y las exigencias legales.
            </p>
            <p className="text">
              Es por tal motivo, que ofrecemos una solución amigable para ayudar a simplificar todo el proceso de etiquetado,
              empezando con la creación del prototipo de una etiqueta de alimentos que cumpla la normativa local o del paísal que desea exportar.
            </p>
          </div>
          <div className="infoSquare">
            <img src="/images/icons/label.png" className="imgInfoIcon"></img>
            <p className="squareText">Cree e imprima fácilmente etiquetas para alimentos, suplementos, bebidas alchólicas y no alcohólicas.</p>
          </div>
          <div className="infoSquare">
            <img src="/images/icons/gavel.png" className="imgInfoIcon"></img>
            <p className="squareText">Diseñe etiquetas nutricionales espectaculares que cumplan con las normativas de la UE y la FDA.</p>
          </div>
          <div className="infoSquare">
            <img src="/images/icons/wheat.png" className="imgInfoIcon"></img>
            <p className="squareText">La función gestión de textos etiquetados destaca los alérgenos de manera automática cuando aparecen en las listas de ingredientes</p>
          </div>
          <div className="verPlanes">
            <h1 className="highText" style={{marginTop:"40px"}}>VER PLANES</h1>
            <img src="/images/icons/flecha-hacia-abajo.png" className="highImgIcon"></img>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeBody