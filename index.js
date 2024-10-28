const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authenticateJWT = require('./middleware/authenticate');
const mongoose = require('mongoose');
const userRoutes = require('./router/user.routes');
const loginRoutes = require('./router/user.login');
const app = express();
dotenv.config();

app.use(
	cors({
		origin: 'http://localhost:5173',
	})
);
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/login', loginRoutes);

app.use(express.json());

app.get('/protected', authenticateJWT, (req, res) => {
	console.log(req.user);
});

mongoose
	.connect('mongodb://127.0.0.1:27017/portfolio')
	.then(() => {
		console.log('Connexion à MongoDB réussie');
		app.listen(3000, () => {
			console.log('Serveur lancé sur le port 3000');
		});
	})
	.catch((error) => console.error('Erreur de connexion à MongoDB:', error));
