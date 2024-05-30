let unColor;
function setup() {
  createCanvas(800,800);
  pincelada = new Pincelada();

}


function draw() {
  pincelada.dibujar();
}

function mousePressed(){
  push();
  colorMode( HSB );
  let r = random(255);
  let unColor = color(r , 255 , 255 );
  pop();
  pincelada.actualizar(mouseX , mouseY, unColor );
}
