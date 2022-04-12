import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
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


import { useEffect, useState } from 'react';

function App() {
  //cambiar por el estado global
  var [user, setUser] = useState(null);

  // Hook para lanzar codigo antes que el el render
  useEffect( () =>{
    /*
    * Metodo para redirigir al usuario al metodo de autenticacion con google,
    * requiere el proyecto autentication ejecutandose
    */
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "aplication/json",
          "Content-Type": "aplication/json",
          "Access-control-Allow-Credentials": true,
        }
      })
      .then( response =>{
        if( response.status === 200 ) return response.json();
        throw new Error("La autenticacion ha fallado");
      })
      .then(resObject => {
        setUser(resObject.user)
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    getUser();
    }, []);

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
      {user?
        <Route path="/" element={user? <Dashboard/>: <Navigate to='/login'/>}>
          <Route index element={<WallPaperWelcome/>}/>
          <Route path='miCuenta' element={<MyAccount/>}/>
          <Route path='misEtiquetas' element={<MyTickets/>}/>
          <Route path='nuevoProyecto' element={<NewTicket/>}/>
          <Route path='crearEtiqueta' element={<CrearEtiqueta/>}/>
          <Route path='cambiarClave' element={<ChangePassword/>}/>
        </Route>
      :''} 
      
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