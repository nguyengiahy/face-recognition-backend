const handleGettingProfile = (req, res, db) => {
	const {id} = req.params;	// params are information attached at the end of the request URL)
	db.select('*').from('users').where({	// select from 'users' table where id = id
		id: id
	})
		.then(user => {			// user responsed, send it to frontend 
			if (user.length)	// user found
				res.json(user[0]);
			else				// user not found
				res.status(400).json("Not found")
		})
		.catch(err => {
			res.status(400).json("Unable to get profile")
		})
}

module.exports = {
	handleGettingProfile: handleGettingProfile
}
