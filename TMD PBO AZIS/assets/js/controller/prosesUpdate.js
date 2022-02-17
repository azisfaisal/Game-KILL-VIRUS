var ammoP = 20; 
var isi = false; 
var hit = 0; 
var hitMax = 0; 
var move = 1; 
var batasP = 0; 

var ammoP2 = 20;
var isi2 = false; 
var hit2 = 0; 
var hitMax2 = 0; 
var move2 = 1; 
var batasP2 = 0; 

function everyinterval(n) {
  if (myGameArea.frameNo % n == 0) {return true;}
  return false;
}


function prosesUpdate() {
  object = new render(myGameArea.context); 

  gerakjet.stop();
  if (myGameArea.gameended){
    //Game over
    if (myGameArea.keys && myGameArea.keys[32]){
      myGameArea.stop(); 
      location.replace("update.php?peace="+hitMax); 
    }
    return;
  } else
  //Game di dalam kondisi pause
  if (myGameArea.gamepaused){
    if (myGameArea.keys && (myGameArea.keys[37] || myGameArea.keys[39] || myGameArea.keys[38] || myGameArea.keys[40])){
      myGameArea.gamepaused = !myGameArea.gamepaused;
      soundPause.play(); 
      backgroundMusic.play(); 
    }else
    if (myGameArea.keys && myGameArea.keys[27]){
      myGameArea.stop();
      location.replace("update.php?peace="+hitMax);
    }
    return;
  }
  //permainan berlangsung
  else {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    background.speedY = 1;
    background.newPos();
    object.rendering(background);
    if (batasP > 0 && batasP <= 5){
      batasP++;
    }else{
      batasP = 0;
    }
      
    if (batasP2 > 0 && batasP2 <= 5){
      batasP2++;
    }else{
      batasP2 = 0;
    }

    //Musuh saling bertabrakan, salah satu nya akan hilang
    for (c = 0 ; c < jetMusuhCrash.length ; c++){
      jetMusuhCrash[c].newPos();
      object.rendering(jetMusuhCrash[c]);
      if (jetMusuhCrash[c].y > jetMusuhCrash[c].crash){
        jetMusuhCrash.splice(c,1);
      }
    }

    gerakPlayer.clearmove(); 
    gerakPlayer2.clearmove(); 

    var x,y; 
    var val; 

    //Membuat musuh
    val = Math.floor((Math.random()*80)+20); 
    if ((myGameArea.frameNo == 1 || everyinterval(val))){
      x = Math.floor((Math.random()*770)+15); 
      y = -15; 
      jetMusuh.push(new gambar(40,40,"../assets/img/virus.gif", x, y, "image"));
      titikMusuh.push(new component(5,3, "black",x,y+10));
      jetMusuh[jetMusuh.length-1].angle = 180 * Math.PI / 180;
      jetMusuh[jetMusuh.length-1].speedY = Math.floor((Math.random()*1)+2); 
      do{
        jetMusuh[jetMusuh.length-1].speedX = Math.floor((Math.random()*4)+2); 
      }while(jetMusuh[jetMusuh.length-1].speedX == jetMusuh[jetMusuh.length-1].speedY);
    }
    val = Math.floor((Math.random()*30)+(20-jetMusuh.length)); 
    if (everyinterval(val)){
      val = Math.floor(Math.random()*(jetMusuh.length-1)); 
      x = jetMusuh[val].x;
      y = jetMusuh[val].y + 30;

      //Membuat peluru musuh
      ammoMusuh.push(new gambar(10,10,"../assets/img/bullet_red.png",x,y,"image"));
      ammoMusuh[ammoMusuh.length-1].angle = 180 * Math.PI / 180; 
      ammoMusuh[ammoMusuh.length-1].speedY = jetMusuh[val].speedX; 
    }

    //Menampilkan jet musuh
    for (c = 0 ; c < jetMusuh.length ; c++){
      gerakMusuh.arah("up", jetMusuh[c].speedY,jetMusuh[c]);
      titikMusuh[c].angle = jetMusuh[c].angle;
      x = jetMusuh[c].x;
      y = jetMusuh[c].y;
      x += (jetMusuh[c].speed + 12) * Math.sin(jetMusuh[c].angle);
      y -= (jetMusuh[c].speed + 12) * Math.cos(jetMusuh[c].angle);
      titikMusuh[c].x = x;
      titikMusuh[c].y = y;
      gerakjet.play(); 
      jetMusuh[c].newPos(); 
      object.rendering(jetMusuh[c]);
      titikMusuh[c].newPos(); 
      object.rendering(titikMusuh[c]);

      //Musuh sudah melewati batas 
      if (jetMusuh[c].y > 450){
        jetMusuh.splice(c,1);
        titikMusuh.splice(c,1);
        hit-=2; 
      }
    }

    //Menampilkan peluru musuh
    for (c = 0 ; c < ammoMusuh.length ; c++){
      gerakMusuh.arah("up", ammoMusuh[c].speedY, ammoMusuh[c]);
      ammoMusuh[c].newPos(); 
      object.rendering(ammoMusuh[c]);
      if (ammoMusuh[c].y > 450){
        ammoMusuh.splice(c,1);
      }
    }

    //Melakukan reload peluru
    if (ammoP == 0 && myGameArea.keys && myGameArea.keys[82]){
      isi = true;
    }
    if (isi && everyinterval(5)){
      ammoP++; 
      if (ammoP == 20){ isi = !isi; } 
    }
      
    if (ammoP2 == 0 && myGameArea.keys && myGameArea.keys[79]){
      isi2 = true;
    }
    if (isi2 && everyinterval(5)){
      ammoP2++; 
      if (ammoP2 == 20){ isi2 = !isi2; } 
    }

    //Menekan tombol menembak (T)
    if (!isi && ammoP > 0 && myGameArea.keys && myGameArea.keys[84] && batasP == 0){
      x = jetplayer.x;
      y = jetplayer.y;
      x += (jetplayer.speed + 30) * Math.sin(jetplayer.angle);
      y -= (jetplayer.speed + 30) * Math.cos(jetplayer.angle);
      ammoP--;
      titikP.play(); 
      ammoPlayer.push(new gambar(10,10, "../assets/img/bullet_blue.png", x, y, "image")); 
      ammoPlayer[ammoPlayer.length-1].angle = jetplayer.angle; 
      batasP = 1;
    }
      //Menekan tombol menembak (P)
    if (!isi2 && ammoP2 > 0 && myGameArea.keys && myGameArea.keys[80] && batasP2 == 0){
      x = jetplayer2.x;
      y = jetplayer2.y;
      x += (jetplayer2.speed + 30) * Math.sin(jetplayer2.angle);
      y -= (jetplayer2.speed + 30) * Math.cos(jetplayer2.angle);
      ammoP2--; 
      titikP.play(); 
      ammoPlayer2.push(new gambar(10,10, "../assets/img/bullet_blue.png", x, y, "image")); 
      ammoPlayer2[ammoPlayer2.length-1].angle = jetplayer2.angle; 
      batasP2 = 1;
    }
      
    for (i = 0 ; i < ammoPlayer.length ; i++){
      gerakPlayer.arah("up", 4, ammoPlayer[i]); 
      ammoPlayer[i].newPos(); 
      ammoPlayer[i].y++;
      object.rendering(ammoPlayer[i]);
      for (c = 0 ; c < jetMusuh.length ; c++){
        if (jetMusuh[c].crashWith(ammoPlayer[i])){
          jetMusuh[c].image.src = "../assets/img/jet1.png";
          jetMusuh[c].speed = 1;
          jetMusuh[c].crash = jetMusuh[c].y + 60;
          jetMusuhCrash.push(jetMusuh[c]);
          jetMusuh.splice(c,1);
          ammoPlayer.splice(i,1);
          hit+=3; 
        }
      }

      //Peluru player mengenai peluru musuh
      for (c = 0 ; c < ammoMusuh.length ; c++){
        if (ammoMusuh[c].crashWith(ammoPlayer[i])){
          ammoPlayer.splice(i,1);
          ammoMusuh.splice(c,1);
        }
      }
      if (ammoPlayer[i].y < 0 || ammoPlayer[i].y > 450 || ammoPlayer[i].x < 0 || ammoPlayer[i].x > 800){
        ammoPlayer.splice(i, 1);
      }
    }
      
    for (i = 0 ; i < ammoPlayer2.length ; i++){
      gerakPlayer2.arah("up", 4, ammoPlayer2[i]);
      ammoPlayer2[i].newPos();
      ammoPlayer2[i].y++;
      object.rendering(ammoPlayer2[i]);
      for (c = 0 ; c < jetMusuh.length ; c++){
        if (jetMusuh[c].crashWith(ammoPlayer2[i])){
          jetMusuh[c].image.src = "../assets/img/jet2.png";
          jetMusuh[c].speed = 1;
          jetMusuh[c].crash = jetMusuh[c].y + 60;
          jetMusuhCrash.push(jetMusuh[c]);
          jetMusuh.splice(c,1);
          ammoPlayer2.splice(i,1);
          hit2+=3; 
        }
      }

      //Peluru player mengenai peluru musuh
      for (c = 0 ; c < ammoMusuh.length ; c++){
        if (ammoMusuh[c].crashWith(ammoPlayer2[i])){
          ammoPlayer2.splice(i,1);
          ammoMusuh.splice(c,1);
        }
      }
      if (ammoPlayer2[i].y < 0 || ammoPlayer2[i].y > 450 || ammoPlayer2[i].x < 0 || ammoPlayer2[i].x > 800){
        ammoPlayer2.splice(i, 1);
      }
    }
      
    //Perintah untuk menggerakkan jet
    //Jet berputar ke kanan
    if (myGameArea.keys && myGameArea.keys[65]) {
      if (move == 1){
        gerakPlayer.arah("left",3);
      }else{
        gerakPlayer.arah("right",3);
      }
      titikPlayer.angle = jetplayer.angle;
      x = jetplayer.x;
      y = jetplayer.y;
      x += (jetplayer.speed + 12) * Math.sin(jetplayer.angle);
      y -= (jetplayer.speed + 12) * Math.cos(jetplayer.angle);
      titikPlayer.x = x;
      titikPlayer.y = y;
      gerakjet.play();
    }
    //Jet berputar ke kiri
    if (myGameArea.keys && myGameArea.keys[68]) {
      if (move != 1){
        gerakPlayer.arah("left",3);
      }else{
        gerakPlayer.arah("right",3);
      }
      titikPlayer.angle = jetplayer.angle;
      x = jetplayer.x;
      y = jetplayer.y;
      x += (jetplayer.speed + 12) * Math.sin(jetplayer.angle);
      y -= (jetplayer.speed + 12) * Math.cos(jetplayer.angle);
      titikPlayer.x = x;
      titikPlayer.y = y;
      gerakjet.play(); 
    }
      
      move = 1; 
    //Menggerakkan jet player maju
    if (myGameArea.keys && myGameArea.keys[87]) {
      if (jetplayer.y-(20*Math.cos(jetplayer.angle)) > 0 && jetplayer.y-(20*Math.cos(jetplayer.angle)) < 449  && jetplayer.x + (20*Math.sin(jetplayer.angle)) > 0 && jetplayer.x + (20*Math.sin(jetplayer.angle)) < 799){
        move = 1;
        gerakPlayer.arah("up",3);
        gerakjet.play();
      }
      titikPlayer.angle = jetplayer.angle;
      x = jetplayer.x;
      y = jetplayer.y;
      x += (jetplayer.speed + 12) * Math.sin(jetplayer.angle);
      y -= (jetplayer.speed + 12) * Math.cos(jetplayer.angle);
      titikPlayer.x = x;
      titikPlayer.y = y;
    }
    //Menggerakkan jet player mundur
    if (myGameArea.keys && myGameArea.keys[83]) {
      if (jetplayer.y-((-20)*Math.cos(jetplayer.angle)) > 0 && jetplayer.y-((-20)*Math.cos(jetplayer.angle)) < 449 && jetplayer.x + ((-20)*Math.sin(jetplayer.angle)) > 0 && jetplayer.x + ((-20)*Math.sin(jetplayer.angle)) < 799){
        move = -1;
        gerakPlayer.arah("down",3);
        gerakjet.play();
      }
      titikPlayer.angle = jetplayer.angle;
      x = jetplayer.x;
      y = jetplayer.y;
      x += (jetplayer.speed + 12) * Math.sin(jetplayer.angle);
      y -= (jetplayer.speed + 12) * Math.cos(jetplayer.angle);
      titikPlayer.x = x;
      titikPlayer.y = y;
    }

    if (jetplayer.y <= 410){
      jetplayer.y++;
      titikPlayer.y++;
    }
      
      
      
    //Perintah untuk menggerakkan jet 2
    //Jet berputar ke kanan
    if (myGameArea.keys && myGameArea.keys[37]) {
      if (move2 == 1){
        gerakPlayer2.arah("left",3);
      }else{
        gerakPlayer2.arah("right",3);
      }
      titikPlayer2.angle = jetplayer2.angle;
      x = jetplayer2.x;
      y = jetplayer2.y;
      x += (jetplayer2.speed + 12) * Math.sin(jetplayer2.angle);
      y -= (jetplayer2.speed + 12) * Math.cos(jetplayer2.angle);
      titikPlayer2.x = x;
      titikPlayer2.y = y;
      gerakjet.play();
    }
    //Jet berputar ke kiri
    if (myGameArea.keys && myGameArea.keys[39]) {
      if (move2 != 1){
        gerakPlayer2.arah("left",3);
      }else{
        gerakPlayer2.arah("right",3);
      }
      titikPlayer2.angle = jetplayer2.angle;
      x = jetplayer2.x;
      y = jetplayer2.y;
      x += (jetplayer2.speed + 12) * Math.sin(jetplayer2.angle);
      y -= (jetplayer2.speed + 12) * Math.cos(jetplayer2.angle);
      titikPlayer2.x = x;
      titikPlayer2.y = y;
      gerakjet.play();
    }
      
      move2 = 1;
    //Menggerakkan jet player maju
    if (myGameArea.keys && myGameArea.keys[38]) {
      if (jetplayer2.y-(20*Math.cos(jetplayer2.angle)) > 0 && jetplayer2.y-(20*Math.cos(jetplayer2.angle)) < 449  && jetplayer2.x + (20*Math.sin(jetplayer2.angle)) > 0 && jetplayer2.x + (20*Math.sin(jetplayer2.angle)) < 799){
        move2 = 1;
        gerakPlayer2.arah("up",3);
        gerakjet.play();
      }
      titikPlayer2.angle = jetplayer2.angle;
      x = jetplayer2.x;
      y = jetplayer2.y;
      x += (jetplayer2.speed + 12) * Math.sin(jetplayer2.angle);
      y -= (jetplayer2.speed + 12) * Math.cos(jetplayer2.angle);
      titikPlayer2.x = x;
      titikPlayer2.y = y;
    }
    //Menggerakkan jet player mundur
    if (myGameArea.keys && myGameArea.keys[40]) {
      if (jetplayer2.y-((-20)*Math.cos(jetplayer2.angle)) > 0 && jetplayer2.y-((-20)*Math.cos(jetplayer2.angle)) < 449 && jetplayer2.x + ((-20)*Math.sin(jetplayer2.angle)) > 0 && jetplayer2.x + ((-20)*Math.sin(jetplayer2.angle)) < 799){
        move2 = -1;
        gerakPlayer2.arah("down",3);
        gerakjet.play();
      }
      titikPlayer2.angle = jetplayer2.angle;
      x = jetplayer2.x;
      y = jetplayer2.y;
      x += (jetplayer2.speed + 12) * Math.sin(jetplayer2.angle);
      y -= (jetplayer2.speed + 12) * Math.cos(jetplayer2.angle);
      titikPlayer2.x = x;
      titikPlayer2.y = y;
    }

    if (jetplayer2.y <= 410){
      jetplayer2.y++;
      titikPlayer2.y++;
    }

  
    jetplayer.newPos(); 
    jetplayer2.newPos(); 
    object.rendering(jetplayer);
    object.rendering(jetplayer2);
    titikPlayer.newPos();
    titikPlayer2.newPos();
    object.rendering(titikPlayer);
    object.rendering(titikPlayer2);

    //Sisa amunisi yang tersedia
    ammoJml.text = "AMMO P1: " + ammoP;
    ammoJml2.text = "AMMO P2: " + ammoP2;
    object.rendering(ammoJml);
    object.rendering(ammoJml2);

    //Score maksimal 
    if (hit > hitMax){
      hitMax = hit;
    }
      
    if (hit2 > hitMax2){
      hitMax2 = hit2;
    }
    //Score player
    score.text = "SCORE P1: " + hit;
    object.rendering(score);
    total.text = "TOTAL SCORE: " + hitMax;
    object.rendering(total);
      
      //Score player2
    score2.text = "SCORE P2: " + hit2;
    object.rendering(score2);
    total2.text = "TOTAL SCORE: " + hitMax2;
    object.rendering(total2);

    //Peluru musuh yang mengenai jet player
    for (c = 0 ; c < ammoMusuh.length ; c++){
      if (jetplayer.crashWith(ammoMusuh[c]) || titikPlayer.crashWith(ammoMusuh[c])){
        berhenti.text = "GAME OVER";
        berhenti.x -= 55;
        object.rendering(berhenti);
        note.x -= 10;
        note.text = "(Tekan spasi untuk keluar dari permainan)";
        object.rendering(note);
        myGameArea.gameended = !myGameArea.gameended;
        crash.play(); 
        backgroundMusic.stop();
      }
        
      //Peluru yang mengenai jet player2
    if (jetplayer2.crashWith(ammoMusuh[c]) || titikPlayer2.crashWith(ammoMusuh[c])){
        berhenti2.text = "GAME OVER";
        berhenti2.x -= 55;
        object.rendering(berhenti2);
        note2.x -= 10;
        note2.text = "(Tekan spasi untuk keluar dari permainan)";
        object.rendering(note2);
        myGameArea.gameended = !myGameArea.gameended;
        crash.play(); 
        backgroundMusic.stop();
      }
    }
      


    //Jet yang bertabrakan
    for (c = 0 ; c < jetMusuh.length ; c++){
      for (d = c+1 ; d < jetMusuh.length ; d++){
        if (jetMusuh[c].crashWith(jetMusuh[d]) || titikMusuh[c].crashWith(jetMusuh[d])){
          jetMusuh.splice(c,1);
          titikMusuh.splice(c,1);
          jetMusuh.splice(d,1);
        }
      }
      //Jet musuh yang menabrak jet player
      if (jetplayer.crashWith(jetMusuh[c]) || titikPlayer.crashWith(jetMusuh[c]) || titikPlayer.crashWith(titikMusuh[c])){
        berhenti.text = "GAME OVER";
        berhenti.x -= 55;
        object.rendering(berhenti);
        note.x -= 10;
        note.text = "(Tekan spasi untuk keluar dari permainan)";
        object.rendering(note);
        myGameArea.gameended = !myGameArea.gameended;
        crash.play(); 
        backgroundMusic.stop();
      }
        
        //Jet musuh yang menabrak jet player 2
      if (jetplayer2.crashWith(jetMusuh[c]) || titikPlayer2.crashWith(jetMusuh[c]) || titikPlayer2.crashWith(titikMusuh[c])){
        berhenti2.text = "GAME OVER";
        berhenti2.x -= 55;
        object.rendering(berhenti2);
        note2.x -= 10;
        note2.text = "(Tekan spasi untuk keluar dari permainan)";
        object.rendering(note2);
        myGameArea.gameended = !myGameArea.gameended;
        crash.play();
        backgroundMusic.stop();
      }
        
    }

    //Score kurang dari 0
    if (hit < 0){
      berhenti.text = "GAME OVER";
      berhenti.x -= 55;
      object.rendering(berhenti);
      note.x -= 10;
      note.text = "(Tekan spasi untuk keluar dari permainan)";
      object.rendering(note);
      myGameArea.gameended = !myGameArea.gameended;
      backgroundMusic.stop();
      return;
    }

    //Player menekan tombol pause (spasi)
    if (myGameArea.keys && myGameArea.keys[32]){
      berhenti.text = "PAUSE";
      object.rendering(berhenti);
      note.text = "(Gerakkan Pasawat untuk kembali ke permainan)";
      object.rendering(note);
      myGameArea.gamepaused = !myGameArea.gamepaused;
      soundPause.play();
      backgroundMusic.stop();
    }
      
  }
}
