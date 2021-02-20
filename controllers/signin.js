const handleSignin = (req, res, db, bcrypt) => {
	const {email, password} = req.body;

	// Validation
	if (!email || !password){	// Empty data
		return res.status(400).json("Incorrect information submitted");
	}

	// Checking credentials
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		// Compare entered password with hash password stored in database
		const isValid = bcrypt.compareSync(password, data[0].hash);
		// If entered password is correct
		if (isValid){
			// Return the signed in user to frontend
			return db.select('*').from('users').where('email', '=', email)
			.then(user => {
				res.json(user[0]);
			})
			.catch(err => res.status(400).json("Unable to get user"))
		} else {
			res.status(400).json("Wrong credentials")
		}
	})
	.catch(err => res.status(400).json("Wrong credentials"))
}

module.exports = {
	handleSignin: handleSignin
}