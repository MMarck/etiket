import { Component } from 'react';
import './Sidebar.css';
import {Link } from 'react-router-dom';


class Sidebar extends Component{

    render(){
      return (

                <div className='d-flex flex-column sidebar-dark' id='sidebar'> 

                  <div className="option colored_border">
                    <i className="fa-solid fa-wine-bottle"></i>
                    <Link to='/rectangular'>RECTANGULAR</Link>
                  </div>
                  <div className="option colored_border">
                    <i className="fa-solid fa-wine-bottle"></i>
                    <Link to="/botella">BOTELLAS/LATAS</Link>
                  </div>
                  <div className="option colored_border">
                    <i className="fa-solid fa-wine-bottle"></i>
                    <Link to='/triangular'>TRIANGULAR</Link>
                  </div>
                  <div className="option colored_border">
                    <i className="fa-solid fa-wine-bottle"></i>
                    <Link to='/circular'>CIRCULAR</Link>
                  </div>

                </div>

        
      );

    };
}

export default Sidebar;