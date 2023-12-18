const mongoose = require('mongoose')

//using the filesytem in the post-hook
const fs = require('fs')
const AutoLogFile = require('../Utils/AutoLogFile')



const courseSchema = new mongoose.Schema(
{
    "courseCode": {type: String, unique: true, required: [true, 'please enter course code'], trim: true},

    "courseName": {type: String, unique: true, required: [true, 'Please enter course name'], trim: true},

    "description": {type: String, required: [true, 'Please enter course description'], trim: true},

    "CourseMode":{type: String, required: [true, 'Please enter course mode'], enum: ['Online Full-time', 'On-Site Full-time', 'Online Part-time', 'On-Site Part-time'], default: 'On-Site Full-time', trim: true},
    
    "file": Object,

    "cost": {type: Number, default: 0, trim: true}, 

    "venue": {type: String, required: [true, 'Please enter venue for course'], trim: true},
  
    "stack": {type: String, default: ['MERN'], trim: true},
        // make a list of options with the values above


    "Availability": {type: String, required: [true, 'Please enter availability status'], trim: true},





    // not required in the user inpute form
    "alumni": {type: Number, default: 0, trim: true},
    "students": {type: Number, default: 0, trim: true},
    "deffered": {type: Number, default: 0, trim: true},
    "createdBy": {type: String, required: [true, 'Please complete the hidden field createdBy'], trim: true},
    "ratings": {type: Number, default: 0, trim: true},
    "releaseDate": {type: Date, default: Date.now, required: true, trim: true},
    "created": {type: Date, default: Date.now, immutable: true, trim: true},
    "updated": {type: Date, default: Date.now, trim: true,  select: false},
})




// USING MONGOOSE MIDDLEWARE
//post hook
courseSchema.post('save', async function(doc, next){
    const content = `A new course document with courseCode ${doc.courseCode} created by ${doc.createdBy} on ${doc.created}\n`
    const logFile = await AutoLogFile()
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
    })
    next()
})


courseSchema.pre(/^find/, async function(next){
    this.find({releaseDate: {$lte: Date.now()}})
    this.startTime = Date.now()
    next()
})


courseSchema.post(/^find/, async function(docs,next){
    // this here points to the corrent querry
    this.find({releaseDate: {$lte: Date.now()}})
    this.endTime = Date.now()
    const logFile = await AutoLogFile()
    const content = `Query took  ${this.endTime - this.startTime} in milliseconds to fetch the documents, on ${new Date}\n`
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
    })
    next()
})


// AGGREGATION MIDDLEWARES
courseSchema.pre('aggregate', function(next){
    // this here points to the corrently processing aggregation object
    this.pipeline().unshift({$match: {releaseDate: {$lte: new Date()}}})
     next()
})

module.exports = mongoose.model('course', courseSchema)