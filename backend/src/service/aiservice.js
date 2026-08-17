const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function interviewDescription({resume,selfdescription,jobsescription}){

}

async function invokeGemini() {
    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash-lite",
        input: "Explain how AI works in a few words",
    });
    console.log(interaction.output_text);
}

module.exports = invokeGemini;
