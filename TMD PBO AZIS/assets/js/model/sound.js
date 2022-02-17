//Memuat Musik
class sound {
  constructor(src, type) {
    this.sound = document.createElement("audio");
    this.sound.src = src; 
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");

    if(type == "loop"){this.sound.loop = true; } 
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }

  play(){
    this.sound.play();
  }

  stop(){
    this.sound.pause();
  }
}
