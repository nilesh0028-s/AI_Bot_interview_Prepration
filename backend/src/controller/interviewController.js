const pdfParse = require("pdf-parse")
const { generateInterviewReport } = require("../service/aiservice")
const InterviewReport = require("../models/interviewModelSchema")

async function generateInterviewReportController(req, res) {
    try {
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
        const { selfDescription, jobDescription } = req.body

        const report = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        })

        const savedReport = await InterviewReport.create({
            jobDescription,
            resume: resumeContent.text,
            selfDescription,
            matchScore: report.matchScore,
            technicalQuestion: report.technicalQuestions,
            behavioralQuestion: report.behavioralQuestions,
            preparationPlan: report.preparationPlan,
            skillGap: report.skillGaps,
            user: req.user.id
        })

        res.status(201).json({ report: savedReport })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

module.exports = { generateInterviewReportController }
