import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import MyAccount from '../pages/MyAccount/MyAccount';
import Dashboard from '../pages/Dashboard/Dashboard';
import WallPaperWelcome from '../pages/WallpaperWelcome/WallpaperWelcome';
import NewTicket from '../pages/NewTicket/NewTicket';
import MyTickets from '../pages/MyTickets/MyTickets';
import HomeBody from '../components/HomeBody/HomeBody'
import ResetPassword from '../components/ResetPassword/ResetPassword'
import CreateAccount from '../components/CreateAccount/CreateAccount'
import LoginForm from '../components/LoginForm/LoginForm'
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import './App.css';

function App() {

  return (
    <Router>
      
      <Routes>
        
         <Route path="/login" exact element={
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

        <Route path="/" element={<Dashboard/>}>
          <Route index element={<WallPaperWelcome/>}/>
          <Route path='miCuenta' element={<MyAccount/>}/>
          <Route path='misEtiquetas' element={<MyTickets/>}/>
          <Route path='nuevoProyecto' element={<NewTicket/>}/>
          <Route path='crearEtiqueta' element={<CrearEtiqueta/>}/>
          <Route path='cambiarClave' element={<ChangePassword/>}/>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;







function CrearEtiqueta(){
  return(
    
      <h1>Crear Etiqueta</h1>
  );
}
