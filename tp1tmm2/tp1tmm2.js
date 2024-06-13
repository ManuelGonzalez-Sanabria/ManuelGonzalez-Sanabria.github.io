
let monitorear = false;

let FREC_MIN = 87.307;
let FREC_MAX = 1046.502;

let AMP_MIN = 0.001;
let AMP_MAX = 0.4;


let mic;
let pitch;
let audioContext;

let gestorAmp;
let gestorPitch;

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let mancha;
let trazo = [];
let timer = 50;
let imagenes = []
imagenes[0] = [];
imagenes[1] = [];
imagenes[2] = [];
let imagenTrazo;
let cantidad = 3;
let colores;

function setup() {
  createCanvas(470, 600);

  
  audioContext = getAudioContext(); // inicia el motor de audio
  mic = new p5.AudioIn(); // inicia el micrófono
  mic.start(startPitch); // se enciende el micrófono y le transmito el analisis de frecuencia (pitch) al micrófono. Conecto la libreria con el micrófono


  userStartAudio();// por la dudas para forzar inicio de audio en algunos navegadores

  gestorAmp =  new GestorSenial( AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial( FREC_MIN, FREC_MAX);

  colores =[color('#396ad0'), color('#065417'), color('#604c49')];
}

function preload() {
  
  for (let i = 1; i < 7; i++) {
    imagenes[0][i-1] = loadImage("data/TP1_Motherwell_btm_" + i + ".png");
  }
    
  for (let i = 1; i < 7; i++) {
    imagenes[1][i-1] = loadImage("data/TP1_Motherwell_top_" + i + ".png");
  }
  for (let i = 1; i < 5; i++) {
    imagenes[2][i-1] = loadImage("data/TP1_Motherwell_gotas_" + i + ".png");
  }
  imagenTrazo = loadImage("data/trazo2.png");
  
}
let pausa = true;

function draw() {
  //if (frameCount % 600 == 0)
    //background(255);

  let vol = mic.getLevel(); // cargo en vol la amplitud del micrófono (señal cruda);
  gestorAmp.actualizar(vol);
  let frecuencia = map(gestorPitch.filtrada, 0, 1, 0, 1000);
  let amp = map(gestorAmp.filtrada, 0, 1, 0, 1000);
  console.log(frecuencia);
  if (amp>=10 && (frecuencia>=300) && timer <= 0) {
    if (pausa) {
      if (mancha != undefined) {
        mancha = undefined;
      }
      if (mancha == undefined) {
        mancha = new Mancha(imagenes[0],imagenes[1],imagenes[2]);
        timer = 100;
      }
    }
    pausa = false
  } else {
    pausa = true
  }
  timer -= 1;
  if (mancha != undefined) {
    mancha.dibujar(0, 0, width, 500);
    mancha.actualizar();
  }
  if ((frecuencia<=299 && frecuencia>=87.307) && timer <= 0 ) {
    for (let i = 0; i < cantidad; i++) {
      if (trazo[i] == undefined) {
        trazo[i] = new Trazo(imagenTrazo, colores[round(random(2))]);
        timer = 100;
        break;
      }
      if (trazo[i].checkForOutOfBounds()) {
        trazo[i] = undefined;
      }
    }
  }

  for (let i = 0; i < cantidad; i++) {
    if (trazo[i] != undefined) {
      trazo[i].dibujar();
      trazo[i].mover(amp / 100 + 1);
    }
  }
  //console.log(trazo.checkForOutOfBounds());
  push();
  fill(255, 5)
  noStroke();
  rect(0, 0, width, height);
  pop();

  if(monitorear){
    gestorAmp.dibujar(100, 100);
    gestorPitch.dibujar(100, 300);
  }
}

// ---- Pitch detection ---
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {

      gestorPitch.actualizar(frequency);    
    } 
    getPitch();
  })
}
