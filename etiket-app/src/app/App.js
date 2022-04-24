import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import MyAccount from '../pages/MyAccount/MyAccount';
import Dashboard from '../pages/Dashboard/Dashboard';
import WallPaperWelcome from '../pages/WallpaperWelcome/WallpaperWelcome';
import NewTicket from '../pages/NewTicket/NewTicket';
import MyTickets from '../pages/MyTickets/MyTickets';
import HomeBody from '../components/HomeBody/HomeBody'
import ResetPassword from '../components/ResetPassword/ResetPassword';
import CreateAccount from '../components/CreateAccount/CreateAccount';
import LoginForm from '../components/LoginForm/LoginForm';
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import TicketEditor from '../pages/TicketEditor/TicketEditor';
import './App.css';
import { createBrowserHistory } from "history";
import PrivateRoute from '../tools/PrivateRoute';

const history = createBrowserHistory();


function App() {


  return (
    
    <Router  history={history}> 
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
      
        <Route exact path="/" element={
          <PrivateRoute redirectTo="/login"/>
        }>
          <Route exact path='/' element={<Dashboard/>}>
            <Route index element={<WallPaperWelcome/>}/>
            <Route path='miCuenta' element={<MyAccount/>}/>
            <Route path='misEtiquetas' element={<MyTickets/>}/>
            <Route path='nuevoProyecto' element={<NewTicket/>}/>
            <Route path='crearEtiqueta' element={<CrearEtiqueta/>}/>
            <Route path='cambiarClave' element={<ChangePassword/>}/>
          </Route>
        </Route>

        <Route path='/editarEtiqueta/:id' element={<TicketEditor/>}/>
       
      
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
