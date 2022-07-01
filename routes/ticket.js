const express = require("express");

const router = express.Router();
const ticketController = require("../controller/ticketController");
const { authenticated } = require("../middlewares/authenticate");

//upload files
// route /tickets/file-upload
router.post("/file-upload", ticketController.handleFileUpload);

//send ticket
// route /tickets/send-ticket
router.post("/send-ticket", ticketController.handleSendTicket);

//ticket List
// route /tickets
router.get("/:id", ticketController.ticketListID);

module.exports = router;
