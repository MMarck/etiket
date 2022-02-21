import './App.css';
import Navbar from './components/navbar/Navbar';
import background_image from './assets/fondo.png'


function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className='d-flex'>

        <nav className='d-flex flex-column colored_border'> 
          <a href="/" className="list-group-item list-group-item-action colored_border">
            <i class="fa-solid fa-wine-bottle"></i><br></br>RECTANGULAR
          </a>
          <a href="/" className="list-group-item list-group-item-action colored_border">
            <i class="fa-solid fa-wine-bottle"></i><br></br>BOTELLAS/LATAS
          </a>
          <a href="/" className="list-group-item list-group-item-action colored_border">
            <i class="fa-solid fa-wine-bottle"></i><br></br>TRIANGULAR
          </a>
          <a href="/" className="list-group-item list-group-item-action colored_border">
            <i class="fa-solid fa-wine-bottle"></i><br></br>CIRCULAR
          </a>
        </nav>

        <img src={background_image} width="1200" height="600" alt='fondo con mensaje amigable'></img>
        
        </div>
    </div>
  );
}

export default App;
