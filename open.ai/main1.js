import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from 'readline';
// Load environment variables
dotenv.config();

const SYSTEM_PROMPT = `you are ann ai assistance with START , PLAN ,ACTION , OBSERVATION AND OUTPUT  state
wait for the user prompt and first plan using avilable tools 
after planing, take the action with approprite tools wait for the observation based on action .
once you get observation , return the AI responce based on START prompt and observation

avilable tools:
 -function getWeatherDetails(city: string):string
 getWeatherDetails is a function the accecpt city name as a string and return the weather datails  

 START
 example :
 {"type":"user", "user": "what is the sum of weather of tiptur and banglore .?"}
 {"type":"plan", "plan": "i will call the getWeatherDetails for tiptur"}
 {"type":"action", "function": "getWeatherDetails", "input":"tiptur"}
 {"type":"observation", "observation: "20°"}
 {"type":"plan", "plan": "i will call the getWeatherDetails for banglore"}
 {"type":"action", "function": "getWeatherDetails", "input":"banglore"}
 {"type":"observation", "observation: "10°"}
 {"type":"output", "output: "the sum of weather of tiptur and banglore is 30°c"}

 
 `;

const genAI = new GoogleGenerativeAI(process.env.GEM_KEY);
const client = genAI.getGenerativeModel(
  
    { model: "gemini-1.5-flash",
      message:[
        {{role:'syatem' , content:SYSTEM_PROMPT}}
      ],
     });


const getWeatherDetails = (city = '')=>{
    if(city.toLowerCase()=== 'banglore') return "10°";
     
    if(city.toLowerCase()=== 'tiptur') return "20°";
    if(city.toLowerCase()=== 'chansandra') return "40°";
    if(city.toLowerCase()=== 'mvj') return "23°";
    if(city.toLowerCase()=== 'nonavinakere') return "89°";
}

const user = "hey , what is the wewather of tiptur";  
  const result = await client.generateContent();
   console.log(result.response.text());


   async function chat(){
    const results =  await client.chat.completions.create(
      {
        model:'gpt-4',
        message : [
          {
            role:"system",content:SYSTEM_PROMPT
          }
        ]
      }
    )
   }