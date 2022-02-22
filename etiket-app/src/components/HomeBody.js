import Button from "./Button"

function HomeBody() {
  return (
    <div className='homebody'>
        <h1>GENERADOR DE PLANTILLAS DE TABLA NUTRICIONAL</h1>
        <div id="lrlabels">
            <div className='login'>
                <h3>¡Inicia sesión para empezar!</h3>
                <Button text="INICIAR SESIÓN" />
            </div>
            <div className="register">
                <h3>¿No tienes cuenta? ¡Regístrate ahora!</h3>
                <Button text="REGISTRARTE" />
            </div>
        </div>
    </div>
  )
}

export default HomeBody