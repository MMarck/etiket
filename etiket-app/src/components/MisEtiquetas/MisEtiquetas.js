import { Link} from 'react-router-dom';

function MisEtiquetas(){
    return(
      <>
        <h2>Mis etiquetas</h2>

        <span>No tienes ninguna etiqueta diseñada. Te parece si empezamos ?</span>

        <Link  to='/dashboard/CrearEtiqueta'>
          <button className='btn btn-dark'>CREAR ETIQUETA</button>
        </Link>
      </>
    );
  }

export default MisEtiquetas;