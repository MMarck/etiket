import { Component } from 'react';
import './GeneradorTriangular.css';
import Sidebar from '../Sidebar/Sidebar';

class GeneradorTriangular extends Component{

    render(){
        return(
            <div>
                <div className='d-flex'>
                    <Sidebar/>
                    <div className='container d-flex justify-content-center align-items-center m-0' style={{backgroundColor:'#404040'}} >
                        <h1 className='m-0' style={{'color':'#979797', 'font-family':'Bradley Hand ITC', 'fontSize':'4.5rem', 'font-weight': 'bold', 'text-align': 'center'}} >GeneradorTriangular</h1>
                    </div>
                </div>   
            </div>
      )
    };
}

export default GeneradorTriangular;