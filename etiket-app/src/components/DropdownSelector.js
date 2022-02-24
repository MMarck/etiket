import {useState} from 'react';
import {RiArrowDropDownLine, RiArrowDropUpLine} from "react-icons/ri"
import onClickOutside from 'react-onclickoutside';

function DropdownSelector ({title, items=[]})  {
    const[isOpen, setIsOpen] = useState(false);
    const[selection, setSelection]=useState([])
    const toggle= () => setIsOpen(!isOpen);
    DropdownSelector.handleClickOutside=() => setIsOpen(false);

    function handleOnClick(item){
        
        if (!selection.some(current=>current.id===item.id)){
            setSelection([item])
        } else {
            let selectionAfterRemoval= selection;
            selectionAfterRemoval=selectionAfterRemoval.filter(
                current=> current.id !== item.id
            );
            setSelection([... selectionAfterRemoval]);
        }
    }

    function isItemSelected(item){
        if (selection.find(current=>current.id===item.id)) {
            return true;
        }
        return false;
    }

    function getItemSelected(){
        if (selection.length === 0) {
            return {title}
        } else {
            return selection[0].value
        }
    }

    return (
        <div className='ddSelector'>
            <div tabIndex={0} className="ddHeader" role="button" 
                onClick={()=>toggle(!isOpen)}>
                <div className='ddHeaderTitle'>
                    <p className='ddHeaderTitleText'>{title}</p>
                </div>
                <div className='ddHeaderAction'>
                    <p>{isOpen ? <RiArrowDropUpLine/> : <RiArrowDropDownLine/>}</p>
                </div>
            </div>
            {isOpen && (
                <ul className='ddList'>
                    {items.map(item=>(
                        <li className='ddListName' key={item.id}>
                            <button className={isItemSelected(item)? "btnSelected":"btnNotSelected"} type='button' onClick={()=>handleOnClick(item)}>
                                <span className='itemText'>{item.value}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const clickOutsideConfig={
    handleClickOutside: () => DropdownSelector.handleClickOutside
};

export default onClickOutside(DropdownSelector, clickOutsideConfig);