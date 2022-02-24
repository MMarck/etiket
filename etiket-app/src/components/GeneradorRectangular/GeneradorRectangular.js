import { Component } from 'react';
import './GeneradorRectangular.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import SidebarRect from '../SidebarRect';

class GeneradorRectangular extends Component{

    render(){
        return(
            <div>
                <Navbar setBackButton={true} information={'Segundo paso: Rellenar información'} />
                <div className='d-flex'>
                    <SidebarRect/>
                    <div className='container d-flex justify-content-center align-items-center m-0' style={{'background-color':'#404040'}} >
                        <div className='mx-4' style={{'background-color':'white', height:'100mm', width:'100mm'}}></div>
                        <div className='mx-4' style={{'background-color':'white', height:'100mm', width:'100mm'}}></div>
                    </div>
                </div>   
            </div>
      )
    };
}

export default GeneradorRectangular;