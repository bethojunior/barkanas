<?php

/**
 * Class Connection
 * @package services
 */
final class Connection {

    const DB_MYSQL = 'mysql';
    const DB_PGSQL = 'pgsql';
    const DB_MONGO = 'mongodb';

    const CONFIG_MYSQL = "teste.ini";
    const CONFIG_MONGO = "teste.ini";

    const CONFIG_RETURN = "returnteste.ini";

    /**
     * Connection constructor.
     */
    private function __construct() {}

    /**
     * Função abrir conexão
     * @param string $dbType
     * @param null $ini
     * @return \MongoDB\Driver\Manager|PDO
     */
    public static function open( $dbType = self::DB_MYSQL, $ini = null )
    {
         switch ($dbType) {
            case self::DB_MYSQL:
                $config = empty($ini) ? self::CONFIG_MYSQL : $ini;
                $db = parse_ini_file('../configs/database/'.$config);
                break;
            case self::DB_MONGO:
                $config = empty($ini) ? self::CONFIG_MONGO : $ini;
                $db = parse_ini_file('../configs/database/nosql/'.$config);
                break;
        }

        $type = isset($db['type']) ? $db['type'] : NULL;
        $host = isset($db['host']) ? $db['host'] : NULL;
        $name = isset($db['name']) ? $db['name'] : NULL;
        $user = isset($db['user']) ? $db['user'] : NULL;
        $pass = isset($db['pass']) ? $db['pass'] : NULL;
        $port = isset($db['port']) ? $db['port'] : NULL;

        $dsn = '';

        switch ($type)
        {
            case 'pgsql':
                $port = $port ? $port : '5432';
                $dsn = "pgsql:dbname={$name};host={$host};port={$port}";
                break;
            case self::DB_MYSQL:
                $port = $port ? $port : '3306';
                $dsn = "mysql:dbname={$name};host={$host};port={$port}";
                break;
            case self::DB_MONGO:
                $port = $port ? $port : '27017';
                if (empty($user) || empty($pass)){
                    $dsn = "mongodb://{$host}:{$port}";
                    $dsn = empty($name) ? $dsn : $dsn . "/{$name}";
                } else {
                    $dsn = "mongodb://{$user}:{$pass}@{$host}:{$port}";
                    $dsn = empty($name) ? $dsn : $dsn . "/{$name}";
                }
                break;
        }

        $conn = self::getConn($type, $dsn, $user, $pass);

        return $conn;
    }

    public static function getDatabaseName($sql = self::DB_MYSQL, $ini = null)
    {
        if ($sql == self::DB_MYSQL) {
            $config = empty($ini) ? self::CONFIG_MYSQL : $ini;
            $db = parse_ini_file('../configs/database/'.$config);
        } else {
            $config = empty($ini) ? self::CONFIG_MONGO : $ini;
            $db = parse_ini_file('../configs/database/nosql/'.$config);
        }

        return isset($db['name']) ? $db['name'] : NULL;
    }

    /**
     * @param $type
     * @param $dsn
     * @param string $user
     * @param string $pass
     * @return \MongoDB\Driver\Manager|PDO
     */
    private static function getConn($type, $dsn, $user = '', $pass = '')
    {
        if ($type != self::DB_MONGO){
            $conn = new PDO( $dsn, $user, $pass );

            $conn->exec( "SET NAMES 'utf8'; SET character_set_connection=utf8; SET character_set_client=utf8; SET character_set_results=utf8;" );
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } else {
            $conn = new MongoDB\Driver\Manager($dsn);
            return $conn;
        }
    }
}