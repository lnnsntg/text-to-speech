const dotenv = require('dotenv')
require('dotenv').config()

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

const text = fs.readFileSync('texto.txt', 'utf-8')



async function quickStart() {
  // The text to synthesize

  // Construct the request
  const request = {

    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: {
      languageCode: "en-US",
      name: "en-US-Neural2-J"
    },
    // select the type of audio encoding
    audioConfig: {
      audioEncoding: 'MP3',
      effectsProfileId: ["small-bluetooth-speaker-class-device"],
      pitch: 0,
      speakingRate: 0.9
    },
  };
let title = "Yellowstone National Park"
  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(`./audios/${title}.mp3`, response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}
quickStart();