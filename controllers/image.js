const Clarifai = require('Clarifai');

// Clarifai API key
const app = new Clarifai.App({
  apiKey: '3e5043d2edb348e685c39538f2e35a81'
});

// Call Clarifai API
const handleAPICall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json("Unable to call API"))
}

// Increase entries
const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)	// Increase entries by 1
	.returning('entries')
	.then(entries => {			// Return number of entries to frontend
		res.json(entries[0]);	
	})
	.catch(err => res.status(400).json("Unable to get entries"))
}

module.exports = {
	handleImage: handleImage,
	handleAPICall: handleAPICall
}
