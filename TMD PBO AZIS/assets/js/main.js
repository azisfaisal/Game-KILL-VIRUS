// Komponen musuh
var jetMusuh = [];
var gerakMusuh;
var ammoMusuh = [];
var titikMusuh = [];
var jetMusuhCrash = [];

// Komponen player 1
var jetplayer;
var gerakPlayer;
var ammoPlayer = [];
var titikPlayer;

// Komponen player 2
var jetplayer2;
var gerakPlayer2;
var ammoPlayer2 = [];
var titikPlayer2;

// Komponen tulisan 1
var ammoJml;
var score;
var total;
var berhenti;
var note;

// Komponen tulisan 2
var ammoJml2;
var score2;
var total2;
var berhenti2;
var note2;

var background; 

// Komponen musik
var backgroundMusic;
var gerakjet;
var titikP;
var crash;
var soundPause;

var object;

//Memulai game
function startGame(){
  backgroundMusic = new sound("../assets/audio/game.mp3","loop");
  gerakjet = new sound("../assets/audio/gerak.mp3");
  titikP = new sound("../assets/audio/laser.mp3");
  crash = new sound("../assets/audio/hancur.mp3");
  soundPause = new sound("../assets/audio/pause.mp3");
  backgroundMusic.play();

  jetplayer = new gambar(60, 60, "../assets/img/jet1.png", 200, 410, "image");
  titikPlayer = new component(5, 3, "#080030", 200, 398);
  gerakPlayer = new gerakan(jetplayer);
  gerakMusuh = new gerakan();
    
  jetplayer2 = new gambar(60, 60, "../assets/img/jet2.png", 600, 410, "image");
  titikPlayer2 = new component(5, 3, "#080030", 600, 398);
  gerakPlayer2 = new gerakan(jetplayer2);

  ammoJml = new tulisan("20px", "Consolas", "black", 10, 435);
  score = new tulisan("30px", "Consolas", "black", 10, 30);
  total = new tulisan("20px", "Consolas", "black", 10, 60);
  berhenti = new tulisan("50px", "Consolas", "black", 330, 230);
  note = new tulisan("20px", "Consolas", "black", 175, 255);
    
  ammoJml2 = new tulisan("20px", "Consolas", "black", 650, 435);
  score2 = new tulisan("30px", "Consolas", "black", 600, 30);
  total2 = new tulisan("20px", "Consolas", "black", 600, 60);
  berhenti2 = new tulisan("50px", "Consolas", "black", 330, 230);
  note2 = new tulisan("20px", "Consolas", "black", 175, 255);

  background = new gambar(800, 451, "../assets/img/langit.jpg", 0, 0, "background");
  myGameArea.start(); 
}


var myGameArea = {
  canvas : document.createElement("canvas"), 
  start : function(){
    this.canvas.width = 800; 
    this.canvas.height = 450; 
    this.context = this.canvas.getContext("2d"); 
    document.body.insertBefore(this.canvas, document.body.childNodes[0]); 
    this.frameNo = 0;

    this.gamepaused = false; 
    this.gameended = false;

    this.interval = setInterval(prosesUpdate, 20); 

    window.addEventListener('keydown', function (e) {
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.keys[e.keyCode] = (e.type == "keydown");
    })

  },

  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  //Memberhentikan game
  stop : function() {
    clearInterval(this.interval);
  }
}
