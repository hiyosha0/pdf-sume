import { SUMMERY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummeryFromOpenAI(pdfText: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: SUMMERY_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summery with contextually relevent emojies and propper markdown formating:\n\n${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });
    return completion.choices[0].message.content;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    throw error;
  }
}
