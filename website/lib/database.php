<?php


class database extends PDO
{
    private $testOutput=false;

    public function __construct($dsn=null, $username = null, $passwd = null, $options = null)
    {
        if($dsn==null){
            $dbname='website';
            $hostname='localhost';
            $dsn='mysql:dbname='.$dbname.';host='.$hostname;

        }
        if($username==null){
            $username='root';
        }
        try{
            parent::__construct($dsn, $username, $passwd, $options);
            $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this;
        }catch(Exception $e){
            return $e;
        }
    }
    protected function translate_fields($fields){
        $sql='';
        //$sql.=end($fields);
        foreach($fields as $field=>$val){
            if(end($fields)==$val){
                $sql.=$val.' ';
            }
            else{
                $sql.=$val.',';
            }
        }
        return $this->execute($sql);

    }
    public function get_list($table,$key,$value,$fields=null){
        $sql='SELECT ';
        ($fields==null) ? $sql.='* ':$sql.=$this->translate_fields($fields);
        $sql.='FROM '.$table.' WHERE '.$key.'="'.$value.'"';
        return $this->query_wrapper($sql);
    }
    public function get_object_by_id($table,$unid, $fields=null){
        $sql='SELECT ';
        ($fields==null) ? $sql.='* ':$sql.=$this->translate_fields($fields);
        $sql.='FROM '.$table.' WHERE unid='.$unid;
        return  $this->query_wrapper($sql);
    }
    public function add_object($table,$data){
        $sql='INSERT INTO '.$table.' (';
        $i = count($data);
        $keys='';
        $values='';
        foreach($data as $key=>$value){
            $last_iteration = !(--$i);
            if($last_iteration){
                $keys.=$key;
                $values.="'".$value."'";
            }
            else{
                $keys.=$key.",";
                $values.="'".$value."',";
            }
        }
        $sql.=$keys.') VALUES ('.$values.')';
        return $this->execute($sql);
    }
    public function save_object($unid,$table,$data){

        $sql='UPDATE '.$table.' SET ';
        $i = count($data);
        foreach($data as $key=>$value){
            $last_iteration = !(--$i);
            if($last_iteration){
                $sql.=$key."='".$value."' ";
            }
            else{
                $sql.=$key."='".$value."',";
            }
        }
        $sql.='WHERE unid='.$unid;

        return $this->execute($sql);

    }
    private function query_wrapper($sql){
        if($this->testOutput){
            return $sql;
        }
        return $this->query($sql);
    }
    private function execute($sql){
        if($this->testOutput){
            return $sql;
        }
        return $this->exec($sql);
    }
    public function activateTestOutput(){
        $this->testOutput=true;
    }
    public function DeactivateTestOutput(){
        $this->testOutput=false;
    }


}
