class render {
  constructor(ctx,komponen) {
    this.ctx = ctx;
    this.komponen = komponen;
  }

  rendering(object = this.komponen){
    if (object.type != "text" && object.type != "background"){
      this.ctx.save();
      this.ctx.translate(object.x, object.y);
      this.ctx.rotate(object.angle);
    }
    if (object.type == "background"){
      var i = object.y;
      var c = 0;
      do{
        this.ctx.drawImage(object.image,
          object.x,
          i,
          object.width, object.height);
        i -= object.height;
        c++;
      }while(c < 3);
    }
    else if (object.type == "image") {
      this.ctx.drawImage(object.image,
          object.width / -2,
          object.height / -2,
          object.width, object.height);
    }
    else if (object.type == "text") {
      this.ctx.font = object.size + " " + object.font; 
      this.ctx.fillStyle = object.color; 
      this.ctx.fillText(object.text, object.x, object.y); 
    }
    else {
      this.ctx.fillStyle = object.color;
      this.ctx.fillRect(object.width / -2, object.height / -2, object.width, object.height);
    }
    if (object.type != "text" && object.type != "background"){
      this.ctx.restore();
    }
  }
}
