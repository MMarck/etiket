import { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component{

    render(){
        return(
            
          <div className='d-flex flex-column ' id='sidebar'> 

            <div href="/" className="option colored_border">
              <i class="fa-solid fa-wine-bottle"></i>
              <a>RECTANGULAR</a>
            </div>
            <div href="/" className="option colored_border">
              <i class="fa-solid fa-wine-bottle"></i>
              <a>BOTELLAS/LATAS</a>
            </div>
            <div href="/" className="option colored_border">
              <i class="fa-solid fa-wine-bottle"></i>
              <a>TRIANGULAR</a>
            </div>
            <div href="/" className="option colored_border">
              <i class="fa-solid fa-wine-bottle"></i>
              <a>CIRCULAR</a>
            </div>

          </div>
             
      )
    };
}

export default Sidebar;