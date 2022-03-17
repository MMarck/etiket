import Select from 'react-select';
import "./Ingrediente.css";
import { Component } from 'react';
import {FaTimes} from "react-icons/fa"
import {AiOutlinePlusCircle} from "react-icons/ai"


const unidadesMasa=[
    {
        value: "g",
        label: "g",
    },
    {
        value: "kg",
        label: "kg",
    },
    {
        value: "ml",
        label: "ml",
    },
    {
        value: "l",
        label: "l"
    }
];

const ddStyle={
    option: (provided, state)=>({
        ...provided,
        backgroundColor: state.isSelected ? '#1ED796':state.isFocused && "#1dd79633",
        color: "#404040",
        cursor: "Pointer",
    }),
    menuList: (provided, state) =>({
        ...provided,
        border: "2px solid #1ED796",
        borderRadius: "8px",
    }),
    control: (state) =>({
        border: "2px solid #1ED796",
        display: "flex",
        cursor: "Pointer",
        minWidth: "none",
        width: "100%",
        borderRadius: "8px",
    }),
    dropdownIndicator: (provided, state)=>({
        ...provided,
        "&:hover":{
            color: "#1ED796"
        }
    }),
    menu: (provided, state)=>({
        ...provided,
        borderRadius: "8px",
    })
};

class Ingrediente extends Component{

    constructor(){
        super();
        this.state={
            addElements:[{}]
        };
        
    }

    addIngredientes(){
        this.setState((
            {
                addElements:[...this.state.addElements,{}]
            }
        ))
    }
    delIngredientes(i){
        this.state.addElements.splice(i,1);
        this.setState({})
    }

    render(){
        return(
            <div className='gRContent'>
                <label htmlFor="ingredientes" className="col-sm-2 col-form-label">Ingredientes</label>
                {this.state.addElements.map((index)=>(
                    <div className='subgRContent'>
                        <input name='ingredientes' type="text" onChange={this.updateStateVariable} className="form-control gRInputIng" id="ingredientes"/>
                        <input name='unidadIng' type="text" className="form-control gRInputIng numberInputIng" id="unidadIng"/>
                        <Select className='ddMenu' styles={ddStyle} options={unidadesMasa} defaultValue={{ label: "g", value: "g" }} />
                        { index ? <FaTimes onClick={()=>this.delIngredientes(index)} className="closeIng"/> : null }
                        
                    </div>
                ))}
                
                <AiOutlinePlusCircle onClick={()=> this.addIngredientes()} className='addBtn'/>
            </div>
        )
    }
}

export default Ingrediente