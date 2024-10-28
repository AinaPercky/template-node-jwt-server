const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const tokenizer = async (dataToBeCrypt) => {
	const token = await jwt.sign(dataToBeCrypt, JWT_SECRET, { expiresIn: '1h' });
	return token;
};

module.exports = tokenizer;
