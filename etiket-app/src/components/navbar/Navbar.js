import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {AiFillHome} from "react-icons/ai"


class Navbar extends Component{

    render(){
        return(
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 colored_border" id='navbar'>                
                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
                    <Link to="/">
                        <AiFillHome id='homeBtn'/>
                    </Link>
                    <h5> Primer paso: Escoger un tipo de plantilla </h5>
                    <i className="fa-solid fa-circle-user fa-2xl"></i>
                </div>
            </nav>
            
      )
    };
}

export default Navbar;