import './CustomCheckbox.css';
import { useState } from 'react';
import { animated, useSpring, config } from 'react-spring';

function CustomCheckbox(props) {
  const [isChecked, setIsChecked] = useState(props.isChecked);
  const [checkmarkLength, setCheckmarkLength] = useState(null);

  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? '#404040' : '#fff',
    borderColor: isChecked ? '#404040' : '#ddd',
    config: config.gentle
  });

  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength
  });

  return (
    <label style={{ cursor: 'pointer' }}>
      <input
        className="InputCheckbox"
        type="checkbox"
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      <animated.svg
        style={checkboxAnimationStyle}
        className={`checkbox ${isChecked ? 'checkbox--active' : ''}`}
        // This element is purely decorative so
        // we hide it for screen readers
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none">
        <animated.path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke="#fff"
          strokeDasharray={checkmarkLength}
          strokeDashoffset={checkmarkAnimationStyle.x}
          ref={(ref) => {
            if (ref) {
              setCheckmarkLength(ref.getTotalLength());
            }
          }}
        />
      </animated.svg>
    </label>
  );
}

export default CustomCheckbox;
