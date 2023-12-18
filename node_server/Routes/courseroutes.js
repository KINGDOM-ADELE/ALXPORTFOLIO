const express = require('express')
const router = express.Router()

 const courseController = require('../Controllers/courseController')
 const authController = require('../Controllers/authcontroller')
 const fileUploadsController = require('../Controllers/fileUploadsController')
 const upload = require('../Utils/filehandler')

 
//PARAM MIDDLEWARE
//  router.param('_id', courseController.checkId)

// ROUTES CHAINING
// alias routin
router.route('/highest-rated').get(authController.protect,courseController.getHighestRated,courseController.getCourses)

router.route('/course-stats').get(authController.protect,courseController.getcourseStats)

router.route('/course-by-stack/:stack').get(authController.protect,courseController.getcoursesByStack)

router.route('/course-by-technology/:technology').get(authController.protect,courseController.getcoursesByTechnology)


// router.route('/idsArray/:ids')
//     .get(authController.protect,courseController.getCoursesByIds)

// router.route('/idsStrings/:ids')
//     .get(authController.protect,courseController.getCoursesByIds)

router.route('/idsArray')
    .get(authController.protect,courseController.getCoursesByIds)

router.route('/enrolledArray')
    .get(authController.protect,courseController.getEnrolledCoursesByIds)

router.route('/idsStrings')
    .get(authController.protect,courseController.getCoursesByIds)

router.route('/')
    .get(authController.protect,courseController.getCourses)
    .post(authController.protect,authController.restrict('admin'),courseController.filesToCoursesPath,upload.single('file'),courseController.postCourse) 


router.route('/:_id')
    .get(authController.protect,courseController.getACourse)
    .patch(authController.protect,authController.restrict('admin'),courseController.filesToCoursesPath,upload.single('file'),courseController.updateACourse)
    .put(authController.protect,authController.restrict('admin'),courseController.filesToCoursesPath,upload.single('file'),courseController.updateACourse)
    .delete(authController.protect,authController.restrict('admin'),courseController.deleteCourse)// for single role

module.exports = router