class Mancha {

    constructor(imagen1,imagen2,imagen3,) {
        this.imagen1 = imagen1[round(random(6))];
        this.imagen2 = imagen2[round(random(6))];
        this.imagen3 = imagen3[round(random(5))];
        this.alpha = 255;
        this.velocidad = 2;
    }

    dibujar(x, y, esteWidth, esteHeight) {
        push();
        tint(255, this.alpha);
        noStroke();
        //rect(x, y, esteWidth, 410);
        image(this.imagen1, x, y, esteWidth, esteHeight);
        image(this.imagen2, x, y, esteWidth, esteHeight);
        image(this.imagen3, 0, 0, 470, 600);
        pop();
    }

    actualizar() {
        this.alpha -= this.velocidad;
    }

    check() {
        return this.alpha <= 0;
    }

}

class Trazo {

    constructor(imagen, miColor,canvas) {
        this.imagen = imagen;
        this.miColor = miColor;
        this.x = -100;
        this.y = random(350, 500);
        this.tamaño=200;
        this.maxTamaño= 800;
        this.canvas=canvas
        this.numeroTrazo=round(random(8));
        this.timer= random(50,100);
        //this.mascara= createGraphics(this.maxTamaño, 150);
        //this.mascara.background(0);
    }

    dibujar() {
       
      this.canvas.push();
      this.canvas.noStroke();
      this.canvas.tint(this.miColor);
      this.canvas.image(this.imagen[this.numeroTrazo],this.x,this.y,this.tamaño,this.tamaño);
      this.canvas.pop();
      if(this.timer<=0){
        this.numeroTrazo=round(random(8));
        this.timer = random(50,100);
      }else{
        this.timer--
      }
    }

    mover(velocidad) {
        this.x+=velocidad;
    }

    checkForOutOfBounds(){
        return this.x>width;
    }

}

class Dir_y_Vel {

    constructor() {
      this.posX = 0;
      this.posY = 0;
      this.prevPosX;
      this.prevPosY;
      this.miDireccionX;
      this.miDireccionY;
      this.vel;
      this.miDireccionPolar;
    }
  
    calcularTodo(mi_X, mi_Y) {
      this.prevPosX = this.posX;
      this.prevPosY = this.posY;
      this.posX = mi_X;
      this.posY = mi_Y;
  
      this.miDireccionX = this.posX - this.prevPosX;
      this.miDireccionY = this.posY - this.prevPosY;
      this.miDireccionPolar = degrees(atan2(this.posY - this.prevPosY, this.posX - this.prevPosX));
  
      this.vel = dist(this.posX, this.posY, this.prevPosX, this.prevPosY);
    }
  
  
    //////* ESTOS SON LOS METODOS QUE DEVUELVEN ALGO *///////
  
    velocidad() {
      return this.vel;
    }
    direccionX() {
      return this.miDireccionX;
    }
  
    direccionY() {
      return this.miDireccionY;
    }
  
  
    direccionPolar() {
      return this.miDireccionPolar;
    }
  
  
    //////* ESTO ES PARA DEBBUGGEAR LO QUE SE ESTA VIENDO *///////
  
    mostrarData() {
      textSize(24);
      fill(255);
      text("Velocidad: " + this.vel, 50, 50);
      text("Direccion X: " + this.miDireccionX, 50, 75);
      text("Direccion Y: " + this.miDireccionY, 50, 100);
      text("Direccion Polar: " + this.miDireccionPolar, 50, 125);
  
  
      push();
      noFill();
      stroke(255);
      strokeWeight(3);
      translate(width / 2, height / 2);
  
      ellipse(0, 0, 100, 100);
      rotate(radians(this.miDireccionPolar));
      line(0, 0, this.vel * 2, 0);
  
  
      pop();
    }
  
    ///////////// FIN DE LA CLASE  ///////
  }