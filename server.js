const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
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

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // false para 587 (STARTTLS)
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // ignora certificados si hay problema
  }
});

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Tu Mini Carta Celestial ha llegado 🌟',
    text: mensaje
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar email:', error);
      res.status(500).send('Error al enviar email: ' + error.message);
    } else {
      console.log('Email enviado:', info.response);
      res.send('Mini Carta enviada! Revisa tu email.');
    }
  });
});

app.listen(process.env.PORT || 3000, () => console.log('Server on'));
