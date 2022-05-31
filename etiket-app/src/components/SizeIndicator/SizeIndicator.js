import './SizeIndicator.css'


/**
 * Este componente dibujar una regla que se ajusta al 
 * tamaño de su contenedor
 */
function SizeIndicator ({length, orientation, visibilityProp, font_size}){
    length = length? length:'100mm';
    orientation = orientation? orientation:'horizontal';
    visibilityProp = visibilityProp? visibilityProp:'visible';
    font_size = font_size? font_size:'1em';

    if(orientation === 'horizontal'){
        return(
            <div  
                className='sizeIndicatorWapper horizontalIndicator' 
                style={{visibility:visibilityProp,  width: length}}
            >
                <div className='px-2' style={{display: 'inline-block', position: 'relative', zIndex: '2', color: 'gray', fontSize: font_size}} >{length}</div>
                <div className='line' style={{position: 'relative', top: '-20px', width: length, height: '2px', backgroundColor: 'gray'}}/>
            </div>
        )
    }

    if(orientation === 'vertical'){
        return(
            <div  className='sizeIndicatorWapper verticalIndicator' 
            style={{visibility:visibilityProp, width: '2px', height: length, margin:'0px 18px', backgroundColor: 'gray'}}>
                <div className='px-2' style={{ position: 'relative',right:'10px',  zIndex: '2', color: 'gray', transform: 'rotate(-90deg)', fontSize: font_size}} >
                    {length}
                </div>
            </div>    
        )
    }


}

export default SizeIndicator;