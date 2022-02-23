import './App.css';
import Header from "./components/Header"
import HomeBody from "./components/HomeBody"
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import background_image from './assets/fondo.png';


function App() {

  return (
    <div className="App">
      <Header />
      <HomeBody />

      <Navbar/>
      <div className='d-flex'>

        <Sidebar/>

        {/* <img src={background_image} width="200" height="200" alt='fondo con mensaje amigable'></img> */}
        <div className='container d-flex justify-content-center align-items-center m-0' style={{'background-color':'#404040'}} >
          <h1 className='m-0' style={{'color':'#979797', 'font-family':'Bradley Hand ITC', 'fontSize':'4.5rem', 'font-weight': 'bold' }} >Creemos una etiqueta <br></br> para tu producto</h1>
        </div>
        
        

        </div>
    </div>
  );
}

export default App;
