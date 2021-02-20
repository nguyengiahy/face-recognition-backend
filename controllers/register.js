const handleRegister = (req, res, db, bcrypt) => {
	const {name, email, password} = req.body;

	// Validation
	if (!email || !name || !password){	// Empty data
		return res.status(400).json("Incorrect information submitted");
	}

	// Hashing password synchronously 
	const hash = bcrypt.hashSync(password);

	// Use transaction to guarantee the consistency between login and users tables
	db.transaction(trx => {
		// Insert data into 'login' table
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			// Insert data into 'users' table
			return trx.insert({		// Need return because .then is a promise, only works if a value is returned
				email: loginEmail[0],
				name: name,
				joined: new Date()
			})
			.into('users')
			.returning('*')
			.then(user => {		// Return response to frontend
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('Unable to register'))
}

module.exports = {
	handleRegister: handleRegister
};