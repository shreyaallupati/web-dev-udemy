import { streamText, UIMessage, convertToModelMessages} from "ai";
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY, 
});

export async function POST(req: Request) {
    try{
    const {messages} : {messages:UIMessage[]}= await req.json();
    
    const result = streamText({
        model : google("gemini-2.5-flash"),
        messages : convertToModelMessages(messages),
    })

    return result.toUIMessageStreamResponse();
}
catch(error){
    console.error("Error Streaming chat completion: ", error);
    return new Response("Failed to stream chat completion", {status:500});
}
}