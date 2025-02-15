'use server'
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// Function to get the output from the model
export async function getOutput(prompt: string): Promise<string | null> {
    // Throw an error if the API key is not set
    if (!process.env.OPENAI_API_KEY) {
        console.error("API key is not set");
        return null;
    }

    const model = new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        model: "gpt-4"
    });

    const messages = [
        new SystemMessage("Translate the following from English into Italian"),
        new HumanMessage(prompt),
    ];

    try {
        let response = await model.invoke(messages);
        console.log(response.content) // Return the content of the response
        return Array.isArray(response.content) ? response.content.join(' ') : response.content;
        
    } catch (error) {
        console.error("Error invoking the model:", error);
        return null;
    }
}