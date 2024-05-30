class Pincelada{
  
  constructor(){
    //this.estado = new Estado();
    //this.cantPinceladas = 6;
    this.x = 10;
    this.y = 600;
    this.tinta = color(100,100,255);
    this.img = loadImage ("assets/p_1.png");
   /* for (let i = 0; i < this.cantPinceladas; i++) {
      this.piceladas[i] = loadImage("assets/p_"+nf(i, 2)+".png");
      */
    }
  
  actualizar(x_, y_, nuevoColor){
    this.x = x_;
    this.y = y_;
    this.tinta = nuevoColor
    this.dibujar();
  }
  reset(){
    this.x = -10;
  }
  
  dibujar (){
    this.img.mask(this.img);
    push();
    tint (this.tinta);
    imageMode(CENTER);
    image(this.img, this.x, this.y);
    pop();
    
  }
}
