import './TicketList.css'

export default function TicketList() {
    return (
        <div id='MisEtiquetasContainer' >

          <h2 className='mb-5'>Mis etiquetas</h2>

          {this.props.listadoEtiquetas.length >= 2?
            <div className='w-75 d-flex flex-column justify-content-center align-items-center gap-2'>
              <span className='text-danger text-center'>
                En tu cuenta gratuita solo puedes diseñar hasta 2 etiquetas.
                Sube de plan para que tengas acceso ilimitado.
              </span>

              <button className=' btn-secondary darkButton fw-bolder p-2 my-4'>
                CAMBIAR DE PLAN
              </button>
            </div>
            :''
          }


          <div id='ContenedorEtiquetas'>
            {/* el prop key es para que react evite renderizar innecesariamente al elemento cuando exista alguna actulizacion */}
            {this.props.listadoEtiquetas.map((object, index) =>  
              <div 
                key={index} 
                className='etiquetaContainer'
               /*  onClick={()=>{editCurrentTicket(index)}} */
              >
                <div className='previewEtiqueta'>
                  <img 
                  src={'imagePath(object.packageType)'}
                  alt={object.packageType}
                  width='60px'/>
                </div>
              
                <span className='flex-shrink-1'>{object.name}</span>
              </div>
            )}

            {(this.props.listadoEtiquetas.length > 0 && this.props.listadoEtiquetas.length < 2)?
              <button id='BotonMasNuevaEtiqueta' /* onClick={() => setShowPackagesTypes(true)} */>
                +
              </button>
              :''
            }

          </div>

          {this.props.listadoEtiquetas.length === 0 ?
            <span className='opacity-50'>No tienes ninguna etiqueta diseñada. Te parece si empezamos ?</span>
            :''
          }

          {this.props.listadoEtiquetas.length === 0 ?
            <button className='rounded fs-6 btn-dark' /* onClick={() => setShowPackagesTypes(true)} */>
              CREAR ETIQUETA
            </button>
            :''
          }

          

        </div>
    );
}