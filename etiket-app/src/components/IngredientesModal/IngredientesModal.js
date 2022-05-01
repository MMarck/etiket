import { Component } from 'react';
import { pathIcons } from '../../config/constants';
import { Modal } from 'react-bootstrap';
import { replace } from '../../reducers/etiquetaSlice'; 
import { connect } from 'react-redux';
import "./IngredientesModal.css"

class IngredientesModal extends Component{
    constructor(props){
        super(props)
        this.state={
          show: false,
          showTextArea: false,
          showFileInput: false,
          showOptions: true
        }
    }

    render(){
        const handleClose = () => this.setState({'show':false});
        const handleShow = () => this.setState({'show':true});

        const handleTextArea = () => this.setState({'showTextArea':!this.state.showTextArea});
        
        const handleOptions = () => this.setState({'showOptions':!this.state.showOptions});

        return(
            <>
                <button className='darkButton-twhite' style={{width:'fit-content', height:'fit-content', fontSize:'0.8em', margin:'auto'}} onClick={handleShow}> 
                    INGRESAR DATOS 
                </button>

                <Modal 
                id='IngredientesModal'
                show={this.state.show} 
                onHide={handleClose} 
                size="l" 
                centered 
                style={{fontSize:'0.8rem'}} 
              >
        
                <Modal.Header closeButton id='Modal-header' >
                { this.state.showTextArea &&
                    <img src={pathIcons+"back.png"} alt="Regresar" className="backBtn backBtnIng" onClick={()=>{
                        handleOptions(); 
                        handleTextArea();
                    }}/>
                        
                }
                </Modal.Header>

                <Modal.Body id='Modal-body'>
                    { (this.state.showOptions) && 
                        <div id="ingOptions">
                            <button className='darkButton-twhite' style={{width:'fit-content', height:'fit-content', fontSize:'0.8em', margin:'auto'}} onClick={()=>{
                                handleOptions(); 
                                handleTextArea();
                            }}> 
                            INGRESAR DATOS POR TEXTO 
                            </button>
                            <button className='darkButton-twhite' style={{width:'fit-content', height:'fit-content', fontSize:'0.8em', margin:'auto'}} onClick={handleShow}> 
                            INGRESAR DATOS POR ARCHIVO CSV
                            </button>
                        </div>
                    || (this.state.showTextArea) &&
                        <div>
                            <textarea id="ingTextArea"/>
                        </div>
                        
                    }
                    

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
)(IngredientesModal);