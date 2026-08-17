const express = require("express");
const { protectRoute } = require("../middleware/authmiddleware");
const { generateInterviewReportController } = require("../controller/interviewController");
const {upload} = require("../middleware/fileupload")

const interviewRouter = express.Router();


interviewRouter.post("/",protectRoute,upload.single("resume"),generateInterviewReportController)




module.exports = interviewRouter;