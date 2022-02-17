<?php
//Mengambil data player
class Player extends DB {
  function getPlayer($username="") {
    if ($username == "") {
      $query = "SELECT * FROM tpeace ORDER BY peace DESC";
    }
    else {
      $query = "SELECT * FROM tpeace WHERE username='$username'";
    }
    return $this->execute($query);
  }

  function postPlayer($username='', $peace=0) {
    $query = "INSERT INTO tpeace(username,peace) VALUES('$username',$peace)";
    $this->execute($query);
  }

  function putPlayer($username='', $peace=0) {
    $query = "UPDATE tpeace SET peace=$peace WHERE username='$username'";
    $this->execute($query);
  }


}

 ?>
