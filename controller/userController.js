const User = require('../models/User');

const createUser = async (req, res) => {
	const { username, password } = req.body;
	try {
		const newUser = await User.create({ username, password });
		return res.status(200).send({message:"user create successfuly",newUser});
	} catch (error) {
		console.error(error);
	}
};

const getAllUser=async(req,res)=>{
	try {
		let gg = await User.find()
		return res.status(200).send(gg);
	} catch (error) {
		console.error(error)
	}
	
}



module.exports = {
	createUser,getAllUser
};
