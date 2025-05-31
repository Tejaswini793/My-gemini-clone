import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBHwDPFxBmEXEPxJRLgYotr2m6LWpg-uDs";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

export async function generateGeminiResponse(prompt) {
  const result = await model.generateContentStream({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  let fullResponse = '';
  for await (const chunk of result.stream) {
    const text = await chunk.text();
    fullResponse += text;
  }
  return fullResponse;
}
