import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import HomeBody from "./components/HomeBody";
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import GeneradorRectagular from './components/GeneradorRectangular/GeneradorRectangular';
import GeneradorBotella from './components/GeneradorBotella/GeneradorBotella';
import GeneradorTriangular from './components/GeneradorTriangular/GeneradorTriangular';
import GeneradorCircular from './components/GeneradorCircular/GeneradorCircular';


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
            <Navbar setHomeButton={true} information={'Primer paso: Escoger un tipo de plantilla'} />
            <div className='d-flex'>
              <Sidebar/>
              <div className='container d-flex justify-content-center align-items-center m-0' style={{backgroundColor:'#404040'}} >
                <h1 className='m-0' style={{'color':'#979797', 'font-family':'Bradley Hand ITC', 'fontSize':'4.5rem', 'font-weight': 'bold', 'text-align': 'center'}} >Creemos una etiqueta <br></br> para tu producto</h1>
              </div>
            </div>    
          </>
        }/>

        <Route path="/rectangular" exact element={ <GeneradorRectagular/> }/>
        <Route path="/botella" exact element={ <GeneradorBotella/> }/>
        <Route path="/triangular" exact element={ <GeneradorTriangular/> }/>
        <Route path="/circular" exact element={ <GeneradorCircular/> }/>




      </Routes>

      
    </Router>
  );
}

export default App;
