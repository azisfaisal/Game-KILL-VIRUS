<?php
  //Update game
  session_start();
  include("../conf.php");
  include("../view/View.class.php");
  include("../model/DB.class.php");
  include("../model/Player.class.php");

  $player = new Player($db_host, $db_user, $db_password, $db_name);
  $player->open();
  $player->getPlayer($_SESSION['username']);
  $isiData = $player->getResult();
  if ($isiData['peace'] < $_GET['peace']){
    $player->putPlayer($_SESSION['username'], $_GET['peace']);
  }
  $player->close();
  session_destroy();
  header("Location: ../index.php");
 ?>
