/*
<!-- A3-->
<!-- Neelendra Mishra-->
<!-- Student ID 40224310-->
<!-- SOEN 287 WEB PROGRAMMING -->
*/

//                                                              --- START OF THE CODE ---

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// Setting up the view engines and ejs files
app.set('view engine', 'ejs');


// Setting up the static folder
app.use(express.static(path.join(__dirname, 'public')));

// Creating middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));

// Creating a Session middleware
app.use(
  session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: false,
  })
);

// Creating Middleware to add the current date and time
app.use((req, res, next) => {
  res.locals.currentDateTime = new Date().toLocaleString();
  res.locals.user = req.session.user || null; // Add user session info to locals
  next();
});

// creating Middleware to verify user authentication
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
}

// Setting up the Routes
app.get('/', (req, res) => res.render('home'));
app.get('/pets', (req, res) => res.render('pets'));
app.get('/find', (req, res) => res.render('find'));
app.get('/dog', (req, res) => res.render('dog'));
app.get('/cat', (req, res) => res.render('cat'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/disclaimer', (req, res) => res.render('disclaimer'));
app.get('/register', (req, res) => res.render('register', { errorMessage: '', successMessage: '' }));
app.get('/login', (req, res) => res.render('login', { errorMessage: '' }));

// Implement the isAuthenticated middleware on routes that require user login.
app.get('/give', isAuthenticated, (req, res) => res.render('give'));

// Setting up the Register Route
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  
  // Checking for the existing user
  fs.readFile(path.join(__dirname, 'data', 'login.txt'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).render('register', {
        errorMessage: 'Server error. Please check and try again later.',
        successMessage: '',
      });
    }

    const users = data.split('\n');
    const UserAlreadyRegistered = users.find((user) => user.split(':')[0] === username);

    if (UserAlreadyRegistered) {
      return res.render('register', {
        errorMessage: 'Username is not available. Please choose another username.',
        successMessage: '',
      });
    }

    // Adding new users to data/login.txt file
    const createUser = `${username}:${password}\n`;
    fs.appendFile(path.join(__dirname, 'data', 'login.txt'), createUser, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).render('register', {
          errorMessage: 'Server error. Please try again later.',
          successMessage: '',
        });
      }
      res.render('register', {
        errorMessage: '',
        successMessage: 'Registration successful! Continue with login process!.',
      });
    });
  });
});


// Setting up the Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const userDetails = `${username}:${password}`;


  // creaing a method for Read data/login.txt and check for credentials

  fs.readFile(path.join(__dirname, 'data', 'login.txt'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).render('login', { errorMessage: "Server error. Please try again later." });
    }
    const users = data.split('\n');
    if (users.includes(userDetails)) {
      req.session.user = username; 
      res.redirect('/give'); 
    } else {
      res.status(401).render('login', { errorMessage: "Invalid username or password. Please try again." });
    }
  });
});



//Creating logout routes

app.get('/logout', (req,res) =>{
  req.session.destroy(err =>{
    if (err) {
      console.log(err);
      return res.status(500).send('Cannot Log you out');
    }
    res.send('You have been successfull loggout. Login to continue')
  })
});



// Creating Pet Registration

app.post('/register_pet', isAuthenticated, (req, res) => {
  const { petType, breed, age, gender, notes, measures, nameuser, pass } = req.body;


  // Retrieving the current pet data to determine the next available ID

  fs.readFile(path.join(__dirname, 'data', 'pets.txt'), 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Error reading pets file:', err);
      return res.status(500).send('Server error');
    }

    const pets = data ? data.split('\n').filter(line => line.trim()) : [];
    const nextId = pets.length + 1;
    const owner = req.session.user;
    const petDetails = `${nextId}:${owner}:${petType}:${breed}:${age}:${gender}:${notes}:${measures}:${nameuser}:${pass}\n`;


    
    // Adding pet information to the data/pets.txt file

    fs.appendFile(path.join(__dirname, 'data', 'pets.txt'), petDetails, (err) => {
      if (err) {
        console.error('Error writing to pets file:', err);
        return res.status(500).send('Server error');
      }
      res.send('Pet registered successfully');
    });
  });
});


// Creating a server on port 3000 local-host
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//        END-OF-THE-CODE.