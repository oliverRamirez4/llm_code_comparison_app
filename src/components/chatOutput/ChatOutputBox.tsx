'use client'
import { useEffect, useState } from "react";
import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

// Define the props interface
interface ChatOutputBoxProps {
  modelName: string;
  prompt: string;
}

// Define the ChatOutputBox component
export default function ChatOutputBox({ modelName, prompt }: ChatOutputBoxProps) {
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const fetchOutput = async () => {
      if (prompt) {
        try {
          const response = await fetch("/api/langchain", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ modelName, prompt }),
          });

          const reader = response.body?.getReader();
          if (!reader) {
            throw new Error("Response body is null");
          }

          const decoder = new TextDecoder();
          let done = false;

          while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            if (value) {
              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split('\n');
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const jsonString = line.replace('data: ', '');
                  if (jsonString.trim()) {
                    const parsedChunk = JSON.parse(jsonString);
                    const content = parsedChunk.content;
                    console.log("Content: ", content);
                    setOutput((prevOutput) => prevOutput + content);
                    console.log("Output: ", output);
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error("Error fetching the output:", error);
        }
      }
    };

    fetchOutput();
  }, [prompt, modelName]);

  return (
    <Card
      sx={{
        justifyContent: "center",
        padding: 2,
        margin: 2,
        borderRadius: 2,
        backgroundColor: "#f5f5f5", // Light gray background for better readability
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", // Soft shadow
      }}
    >
      <Typography variant="h5" component="div">
        {modelName}
      </Typography>
      <Typography component="div">
        {output}
      </Typography>
    </Card>
  );
}

