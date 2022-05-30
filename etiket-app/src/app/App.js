/**
 * Documento para el componente App. declara el arbol de urls de la aplicacion
 * a las correspondientes vistas
 */

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { createBrowserHistory } from "history";
import MyAccount from '../pages/MyAccount/MyAccount';
import Dashboard from '../pages/Dashboard/Dashboard';
import WallPaperWelcome from '../pages/WallpaperWelcome/WallpaperWelcome';
import NewTicket from '../pages/NewLabel/NewLabel';
import MyLabels from '../pages/MyLabels/MyLabels';
import HomeBody from '../pages/HomeBody/HomeBody'
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import CreateAccount from '../pages/CreateAccount/CreateAccount';
import LoginForm from '../components/LoginForm/LoginForm';
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import TicketEditor from '../pages/LabelEditor/LabelEditor';
import PrivateRoute from '../tools/PrivateRoute';
import './App.css';

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
            <Route path='misEtiquetas' element={<MyLabels/>}/>
            <Route path='nuevoProyecto' element={<NewTicket/>}/>
            <Route path='cambiarClave' element={<ChangePassword/>}/>
          </Route>
        </Route>

        <Route path='/editarEtiqueta/:id' element={
          <PrivateRoute redirectTo="/login"/>
        }>
          <Route path='/editarEtiqueta/:id' element={<TicketEditor/>}/>
        </Route>
       
      
      </Routes>
    </Router>
  );

}

export default App;

