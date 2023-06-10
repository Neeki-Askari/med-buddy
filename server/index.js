const express = require('express');
const path = require('path');
const morgan = require('morgan');

const {getApproxMatch} = require('./controller.js');
const {createUser, addMedication, getUserMeds, deleteMeds} = require('./db.js');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));

app.get('/searchMeds', (req, res) => {
    const query = req.query.query;
    getApproxMatch(query)
        .then((response) => res.send(response.data))
        .catch((err) => console.error(err))

});

app.post('/createAccount', (req, res) => {
    const userInfo = req.body;
    createUser(userInfo)
        .then(() => res.send('user created'))
        .catch((err) => {
            console.error(err)
            res.sendStatus(500);
        })
});

//log in existing user
//app.post('/login', (req, res) => {

//});

//add a medication
app.post('/addMed/:userId', async (req, res) => {
    const medInfo = req.body;
    const userId = req.params.userId;

    try {
        await addMedication(medInfo, userId);
        res.sendStatus(201)
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

//get all medications
app.get('/getMeds/:userId', async (req, res) => {
    const userId = req.params.userId;
    getUserMeds(userId)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((err) => console.error(err))

})

//delete medications
app.post('/deleteMeds/:userId', async (req, res) => {
    const userId = req.params.userId;
    const medNames = req.body.medNames;
    try {
        await deleteMeds(userId, medNames);
        res.send('meds deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});

const PORT = 3001; 
app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);

