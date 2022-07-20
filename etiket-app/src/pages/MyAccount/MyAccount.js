/* eslint-disable jsx-a11y/label-has-associated-control */
import './MyAccount.css';
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { backendURL } from '../../config/constants';
import request from '../../tools/ApiSetup';

const userIcon = '../../images/icons/user.png';

/**
 * Componente para renderizar la vista de cuenta de usuario
 */
function MyAccount() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const header = {
      Authorization: `Bearer ${Cookies.get('accessToken')}`
    };
    const jsonData = { user: jwtDecode(Cookies.get('accessToken')).id };
    request
      .get(`${backendURL}UsersDB/${jsonData.user}`, jsonData, {
        headers: header
      })
      .then((res) => {
        setUser(res.data.firstName);
        setEmail(res.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="columnContainer">
      <h1 className="mb-5 fw-bold">Mi cuenta</h1>

      <div className="titled-box">
        <h4>
          <b>Mi información</b>
        </h4>
        <br />

        <div className="rounded-square">
          <div className="data-user-container">
            <label htmlFor="usuario">Nombre</label>
            <input
              className="inputText ligth-input mb-4"
              id="usuario"
              type="text"
              name="correo"
              placeholder={user}
            />

            <label htmlFor="usuario">Email</label>
            <input
              className="inputText ligth-input mb-4"
              id="usuario"
              type="text"
              name="correo"
              placeholder={email}
            />
          </div>

          <div className="d-flex  justify-content-between align-items-center w-50">
            <img src={userIcon} width="50px" height="50px" alt="imagen de usuario" />

            <div className="d-flex  flex-column justify-content-start ms-2">
              <span className="opacity-50">Foto de perfil</span>
              <span>La foto debe tener al menos 300 px x 300px y no debe pesar mas de 2 MB.</span>
              <br />

              <div className="d-flex justify-content-around">
                <button
                  type="button"
                  className="btn-secondary darkButton border-0 text-white fw-bolder p-2">
                  CARGAR FOTO
                </button>
                <button
                  type="button"
                  className="btn-danger bg-transparent border-0 text-danger fw-bolder">
                  ELIMINAR FOTO
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className=" btn-secondary darkButton fw-bolder p-2 my-4"
          style={{ width: 'fit-content' }}>
          GUARDAR CAMBIOS
        </button>
      </div>

      <div className="titled-box">
        <h4>
          <b>Detalles de mi cuenta</b>
        </h4>
        <br />

        <div className="rounded-square flex-column  px-4">
          <div className="d-flex flex-column justify-content-start mb-4">
            <span className="opacity-50">Plan</span>
            <div className="d-flex  justify-content-start align-items-center">
              <span className="m-2 me-5">GRATIS</span>

              <ChangePlanModal />
            </div>
          </div>

          <div className="d-flex justify-content-around">
            <CambiarCorreoModal />

            <Link to="/cambiarClave">
              <button
                type="button"
                className="btn-dark darkButton border-0 text-white fw-bolder p-2">
                RESETEAR CONTRASEÑA
              </button>
            </Link>

            <ConfirmacionBorrarCuentaModal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;

/**
 * componente para renderizar un modal que se usa
 * exclusivamente en el componente MyAccount
 */
function CambiarCorreoModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        type="button"
        onClick={handleShow}
        className="btn-secondary bordered bg-white text-black fw-bolder p-2">
        CAMBIAR CORREO
      </button>

      <Modal show={show} onHide={handleClose} size="md" centered style={{ fontSize: '0.8rem' }}>
        <Modal.Header closeButton style={{ border: 'none', height: '10px' }} />

        <Modal.Body>
          <div className="ms-4">
            <form className="data-user-container">
              <label htmlFor="nuevo_correo">Nuevo correo</label>
              <input
                className="inputText  ligth-input mb-4"
                id="nuevo_correo"
                type="text"
                name="correo"
                placeholder="Ingrese nuevo correo"
              />
            </form>

            <ConfirmacionCorreoModal closeParent={handleClose} />

            <br />
            <span className="opacity-50 pt-3">Verifica tu nuevo correo</span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

/**
 * componente para renderizar un modal que se usa
 * exclusivamente en el componente MyAccount
 */
function ConfirmacionCorreoModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        type="button"
        className=" btn-secondary darkButton fw-bolder p-2 mb-4"
        style={{ width: 'fit-content' }}
        onClick={() => {
          handleShow();
          /* closeParent() */
        }}>
        GUARDAR CAMBIOS
      </button>

      <Modal show={show} onHide={handleClose} size="md" centered style={{ fontSize: '0.8rem' }}>
        <Modal.Header closeButton style={{ border: 'none', height: '10px' }} />

        <Modal.Body style={{ padding: '2rem' }}>
          <div className="d-flex justify-content-center flex-column align-items-center gap-3 ms-4">
            <h5>
              <b>Correo electrónico de restablecimiento de contraseña enviado</b>
            </h5>

            <small className="opacity-50">
              Te hemos enviado un enlace para restablecer tu contraseña.¿No recibiste un correo
              electrónico? Revisa tu carpeta de correo no deseado o solicita otro enlace.
            </small>

            <Link to="/miCuenta" style={{ color: 'black' }}>
              {' '}
              Volver al restablecimiento de contraseña
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

/**
 * componente para renderizar un modal que se usa
 * exclusivamente en el componente MyAccount
 */
function ConfirmacionBorrarCuentaModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        type="button"
        onClick={handleShow}
        className="btn-danger border-0 bg-danger text-white fw-bolder p-2">
        BORRAR CUENTA
      </button>

      <Modal show={show} onHide={handleClose} size="md" centered style={{ fontSize: '0.8rem' }}>
        <Modal.Header closeButton className="bg-danger danger text-white">
          <Modal.Title>Estás seguro?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="ms-4">
            <span>
              Eliminar tu cuenta es irreversible. Procede con precaución. Al seleccionar{' '}
              <b>SÍ, ELIMINAR MI CUENTA</b> a continuación, todas las etiquetas que has diseñado y
              tus datos se perderán de por vida.
            </span>

            <Link to="/login">
              <button
                type="button"
                className="btn-danger border-0 bg-danger text-white fw-bolder p-2">
                SÍ, ELIMINAR MI CUENTA
              </button>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

/*
 *  Este componente renderiza un boton y maneja la visulizacion del modal
 *  para el cambio de plan
 */
function ChangePlanModal() {
  const [show, setShow] = useState(false);
  const [flagEmprendedorEmpresa, setFlagEmprendedorEmpresa] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        type="button"
        className="btn-success green-button fw-bolder py-1 px-3"
        style={{ width: 'fit-content', height: 'fit-content' }}
        onClick={handleShow}>
        CAMBIAR PLAN
      </button>

      <Modal
        id="ChangePlanModal"
        show={show}
        onHide={handleClose}
        size="md"
        centered
        style={{ fontSize: '0.8rem' }}>
        <Modal.Header closeButton id="Modal-header">
          <Modal.Title className="">
            <h4 style={{ fontSize: '0.7em', fontWeight: 'bold' }}>Cambio de plan</h4>
            <dd style={{ fontSize: '0.5em' }}>
              Tu plan actual es <b>Gratis por siempre</b>
            </dd>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body id="modal-body">
          <div id="rectSelectorContainer">
            <div
              role="presentation"
              id="emprendedorSqr"
              onClick={() => {
                setFlagEmprendedorEmpresa(!flagEmprendedorEmpresa);
              }}
              className={flagEmprendedorEmpresa ? 'planSelected' : 'planNotSelected'}>
              <span>Emprendedor</span>
            </div>
            <div
              role="presentation"
              id="empresasSqr"
              onClick={() => {
                setFlagEmprendedorEmpresa(!flagEmprendedorEmpresa);
              }}
              className={!flagEmprendedorEmpresa ? 'planSelected' : 'planNotSelected'}>
              <span>Empresas</span>
            </div>
          </div>

          <form className="py-4">
            {flagEmprendedorEmpresa ? (
              <>
                <RadioButton
                  planName="GRATIS"
                  title="Gratis por siempre"
                  description=""
                  group="planes"
                />
                <div className="d-flex gap-2">
                  <RadioButton
                    planName="EMPRENDEDOR_MENSUAL"
                    title="Plan Emprendedor"
                    description="$ 4/mes"
                    group="planes"
                  />
                  <RadioButton
                    planName="EMPRENDEDOR_ANUAL"
                    title="Plan Emprendedor"
                    description="$ 40/pago anual"
                    group="planes"
                  />
                </div>
              </>
            ) : (
              ''
            )}

            {!flagEmprendedorEmpresa ? (
              <>
                <RadioButton
                  planName="GRATIS"
                  title="Gratis por siempre"
                  description=""
                  group="planes"
                />
                <div className="d-flex gap-2">
                  <RadioButton
                    planName="CORPORATIVO_MENSUAL"
                    title="Plan Corporativo"
                    description="$ 9/mes"
                    group="planes"
                  />
                  <RadioButton
                    planName="CORPORATIVO_ANUAL"
                    title="Plan Corporativo"
                    description="$ 100/pago anual"
                    group="planes"
                  />
                </div>
              </>
            ) : (
              ''
            )}
          </form>

          {/* PENDIENTE PONER CAMBIO DE PLAN PARA UN USARUI */}
          <button
            type="button"
            className="darkButton fs-6"
            style={{ padding: '0.7em 1.2em', width: 'fit-content' }}>
            COMPRAR PLAN
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

/**
 * Abtraccion de la declaracion de un radio button, se hizo asi
 * para mejorar la lecuta en el componente modal
 * @param {*} param0
 * @returns
 */
function RadioButton({ group, title, description, planName }) {
  return (
    <div className="">
      <input type="radio" id={planName} name={group} value={planName} />
      <label htmlFor={planName}>
        {' '}
        <b>{title}</b> {` ${description}`}
      </label>
    </div>
  );
}
