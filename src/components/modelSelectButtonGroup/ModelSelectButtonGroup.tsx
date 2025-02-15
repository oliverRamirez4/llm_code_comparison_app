import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// Define the props for the ModelSelectButtonGroup component
interface ModelSelectButtonGroupProps {
  allModels: string[]; // List of all available models
  selectedModels: string[]; // List of currently selected models
  onChange: (selectedModels: string[]) => void; // Callback function to handle changes in selected models
}

// Define the ModelSelectButtonGroup component
export default function ModelSelectButtonGroup({
  allModels,
  selectedModels,
  onChange,
}: ModelSelectButtonGroupProps) {

  // Handle button click event
  const handleButtonClick = (model: string) => {
    // Determine the new list of selected models
    const newSelectedModels = selectedModels.includes(model)
      ? selectedModels.filter((m) => m !== model) // Remove the model if it's already selected
      : [...selectedModels, model]; // Add the model if it's not selected
    onChange(newSelectedModels); // Pass the updated list of selected models to the parent component
  };

  return (
    // Render a group of buttons
    <ButtonGroup variant="contained" aria-label="Basic button group">
      {allModels.map((model) => (
        <Button
          key={model} // Unique key for each button
          onClick={() => handleButtonClick(model)} // Handle button click
          style={{
            backgroundColor: selectedModels.includes(model) ? '#1976d2' : 'transparent', // Change background color if selected
            color: selectedModels.includes(model) ? '#fff' : '#000', // Change text color if selected
          }}
        >
          {model} {/* Display the model name */}
        </Button>
      ))}
    </ButtonGroup>
  );
}
