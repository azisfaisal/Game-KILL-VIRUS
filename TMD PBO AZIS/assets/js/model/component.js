class component {
  constructor(width, height, color, x, y, type) {
    this.type = type;
    this.color = color;

    //Ukuran objek
    this.width = width;
    this.height = height;

    this.angle = 0;
    this.moveAngle = 0;
    this.speed = 0;
    //Kecepatan objek
    this.speedX = 0;
    this.speedY = 0;

    this.crash = 0;

    //Lokasi objek
    this.x = x;
    this.y = y;
  }

  newPos(){
    if (this.type == "background") { 
      this.y += this.speedY;
      if (this.y == this.height) {
        this.y = 0;
      }
    }else{ 
      this.angle += this.moveAngle * Math.PI / 180;
      this.x += this.speed * Math.sin(this.angle);
      this.y -= this.speed * Math.cos(this.angle);
    }
  }

  crashWith(otherobj){
    var myleft = this.x - (this.width/2);
    var myright = this.x + (this.width/2);
    var mytop = this.y - (this.height/2);
    var mybottom = this.y + (this.height/2);
    var otherleft = otherobj.x - (otherobj.width/2);
    var otherright = otherobj.x + (otherobj.width/2);
    var othertop = otherobj.y - (otherobj.height/2);
    var otherbottom = otherobj.y + (otherobj.height/2);
    var crash = true;

    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}
