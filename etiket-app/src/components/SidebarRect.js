import React from 'react'
import DropdownMenu from './DropdownMenu'
import DropdownSelector from './DropdownSelector'

const SidebarRect = () => {

    const unidades=[
        {
            id: "mm",
            value: "mm",
        },
        {
            id: "cm",
            value: "cm",
        },
        {
            id: "pulg",
            value: "pulg",
        }
    ];

    return (
        <div className='d-flex flex-column ' id='sidebar'> 
            <DropdownMenu title={"Dimensiones"} content={
                <div>
                    <DropdownSelector title={"Escoje una unidad"} items={unidades}/>
                </div>
            }/>

        </div>
    )
}

export default SidebarRect