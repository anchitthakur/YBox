const express = require('express');
const mongoose = require('mongoose');
const competition = require('./models/Competition.model');
const submission = require('./models/Submission.model');
const submissionLike = require('./models/SubmissionLike.model');
const user = require('./models/User.model');
require('dotenv').config();

const app = express();
app.use(express.json());

const dbRoute = process.env.dbRoute;
mongoose.connect(dbRoute, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
let db = mongoose.connection;

db.once('open', () => {
    console.log('MongoDB connected');
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/competitions', async (req, res) => {
    try {
        const competitions = await competition.find().populate('author');
        let results = [];
        for (let i of competitions) {
            let submissions = await submission.countDocuments({competition: i._id}) || 0;
            results.push({...i._doc, submissions: submissions})
        }
        res.send(results)
    } catch (e) {
        res.status(500).send(e.toString())
    }
});

app.get('/users', async (req, res) => {
    res.send(await submissionLike.find())
})

app.get('/competition/:id/submissions', async (req, res) => {
    try {
        const objectId = mongoose.Types.ObjectId(req.params.id);
        const submissions = await submission.find({competition: objectId}).populate('author');
        let results = [];
        for (let i of submissions) {
            let likes = await submissionLike.countDocuments({submission: i._id}) || 0;
            results.push({...i._doc, likes: likes})
        }
        res.send(results)
    } catch (e) {
        res.status(500).send(e.toString())
    }
});

app.all('*', (req, res) => {
    res.send('Route doesn\'t exist');
});

app.listen(3000, () => {
    console.log('Routes:\n http://localhost:3000/competitions\n http://localhost:3000/competition/:id/submissions\n\n\n')
});
