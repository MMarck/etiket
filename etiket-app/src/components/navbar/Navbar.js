import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


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
        
            <div className="p-2 collapse navbar-collapse d-flex justify-content-between colored_border" id="navbarSupportedContent">
                
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
                

                <h5 id='navTitle'> {this.props.information} </h5>

                <i id='navIcon' className="fa-solid fa-circle-user "></i>

            </div>

      )
    };
}

export default Navbar;