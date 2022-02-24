import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header"
import HomeBody from "./components/HomeBody"
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import SidebarRect from './components/SidebarRect';
import background_image from './assets/fondo.png';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={
          <>
            <div className="App">
              <Header />
              <HomeBody />
            </div>
          </>
        } />
        <Route path="/generador" exact element={
          <>
            <Navbar/>
            <div className='d-flex'>
              <Sidebar/>
              {/* <img src={background_image} width="200" height="200" alt='fondo con mensaje amigable'></img> */}
              <div className='container d-flex justify-content-center align-items-center m-0' style={{'background-color':'#404040'}} >
                <h1 className='m-0' style={{'color':'#979797', 'font-family':'Bradley Hand ITC', 'fontSize':'4.5rem', 'font-weight': 'bold' }} >Creemos una etiqueta <br></br> para tu producto</h1>
              </div>
            </div>          
          </>
        }/>
        <Route path='/generador-rect' exact element={
          <>
          <Navbar/>
          <div className='d-flex'>
            <SidebarRect/>
            {/* <img src={background_image} width="200" height="200" alt='fondo con mensaje amigable'></img> */}
            <div className='container d-flex justify-content-center align-items-center m-0' style={{'background-color':'#404040'}} >
              <h1 className='m-0' style={{'color':'#979797', 'font-family':'Bradley Hand ITC', 'fontSize':'4.5rem', 'font-weight': 'bold' }} >Creemos una etiqueta <br></br> para tu producto</h1>
            </div>
          </div>          
          </>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
