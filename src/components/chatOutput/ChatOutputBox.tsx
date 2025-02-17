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
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ modelName, prompt }),
          });
          const data = await response.json();
          if (data.output) {
            setOutput(data.output);
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

