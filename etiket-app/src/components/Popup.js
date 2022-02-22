import {FaTimes} from "react-icons/fa"
import {FaTimesCircle} from "react-icons/fa"
import {FaRegTimesCircle} from "react-icons/fa"

const Popup = ({onClick, content}) => {
  return (
    <div className="popupbox">
        <div className="box">
            <FaTimes className="close" onClick={onClick}/>
            {content}
        </div>
    </div>
  )
}

export default Popup