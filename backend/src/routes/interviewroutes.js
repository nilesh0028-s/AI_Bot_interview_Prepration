const express = require("express");
const { protectRoute } = require("../middleware/authmiddleware");
const { generateInterviewReportController, getInterviewReportById, getUserReports, getPdf } = require("../controller/interviewController");
const { upload } = require("../middleware/fileupload")

const interviewRouter = express.Router();

interviewRouter.post("/", protectRoute, upload.single("resume"), generateInterviewReportController)
interviewRouter.get("/", protectRoute, getUserReports)
interviewRouter.get("/report/:interviewId", protectRoute, getInterviewReportById)
interviewRouter.get("/report/:interviewId/download", protectRoute, getPdf)

module.exports = interviewRouter;
