const Course = require('../Models/courseModel');
const User = require('../Models/userModel');
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const CustomError = require('../Utils/CustomError');
const paginationCrossCheck = require('../Utils/paginationCrossCheck')
const HTMLspecialChars = require('../Utils/HTMLspecialChars')
const GetUserDetailsFromHeader = require('../Utils/GetUserDetailsFromHeader')
const ProcessSingleFileObj = require('./../Utils/ProcessSingleFileObj');
const SetUploadsfilePathHandler = require('../Utils/SetUploadsfilePathHandler')
const UnlinkSingleFile = require('./../Utils/UnlinkSingleFile')





//ROUTE HANDLER FUNCTIONS
exports.getHighestRated = asyncErrorHandler(async (req, res, next) => {
    //pre filling the sorting and limit
    req.query.limit = '4'
    req.query.sort = 'ratings'
    next()
})


exports.getCourses = asyncErrorHandler(async (req, res, next) => {

    let features = new ApiFeatures(Course.find(), req.query).filter().sort().limitfields().limitfields2().paginate()
 
    let courses = await features.query

    req.query.page && paginationCrossCheck(courses.length)

    res.status(200).json({ 
        status : "success",
        resource : "movie",
        lenght : courses.length,
        data : courses
    })  
})


exports.postCourse = asyncErrorHandler(async (req, res, next) => {
    const testToken = req.headers.authorization
    const decodedToken =  await GetUserDetailsFromHeader(testToken)
    req.body.createdBy = decodedToken._id
    
    req.body = HTMLspecialChars(req.body)
    // let filesArray = ProcessMultipleFilesArrayOfObjects(req)
    let filesObj = undefined
    req.file && (filesObj = ProcessSingleFileObj(req))
    req.body.file = filesObj

    const course = await Course.create(req.body)
    res.status(201).json({ 
        status : "success",
        resource : "course",
        course : "created",
        lenght : course.length,
        data : course
    })  
})


exports.getACourse = asyncErrorHandler(async (req, res, next) => {
    reqParamsId = HTMLspecialChars(req.params._id)

    // const movie = await movie.find({_id: req.param._id})
    const course = await Course.findById(reqParamsId)
    if(!course){
        const error = new CustomError(`Course with ID: ${reqParamsId} is not found`, 404)
        //return to prevent further execution of the rest of the codes
        return next(error)
    }
    res.status(200).json({ 
        status : "success",
        resource : "course",
        course : "created",
        lenght : course.length,
        data : course
    })  
})

// exports.getCoursesByIds = asyncErrorHandler(async (req, res, next) => {

//     const courseIds = req.params.ids.split(','); // if coma seperated string is recieved

//     // Use HTMLspecialChars on each course ID if needed
//     const sanitizedCourseIds = courseIds.map(id => HTMLspecialChars(id));
//     // Find courses by their IDs
//     const courses = await Course.find({ _id: { $in: sanitizedCourseIds } });
//     // Check if any of the courses were not found
//     if (courses.length !== sanitizedCourseIds.length) {
//         // Find the missing course IDs
//         const missingCourseIds = sanitizedCourseIds.filter(id => !courses.some(course => course._id == id));

//         const error = new CustomError(`Courses with IDs: ${missingCourseIds.join(', ')} not found`, 404);
//         // Return to prevent further execution of the rest of the codes
//         return next(error);
//     }

//     res.status(200).json({
//         status: 'success',
//         resource: 'courses',
//         count: courses.length,
//         data: courses,
//     });
// });


exports.getCoursesByIds = asyncErrorHandler(async (req, res, next) => {

    const testToken = req.headers.authorization
    const decodedToken =  await GetUserDetailsFromHeader(testToken)

    const user = await User.findById(decodedToken._id)
    console.log('user.Courses', user.Courses)

    const sanitizedCourseIds = user.Courses.map(id => HTMLspecialChars(id));
    // Find courses by their IDs
    const courses = await Course.find({ _id: { $in: sanitizedCourseIds } });
    // Check if any of the courses were not found
    if (courses.length !== sanitizedCourseIds.length) {
        // Find the missing course IDs
        const missingCourseIds = sanitizedCourseIds.filter(id => !courses.some(course => course._id == id));

        const error = new CustomError(`Courses with IDs: ${missingCourseIds.join(', ')} not found`, 404);
        // Return to prevent further execution of the rest of the codes
        return next(error);
    }

    res.status(200).json({
        status: 'success',
        resource: 'courses',
        count: courses.length,
        data: courses,
    });
});


