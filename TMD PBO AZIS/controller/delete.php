<?php
  //Menghapus data
  include("../conf.php");
  include("../view/View.class.php");
  include("../model/DB.class.php");
  include("../model/Player.class.php");

  $pengguna = new Player($db_host, $db_user, $db_password, $db_name);
  $pengguna->open();
  $pengguna->delPlayer($_GET['id']);
  $pengguna->close();
  header("Location: ../index.php");
 ?>
