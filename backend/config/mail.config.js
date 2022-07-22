const nodemailer = require('nodemailer');

const mail={
    user:'solinartest@gmail.com',
    //info@solinal.org
    pass: 'uvgfjkhciuasxgcd'
}

let transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    //mail.solinal.org
    port:465,
    secure: true,
    auth : {
        user: mail.user,
        pass: mail.pass
    },
});

//se envia verificacion de email para el usuario

const sendEmail = async(email,subject,html) =>{
    try{
        await transporter.sendMail({
            from : `Verify your email <${ mail.user }>`,
            to: email,
            subject: subject,
            html:html
        });
    }catch (error) {
        console.log('Algo no va bien con el email', error);
    }      
}

const getTemplate = (name, id,host,token) => {
    return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="https://imgur.com/3fxv4JY" alt="solinal">
          <h2>Hola ${ name }</h2>
          <p>Estamos contentos de que te hayas registrado en Solinal. 
           Para comenzar a explorar y crear etiquetas, confirme su dirección de correo electrónico.</p>


          <a href="http://${host}/UsersDB/${id}/verify/${token}"><button style="background:#3630a3;color:white;">Confirmar Cuenta</button></a>
          <h3> Bienvenido a Solinal!</h3>
          <h3> El equipo de Solinal</h3>
          <p> </p>
          <p> </p>
          <p>Este enlace caducará en 48 horas</p>
      </div>
    `;
}

module.exports = {
  sendEmail,
  getTemplate
}