exports.getEnrolledCoursesByIds = asyncErrorHandler(async (req, res, next) => {

    const testToken = req.headers.authorization
    const decodedToken =  await GetUserDetailsFromHeader(testToken)

    const user = await User.findById(decodedToken._id)
    console.log('user.Courses', user.Enrolled)

    const sanitizedCourseIds = user.Enrolled.map(id => HTMLspecialChars(id));
    // Find courses by their IDs
    const courses = await Course.find({ _id: { $in: sanitizedCourseIds } });
    // Check if any of the courses were not found
    if (courses.length !== sanitizedCourseIds.length) {
        // Find the missing course IDs
        const missingCourseIds = sanitizedCourseIds.filter(id => !courses.some(course => course._id == id));

        const error = new CustomError(`Courses with IDs: ${missingCourseIds.join(', ')} not found`, 404);
        // Return to prevent further execution of the rest of the codes
        return next(error);
    }

    res.status(200).json({
        status: 'success',
        resource: 'courses',
        count: courses.length,
        data: courses,
    });
});

exports.updateACourse = asyncErrorHandler(async (req, res, next) => {
        // const movie = await movie.find({_id: req.param._id})
    req.body = HTMLspecialChars(req.body)
    reqParamsId = HTMLspecialChars(req.params._id)

    const course1 = await Course.findById(reqParamsId)
    if(!course1){
        const error = new CustomError(`Course with ID: ${reqParamsId} is not found`, 404)
        return next(error)
    }

    
    //// unlink prev
    if( req.body.file && course1.file && course1.file.filePath){
        UnlinkSingleFile(course1.file.filePath, req)
    }


    let filesObj = undefined
    req.file && (filesObj = ProcessSingleFileObj(req))
    req.body.file = filesObj

    const course = await Course.findByIdAndUpdate(reqParamsId, req.body, {new: true, runValidators: true})
    if(!course){
        const error = new CustomError(`Course with ID: ${reqParamsId} is not found`, 404)
        return next(error)
    }
    res.status(200).json({ 
        status : "success",
        resource : "course",
        action: "patch",
        lenght : course.length,
        data : course
    })  
})


exports.deleteCourse = asyncErrorHandler(async (req, res, next) => {
    reqParamsId = HTMLspecialChars(req.params._id)

// const movie = await movie.find({_id: req.param._id})
    const course = await Course.findByIdAndDelete(reqParamsId, req.body, {new: true, runValidators: true})
    if(!course){
        const error = new CustomError(`Course with ID: ${reqParamsId} is not available`, 404)
        return next(error)
    }
    if( course.file && course.file.filePath){
        UnlinkSingleFile(course.file.filePath, req)
    }
    res.status(200).json({  
        status : "success",
        resource : "course",
        message: 'deleted'
    })  
})


//Aggregation pipelines
exports.getcourseStats = asyncErrorHandler(async (req, res, next) => {
    //allows us access to the aggregation pipeline
    const stats = await Course.aggregate([
        //match ratings
        { $match: {ratings: {$gte: 2}}},
        { $group: {
            _id: '$courseId',
            avgRating: {$avg: '$ratings'},
            avgAlumni: {$avg: '$alumni'},
            minAlumni: {$min: '$alumni'},
            maxAlumni: {$max: '$alumni'},
            avgStudents: {$avg: '$students'},
            minStudents: {$min: '$students'},
            maxStudents: {$max: '$students'},
        }},
        
        { $sort: {maxStudents: 1}}
    ]) 

    res.status(200).json({ 
        status : "success",
        resource : "courses",
        action : "aggregatation",
        lenght : stats.length,
        data: stats
    }) 
})


exports.getcoursesByStack = asyncErrorHandler(async (req, res, next) => {
    //allows us access to the aggregation pipeline
    const mystack = HTMLspecialChars(req.params.stack) 
    const courses = await Course.aggregate([
        {$unwind: '$stack'},
        { $group: {
            _id: '$stack',
            courseCount: {$sum: 1},
            courses:{$push: '$name'}
        }},
        {$addFields: {stack: "$_id"}}, //adds a firld stack
        {$project: {_id: 0}}, // removes the _id field from selection by setting it to zero
        {$sort: {courseCount: -1}}, // sort in decending order by setting -1
        // {$limit: 6} // liniting response to 6
        { $match: {stack: mystack}},
    ]) 

    res.status(200).json({ 
        status : "success",
        resource : "courses",
        action : "aggregatation",
        lenght : courses.length,
        data: courses
    }) 
})



exports.getcoursesByTechnology = asyncErrorHandler(async (req, res, next) => {
    //allows us access to the aggregation pipeline
    const mytechnology = HTMLspecialChars(req.params.technology)
    const courses = await Course.aggregate([
        {$unwind: '$technology'},
        { $group: {
            _id: '$technology',
            courseCount: {$sum: 1},
            courses:{$push: '$name'}
        }},
        {$addFields: {technology: "$_id"}}, //adds a firld technology
        {$project: {_id: 0}}, // removes the _id field from selection by setting it to zero
        {$sort: {courseCount: -1}}, // sort in decending order by setting -1
        { $match: {technology: mytechnology}},


    ]) 

    res.status(200).json({ 
        status : "success",
        resource : "courses",
        action : "aggregatation",
        lenght : courses.length,
        data: courses
    }) 
})


exports.filesToCoursesPath = asyncErrorHandler(async (req, res, next) => {
    SetUploadsfilePathHandler(req, `./uploads/courses`)
    next()
})