const express = require("express");
const { protectRoute } = require("../middleware/authmiddleware");
const { generateInterviewReportController,getInterviewReportById } = require("../controller/interviewController");
const {upload} = require("../middleware/fileupload")

const interviewRouter = express.Router();


interviewRouter.post("/",protectRoute,upload.single("resume"),generateInterviewReportController)
interviewRouter.get("/report/:interviewId",protectRoute,getInterviewReportById)




module.exports = interviewRouter;