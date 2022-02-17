<?php
//Memanggil data
class DB {

  var $db_host     = ''; 
  var $db_user     = ''; 
  var $db_password = ''; 
  var $db_name     = ''; 
  var $db_link     = ''; 
  var $result      = 0;  

  function DB($db_host='', $db_user='', $db_password='', $db_name='') {
    $this->db_host     = $db_host;
    $this->db_user     = $db_user;
    $this->db_password = $db_password;
    $this->db_name     = $db_name;
  }

  function open() {
    $this->db_link = new mysqli($this->db_host, $this->db_user, $this->db_password, $this->db_name);
  }

  function execute($query="") {
    $this->result = $this->db_link->query($query);
    return $this->result;
  }

  function getResult() {
    return mysqli_fetch_array($this->result);
  }

  function close() {
    mysqli_close($this->db_link);
  }

}

 ?>
