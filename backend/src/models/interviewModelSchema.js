const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    intention: { type: String, required: true }
}, { _id: false })

const behavioralQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    intention: { type: String, required: true }
}, { _id: false })

const preparationPlanSchema = new mongoose.Schema({
    day: { type: Number, required: [true, "Day is required"] },
    focus: { type: String, required: [true, "Focus is required"] },
    tasks: [{ type: String, required: [true, "Task is required"] }]
}, { _id: false })

const skillGapSchema = new mongoose.Schema({
    skill: { type: String, required: [true, "Skill is required"] },
    severity: { type: String, enum: ["low", "medium", "high"], required: [true, "Severity is required"] }
}, { _id: false })

const InterviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "job description is required"]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,

    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "match score is required"]
    },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    preparationPlan: [preparationPlanSchema],
    skillGap: [skillGapSchema]
}, { timestamps: true });

module.exports = mongoose.model("InterviewReport", InterviewReportSchema);
