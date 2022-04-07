/*
 * Componente para dibujar la parte DELANTERA de la etiqueta rectangular
*/
function SizeIndicator ({length, orientation, visibilityProp}){
    length = length? length:'100mm';
    orientation = orientation? orientation:'horizontal';
    visibilityProp = visibilityProp? visibilityProp:'visible';

    if(orientation === 'horizontal'){
        return(
            <div  className=' d-inline-block text-center my-2' style={{visibility:visibilityProp}}>
                <div className='px-2' style={{display: 'inline-block', position: 'relative', zIndex: '2', color: 'gray',}} >{length}</div>
                <div className='line' style={{position: 'relative', top: '-20px', width: length, height: '2px', backgroundColor: 'gray'}}/>
            </div>
        )
    }

    if(orientation === 'vertical'){
        return(
            <div  className='d-flex align-items-center justify-content-center' 
            style={{width: '2px', height: length, margin:'0px 18px', backgroundColor: 'gray', transform: 'translateY(12px)'}}>
                <div className='px-2' style={{ position: 'relative',right:'10px',  zIndex: '2', color: 'gray', transform: 'rotate(-90deg)'}} >
                    {length}
                </div>
            </div>

            
        )
    }


}

export default SizeIndicator;