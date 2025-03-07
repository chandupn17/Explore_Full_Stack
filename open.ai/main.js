// Please install OpenAI SDK first: `npm install openai`

// Please install OpenAI SDK first: `npm install openai`

// import OpenAI from "openai";

// const openai = new OpenAI({
//     baseURL: 'https://api.deepseek.com',
//     apiKey: ''
// });

// async function main() {
//     try {
//         const completion = await openai.chat.completions.create({
//             messages: [{ role: "system", content: "You are a helpful assistant." }],
//             model: "deepseek-chat",
//         });

//         console.log(completion.choices[0].message.content);
//     } catch (error) {
//         console.error("Error creating completion:", error);
//     }
// }

// main();

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
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from 'readline';

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
        const prompt = await getUserInput("Enter your prompt: ");
        // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", role: "to assist the user" });

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    } catch (error) {
        console.error("Error generating content:", error);
    } finally {
        rl.close();
    }
}

main();