import { useState } from 'react';
import { BsFillCaretDownSquareFill, BsFillCaretUpSquareFill } from 'react-icons/bs';
import './DropdownMenu.css';

const DropdownMenu = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function Arrow(props) {
    if (props.isOpen) {
      return <BsFillCaretUpSquareFill />;
    }
    return <BsFillCaretDownSquareFill />;
  }

  return (
    <div className="sliderMenu">
      <div id="title">
        {title}
        <p className="arrow" onClick={toggleMenu}>
          <Arrow isOpen={isOpen} />
        </p>
      </div>
      {isOpen && <div id="content">{content}</div>}
    </div>
  );
};

export default DropdownMenu;
