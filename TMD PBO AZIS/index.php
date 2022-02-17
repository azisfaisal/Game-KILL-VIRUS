<?php

  include("conf.php");
  include("./view/View.class.php");
  include("./model/DB.class.php");
  include("./model/Player.class.php");

  $player = new Player($db_host, $db_user, $db_password, $db_name);
  $player->open(); 
  $data = null;

  $tpl = new View("view/menu.html");

  $player->getPlayer();
  while (list($username, $peace) = $player->getResult()){
    $data .= '<tr>
                <td align="center" style="width:200px;">'.$username.'</td>
                <td align="center" style="width:100px;">'.$peace.'</td>
              </tr>';
  }

  $player->close();
  $tpl->replace("DATA_TABEL", $data);
  $tpl->write();

 ?>
