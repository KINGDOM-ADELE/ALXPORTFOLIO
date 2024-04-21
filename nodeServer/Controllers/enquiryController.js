const Enquiry = require('../Models/enquiryModel');
const Stats = require('./../Models/statsModal')
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const CustomError = require('../Utils/CustomError');
const paginationCrossCheck = require('../Utils/paginationCrossCheck')
const HTMLspecialChars = require('../Utils/HTMLspecialChars')
const StatusStatsHandler = require('../Utils_MSU/StatusStatsHandler')
const GetUserDetailsFromHeader = require('../Utils/GetUserDetailsFromHeader')




exports.getEnquiries = asyncErrorHandler(async (req, res, next) => {

    let features = new ApiFeatures(Enquiry.find(), req.query).filter().sort().limitfields().limitfields2().paginate()
 
    let enquiries = await features.query

    req.query.page && paginationCrossCheck(enquiries.length)

    res.status(200).json({ 
        status : "success",
        resource : "enquiry",
        lenght : enquiries.length,
        data : enquiries
       })  
})

exports.postEnquiry = asyncErrorHandler(async (req, res, next) => {
    const testToken = req.headers.authorization
    const decodedToken =  await GetUserDetailsFromHeader(testToken)
    req.body.createdBy = decodedToken._id
    
    req.body = HTMLspecialChars(req.body)
    // UPDATE OR CREATE STATS STARTS
    let listEnquiry = (await Enquiry.find({$or: [{Email: req.body.Email}, {phone: req.body.phone}] })).length


    if(listEnquiry < 1){
        // this is a new individual, hence a valid prospect
        await StatusStatsHandler('Enquiry', 'Enquiry', 'Enquiry', false)
        let DATE = new Date()
        let YY = DATE.getFullYear()
        let mm = String(DATE).split(' ')[1] // to get th second element of the generated array
      
        let thisMonth = `${mm}/${YY}`
        req.body.prospect = true;
        req.body.month = thisMonth;
    }
    const enquiry = await Enquiry.create(req.body) // create the enquiry
    res.status(201).json({ 
        status : "success",
        resource : "enquiry",
        enquiry : "created",
        lenght : enquiry.length,
        data : enquiry
    })  
})


exports.getEnquiry = asyncErrorHandler(async (req, res, next) => {
    // const movie = await movie.find({_id: req.param._id})
    const enquiry = await Enquiry.findById(req.params._id)
    if(!enquiry){
        const error = new CustomError(`Enquiry with ID: ${req.params._id} is not found`, 404)
        //return to prevent further execution of the rest of the codes
        return next(error)
    }
    res.status(200).json({ 
        status : "success",
        resource : "enquiry",
        enquiry : "created",
        lenght : enquiry.length,
        data : enquiry
    })  
})

exports.updateEnquiry = asyncErrorHandler(async (req, res, next) => {
    req.body = HTMLspecialChars(req.body)
    const enquiry = await Enquiry.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true})
    if(!enquiry){
        const error = new CustomError(`Enquiry with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }
    res.status(200).json({ 
        status : "success",
        resource : "enquiry",
        action : "put",
        lenght : enquiry.length,
        data : enquiry
    })  
})

exports.deleteEnquiry = asyncErrorHandler(async (req, res, next) => {
    const enquiry = await Enquiry.findByIdAndDelete(req.params._id, req.body, {new: true, runValidators: true})
    if(!enquiry){
        const error = new CustomError(`Enquiry with ID: ${req.params._id} is not available`, 404)
        return next(error)
    }
    res.status(204).json({ 
        status : "success",
        resource : "enquiry",
        message: 'deleted'
    })  
})


exports.searchEnquiry = asyncErrorHandler(async (req, res, next) => {

    let features = new ApiFeatures(Enquiry.find( 
        {$or: [ 
        { Email: { $regex: "^"+req.query.search }},
        { fullName: { $regex: "^"+req.query.search }},
        { enquirerEmail: { $regex: "^"+req.query.search }}, 
        { enquirerPhone: { $regex: "^"+req.query.search }},
        { Email: { $regex: "^"+req.query.search }}, 
        { beneficiaryName: { $regex: "^"+req.query.search }},
        { Email: { $regex: "^"+req.query.search }}, 
        { phone: { $regex: "^"+req.query.search }}
        ]}
        ), req.query).limitfields().paginate()
     
 
    let enquiry = await features.query


    req.query.page && paginationCrossCheck(enquiry.length)
    
    
    res.status(200).json({ 
        status : "success",
        action : "search",
        resource : "enquiries",
        lenght : enquiry.length,
        data : enquiry
    })  
})


exports.getEnquiryByStack = asyncErrorHandler(async (req, res, next) => {
    //allows us access to the aggregation pipeline
    const mystack = req.params.stack
    const enquiry = await Enquiry.aggregate([
        {$unwind: '$stack'},
        { $group: {
            _id: '$stack',
            enquiryCount: {$sum: 1},
            enquiry:{$push: '$name'}
        }},
        {$addFields: {stack: "$_id"}}, //adds a firld stack
        {$project: {_id: 0}}, // removes the _id field from selection by setting it to zero
        {$sort: {enquiryCount: -1}}, // sort in decending order by setting -1
        { $match: {stack: mystack}},
    ]) 

    res.status(200).json({ 
        status : "success",
        resource : "enquiry",
        action : "aggregatation",
        lenght : enquiry.length,
        data: enquiry
    }) 
})


exports.getEnquiryByTechnology = asyncErrorHandler(async (req, res, next) => {
    //allows us access to the aggregation pipeline
    const mytechnology = req.params.technology
    const enquiry = await Enquiry.aggregate([
        {$unwind: '$technology'},
        { $group: {
            _id: '$technology',
            enquiryCount: {$sum: 1},
            enquirys:{$push: '$name'}
        }},
        {$addFields: {technology: "$_id"}}, //adds a field technology
        {$project: {_id: 0}}, // removes the _id field from selection by setting it to zero
        {$sort: {enquiryCount: -1}}, // sort in decending order by setting -1
        {$match: {technology: mytechnology}},


    ]) 

    res.status(200).json({ 
        status : "success",
        resource : "enquiry",
        action : "aggregatation",
        lenght : enquiry.length,
        data: enquiry
    }) 
})