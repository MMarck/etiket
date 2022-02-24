import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {AiFillHome} from "react-icons/ai"


function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
  }
class Navbar extends Component{

    constructor(props){
        super(props);
        this.state = {
            message: this.props.information,
            homeButton: this.props.setHomeButton,
            backButton: this.props.setBackButton
        }
    }



    render(){

        return(
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 colored_border" id='navbar'>                
                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">

                    

                    {this.state.homeButton? 
                        <Link to="/">
                            <button> HOME </button>
                        </Link>
                    : ''}

                    {this.state.backButton? 
                        <Link to="/generador">
                            <button> Regresar </button>
                        </Link>
                    : ''}
                    

                    <h5> {this.props.information} </h5>

                    <i className="fa-solid fa-circle-user fa-2xl"></i>

                </div>
            </nav>
            
      )
    };
}

export default Navbar;