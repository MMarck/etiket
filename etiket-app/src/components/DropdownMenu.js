import { useState } from "react";
import {BsFillCaretDownSquareFill, BsFillCaretUpSquareFill} from "react-icons/bs"

const DropdownMenu = ({title, content}) => {
    const [isOpen, setIsOpen]=useState(false);

    const toggleMenu=()=>{
        setIsOpen(!isOpen);
    }

    function Arrow(props){
        if (props.isOpen) {
            return <BsFillCaretUpSquareFill/>;
        }
        return <BsFillCaretDownSquareFill/>;
    }

    return (
        <div>
            <div id="title">
                {title}
                <p className="arrow" onClick={toggleMenu}>
                    <Arrow isOpen={isOpen}/>
                </p>
                
            </div>
            {isOpen && 
                <div id="content">
                    {content}
                </div>
            }
            

        </div>
    )
}

export default DropdownMenu