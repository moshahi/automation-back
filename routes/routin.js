const express = require("express");
const router = express.Router();

const routinController = require("../controller/routinController");

//?upload files
//* route /tickets/file-upload
router.post("/file-upload", routinController.handleFileUpload);

//?desc create Routin
//* path /routins/createRoutin
router.post("/createRoutin", routinController.createRoutins);

//?desc routins list
//* path /routins/
router.get("/", routinController.handleUsersRoutin);
//?desc routins list id params
//* path /routins/list/:id
router.get("/list/:id", routinController.routinsList);

//?desc filter routins for current user
//* path /routins/newRoutin
router.post("/newRoutin", routinController.newRoutin);

//?filter routins for current user
//* route /routins/listID/:id
router.get("/routinsRQ/list/:id", routinController.routinsListID);

//?filter routins for current user need to confirm
//* route /routins/routinsrq
router.post("/routinsrq", routinController.currentRoutins);

//?show the single routin for confirm or reject
//* route /routins/showRoutins/:RQID
router.get("/showRoutins/:RQID", routinController.showRoutins);

//?confirm or disapproval routins
//* route /routins/confirmation
router.post("/confirmation", routinController.routinConfirmation);

module.exports = router;
