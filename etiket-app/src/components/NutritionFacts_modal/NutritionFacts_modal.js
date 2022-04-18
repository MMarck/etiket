import { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { replace } from '../../reducers/etiquetaSlice'; 
import { connect } from 'react-redux';
import NutritionFacts_form from '../NutritionFacts_form/NutritionFacts_form'
import NutritionFacts_Previewer from '../NutritionFacts_Previewer/NutritionFacts_Previewer'
import './NutritionFacts_modal.css'


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
                size="lg" 
                centered 
                style={{fontSize:'0.8rem'}} 
              >
        
                <Modal.Header closeButton id='Modal-header' >

                </Modal.Header>
        
                <Modal.Body id='Modal-body' >

                  {/* Este componebnte renderiza un fomrulario para modificar
                  los datos de la etiqueta nutricional */}
                  <NutritionFacts_form/>

                  {/* Este componente renderiza los datos procesados en una 
                  etiqueta de informacion nutricional */}
                  <NutritionFacts_Previewer/>

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