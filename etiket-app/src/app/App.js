import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
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


import { useEffect, useState } from 'react';
import { backendURL } from '../config/constants.js'
import { createBrowserHistory } from "history";
import axios from 'axios';

const history = createBrowserHistory();

function IsLoggedIn({isLoggedIn,children,redirectTo}){
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
  
}

function App() {
  const [cookies, setCookie] = useCookies(['user']);
  //cambiar por el estado global
  var [user, setUser] = useState(null);
  const [isLogged,setLogged]=useState(false)
  
  function checkLogin(){
    const header={
      "Authorization":"Bearer "+cookies.accessToken
    }
    const jsonData={}
    axios.post(backendURL+"UsersDB/auth",jsonData,{
      headers:header
    })
    .then((response)=>{
      console.log("1")
      setLogged(true)
      console.log(isLogged)
    })
    .catch((error)=>{
      console.log("2")
      console.log(error)
      setLogged(false)
    })
  }

  // Hook para lanzar codigo antes que el el render
  useEffect( () =>{
    
    checkLogin()
    console.log(isLogged)

    /*
    * Metodo para redirigir al usuario al metodo de autenticacion con google,
    * requiere el proyecto autentication ejecutandose
    */
    /*
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
        console.log(resObject.user)
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    getUser();*/
    }, []);

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
          <IsLoggedIn isLoggedIn={isLogged} redirectTo="/login">
            <Dashboard/>
          </IsLoggedIn>
        }>
          <Route index element={<WallPaperWelcome/>}/>
          <Route path='miCuenta' element={<MyAccount/>}/>
          <Route path='misEtiquetas' element={<MyTickets/>}/>
          <Route path='nuevoProyecto' element={<NewTicket/>}/>
          <Route path='crearEtiqueta' element={<CrearEtiqueta/>}/>
          <Route path='cambiarClave' element={<ChangePassword/>}/>
          <Route path='editarEtiqueta/:id' element={<TicketEditor/>}/>
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
