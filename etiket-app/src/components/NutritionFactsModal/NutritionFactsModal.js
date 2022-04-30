import { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { replace } from '../../reducers/etiquetaSlice'; 
import { connect } from 'react-redux';
import NutritionFactsForm from '../NutritionFactsForm/NutritionFactsForm'
import NutritionFactsPreviewer from '../NutritionFactsPreviewer/NutritionFactsPreviewer'
import './NutritionFactsModal.css'


class NutritionFacts_modal extends Component{
    
    constructor(props){
      super(props)
      this.state={
        show: false,
      }
    }
  
    
    render(){
      const handleClose = () => this.setState({'show':false});
      const handleShow = () => this.setState({'show':true});

        return (
            <>

              <button 
                className='darkButton-twhite'
                style={{width:'fit-content', height:'fit-content', fontSize:'0.8em', margin:'auto'}}
                onClick={handleShow}
              > 
                INGRESAR DATOS 
              </button>
        
        
              <Modal 
                id='NutritionFactsModal'
                show={this.state.show} 
                onHide={handleClose} 
                size="xl" 
                centered 
                style={{fontSize:'0.8rem'}} 
              >
        
                <Modal.Header closeButton id='Modal-header' >

                </Modal.Header>
        
                <Modal.Body id='Modal-body' >

                  {/* Este componebnte renderiza un fomrulario para modificar
                  los datos de la etiqueta nutricional */}
                  <NutritionFactsForm/>

                  {/* Este componente renderiza los datos procesados en una 
                  etiqueta de informacion nutricional */}
                  <div id='NutritionFactsPreviewer' className='semi-bordered-right'>

                    <p style={{ margin:'3em 2em 0em 2em'}}> 
                      <b>Este es un ejemplo de como va a quedar la tabla nutricional de tu producto </b>
                    </p>

                    <NutritionFactsPreviewer/>

                  </div>

                </Modal.Body>
        
              </Modal>
            </>
          );
    }
  
  }
  
const mapStateToProps = state => ({
  etiqueta: state.etiqueta
});
const mapDispatchToProps = () => ({ 
    replace
});

  export default connect(
    mapStateToProps,
    mapDispatchToProps()
  )(NutritionFacts_modal);