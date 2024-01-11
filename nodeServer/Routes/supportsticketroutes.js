const express = require('express')
const router = express.Router()

 const supportTicketController = require('../Controllers/supportTicketController')
 const authController = require('../Controllers/authcontroller')
 
// ROUTES CHAINING FOR SUPPORT TICKET


router.route('/user')
    .get(authController.protect,supportTicketController.getUserSupportTickets)

router.route('/open')
    .get(authController.protect,authController.restrict('admin'),supportTicketController.getOpenSupportTickets)

router.route('/')
    .get(authController.protect,authController.restrict('admin'),supportTicketController.getSupportTickets)
    .post(authController.protect,supportTicketController.postSupportTicket)
    
router.route('/:_id')
    .get(authController.protect,supportTicketController.getSupportTicket)
    .patch(authController.protect,authController.restrict('admin'),supportTicketController.patchSupportTicket)
    .put(authController.protect,authController.restrict('admin'),supportTicketController.putSupportTicket)
    .delete(authController.protect,authController.restrict('admin'),supportTicketController.deleteSupportTicket)// for single role

module.exports = router