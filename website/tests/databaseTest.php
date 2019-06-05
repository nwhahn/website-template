<?php


use PHPUnit\Framework\TestCase;
require_once '../lib/database.php';



class databaseTest extends TestCase
{
    private $fields=['text','name','sin'];
    private $data=array(
        'email'=>'test@test.com',
        'first_name'=>'Tester',
        'last_name'=>'One',
    );

    public function test__construct()
    {
          $this->assertTrue(new database()!==false);
    }
    public function testGetList(){
        $db=new database();
        $db->activateTestOutput();
        $this->assertSame('SELECT * FROM example WHERE test=1',$db->get_list('example','test',1));
    }
    public function testGetObjectById(){
        $db=new database();
        $db->activateTestOutput();
        $this->assertSame('SELECT * FROM example WHERE unid=1',$db->get_object_by_id('example',1));
    }
    public function testGetList_FieldsOnly(){
        $db=new database();
        $db->activateTestOutput();
        $this->assertSame('SELECT text,name,sin FROM example WHERE test=1',$db->get_list('example','test',1,$this->fields));
    }
    public function testGetObjectById_FieldsOnly(){
        $db=new database();
        $db->activateTestOutput();
        $this->assertSame('SELECT text,name,sin FROM example WHERE unid=1',$db->get_object_by_id('example',1,$this->fields));
    }
    public function testSaveObject(){
        $db=new database();
        $db->activateTestOutput();
        $this->assertSame("UPDATE user SET email='test@test.com',first_name='Tester',last_name='One' WHERE unid=1",$db->save_object(1,'user',$this->data));

    }
    public function testAddObject(){
        $db=new database();
        $db->activateTestOutput();
        $this->assertSame("INSERT INTO user (email,first_name,last_name) VALUES ('test@test.com','Tester','One')",$db->add_object('user',$this->data));
    }


}
