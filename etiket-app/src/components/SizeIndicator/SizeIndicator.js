import './SizeIndicator.css';

/**
 * Este componente dibujar una regla que se ajusta al
 * tamaño de su contenedor
 */
function SizeIndicator({ length, orientation, visibilityProp, fontSize }) {
  const newLength = length || '100mm';
  const newOrientation = orientation || 'horizontal';
  const newVisibilityProp = visibilityProp || 'visible';
  const newFontSize = fontSize || '1em';

  if (newOrientation === 'horizontal') {
    return (
      <div
        className="sizeIndicatorWapper horizontalIndicator"
        style={{ visibility: newVisibilityProp, width: newLength }}>
        <div
          className="px-2"
          style={{
            display: 'inline-block',
            position: 'relative',
            zIndex: '2',
            color: 'gray',
            fontSize: newFontSize
          }}>
          {newLength}
        </div>
        <div
          className="line"
          style={{
            position: 'relative',
            top: '-20px',
            width: newLength,
            height: '2px',
            backgroundColor: 'gray'
          }}
        />
      </div>
    );
  }

  if (newOrientation === 'vertical') {
    return (
      <div
        className="sizeIndicatorWapper verticalIndicator"
        style={{
          visibility: newVisibilityProp,
          width: '2px',
          height: newLength,
          margin: '0px 18px',
          backgroundColor: 'gray'
        }}>
        <div
          className="px-2"
          style={{
            position: 'relative',
            right: '10px',
            zIndex: '2',
            color: 'gray',
            transform: 'rotate(-90deg)',
            fontSize: newFontSize
          }}>
          {newLength}
        </div>
      </div>
    );
  }
}

export default SizeIndicator;
