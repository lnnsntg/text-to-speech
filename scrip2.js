const dotenv = require('dotenv')
require('dotenv').config()
// Importa el paquete de cliente de Google Cloud y crea un cliente
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();

// Configura la solicitud de síntesis de voz
const request = {
  input: {text: 'Hola, este es un ejemplo de texto para sintetizar en voz.'},
  voice: {languageCode: 'es-ES', ssmlGender: 'NEUTRAL'},
  audioConfig: {audioEncoding: 'MP3'},
};

// Realiza la síntesis de voz
client.synthesizeSpeech(request, (err, response) => {
  if (err) {
    console.error('Error al sintetizar la voz:', err);
    return;
  }
  // Guarda el audio en un archivo
  require('fs').writeFileSync('audio-scrip2.mp3', response.audioContent, 'binary');
  console.log('Audio guardado en output.mp3');
});
