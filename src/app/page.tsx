"use client"
import Grid from '@mui/material/Grid2';
import ChatOutputBox from "@/components/chatOutput/ChatOutputBox";
import PromptInputBox from "@/components/promptInput/PromptInputBox";
import Box from "@mui/material/Box";
import { useState } from "react";
import ModelSelectButtonGroup from "@/components/modelSelectButtonGroup/ModelSelectButtonGroup";
import { getOutput } from '@/langchain';

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [allModels, setAllModels] = useState<string[]>(["model1", "model2", "model3"]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const [output, setOutput] = useState<string>("");

  const handleModelChange = (newSelectedModels: string[]) => {
    setSelectedModels(newSelectedModels);
  }

  const handlePromptChange = async (newPrompt: string) => {
    setPrompt(newPrompt);
    const response = await getOutput(newPrompt);
    setOutput(response || "");
  }

  const sendPrompt =(prompt: string) => {
  
    // Call the API to get the output
    // getOutput(prompt);
  }

  return (
    <Box //full viewport box
      sx={{
        height: "85vh", // matches the vh minus the nav bar
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Chat Output Section */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          padding: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <ModelSelectButtonGroup allModels={allModels} selectedModels={selectedModels} onChange={handleModelChange}/>
          </Grid>

          {selectedModels.map((model) => (
            <Grid key={model} size={{ xs: 12, md: 6 }}>
              <ChatOutputBox content={output} modelName={model} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/*Prompt input section */}
      <Box>
        <PromptInputBox onChange = {handlePromptChange}/>
      </Box>
    </Box>
  );
}
