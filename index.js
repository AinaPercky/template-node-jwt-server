const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const dataLogin = require('./utils/dataLogin');
const authenticateJWT = require('./middleware/authenticate');
dotenv.config();
const app = express();

// Middleware
app.use(
	cors({
		origin: 'http://localhost:5173',
	})
);
app.use(bodyParser.json());

// Clé secrète pour signer le JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Route de connexion
app.post('/login', (req, res) => {
	const { username, password } = req.body;

	const user = dataLogin.find(
		(u) => u.username === username && u.password === password
	);
	if (!user) {
		return res
			.status(400)
			.json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
	}

	// Créer un token JWT
	const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

	res.json({ token });
});

app.get('/protected', authenticateJWT, (req, res) => {
	// const token=req.headers['authorization'].split(' ')[1];
	console.log(req.user);
});

// Lancer le serveur
app.listen(3000, () => {
	console.log('Serveur lancé sur le port 3000');
});
