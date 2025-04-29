import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMERY_SYSTEM_PROMPT } from "@/utils/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generateSummeryFromGemini = async (pdfText: string) => {
  try {
    // Get the model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    // Construct the prompt
    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMERY_SYSTEM_PROMPT },
            {
              text: `Transform this document into an engaging, easy-to-read summery with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
            },
          ],
        },
      ],
    };

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;

    if (!response.text()) {
      throw new Error("Empty response from gemini");
    }
    return response.text();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
