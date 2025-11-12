
import { GoogleGenAI, Part } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        // This should not happen with readAsDataURL
        resolve('');
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const analyzePlant = async (imageFile: File): Promise<string> => {
  try {
    const imagePart = await fileToGenerativePart(imageFile);
    const textPart = {
        text: "Identify the plant in this image. Provide its common and scientific names. Then, give detailed care instructions including watering, sunlight, soil, and fertilizer needs. Format the response clearly."
    };
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });

    return response.text;
  } catch (error) {
    console.error("Error analyzing plant:", error);
    return "Sorry, I couldn't analyze the image. Please try again.";
  }
};
