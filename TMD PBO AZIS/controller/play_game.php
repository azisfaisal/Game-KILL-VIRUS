<?php
//Memulai game
include("../view/View.class.php");

session_start();
if (!isset($_SESSION['token']) || $_SESSION['token'] != "ceritanya_token_12321"){
  header("Location: ../index.php");
}

$tampil = new View("../view/play.html");
$tampil->replace("USERNAME", $_SESSION['username']);
$tampil->write();

unset($_SESSION['token']);
 ?>
