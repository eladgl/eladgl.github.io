//Server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const queries = require('./mysqlConnection'); // Import the queries submodule

const app = express(); // Create an Express app

// Set up CORS middleware
app.use(cors());

// Use bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/Login/login', cors(), async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { username, password } = req.body;
            const results = await queries.login(username, password);
            console.log("These are the results: ", results);
            if (results.length === 0) {
                res.status(401).json({ message: 'Invalid username or password' });
            } else {
                res.status(200).json(results);
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
});


app.post('/logout', cors(), async (req, res) => {
    if (req.method === 'POST') {

        try {
            const { username } = req.body;
            const results = await queries.logout(username);
            console.log(results);
            if (results.length === 0) {
                res.status(401).json({ message: 'Invalid username or password' });
            } else {
                res.status(200).json(results);
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
});

app.post('/train_login', cors(), async (req, res) => {
    if (req.method === 'POST') {
        //console.log(req);
        try {
            const { username, password } = req.body;
            console.log("username ", username);
            console.log("password ", password);
            const results = await queries.trainLogin(username, password);
            console.log(results);
            if (results.length === 0 || results === []) {
                res.status(401).json({ message: 'Invalid username or password' });
            } else {
                res.status(200).json(results);
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }

});

app.post('/train_logout', cors(), async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { username, useTime, date } = req.body;
            console.log(req.body);
            const results = await queries.trainLogout(username, useTime / 60, date);
            if (results.length === 0) {
                res.status(401).json({ message: 'Invalid username or password' });
            } else {
                res.status(200).json(results);
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
});

app.post('/getTrainingData', cors(), async (req, res) => {
    console.log("here");
    if (req.method === 'POST') {
        try {
            console.log(req.body);
            const { selectedDate, username, choice } = req.body;

            const trainingData = await queries.getTrainingData(selectedDate, username, choice);
            console.log(trainingData);
            // Return the training data as JSON response
            res.status(200).json(trainingData);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
});

app.post('/sendData', cors(), async (req, res) => {
    console.log("sendData req.body: ", req.body);
    if (req.method === 'POST') {
        try {
            //const { username, password } = req.body;
            //const results = await queries.login(username, password);
            //console.log(results);
            const { username, date, gripPressure, accelerationX, ultrasonic, gyroX } = req.body;
            const results = await queries.sendData(username, date, gripPressure, accelerationX, ultrasonic, gyroX);
            res.status(200).json({ message: 'Success' });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
});

app.post('/endTraining', cors(), async (req, res) => {
    console.log("endTraining req.body: ", req.body);
    if (req.method === 'POST') {
        try {
            //const { username, password } = req.body;
            //const results = await queries.login(username, password);
            //console.log(results);

            res.status(200).json({ message: 'Success' });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
});

// Set port on 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.post('/register', cors(), async (req, res) => {
    if (req.method === 'POST') {
        try {
            console.log("Registrarion post request body is: ", req.username);
            const results = await queries.register(req.body);
            if (results.length === 0) {
                res.status(401).json({ message: 'Invalid registration inputs' });
            } else {
                res.status(200).json(results);
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error - registration failure', error: error.message  });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed - registration failure' });
    }
});