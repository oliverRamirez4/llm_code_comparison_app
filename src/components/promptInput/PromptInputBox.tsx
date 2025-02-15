'use client'
import * as React from 'react';
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowUpward from "@mui/icons-material/ArrowUpward";

export default function PromptInputBox({ onChange }: { onChange: (newPrompt: string) => void }) {
  const [inputValue, setInputValue] = React.useState<string>("");

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Handle button click
  const handleSubmit = () => {
    onChange(inputValue);
  };

  return (
    <Card
      sx={{
        display: "flex",  // Enable flex
        flexDirection: "column",  // Stack items vertically
        alignItems: "center",  // Center items horizontally
        padding: 2,
        margin: 2,
        borderRadius: 2,
        backgroundColor: "#f5f5f5",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        label="Insert Prompt Here"
        value={inputValue}
        onChange={handleInputChange}
        sx={{
          marginBottom: 2,  // Add space between the TextField and Button
        }}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          alignSelf: "center",  // Ensure it’s centered if there are additional layout rules
        }}
      >
        <ArrowUpward />
      </Button>
    </Card>
  );
}
