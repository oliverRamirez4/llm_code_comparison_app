import { langChainModelStream } from "@/modelStream";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Request received:", req.body);

  if (req.method === "POST") {
    const { modelName, prompt } = req.body;

    if (!prompt || !modelName) {
      return res.status(400).json({ error: "No prompt in the request" });
    }

    try {
      const stream = await langChainModelStream(prompt, modelName);

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const reader = stream.getReader();
      const decoder = new TextDecoder();

      async function read() {
        const { done, value } = await reader.read();
        if (done) {
          res.end();
          return;
        }
        const chunk = decoder.decode(value, { stream: true });
        const parsedChunk = JSON.parse(chunk);
        const content = parsedChunk.kwargs?.content || "";
        console.log("api/langchain.ts Content: ", content);
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
        read();
      }

      read();
    } catch (error) {
      console.error("Error invoking the model:", error);
      res.status(500).json({ error: "Error invoking the model" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}