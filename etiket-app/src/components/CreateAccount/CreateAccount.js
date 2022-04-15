
import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../../tools/withRouter";
import "./CreateAccount.css";


const backend="http://localhost:3002/"

class CreateAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password:"",
      nombre: "",
      apellido:""
    };
  }

  handleChange(event,state){
    this.setState({[state]:event.target.value})
  }

  register(e){
    e.preventDefault();
    if (this.state.email==="" || this.state.password==="" || this.state.nombre==="" || this.state.apellido==="") {
      alert("Hay campos vacíos")
    } else {
      const jsonData={
        email: this.state.email,
        password: this.state.password,
        nombre: this.state.nombre + " " + this.state.apellido
      }
      fetch(backend+"UsersDB",{
        method:"POST",
        mode:"cors",
        headers: { Accept: 'application/json',
          'Content-Type': 'application/json'},
        body: JSON.stringify(jsonData)
      })
      .then(response => {
        if (response.ok) {
          alert("Se ha creado el usuario")
          this.props.navigate("/login")
        } else {
          response.json()
          .then(data=>alert(data.error.message ));
        }
        })
      

    }
  }

  render(){
    return (
      <div className="d-flex flex-column w-50 small">
          
          <span id="avisoDeIngreso"><b>Creación de usuario</b> </span>
          <p><b>Únete, es gratis</b></p>
          
          <form id="LoginForm" className="w-100" onSubmit={(e)=>this.register(e)}>
              <label htmlFor="email">Correo</label><br/>
              <input value={this.state.email} onChange={(e)=>this.handleChange(e,"email")} className="inputText  mb-4" id="usuario" type="text" name="correo" placeholder="Ingrese su correo"/>

              <label htmlFor="password">Contraseña</label><br/>
              <input value={this.state.password} onChange={(e)=>this.handleChange(e,"password")} className="inputText mb-4" type="password" id="password" name="password" placeholder="Ingrese su contraseña"/>

              <div className="d-flex justify-content-center gap-2">
                  <div className="d-flex flex-column">
                      <label htmlFor="usuario">Nombre</label>
                      <input value={this.state.nombre} onChange={(e)=>this.handleChange(e,"nombre")} className="inputText  mb-4" id="nombre" type="text" name="correo" placeholder="Ingrese su nombre"/>
                  </div>

                  <div className="d-flex flex-column ">
                      <label htmlFor="usuario">Apellido</label>
                      <input value={this.state.apellido} onChange={(e)=>this.handleChange(e,"apellido")} className="inputText  mb-4" id="apellido" type="text" name="correo" placeholder="Ingrese su apellido"/>
                  </div>
              </div>

              <br/>
              <button type="submit" className="ligthButton w-100">Crear Usuario</button>

              <br/><br/>
              <Link  to='/' className="w-100">
                <button className='btn-dark darkButton'>Cancelar</button>
              </Link> 
          </form>



          <hr/>

          

          <div className='signupButton google mx-auto mt-2 small'>
            <span className="icon"></span>
            <span>Inicia sesion con Google</span>
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
}

export default withRouter(CreateAccount)