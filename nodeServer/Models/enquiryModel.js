const mongoose = require('mongoose')
const AutoLogFile = require('../Utils/AutoLogFile')


//using the filesytem in the post-hook
const fs = require('fs')

const enquirySchema = new mongoose.Schema(
{
    "fullName": {type: String,  required: [true, 'Please enter full name'], trim: true},// email
    "enquirerEmail": {type: String,  required: [true, 'Please enter a valid enquirerEmail'], trim: true},// email
    "enquirerPhone": {type: String,  required: [true, 'Please enter a phone number'], trim: true},// phone

    "beneficiaryName": {type: String,  required: [true, 'Please enter full name'], trim: true},// email
    "relationship": {type: String,  required: [true, 'Please enter relationship details'], trim: true},// email
    "Email": {type: String,  required: [true, 'Please enter a valid email'], trim: true},// email
    "phone": {type: String,  required: [true, 'Please enter a phone number'], trim: true},// phone

    "description": {type: String, required: [true, 'Please enter enquiry description'], trim: true},
    "conclusion": {type: String, required: [true, 'Please enter enquiry description'], trim: true},


    // not required in the user inpute form
    "createdBy": {type: String, required: [true, 'Please complete the hidden field createdBy'], trim: true},
    "prospect": String, 
    "month": String, 
    "created": {type: Date, default: Date.now, immutable: true, trim: true},
})




// USING MONGOOSE MIDDLEWARE
//post hook
enquirySchema.post('save', async function(doc, next){
    const logFile = await AutoLogFile()
    const content = `A new enquiry document created by ${doc.userId} on ${doc.created}\n`
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
    })
    next()
})


enquirySchema.pre(/^find/, async function(next){
    this.startTime = Date.now()
    next()
})


enquirySchema.post(/^find/, async function(docs,next){
    // this here points to the corrent querry
    this.endTime = Date.now()
    const logFile = await AutoLogFile()
    const content = `Query took  ${this.endTime - this.startTime} in milliseconds to fetch the documents, on ${new Date}\n`
    fs.writeFileSync(logFile, content, {flag: 'a'},(err) => {
    })
    next()
})

module.exports = mongoose.model('enquiry', enquirySchema)