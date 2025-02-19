import { createParser, type EventSourceMessage } from 'eventsource-parser';
import { initChatModel } from 'langchain/chat_models/universal';
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function langChainModelStream (payload: string, modelName: string) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const model = await initChatModel(modelName, {
        temperature: 0.25,
        apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = [
        new SystemMessage("Write code for the following prompt"),
        new HumanMessage(payload),
    ];

    const stream = new ReadableStream({
        async start(controller) {

            const sseStream = await model.stream(messages);

            for await (const chunk of sseStream) {
                const chunkData = encoder.encode(JSON.stringify(chunk));
                controller.enqueue(chunkData);
            }
            controller.close();
        }    
    });



return stream;
}