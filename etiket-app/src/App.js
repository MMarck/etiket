import './App.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import HomeBody from "./components/HomeBody/HomeBody";
import GeneradorRectagular from './components/GeneradorRectangular/GeneradorRectangular';
import GeneradorBotella from './components/GeneradorBotella/GeneradorBotella';
import GeneradorTriangular from './components/GeneradorTriangular/GeneradorTriangular';
import GeneradorCircular from './components/GeneradorCircular/GeneradorCircular';
import MiCuenta from './components/MiCuenta/MiCuenta';
import MisEtiquetas from './components/MisEtiquetas/MisEtiquetas';
import LoginForm from './components/LoginForm/LoginForm';
import ResetPassword from './components/ResetPassword/ResetPassword';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Dashboard from './components/Dashboard/Dashboard'
import ReactTooltip from "react-tooltip";

function App() {

  return (
    <Router>
      
      <Routes>
        
        <Route path="/" exact element={
          <>
            <div className="App">
              <HomeBody />
            </div>
          </>
        }>
          <Route index element={<LoginForm/>}/>
          <Route path='resetPassword' element={<ResetPassword/>}/>
          <Route path='createAccount' element={<CreateAccount/>}/>
        
        </Route>

        <Route path="/dashboard" element={<Dashboard/>}>
          <Route index element={<WallPaperWelcome/>}/>
          <Route path='miCuenta' element={<MiCuenta/>}/>
          <Route path='misEtiquetas' element={<MisEtiquetas/>}/>
          <Route path='nuevo_proyecto' element={<SetTicketName/>}/>
          <Route path='crearEtiqueta' element={<CrearEtiqueta/>}/>
          <Route path='changePassword' element={<ChangePassword/>}/>
        </Route>

        <Route path="/rectangular" exact element={ <GeneradorRectagular/> }/>
        <Route path="/botella" exact element={ <GeneradorBotella/> }/>
        <Route path="/triangular" exact element={ <GeneradorTriangular/> }/>
        <Route path="/circular" exact element={ <GeneradorCircular/> }/>




      </Routes>

      
    </Router>
  );
}

export default App;



/*
 *Este componente se renderiza frente a otros componentes y ocupa todo su contenedor
 *muestra un saludo para el usuario y lo invita a crear una etiqueta
*/
function WallPaperWelcome(){
  return(
    <div id='WallPaperWelcome' className='d-flex justify-content-center align-items-center flex-column flex-grow-1 w-100'>
    <span><br/><br/><br/>Bienvenido !<br/>
      Estás a punto de vender tus productos<br/>
      con una etiqueta en conformidad con la norma !
      <br/><br/>Empecemos !<br/><br/><br/>
    </span>

    <Link  to='/dashboard/misEtiquetas'>
      <button className='btn btn-dark'>CREAR ETIQUETA</button>
    </Link>
    
    <img alt="Edificios" src='../images/figura1.png' width='300px' ></img>
  </div>  
  );
}

/*
*
*/
function SetTicketName(){
  return(
    <div className='w-100 h-100 margin-auto'>
      <ReactTooltip place="rigth" type="dark" effect="solid"  data-for='name'/>
      <input
        className="ligth-input m-4 fs-6 bg-transparent" 
        id="name" 
        type="text" 
        name="name" 
        placeholder="Nombre del proyecto"
        data-tip='Escribe aquí el nombre de tu proyecto'
      />

      <button className='btn-dark rounded fs-7'>continuar</button>
    </div>
  );
}

function CrearEtiqueta(){
  return(
    
      <h1>Crear Etiqueta</h1>
  );
}

function ChangePassword(){
  return(
    <div className='columnContainer w-50' >
    
    <h4><b>Introduzca su nueva contraseña</b></h4><br/>

    <div className="rounded-square mt-5 w-75" style={{margin:'0px auto'}}>
      <form className='w-100'>
        <label htmlFor="password">Nueva contraseña</label>
        <br/>
        <input
          className="inputText ligth-input mb-4 w-100" 
          id="password" 
          type="password" 
          name="password" 
        />
      </form>
    </div>

    <Link to='/dashboard/miCuenta'>
      <button 
      className=" btn-secondary darkButton fw-bolder p-2 my-4" 
      style={{width:'fit-content'}}> 
      ACTUALIZAR CONTRASEÑA
      </button>
    </Link>

    </div>

  );
}