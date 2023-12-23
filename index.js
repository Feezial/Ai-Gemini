// node --version # Should be >= 18
// npm install @google/generative-ai
const prompt = require('prompt-sync')({ encoding: 'utf-8' });;
const fs = require('fs');
const Jsondata = require('./config.json');

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-pro";
  const API_KEY = Jsondata.apikey;
  
  async function run() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 1,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ];

    const ascii = `
    ███████╗██╗██╗░░░░░███████╗  ░█████╗░██╗
    ╚════██║██║██║░░░░░██╔════╝  ██╔══██╗██║
    ░░███╔═╝██║██║░░░░░█████╗░░  ███████║██║
    ██╔══╝░░██║██║░░░░░██╔══╝░░  ██╔══██║██║
    ███████╗██║███████╗███████╗  ██║░░██║██║
    ╚══════╝╚═╝╚══════╝╚══════╝  ╚═╝░░╚═╝╚═╝
    `;
    console.log(ascii);
    console.log("   ")
    const Save = prompt('Do you want it to Save Answer Yes/No:');
    const parts = [
      {text:  prompt('AI: ')},
    ];
    console.log('i Think Wait Second...')
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
  
    const response = result.response;
    if( Save == 'No' || Save == 'N' || Save == 'n' ){

    }else if(Save == 'Yes' || Save == 'Y' || Save == 'y'){
        await fs.writeFileSync("message.txt", response.text(), {encoding: 'utf-8'})
    }
    console.log(response.text());
  }
  
async function main() {
  while (true) {
    await run();
    const continuePrompt = prompt('Do you want to continue? (Yes/No): ');
    if (!(continuePrompt.toLowerCase() === 'yes' || continuePrompt.toLowerCase() === 'y')) {
      break;
    }
  }
}

main();