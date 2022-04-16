
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./LoginForm.css";

const LoginForm = () => {

  const backendURL = "http://localhost:3000";
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const refreshToken = async () => {
    try {
      const res = await axios.post("/refresh", { token: user.refreshToken });
      setUser({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendURL + "/UsersDB/login", { 'email': email, 'password':password });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    setSuccess(false);
    setError(false);
    try {
      await axiosJWT.delete("/users/" + id, {
        headers: { authorization: "Bearer " + user.accessToken },
      });
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };



  const google = ()=>{
    window.open("http://localhost:5000/auth/google", "_self")
  }


  return (
    <div className="d-flex flex-column w-50 small">
        
        <span id="avisoDeIngreso"><b>Ingresa a Solinal</b> Etiqueta</span>
        <button onClick={()=>{console.log(user)}} >ver usuario</button>
        <form id="LoginForm" className="w-100">
            <label htmlFor="usuario">Usuario</label><br/>
            <input className="inputText  mb-4" id="usuario" type="text" name="correo" placeholder="Ingrese su usuario" onChange={(e)=>{setEmail(e.target.value)}}/>

            <br/>
            <label htmlFor="password">Contraseña</label><br/>
            <input className="inputText mb-4" type="password" id="password" name="password" placeholder="Ingrese su contraseña" onChange={(e)=>{setPassword(e.target.value)}}/>

            <br/>
            
              <button className="ligthButton" onClick={handleSubmit}>Iniciar sesión</button>
            

        </form>

        <br/>       
        <Link to="/login/resetPassword" className="w-100">
          <button className="btn-dark darkButton w-100">¿Olvidé mi contraseña?</button>
        </Link>

        <hr/>

        <Link to="/login/createAccount" className="w-100">
          <button className="ligthButton w-100">Crear Usuario</button>
        </Link>

        <div className='signupButton google mx-auto mt-2 small'>
          <span className="icon"></span>
          <span onClick={google}>Inicia sesion con Google</span>

        </div> 

        <div className='signupButton facebook mx-auto mt-2 small'>
          <span className="icon"></span>
          <span>Inicia sesion con Facebook</span>
        </div>

        <hr/>

        <small>© Copyright Solinal 2021</small>

    </div>
  )
}

export default LoginForm