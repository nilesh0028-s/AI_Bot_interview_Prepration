const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require("puppeteer");

function sanitizeInput(input, maxLength = 5000) {
    if (typeof input !== 'string') return ''
    return input.replace(/<[^>]*>/g, '').trim().slice(0, maxLength)
}

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
    const safeResume = sanitizeInput(resume)
    const safeSelfDescription = sanitizeInput(selfDescription)
    const safeJobDescription = sanitizeInput(jobDescription)

    const prompt = `Generate an interview report for a candidate with the following details:
        Resume: ${safeResume}
        Self Description: ${safeSelfDescription}
        Job Description: ${safeJobDescription}
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

const Resumeschema = {
    type: "object",
    properties: {
        html: { type: "string", description: "The HTML content of the resume which can be converted to PDF using any library like puppeteer" }
    },
    required: ["html"]
}

async function generatePdf({resume, selfDescription, jobDescription}){
    const safeResume = sanitizeInput(resume)
    const safeSelfDescription = sanitizeInput(selfDescription)
    const safeJobDescription = sanitizeInput(jobDescription)

        const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${safeResume}
                        Self Description: ${safeSelfDescription}
                        Job Description: ${safeJobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `
        const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash-lite",
        input: prompt,
        response_format: {
            type: "text",
            mime_type: "application/json",
            schema: Resumeschema
        }
    })

    return JSON.parse(interaction.output_text).html
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })
    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}


module.exports = { generateInterviewReport, generatePdf,generatePdfFromHtml }
