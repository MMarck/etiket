import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet, Link} from 'react-router-dom';
import Header from "./components/Header";
import HomeBody from "./components/HomeBody/HomeBody";
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import GeneradorRectagular from './components/GeneradorRectangular/GeneradorRectangular';
import GeneradorBotella from './components/GeneradorBotella/GeneradorBotella';
import GeneradorTriangular from './components/GeneradorTriangular/GeneradorTriangular';
import GeneradorCircular from './components/GeneradorCircular/GeneradorCircular';
import MiCuenta from './components/MiCuenta/MiCuenta';
import MisEtiquetas from './components/MisEtiquetas/MisEtiquetas';
import LoginForm from './components/LoginForm/LoginForm';
import ResetPassword from './components/ResetPassword/ResetPassword';
import CreateAccount from './components/CreateAccount/CreateAccount';

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
          <Route index element={<PaperWelcome/>}/>
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


function Dashboard(){
  return(
    <div className='d-flex h-100 w-100'>
      <Sidebar/>
      <Outlet/>{/*  Este componente pertenece a react-router-dom y 
                permite alternar entre las rutas hijas declararas 
                en un compontente Router */}
    </div>  
  );
}

function PaperWelcome(){
  return(
    <div id='PaperWelcome' className='d-flex justify-content-center align-items-center flex-column flex-grow-1'>
    <span><br/><br/><br/>Bienvenido !<br/>
      Estás a punto de vender tus productos<br/>
      con una etiqueta en conformidad con la norma !
      <br/><br/>Empecemos !<br/><br/><br/>
    </span>

    <Link  to='/dashboard/CrearEtiqueta'>
      <button className='btn btn-dark'>CREAR ETIQUETA</button>
    </Link>
    
    <img src='../images/figura1.png' width='300px' ></img>
  </div>  
  );
}

function CrearEtiqueta(){
  return(
    <div id='PaperWelcome' className='d-flex justify-content-center align-items-center flex-column flex-grow-1'>
      <h1>Crear Etiqueta</h1>
    </div>
  );
}