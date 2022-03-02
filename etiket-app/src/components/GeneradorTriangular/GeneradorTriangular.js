import { Component } from 'react';
import './GeneradorTriangular.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

class GeneradorTriangular extends Component{

    render(){
        return(
            <div>
                <Navbar setBackButton={true} information={'Segundo paso: Rellenar información'} />
                <div className='d-flex'>
                    <Sidebar/>
                    <div className='container d-flex justify-content-center align-items-center m-0' style={{backgroundColor:'#404040'}} >
                        <h1 className='m-0' style={{color:'#979797', fontFamily:'Bradley Hand ITC', fontSize:'4.5rem', fontWeight: 'bold', textAlign: 'center'}} >GeneradorTriangular</h1>
                    </div>
                </div>   
            </div>
      )
    };
}

export default GeneradorTriangular;