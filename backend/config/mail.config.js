const nodemailer = require('nodemailer');

const mail={
    user:'solinartest@gmail.com',
    pass: 'uvgfjkhciuasxgcd'
}

let transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
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

const getTemplate = (name, host,token) => {
    return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="../../etiket-app/public/images/solinalLogo.png" alt="">
          <h2>Hola ${ name }</h2>
          <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
          <a
              href="http:// ${ host }/user/confirm/${ token }"
              target="_blank"
          >Confirmar Cuenta</a>
      </div>
    `;
}

module.exports = {
  sendEmail,
  getTemplate
}