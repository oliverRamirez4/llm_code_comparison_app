import { NextApiRequest, NextApiResponse } from "next";
import { initChatModel } from "langchain/chat_models/universal";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Request received:", req.body);

  if (req.method === "POST") {
    const { modelName, prompt } = req.body;

    if (!modelName || !prompt) {
      return res.status(400).json({ error: "modelName and prompt are required" });
    }

    let apiKey;
    if (modelName === "gpt-4o" || modelName === "gpt-4o-mini") {
      apiKey = process.env.OPENAI_API_KEY;
    } else if (modelName === "claude-3-opus-20240229" || modelName === "claude-3-5-sonnet-20241022") {
      apiKey = process.env.ANTHROPIC_API_KEY;
    } else {
      apiKey = process.env.GOOGLE_API_KEY;
    }

    console.log("API Key selected:", apiKey);

    if (!apiKey) {
      console.error("API key is not set");
      return res.status(500).json({ error: "API key is not set" });
    }

    try {
      const model = await initChatModel(modelName, {
        //modelProvider: "google-vertexai",
        temperature: 0.25,
        apiKey: apiKey,
      });
      if (model) {
        console.log(modelName, "initialized successfully");
      } else {
        console.error(modelName, "failed to initialize");
      }

      const messages = [
        new SystemMessage("Write code for the following prompt"),
        new HumanMessage(prompt),
      ];

      const response = await model.invoke(messages);
      console.log("Response from model:", response);

      if (!response || !response.content) {
        throw new Error("Invalid response from the model");
      }

      const output = Array.isArray(response.content) ? response.content.join(" ") : response.content;

      res.status(200).json({ output });
    } catch (error) {
      console.error("Error invoking the model:", error);
      res.status(500).json({ error: "Error invoking the model" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
