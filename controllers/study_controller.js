const express = require('express');
const study = express.Router();
const Subject = require('../models/subjects.js');

const { isAuthenticated } = require('../services.js');

// routes
// index
study.get('/', (req, res) => {
    Subject.find({}, (error, subjects) => {
        res.render('study/index.ejs', {
            allSubjects: subjects,
            currentUser: req.session.currentUser
        })
    })
});

// seed subjects
study.get('/seedsubjects', (req, res) => {
    Subject.create([
        {
            name: 'Express',
            skillLevel: 3,
            studyMethod: 'Completing this app',
            onResume: true
        },
        {
            name: 'jQuery',
            skillLevel: 4,
            studyMethod: 'Reading documentation, including jQuery in projects',
            nextStep: 'Add DOM manipulation jQuery to my next project',
            onResume: true
        },
        {
            name: 'React',
            skillLevel: 1, 
            nextStep: 'Attend classes on React and complete class exercises and homework', 
            onResume: false
        },
        {
            name: 'Node.js',
            skillLevel: 4,
            studyMethod: 'Build apps in Node',
            nextStep: 'Try new Node packages in apps I build',
            onResume: true
        }
    ], (error, data) => {
        res.redirect('/study');
    })
});

// new
study.get('/new', isAuthenticated, (req, res) => {
    res.render('study/new.ejs', {
        currentUser: req.session.currentUser
    });
});

// post (create)
study.post('/', (req, res) => {
    if (req.body.onResume === 'on') {
        req.body.onResume = true;
    } else {
        req.body.onResume = false;
    }

    Subject.create(req.body, (error, createdSubject) => {
        res.redirect('/study');
    })
});

// edit
study.get('/:id/edit', isAuthenticated, (req, res) => {
    Subject.findById(req.params.id, (error, foundSubject) => {
        res.render('study/edit.ejs', {
            subject: foundSubject,
            method: 'PUT',
            currentUser: req.session.currentUser
        })
    })
});

// update
study.put('/:id', (req, res) => {
    if (req.body.onResume === 'on') {
        req.body.onResume = true;
    } else {
        req.body.onResume = false;
    }

    Subject.findByIdAndUpdate(req.params.id, req.body, {
        new: true}, (error, updatedSubject) => {
            res.redirect('/study');
        })
});

// show
study.get('/:id', (req, res) => {
    Subject.findById(req.params.id, (error, foundSubject) => {
        res.render('study/show.ejs', {
            subject: foundSubject,
            currentUser: req.session.currentUser
        })
    })
});

// delete
study.delete('/:id', (req, res) => {
    Subject.findByIdAndRemove(req.params.id, {
        useFindAndModify: false}, (error, data) => {
            res.redirect('/study');
        })
});

module.exports = study;