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
          <Route path='Micuenta' element={<MiCuenta/>}/>
          <Route path='MisEtiquetas' element={<MisEtiquetas/>}/>
          <Route path='CrearEtiqueta' element={<CrearEtiqueta/>}/>
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

    <Link  to='/dashboard/MisEtiquetas'>
      <button className='btn btn-dark'>CREAR ETIQUETA</button>
    </Link>
    
    <img src='../images/figura1.png' width='300px' ></img>
  </div>  
  );
}

function CrearEtiqueta(){
  return(
    
      <h1>Crear Etiqueta</h1>
  );
}