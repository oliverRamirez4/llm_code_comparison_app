import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

export default function ChatOutputBox({ content, modelName }: { content: string, modelName: string }) {
  return (
    <Card
      sx={{
        //display: "flex",
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
        <Typography component = "div">
            {content}
        </Typography>
          
    </Card>
  );
};

