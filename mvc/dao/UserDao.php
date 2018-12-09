<?php

/**
 * Classe user DAO
 * Class UserDao
 * @package dao
 */

class UserDao
{

    private $conn;

    //UserStatus
    const ATIVO = 1;
    const EXCLUIDO = 2;

    public function __construct()
    {
        try {
            $this->conn = Connection::open(Connection::DB_MYSQL);
        } catch (PDOException $exception) {
            echo $exception->getMessage();
        }
    }


}