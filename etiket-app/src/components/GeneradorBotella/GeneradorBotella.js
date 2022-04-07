import { Component } from 'react';
import './GeneradorBotella.css';
import Sidebar from '../Sidebar/Sidebar';

class GeneradorBotella extends Component{

    render(){
        return(
            <div>
                <div className='d-flex'>
                    <Sidebar/>
                    <div className='container d-flex justify-content-center align-items-center m-0' style={{backgroundColor:'#404040'}} >
                        <div className='mx-4' style={{backgroundColor:'white', height:'100mm', width:'200mm'}}></div>
                    </div>
                </div>   
            </div>
      )
    };
}

export default GeneradorBotella;