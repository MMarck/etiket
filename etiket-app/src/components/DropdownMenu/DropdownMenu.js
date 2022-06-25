import { useState } from 'react';
import { BsFillCaretDownSquareFill, BsFillCaretUpSquareFill } from 'react-icons/bs';
import './DropdownMenu.css';

function Arrow(props) {
  if (props.isOpen) {
    return <BsFillCaretUpSquareFill />;
  }
  return <BsFillCaretDownSquareFill />;
}

function DropdownMenu({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sliderMenu">
      <div id="title">
        {title}
        <p role="presentation" className="arrow" onClick={toggleMenu}>
          <Arrow isOpen={isOpen} />
        </p>
      </div>
      {isOpen && <div id="content">{content}</div>}
    </div>
  );
}

export default DropdownMenu;
