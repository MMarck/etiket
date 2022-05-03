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
          showOptions: true,
          ingTextForm: ""
        }
    }

    handleStateChange(stateName,value){
        const payload={
          stateName: stateName,
          value: value
        }
    
        this.props.replace(payload);
    }

    handleSubmitText(e){
        e.preventDefault();
        const ing=this.state.ingTextForm;
        if (ing==="") {
            alert("¡Escriba algo primero!")
        } else {
            const lines=ing.split("\n")
            const ingFinal=[]
            lines.forEach(i => {
                i=i.split(",")
                ingFinal.push({"valor":i[0],"porcentaje":i[1]})
            });
            this.handleStateChange("ingredientes",ingFinal)
            alert("Se ha procesado correctamente")
        }
    }      

    render(){
        const handleClose = () => this.setState({'show':false});
        const handleShow = () => this.setState({'show':true});

        const handleTextArea = () => this.setState({'showTextArea':!this.state.showTextArea});
        
        const handleOptions = () => this.setState({'showOptions':!this.state.showOptions});

        const handleIngText = (e) => this.setState({'ingTextForm':e});



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
                            <form id='ingText' onSubmit={(e)=>this.handleSubmitText(e)}>
                                <textarea id="ingTextArea" onChange={(e)=>handleIngText(e.target.value)} rows="4" cols="50" placeholder='Ingredientes, Porcentaje'/>
                                <button type="submit" className='darkButton-twhite' style={{width:'fit-content', height:'fit-content', fontSize:'0.8em', margin:'auto'}} onClick={handleShow}> 
                                    PROCESAR TEXTO
                                </button>
                            </form>
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