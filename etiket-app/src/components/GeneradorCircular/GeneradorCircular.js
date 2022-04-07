import { Component } from 'react';
import './GeneradorCircular.css';
import Sidebar from '../Sidebar/Sidebar';

class GeneradorCircular extends Component{

    render(){
        return(
            <div>
                <div className='d-flex'>
                    <Sidebar/>
                    <div className='container d-flex justify-content-center align-items-center m-0' style={{backgroundColor:'#404040'}} >
                        <div className='mx-4' style={{backgroundColor:'white', height:'100mm', width:'100mm', 'border-radius': '50%'}}></div>
                    </div>
                </div>   
            </div>
      )
    };
}

export default GeneradorCircular;