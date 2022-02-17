//Gambar Baru
class gambar extends component{
  constructor(width, height, src, x, y, type){
    super(width, height, "", x, y, type);
    this.image = new Image();
    this.image.src = src; 
  }
}
