class gerakan{
  constructor(obyek){
    this.obyek = obyek;
  }
  
  //Arah pergerakan 
  arah(dir, speed = 1, obyek = this.obyek){
    if (dir == "up"){obyek.speed = speed;}
    if (dir == "down"){obyek.speed = -speed;}
    if (dir == "left"){obyek.moveAngle = -speed;}
    if (dir == "right"){obyek.moveAngle  = speed;}
  }

  //Memberhentikan pergerakan 
  clearmove(obyek = this.obyek) {
    obyek.moveAngle = 0;
    obyek.speed = 0;
  }
}
