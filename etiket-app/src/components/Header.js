import {FaFacebookSquare} from "react-icons/fa"
import {RiInstagramFill} from "react-icons/ri"

const Header = () => {
  return (
    <header className="header">
        <img src="images/solinalLogo.png" alt="Solinal"/>
        <div className="scIcons">
            <a href="https://www.facebook.com/solinalcom"><FaFacebookSquare/></a>
            <a href="https://www.instagram.com/solinalcorp"><RiInstagramFill/></a>
        </div>
    </header>
  )
}

export default Header