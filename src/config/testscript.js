import { generateGeminiResponse } from './gemini.js';

const prompt = "Write a short motivational quote.";

generateGeminiResponse(prompt)
  .then((response) => {
    console.log("Response from Gemini:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
