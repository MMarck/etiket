import { Component } from 'react';
import './GeneradorRectangular.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import TicketEditor from '../TicketEditor/TicketEditor';


const pathIcons = '../images/icons/';
class GeneradorRectangular extends Component{
    

    constructor(props){
        super(props);
        this.state = {
            
        };

    }

    
    render(){
        
        

        return(
            <div className='d-flex h-100 w-100'>
                <Sidebar isDisabled={false}/>
                <Link to={"/misEtiquetas"}>
                    <img src={pathIcons+"back.png"} alt="Regresar" className="backBtn"/>
                </Link>
                <div className='w-100 h-100'>
                    <TicketEditor />
                </div>
                
            </div>
      )
    };
}

export default GeneradorRectangular;