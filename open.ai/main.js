// Please install OpenAI SDK first: `npm install openai`

// Please install OpenAI SDK first: `npm install openai`
// import OpenAI from "openai";
// const client = new OpenAI({
//     apiKey:'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'
// });

// const completion = await client.chat.completions.create({
//     model: "gpt-4o",
//     messages: [{
//         role: "user",
//         content: "Write a one-sentence bedtime story about a unicorn.",
//     }],
// });

// console.log(completion.choices[0].message.content);


//-------------------------gemini-------------------------
// import { GoogleGenerativeAI } from "@google/generative-ai";
// //const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEM_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
//     role:"to asssist the user"
//  });

// const prompt = "who is best dhoni or virat kolhi";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

//--------------------------------------------------
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from 'readline';

// Load environment variables
dotenv.config();

// Create an interface for reading input from the user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout 
});

// Function to get user input
const getUserInput = (query) => {
    return new Promise((resolve) => rl.question(query, resolve));
   
};

const genAI = new GoogleGenerativeAI(process.env.GEM_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", role: "to assist the user" });

async function main() {
    try {
        while (true) {
            const prompt = await getUserInput("Enter your prompt (type 'exit' to stop): ");
            
            if (prompt.toLowerCase() === 'exit') {
                console.log("Goodbye!");
                break;
            }

            const result = await model.generateContent(prompt);
            console.log("\nAI Response:");
            console.log(result.response.text());
            console.log("\n-------------------\n");
        }
    } catch (error) {
        console.error("Error generating content:", error);
    } finally {
        rl.close();
    }
}
main();
