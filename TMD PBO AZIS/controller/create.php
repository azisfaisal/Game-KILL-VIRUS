<?php
  //Manyatukan data
  if ($_POST['username'] != ""){
    session_start();
    include("../conf.php");
    include("../view/View.class.php");
    include("../model/DB.class.php");
    include("../model/Player.class.php");

    $player = new Player($db_host, $db_user, $db_password, $db_name);
    $player->open();
    $player->postPlayer($_POST['username']);
    $player->close();
    $_SESSION['username'] = $_POST['username'];
    $_SESSION['token'] = "ceritanya_token_12321";
    header("Location: play_game.php");
  }else{
    header("Location: ../index.php");
  }
 ?>
