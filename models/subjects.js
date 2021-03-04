const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: String,
    skillLevel: Number,
    studyMethod: String,
    nextStep: String,
    onResume: Boolean
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;