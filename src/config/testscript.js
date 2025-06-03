import { generateGeminiResponse } from './gemini.js';

const prompt = "write an idiom.";

generateGeminiResponse(prompt)
  .then((response) => {
    console.log("Response from Gemini:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
