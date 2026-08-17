const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportJsonSchema = {
    type: "object",
    properties: {
        matchScore: { type: "number", description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description" },
        technicalQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The technical question that can be asked in the interview" },
                    intention: { type: "string", description: "The intention of the interviewer behind asking this question" },
                    answer: { type: "string", description: "How to answer this question, what points to cover, what approach to take" }
                },
                required: ["question", "intention", "answer"]
            },
            description: "Technical questions that can be asked in the interview"
        },
        behavioralQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The behavioral question that can be asked in the interview" },
                    intention: { type: "string", description: "The intention of the interviewer behind asking this question" },
                    answer: { type: "string", description: "How to answer this question, what points to cover, what approach to take" }
                },
                required: ["question", "intention", "answer"]
            },
            description: "Behavioral questions that can be asked in the interview"
        },
        skillGaps: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string", description: "The skill which the candidate is lacking" },
                    severity: { type: "string", enum: ["low", "medium", "high"], description: "How important is this skill for the job" }
                },
                required: ["skill", "severity"]
            },
            description: "List of skill gaps in the candidate's profile"
        },
        preparationPlan: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    day: { type: "number", description: "The day number in the preparation plan, starting from 1" },
                    focus: { type: "string", description: "The main focus of this day" },
                    tasks: { type: "array", items: { type: "string" }, description: "List of tasks to be done on this day" }
                },
                required: ["day", "focus", "tasks"]
            },
            description: "A day-wise preparation plan for the candidate"
        },
        title: { type: "string", description: "The title of the job for which the interview report is generated" }
    },
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title"]
}

const interviewReportSchema = z.fromJSONSchema(interviewReportJsonSchema)

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate with the following details:
        Resume: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}
    `

    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash-lite",
        input: prompt,
        response_format: {
            type: "text",
            mime_type: "application/json",
            schema: interviewReportJsonSchema
        }
    })

    return interviewReportSchema.parse(JSON.parse(interaction.output_text))
}

module.exports = { generateInterviewReport }
