import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const genAI = new GoogleGenerativeAI("AIzaSyCaMUsyaIG6IK_AmVWLj6CEyNTUgpQQWR4");

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = req.body.prompt;

    const result = await model.generateContent(prompt);
    const text = result.text();

    console.log("🔹 Raw API Response:", text); // Debugging log

    // Extract JSON part from Gemini's response
    const jsonMatch = text.match(/\[.*\]/s);
    if (!jsonMatch) {
      console.error("⚠️ No valid JSON detected in response!");
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    const schemes = JSON.parse(jsonMatch[0]);

    res.status(200).json({ schemes });
  } catch (error) {
    console.error("❌ API Error:", error);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
}
