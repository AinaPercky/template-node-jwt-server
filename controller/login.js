const User = require('../models/User');
const tokenizer = require('../utils/tokenizer');

const loggedUser = async (req, res) => {
	const { username, password } = req.body;
	try {
		const userExist = await User.findOne({ username: username });
		if (!userExist) {
			return res.status(400).json({ message: 'Utilisateur non trouvé' });
		}
		if (password == userExist.password) {
			console.log();
			const usrtok = {
				id: userExist._id,
				username: userExist.username,
				password: userExist.password,
			};
			const token = await tokenizer(usrtok);
			return res.json({ token });
		} else {
			return res.status(400).json({ message: 'Mot de passe incorrect' });
		}
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	loggedUser,
};
