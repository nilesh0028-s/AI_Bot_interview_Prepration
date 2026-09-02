const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

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
    console.log("[generateInterviewReport] START")
    const safeResume = sanitizeInput(resume)
    const safeSelfDescription = sanitizeInput(selfDescription)
    const safeJobDescription = sanitizeInput(jobDescription)

    const prompt = `Generate an interview report for a candidate with the following details:
        Resume: ${safeResume}
        Self Description: ${safeSelfDescription}
        Job Description: ${safeJobDescription}

        STRICT REQUIREMENTS:
        - Generate exactly 10 to 12 technical questions tailored to the job description and candidate's experience
        - Generate exactly 10 to 12 behavioral questions based on the role and candidate's background
        - Generate a 7-day preparation plan (day 1 to day 7), each day with a clear focus and 3-5 actionable tasks
        - Identify all relevant skill gaps between the candidate's profile and the job requirements
        - Provide a match score between 0 and 100
    `

    console.log("[generateInterviewReport] Sending request to Gemini...")
    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash-lite",
        input: prompt,
        response_format: {
            type: "text",
            mime_type: "application/json",
            schema: interviewReportJsonSchema
        }
    })
    console.log("[generateInterviewReport] Gemini response received")

    const parsed = interviewReportSchema.parse(JSON.parse(interaction.output_text))
    console.log("[generateInterviewReport] Parsed successfully | technicalQ:", parsed.technicalQuestions.length, "| behavioralQ:", parsed.behavioralQuestions.length)
    return parsed
}

const Resumeschema = {
    type: "object",
    properties: {
        html: { type: "string", description: "The HTML content of the resume which can be converted to PDF using any library like puppeteer" }
    },
    required: ["html"]
}

async function generatePdf({ resume, selfDescription, jobDescription }) {
    console.log("[generatePdf] START")
    const safeResume = sanitizeInput(resume)
    const safeSelfDescription = sanitizeInput(selfDescription)
    const safeJobDescription = sanitizeInput(jobDescription)

    const prompt = `Generate a professional ATS-optimized resume in HTML format for the following candidate:

                    Resume: ${safeResume}
                    Self Description: ${safeSelfDescription}
                    Job Description: ${safeJobDescription}

                    ATS OPTIMIZATION RULES (most important):
                    - Extract exact keywords, skills, tools, and technologies from the job description and naturally include them in the resume
                    - Use standard section headings: "Work Experience", "Education", "Skills", "Projects" — ATS systems look for these exact words
                    - Use plain readable HTML only — no tables, no floats, no CSS grid for main structure as ATS parsers struggle with complex layouts
                    - Every bullet point under experience should start with a strong action verb and include measurable impact where possible (e.g. "Reduced load time by 40%")
                    - Skills section must list skills as plain comma-separated text or simple list, not inside boxes or styled chips
                    - Do NOT use images, icons, columns, or multi-column layouts — ATS cannot parse them correctly
                    - Job titles, company names, and dates must be clearly separated and easy to parse
                    - Include a summary section at the top that mirrors the language of the job description naturally
                    - Avoid headers/footers, text boxes, or any CSS that hides or overlaps content

                    DESIGN RULES:
                    - Return a JSON object with a single field "html" containing the full HTML resume
                    - The resume MUST fit in exactly ONE A4 page (794px wide, 1123px tall) when rendered
                    - Use inline CSS only, no external stylesheets or fonts
                    - Font: Arial or Helvetica (ATS safe fonts), body 11px, name 20px, section headings 13px
                    - Color scheme: dark navy #1a1a2e for name and section headings, #333 for body text, white background
                    - Section headings should have a thin 1px bottom border in #cccccc — subtle, not bold, just enough to visually separate sections
                    - Margins: 28px on all sides, line height 1.5
                    - Keep bullet points concise, max 1 line each
                    - Limit work experience to 2-3 most relevant roles, max 3 bullets each
                    - Do NOT include photo, references, or fancy graphics
                    - The entire HTML must be self-contained with a fixed width of 794px
                    - Content must sound natural and human-written, not AI-generated
                `

    console.log("[generatePdf] Sending request to Gemini...")
    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash-lite",
        input: prompt,
        response_format: {
            type: "text",
            mime_type: "application/json",
            schema: Resumeschema
        }
    })
    console.log("[generatePdf] Gemini response received")

    const html = JSON.parse(interaction.output_text).html
    console.log("[generatePdf] HTML extracted | chars:", html.length)
    return html
}

async function generatePdfFromHtml(htmlContent) {
    console.log("[generatePdfFromHtml] START | Launching Chromium...")

    const executablePath = await chromium.executablePath()
    console.log("[generatePdfFromHtml] Chromium path:", executablePath)

    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath,
        headless: chromium.headless,
    })
    console.log("[generatePdfFromHtml] Browser launched")

    const page = await browser.newPage()
    await page.setViewport({ width: 794, height: 1123 })
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })
    console.log("[generatePdfFromHtml] Page content set")

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" }
    })
    console.log("[generatePdfFromHtml] PDF generated | bytes:", pdfBuffer.length)

    await browser.close()
    console.log("[generatePdfFromHtml] Browser closed")

    return pdfBuffer
}

module.exports = { generateInterviewReport, generatePdf, generatePdfFromHtml }
