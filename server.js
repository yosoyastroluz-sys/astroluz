const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/mini-carta', (req, res) => {
  const { nombre, email, fecha, hora, lugar } = req.body;

  const mensaje = `Hola ${nombre}!  

Tu Mini Carta Celestial está en camino.  
Naciste el ${fecha} a las ${hora} en ${lugar}.  

Todo tiene su propósito.  
#TodoTieneSuPropósito

Con amor,  
Mensajera Celestial`;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: 'yosoyastroluz@gmail.com', // tu email verificado
    subject: 'Tu Mini Carta Celestial ha llegado 🌟',
    text: mensaje
  };

  sgMail.send(msg)
    .then(() => {
      console.log('Email enviado con SendGrid');
      res.send('Mini Carta enviada! Revisa tu email.');
    })
    .catch(error => {
      console.error('Error SendGrid:', error);
      res.status(500).send('Error al enviar: ' + error.message);
    });
});

app.listen(process.env.PORT || 3000, () => console.log('Server on'));
