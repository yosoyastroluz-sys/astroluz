const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/mini-carta', (req, res) => {
  const { nombre, email, fecha, hora, lugar } = req.body;
  console.log('Nuevo envío:', { nombre, email, fecha, hora, lugar });
  res.send('Mini Carta enviada! Revisa tu email pronto.');
});

app.listen(process.env.PORT || 3000, () => console.log('Server on'));
