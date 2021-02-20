const express = require('express');
const bcrypt = require('bcrypt-nodejs');	// bcrypt for password hashing
const cors = require('cors');	// cors for fetching data from backend
const knex = require('knex');	// knex for connecting database
const app = express();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

app.use(express.json());
app.use(cors());

// Knex initializing
const db = knex({
  client: 'pg',			
  connection: {
    host : '127.0.0.1',				// localhost
    user : 'postgres',				// Name of database owner
    password : 'giahy2911',			// Database password
    database : 'face_recognition'	// Database name
  }
});

// Signin post request
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

// Register post request
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

// Get profile request
app.get('/profile/:id', (req, res) => {profile.handleGettingProfile(req, res, db)});

// Update how many times a user submits image URL (entries)
app.put('/image', (req, res) => {image.handleImage(req, res, db)});

// Post request to call Clarifai API
app.post('/imageurl', (req, res) => {image.handleAPICall(req, res)})

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`);
});
